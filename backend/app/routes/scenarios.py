from fastapi import APIRouter
from app.services.scenario_service import get_all_scenarios

router = APIRouter(prefix="/scenarios", tags=["Scenarios"])

@router.get("/")
def get_scenarios_route():
    return get_all_scenarios()
