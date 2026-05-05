from pydantic import BaseModel
from typing import List, Optional
from app.schemas.message import ConversationTurn


class HintRequest(BaseModel):
    scenario_id: int
    history: List[ConversationTurn]
    user_draft: Optional[str] = None


class HintResponse(BaseModel):
    hint: str
