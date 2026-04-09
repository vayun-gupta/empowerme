import json
import os

from google import genai
from sqlalchemy.orm import Session

from app.models.feedback import CoachFeedbackDB
from app.models.scenario import ScenarioDB
from app.schemas.coach import CoachRequest, CoachResponse

COACH_PROMPT_TEMPLATE = (
    "You are an expert executive coach helping women in Indian higher education navigate "
    "institutional bias and workplace power dynamics.\n\n"
    "Scenario: CONTEXT_DESCRIPTION\n"
    "Adversary role: ADVERSARY_ROLE\n\n"
    'The adversary said: "ADVERSARY_MESSAGE"\n'
    'The user responded: "USER_MESSAGE"\n\n'
    "Evaluate the user's response on these dimensions:\n"
    "1. Assertiveness — Did they hold their ground without aggression?\n"
    "2. Strategic framing — Did they reframe the narrative in their favor?\n"
    "3. Emotional regulation — Did they stay composed and professional?\n"
    "4. Evidence use — Did they reference concrete achievements or data?\n"
    "5. Clarity — Was their message clear and direct?\n\n"
    "Return ONLY a JSON object. No markdown, no code fences, no extra text:\n"
    '{\n'
    '  "score": <integer 0-100>,\n'
    '  "feedback": "<2-3 sentence narrative coach feedback>",\n'
    '  "improved_response": "<a better version of what the user said, 2-3 sentences>",\n'
    '  "theory_applied": "<one communication theory or strategy name>",\n'
    '  "strengths": ["<strength 1>", "<strength 2>"],\n'
    '  "areas_for_improvement": ["<area 1>", "<area 2>"]\n'
    "}"
)


def _build_prompt(
    context_description: str,
    adversary_role: str,
    adversary_message: str,
    user_message: str,
) -> str:
    return (
        COACH_PROMPT_TEMPLATE
        .replace("CONTEXT_DESCRIPTION", context_description)
        .replace("ADVERSARY_ROLE", adversary_role)
        .replace("ADVERSARY_MESSAGE", adversary_message)
        .replace("USER_MESSAGE", user_message)
    )


def _parse_gemini_json(raw: str) -> dict:
    text = raw.strip()
    # Strip markdown fences if Gemini wraps response despite being told not to
    if "```" in text:
        parts = text.split("```")
        # Content is between the first pair of fences
        text = parts[1] if len(parts) >= 3 else parts[-1]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())


def generate_coach_feedback(request: CoachRequest, db: Session) -> CoachResponse:
    scenario = db.query(ScenarioDB).filter(ScenarioDB.scenario_id == request.scenario_id).first()
    if not scenario:
        raise ValueError(f"Scenario {request.scenario_id} not found")

    prompt = _build_prompt(
        context_description=scenario.context_description,
        adversary_role=scenario.adversary_role,
        adversary_message=request.adversary_message,
        user_message=request.user_message,
    )

    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not set")

    client = genai.Client(api_key=api_key)
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
    )
