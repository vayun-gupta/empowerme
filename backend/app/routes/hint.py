import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.scenario import ScenarioDB
from app.schemas.hint import HintRequest, HintResponse
from app.services.hint_service import get_hint

log = logging.getLogger(__name__)
router = APIRouter(prefix="/hint", tags=["AI - Hint"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=HintResponse, status_code=200)
def hint_endpoint(request: HintRequest, db: Session = Depends(get_db)):
    scenario = db.query(ScenarioDB).filter(
        ScenarioDB.scenario_id == request.scenario_id
    ).first()
    if not scenario:
        raise HTTPException(status_code=404, detail=f"Scenario {request.scenario_id} not found")
    try:
        return HintResponse(hint=get_hint(scenario, request.history, request.user_draft))
    except Exception as e:
        log.exception("Hint error")
        raise HTTPException(status_code=500, detail=f"Hint failed: {str(e)}")
