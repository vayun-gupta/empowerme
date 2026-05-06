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
    SessionDetailResponse, MessageItem, CoachAnalysis, JudgeScores,
)
from app.schemas.message import MessageResponse
from app.services import session_service
from app.services import judge_service

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
        # Lazy LLM-as-Judge evaluation: run once, persist, return cached on subsequent calls
        if feedback.judge_accuracy is None and messages:
            last_adversary = next((m.content for m in reversed(messages) if m.sender == "adversary"), "")
            last_user = next((m.content for m in reversed(messages) if m.sender == "user"), "")
            if last_adversary and last_user:
                judge_service.run_judge(feedback, session.scenario_id, last_adversary, last_user, db)

        judge = None
        if feedback.judge_accuracy is not None:
            judge = JudgeScores(
                accuracy=feedback.judge_accuracy,
                actionability=feedback.judge_actionability or 0,
                quality=feedback.judge_quality or 0,
                overall=float(feedback.judge_overall or 0),
                accuracy_rationale=feedback.judge_accuracy_rationale or "",
                actionability_rationale=feedback.judge_actionability_rationale or "",
                quality_rationale=feedback.judge_quality_rationale or "",
            )

        coach = CoachAnalysis(
            score=feedback.overall_score or 0,
            feedback=feedback.suggestion or "",
            improved_response=feedback.improved_response or "",
            theory_applied=feedback.theory_applied or "",
            strengths=json.loads(feedback.strengths) if feedback.strengths else [],
            areas_for_improvement=json.loads(feedback.areas_for_improvement) if feedback.areas_for_improvement else [],
            frameworks_used=json.loads(feedback.frameworks_used) if feedback.frameworks_used else [],
            judge=judge,
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
