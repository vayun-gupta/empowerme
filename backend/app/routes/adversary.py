import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.schemas.adversary import AdversaryRequest, AdversaryResponse
from app.services.adversary_service import generate_adversary_response

log = logging.getLogger(__name__)

router = APIRouter(prefix="/adversary", tags=["AI - Adversary"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=AdversaryResponse, status_code=201)
def adversary_endpoint(request: AdversaryRequest, db: Session = Depends(get_db)):
    try:
        return generate_adversary_response(request, db)
    except ValueError as e:
        log.exception("Adversary 404: %s", e)
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        log.exception("Adversary 500: unhandled exception")
        raise HTTPException(status_code=500, detail=f"Adversary generation failed: {str(e)}")
