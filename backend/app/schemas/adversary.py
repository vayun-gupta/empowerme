from pydantic import BaseModel
from typing import List, Optional

from app.schemas.message import ConversationTurn


class EscalationState(BaseModel):
    tactic: str
    escalation_level: int
    tactics_used: List[str]


class AdversaryRequest(BaseModel):
    session_id: int
    scenario_id: int
    user_message: str
    conversation_history: List[ConversationTurn] = []
    escalation_state: Optional[EscalationState] = None
    last_coach_score: Optional[float] = None


class AdversaryResponse(BaseModel):
    adversary_message: str
    session_id: int
    message_id: int
    escalation_state: EscalationState
