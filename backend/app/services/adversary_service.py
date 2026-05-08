import os
from datetime import datetime

from google import genai
from sqlalchemy.orm import Session

from app.models.message import MessageDB
from app.models.scenario import ScenarioDB
from app.schemas.adversary import AdversaryRequest, AdversaryResponse, EscalationState

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
    "ESCALATION_BLOCK"
    "Conversation so far:\n"
    "HISTORY"
    "User just said: USER_MESSAGE\n\n"
    "ACKNOWLEDGEMENT_BLOCK"
    "Respond as the adversary:"
)


def _build_escalation_block(state: "EscalationState | None") -> str:
    if state is None:
        return ""
    tactics_str = ", ".join(state.tactics_used) if state.tactics_used else "none yet"
    return (
        f"Escalation context:\n"
        f"- Resistance level: {state.escalation_level}/3\n"
        f"- Tactics already used this session: {tactics_str}\n"
        f"- Do not repeat a tactic already used. Escalate your resistance appropriately for level {state.escalation_level}.\n"
        f"- At level 1: deflect and reframe. At level 2: question credibility or introduce procedural delay. At level 3: become dismissive or invoke authority.\n\n"
    )


def _build_acknowledgement_instruction(score: "float | None") -> str:
    if score is None or score < 70:
        return ""
    if score <= 85:
        return (
            "The user has made a reasonable point. Acknowledge their perspective briefly but maintain your overall position. "
            "Use softening language like 'I understand your perspective, however...' or 'That is noted, though the broader concern remains...'\n\n"
        )
    return (
        "The user has made a strong, well-evidenced point. Concede one specific minor point while holding your larger position. "
        "For example: 'That is a fair point regarding [specific thing they said]. The broader question of [main resistance theme] remains something the committee will need to assess.'\n\n"
    )


def _build_prompt(
    adversary_role: str,
    context_description: str,
    barrier_theme: str,
    history: str,
    user_message: str,
    escalation_block: str,
    acknowledgement_instruction: str,
) -> str:
    return (
        ADVERSARY_PROMPT_TEMPLATE
        .replace("ADVERSARY_ROLE", adversary_role)
        .replace("CONTEXT_DESCRIPTION", context_description)
        .replace("BARRIER_THEME", barrier_theme)
        .replace("ESCALATION_BLOCK", escalation_block)
        .replace("HISTORY", history)
        .replace("USER_MESSAGE", user_message)
        .replace("ACKNOWLEDGEMENT_BLOCK", acknowledgement_instruction)
    )


def generate_adversary_response(request: AdversaryRequest, db: Session) -> AdversaryResponse:
    scenario = db.query(ScenarioDB).filter(ScenarioDB.scenario_id == request.scenario_id).first()
    if not scenario:
        raise ValueError(f"Scenario {request.scenario_id} not found")

    history = ""
    for turn in request.conversation_history:
        label = "User" if turn.role == "user" else "Adversary"
        history += f"{label}: {turn.content}\n"

    escalation_block = _build_escalation_block(request.escalation_state)
    acknowledgement_instruction = _build_acknowledgement_instruction(request.last_coach_score)

    prompt = _build_prompt(
        adversary_role=scenario.adversary_role,
        context_description=scenario.context_description,
        barrier_theme=scenario.barrier_theme,
        history=history,
        user_message=request.user_message,
        escalation_block=escalation_block,
        acknowledgement_instruction=acknowledgement_instruction,
    )

    api_key = os.environ.get("GEMINI_API_KEY", "")
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

    prior = request.escalation_state
    new_tactics_used = (list(prior.tactics_used) if prior else []) + [scenario.barrier_theme]
    new_level = min(3, len(new_tactics_used) // 2 + 1)
    updated_state = EscalationState(
        tactic=scenario.barrier_theme,
        escalation_level=new_level,
        tactics_used=new_tactics_used,
    )

    return AdversaryResponse(
        adversary_message=adversary_text,
        session_id=request.session_id,
        message_id=adversary_row.message_id,
        escalation_state=updated_state,
    )
