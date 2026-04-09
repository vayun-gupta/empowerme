import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas.coach import CoachRequest, CoachResponse
from app.services.coach_service import generate_coach_feedback

log = logging.getLogger(__name__)

router = APIRouter(prefix="/coach", tags=["AI - Coach"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=CoachResponse, status_code=201)
def coach_endpoint(request: CoachRequest, db: Session = Depends(get_db)):
    try:
        return generate_coach_feedback(request, db)
    except ValueError as e:
        log.exception("Coach error: %s", e)
        status = 404 if "not found" in str(e) else 422
        raise HTTPException(status_code=status, detail=str(e))
    except Exception as e:
        log.exception("Coach 500: unhandled exception")
        raise HTTPException(status_code=500, detail=f"Coach evaluation failed: {str(e)}")
