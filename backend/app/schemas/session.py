from pydantic import BaseModel
from typing import List, Optional


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


class MessageItem(BaseModel):
    sender: str
    content: str
    timestamp: str


class CoachAnalysis(BaseModel):
    score: int
    feedback: str
    improved_response: str
    theory_applied: str
    strengths: List[str]
    areas_for_improvement: List[str]
    frameworks_used: List[str]


class SessionDetailResponse(BaseModel):
    session_id: int
    scenario_id: int
    scenario_title: str
    adversary_role: str
    barrier_theme: str
    started_at: str
    completed_at: Optional[str] = None
    messages: List[MessageItem]
    coach: Optional[CoachAnalysis] = None
