from sqlalchemy import Column, Integer, String
from app.database import Base

class SessionDB(Base):
    __tablename__ = "sessions"
    session_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    scenario_id = Column(Integer)
    started_at = Column(String)
    completed_at = Column(String, nullable=True)
    status = Column(String, default="active")
