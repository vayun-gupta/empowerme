from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class MessageDB(Base):
    __tablename__ = "messages"
    message_id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer)
    sender = Column(String)
    content = Column(Text)
    timestamp = Column(String)
