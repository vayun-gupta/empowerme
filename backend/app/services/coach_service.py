import json
import os

from google import genai
from sqlalchemy.orm import Session

from app.models.feedback import CoachFeedbackDB
from app.models.scenario import ScenarioDB
from app.schemas.coach import CoachRequest, CoachResponse
from app.services.knowledge_base import retrieve_relevant_chunks

COACH_PROMPT_TEMPLATE = (
    "You are an expert executive coach helping women in Indian higher education navigate "
    "institutional bias and workplace power dynamics.\n\n"
    "Scenario: SCENARIO_TITLE\n"
    "Context: CONTEXT_DESCRIPTION\n"
    "Barrier theme: BARRIER_THEME\n"
    "Adversary role: ADVERSARY_ROLE\n\n"
    "RELEVANT_FRAMEWORKS\n"
    'The adversary said: "ADVERSARY_MESSAGE"\n'
    'The user responded: "USER_MESSAGE"\n\n'
    "Evaluate the user's response on these dimensions:\n"
    "1. Assertiveness — Did they hold their ground without aggression?\n"
    "2. Strategic framing — Did they reframe the narrative in their favor?\n"
    "3. Emotional regulation — Did they stay composed and professional?\n"
    "4. Evidence use — Did they reference concrete achievements or data?\n"
    "5. Clarity — Was their message clear and direct?\n\n"
    "Ground your feedback and improved_response in the frameworks above. "
    "In the theory_applied field, cite the specific framework and author "
    "(e.g. 'DESC Script — Bower & Bower 1976').\n\n"
    "Return ONLY a JSON object. No markdown, no code fences, no extra text:\n"
    '{\n'
    '  "score": <integer 0-100>,\n'
    '  "feedback": "<2-3 sentence narrative coach feedback>",\n'
    '  "improved_response": "<a better version of what the user said, 2-3 sentences>",\n'
    '  "theory_applied": "<specific framework name and author>",\n'
    '  "strengths": ["<strength 1>", "<strength 2>"],\n'
    '  "areas_for_improvement": ["<area 1>", "<area 2>"]\n'
    "}"
)


def _build_rag_block(chunks: list[dict]) -> str:
    parts = []
    for i, chunk in enumerate(chunks, start=1):
        parts.append(
            f"Framework {i} — {chunk['theme']}\n"
            f"Theories: {chunk['theories']}\n"
            f"Strategies: {chunk['strategies']}\n"
            f"Example responses: {chunk['examples']}\n"
            f"Risk note: {chunk['when_risky']}"
        )
    return "Relevant frameworks for this scenario:\n\n" + "\n\n".join(parts) + "\n\n"


def _build_prompt(
    scenario_title: str,
    context_description: str,
    barrier_theme: str,
    adversary_role: str,
    adversary_message: str,
    user_message: str,
    rag_block: str,
) -> str:
    return (
        COACH_PROMPT_TEMPLATE
        .replace("SCENARIO_TITLE", scenario_title)
        .replace("CONTEXT_DESCRIPTION", context_description)
        .replace("BARRIER_THEME", barrier_theme)
        .replace("ADVERSARY_ROLE", adversary_role)
        .replace("ADVERSARY_MESSAGE", adversary_message)
        .replace("USER_MESSAGE", user_message)
        .replace("RELEVANT_FRAMEWORKS", rag_block)
    )


def _parse_gemini_json(raw: str) -> dict:
    text = raw.strip()
    # Strip markdown fences if Gemini wraps response despite being told not to
    if "```" in text:
        parts = text.split("```")
        text = parts[1] if len(parts) >= 3 else parts[-1]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())


def generate_coach_feedback(request: CoachRequest, db: Session) -> CoachResponse:
    scenario = db.query(ScenarioDB).filter(ScenarioDB.scenario_id == request.scenario_id).first()
    if not scenario:
        raise ValueError(f"Scenario {request.scenario_id} not found")

    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not set")

    client = genai.Client(api_key=api_key)

    rag_query = f"{scenario.title} {scenario.barrier_theme} {request.adversary_message} {request.user_message}"
    chunks = retrieve_relevant_chunks(rag_query, client, top_k=2)
    rag_block = _build_rag_block(chunks)
    frameworks_used = [chunk["theme"] for chunk in chunks]

    prompt = _build_prompt(
        scenario_title=scenario.title,
        context_description=scenario.context_description,
        barrier_theme=scenario.barrier_theme,
        adversary_role=scenario.adversary_role,
        adversary_message=request.adversary_message,
        user_message=request.user_message,
        rag_block=rag_block,
    )

    result = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    try:
        data = _parse_gemini_json(result.text)
    except (json.JSONDecodeError, IndexError, ValueError) as e:
        raise ValueError(f"Gemini returned non-JSON response: {result.text[:300]}") from e

    feedback_row = CoachFeedbackDB(
        session_id=request.session_id,
        theory_applied=data.get("theory_applied", ""),
        suggestion=data.get("feedback", ""),
        overall_score=data.get("score", 0),
    )
    db.add(feedback_row)
    db.commit()

    return CoachResponse(
        score=data["score"],
        feedback=data["feedback"],
        improved_response=data["improved_response"],
        theory_applied=data["theory_applied"],
        strengths=data.get("strengths", []),
        areas_for_improvement=data.get("areas_for_improvement", []),
        frameworks_used=frameworks_used,
    )
