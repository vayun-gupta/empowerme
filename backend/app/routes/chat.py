from fastapi import APIRouter
from app.schemas.core import Message

router = APIRouter(prefix="/session", tags=["Session"])

@router.post("/message")
def chat(message: Message):
    user_message = message.message

    # placeholder adversary response
    reply = "This is a simulated adversary response."

    return {
        "user_message": user_message,
        "reply": reply
    }
