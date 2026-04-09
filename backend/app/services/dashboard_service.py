from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.session import SessionDB
from app.models.scenario import ScenarioDB
from app.models.feedback import CoachFeedbackDB
from app.schemas.dashboard import DashboardResponse, RecentSessionItem


def get_dashboard(db: Session, user_id: int = 1) -> DashboardResponse:
    total = db.query(SessionDB).filter(SessionDB.user_id == user_id).count()

    completed = (
        db.query(SessionDB)
        .filter(SessionDB.user_id == user_id, SessionDB.status == "completed")
        .count()
    )

    avg_score_row = (
        db.query(func.avg(CoachFeedbackDB.overall_score))
        .join(SessionDB, CoachFeedbackDB.session_id == SessionDB.session_id)
        .filter(SessionDB.user_id == user_id)
        .scalar()
    )
    avg_score = round(float(avg_score_row), 1) if avg_score_row else 0.0

    recent_rows = (
        db.query(SessionDB, ScenarioDB)
        .join(ScenarioDB, SessionDB.scenario_id == ScenarioDB.scenario_id)
        .filter(SessionDB.user_id == user_id, SessionDB.status == "completed")
        .order_by(SessionDB.completed_at.desc())
        .limit(5)
        .all()
    )

    recent_sessions = []
    for sess, scenario in recent_rows:
        feedback = (
            db.query(CoachFeedbackDB)
            .filter(CoachFeedbackDB.session_id == sess.session_id)
            .order_by(CoachFeedbackDB.feedback_id.desc())
            .first()
        )
        recent_sessions.append(
            RecentSessionItem(
                session_id=sess.session_id,
                scenario_title=scenario.title,
                completed_at=sess.completed_at,
                score=feedback.overall_score if feedback else None,
            )
        )

    return DashboardResponse(
        total_sessions=total,
        completed_sessions=completed,
        average_score=avg_score,
        streak_days=0,
        recent_sessions=recent_sessions,
    )
