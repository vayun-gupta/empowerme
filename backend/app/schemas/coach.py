from pydantic import BaseModel
from typing import List

from app.schemas.message import ConversationTurn


class CoachRequest(BaseModel):
    session_id: int
    scenario_id: int
    user_message: str
    adversary_message: str
    conversation_history: List[ConversationTurn] = []


class CoachResponse(BaseModel):
    score: int
    feedback: str
    improved_response: str
    theory_applied: str
    strengths: List[str]
    areas_for_improvement: List[str]
