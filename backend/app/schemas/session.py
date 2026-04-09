from pydantic import BaseModel
from typing import Optional


class SessionCreateRequest(BaseModel):
    scenario_id: int
    user_id: int = 1


class SessionResponse(BaseModel):
    session_id: int
    scenario_id: int
    user_id: int
    started_at: str
    completed_at: Optional[str] = None
    status: str

    model_config = {"from_attributes": True}
