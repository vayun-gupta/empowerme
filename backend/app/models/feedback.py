from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class CoachFeedbackDB(Base):
    __tablename__ = "coach_feedback"
    feedback_id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer)
    theory_applied = Column(String)
    suggestion = Column(Text)
    overall_score = Column(Integer)
    improved_response = Column(Text)
    strengths = Column(Text)          # stored as JSON string
    areas_for_improvement = Column(Text)  # stored as JSON string
    frameworks_used = Column(Text)    # stored as JSON string
    # LLM-as-Judge scores (nullable; populated lazily on first session detail view)
    judge_accuracy = Column(Integer, nullable=True)
    judge_actionability = Column(Integer, nullable=True)
    judge_quality = Column(Integer, nullable=True)
    judge_overall = Column(String, nullable=True)
    judge_accuracy_rationale = Column(Text, nullable=True)
    judge_actionability_rationale = Column(Text, nullable=True)
    judge_quality_rationale = Column(Text, nullable=True)
