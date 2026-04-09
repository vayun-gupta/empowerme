from pydantic import BaseModel
from typing import List

from app.schemas.message import ConversationTurn


class AdversaryRequest(BaseModel):
    session_id: int
    scenario_id: int
    user_message: str
    conversation_history: List[ConversationTurn] = []


class AdversaryResponse(BaseModel):
    adversary_message: str
    session_id: int
    message_id: int
