from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class CoachFeedbackDB(Base):
    __tablename__ = "coach_feedback"
    feedback_id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer)
    theory_applied = Column(String)
    suggestion = Column(Text)
    overall_score = Column(Integer)
