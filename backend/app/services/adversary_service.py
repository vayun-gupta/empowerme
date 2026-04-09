import os
from datetime import datetime

from google import genai
from sqlalchemy.orm import Session

from app.models.message import MessageDB
from app.models.scenario import ScenarioDB
from app.schemas.adversary import AdversaryRequest, AdversaryResponse

ADVERSARY_PROMPT_TEMPLATE = (
    "You are an institutional actor in a workplace leadership simulation designed to help "
    "women in Indian higher education practice navigating systemic bias.\n\n"
    "Your role: ADVERSARY_ROLE\n"
    "Scenario: CONTEXT_DESCRIPTION\n"
    "Resistance tactic: BARRIER_THEME\n\n"
    "Simulate realistic institutional resistance using the resistance tactic — subtle deflection, "
    "criteria shifting, procedural delay, or credibility questioning. "
    "Keep your response to 2-3 sentences. Maintain a professional, plausible tone. "
    "Never be explicitly discriminatory. Never break character.\n\n"
    "Conversation so far:\n"
    "HISTORY"
    "User just said: USER_MESSAGE\n\n"
    "Respond as the adversary:"
)


def _build_prompt(
    adversary_role: str,
    context_description: str,
    barrier_theme: str,
    history: str,
    user_message: str,
) -> str:
    return (
        ADVERSARY_PROMPT_TEMPLATE
        .replace("ADVERSARY_ROLE", adversary_role)
        .replace("CONTEXT_DESCRIPTION", context_description)
        .replace("BARRIER_THEME", barrier_theme)
        .replace("HISTORY", history)
        .replace("USER_MESSAGE", user_message)
    )


def generate_adversary_response(request: AdversaryRequest, db: Session) -> AdversaryResponse:
    scenario = db.query(ScenarioDB).filter(ScenarioDB.scenario_id == request.scenario_id).first()
    if not scenario:
        raise ValueError(f"Scenario {request.scenario_id} not found")

    history = ""
    for turn in request.conversation_history:
        label = "User" if turn.role == "user" else "Adversary"
        history += f"{label}: {turn.content}\n"

    prompt = _build_prompt(
        adversary_role=scenario.adversary_role,
        context_description=scenario.context_description,
        barrier_theme=scenario.barrier_theme,
        history=history,
        user_message=request.user_message,
    )

    api_key = os.environ.get("GEMINI_API_KEY", "")
    print(f"[adversary_service] GEMINI_API_KEY={'SET (len=' + str(len(api_key)) + ')' if api_key else 'NOT FOUND'}")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not set")

    client = genai.Client(api_key=api_key)
    result = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    adversary_text = result.text.strip()

    now = datetime.utcnow().isoformat()

    user_row = MessageDB(
        session_id=request.session_id,
        sender="user",
        content=request.user_message,
        timestamp=now,
    )
    db.add(user_row)

    adversary_row = MessageDB(
        session_id=request.session_id,
        sender="adversary",
        content=adversary_text,
        timestamp=now,
    )
    db.add(adversary_row)
    db.commit()
    db.refresh(adversary_row)

    return AdversaryResponse(
        adversary_message=adversary_text,
        session_id=request.session_id,
        message_id=adversary_row.message_id,
    )
