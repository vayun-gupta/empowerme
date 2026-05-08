from pydantic import BaseModel
from typing import List, Optional

from app.schemas.message import ConversationTurn


class CoachRequest(BaseModel):
    session_id: int
    scenario_id: int
    user_message: str
    adversary_message: str
    conversation_history: List[ConversationTurn] = []
    use_rag: bool = True
    previously_retrieved_themes: List[str] = []
    previous_improved_response: Optional[str] = None


class CoachResponse(BaseModel):
    score: int
    feedback: str
    improved_response: str
    theory_applied: str
    strengths: List[str]
    areas_for_improvement: List[str]
    frameworks_used: List[str] = []
