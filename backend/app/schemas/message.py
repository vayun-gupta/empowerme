from pydantic import BaseModel


class Message(BaseModel):
    message: str


class MessageResponse(BaseModel):
    message_id: int
    session_id: int
    sender: str
    content: str
    timestamp: str

    model_config = {"from_attributes": True}


class ConversationTurn(BaseModel):
    role: str
    content: str
