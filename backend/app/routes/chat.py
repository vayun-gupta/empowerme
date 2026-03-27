from fastapi import APIRouter
from app.schemas.message import Message
from app.services.chat_service import process_chat_message

router = APIRouter(prefix="/session", tags=["Session"])

@router.post("/message")
def chat_route(message: Message):
    user_message = message.message
    reply = process_chat_message(user_message)

    return {
        "user_message": user_message,
        "reply": reply
    }
