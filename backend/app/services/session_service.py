from datetime import datetime
from sqlalchemy.orm import Session
from typing import List

from app.models.session import SessionDB
from app.models.message import MessageDB


def create_session(db: Session, scenario_id: int, user_id: int = 1) -> SessionDB:
    session = SessionDB(
        scenario_id=scenario_id,
        user_id=user_id,
        started_at=datetime.utcnow().isoformat(),
        status="active",
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


def get_session(db: Session, session_id: int):
    return db.query(SessionDB).filter(SessionDB.session_id == session_id).first()


def complete_session(db: Session, session_id: int):
    session = get_session(db, session_id)
    if not session:
        return None
    session.completed_at = datetime.utcnow().isoformat()
    session.status = "completed"
    db.commit()
    db.refresh(session)
    return session


def get_session_messages(db: Session, session_id: int) -> List[MessageDB]:
    return db.query(MessageDB).filter(MessageDB.session_id == session_id).all()
