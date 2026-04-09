from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.schemas.scenario import ScenarioResponse
from app.services.scenario_service import get_all_scenarios, get_scenario_by_id

router = APIRouter(prefix="/scenarios", tags=["Scenarios"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=List[ScenarioResponse])
def list_scenarios(db: Session = Depends(get_db)):
    return get_all_scenarios(db)


@router.get("/{scenario_id}", response_model=ScenarioResponse)
def get_scenario(scenario_id: int, db: Session = Depends(get_db)):
    scenario = get_scenario_by_id(db, scenario_id)
    if not scenario:
        raise HTTPException(status_code=404, detail="Scenario not found")
    return scenario
