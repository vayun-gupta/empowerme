from pydantic import BaseModel
from typing import List, Optional


class RecentSessionItem(BaseModel):
    session_id: int
    scenario_title: str
    completed_at: str
    score: Optional[int] = None


class DashboardResponse(BaseModel):
    total_sessions: int
    completed_sessions: int
    average_score: float
    streak_days: int
    recent_sessions: List[RecentSessionItem]
