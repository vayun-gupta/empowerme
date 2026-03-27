from sqlalchemy import Column, Integer, String
from app.database import Base

class UserDB(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    role = Column(String)
