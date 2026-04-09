from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class ScenarioDB(Base):
    __tablename__ = "scenarios"
    scenario_id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    barrier_theme = Column(String)
    adversary_role = Column(String)
    context_description = Column(Text)
    difficulty_level = Column(String)
    estimated_minutes = Column(Integer, nullable=True)
