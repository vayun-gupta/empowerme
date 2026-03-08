from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./app.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# your tables as python classes
class ScenarioDB(Base):
    __tablename__ = "scenarios"
    scenario_id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    barrier_theme = Column(String)
    adversary_role = Column(String)
    context_description = Column(Text)
    difficulty_level = Column(String)

class UserDB(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    role = Column(String)

class SessionDB(Base):
    __tablename__ = "sessions"
    session_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    scenario_id = Column(Integer)
    started_at = Column(String)
    completed_at = Column(String)

class MessageDB(Base):
    __tablename__ = "messages"
    message_id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer)
    sender = Column(String)
    content = Column(Text)
    timestamp = Column(String)

class CoachFeedbackDB(Base):
    __tablename__ = "coach_feedback"
    feedback_id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer)
    theory_applied = Column(String)
    suggestion = Column(Text)
    overall_score = Column(Integer)

# this line creates all the tables in app.db
Base.metadata.create_all(bind=engine)