from pydantic import BaseModel
from typing import Optional


class ScenarioResponse(BaseModel):
    scenario_id: int
    title: str
    barrier_theme: str
    adversary_role: str
    context_description: str
    difficulty_level: str
    estimated_minutes: Optional[int] = None

    model_config = {"from_attributes": True}
