import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.models.message import MessageDB
from app.models.feedback import CoachFeedbackDB
from app.models.scenario import ScenarioDB
from app.schemas.session import (
    SessionCreateRequest, SessionResponse,
    SessionDetailResponse, MessageItem, CoachAnalysis,
)
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


@router.get("/{session_id}/detail", response_model=SessionDetailResponse)
def get_session_detail(session_id: int, db: Session = Depends(get_db)):
    session = session_service.get_session(db, session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    scenario = db.query(ScenarioDB).filter(ScenarioDB.scenario_id == session.scenario_id).first()
    messages = (
        db.query(MessageDB)
        .filter(MessageDB.session_id == session_id)
        .order_by(MessageDB.message_id)
        .all()
    )
    feedback = (
        db.query(CoachFeedbackDB)
        .filter(CoachFeedbackDB.session_id == session_id)
        .order_by(CoachFeedbackDB.feedback_id.desc())
        .first()
    )

    coach = None
    if feedback:
        coach = CoachAnalysis(
            score=feedback.overall_score or 0,
            feedback=feedback.suggestion or "",
            improved_response=feedback.improved_response or "",
            theory_applied=feedback.theory_applied or "",
            strengths=json.loads(feedback.strengths) if feedback.strengths else [],
            areas_for_improvement=json.loads(feedback.areas_for_improvement) if feedback.areas_for_improvement else [],
            frameworks_used=json.loads(feedback.frameworks_used) if feedback.frameworks_used else [],
        )

    return SessionDetailResponse(
        session_id=session.session_id,
        scenario_id=session.scenario_id,
        scenario_title=scenario.title if scenario else "Unknown Scenario",
        adversary_role=scenario.adversary_role if scenario else "",
        barrier_theme=scenario.barrier_theme if scenario else "",
        started_at=session.started_at,
        completed_at=session.completed_at,
        messages=[MessageItem(sender=m.sender, content=m.content, timestamp=m.timestamp) for m in messages],
        coach=coach,
    )
