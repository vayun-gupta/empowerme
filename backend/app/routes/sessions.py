from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.schemas.session import SessionCreateRequest, SessionResponse
from app.schemas.message import MessageResponse
from app.services import session_service

router = APIRouter(prefix="/sessions", tags=["Sessions"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=SessionResponse, status_code=201)
def create_session(request: SessionCreateRequest, db: Session = Depends(get_db)):
    return session_service.create_session(db, request.scenario_id, request.user_id)


@router.get("/{session_id}", response_model=SessionResponse)
def get_session(session_id: int, db: Session = Depends(get_db)):
    session = session_service.get_session(db, session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.patch("/{session_id}/complete", response_model=SessionResponse)
def complete_session(session_id: int, db: Session = Depends(get_db)):
    session = session_service.complete_session(db, session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.get("/{session_id}/messages", response_model=List[MessageResponse])
def get_messages(session_id: int, db: Session = Depends(get_db)):
    return session_service.get_session_messages(db, session_id)
