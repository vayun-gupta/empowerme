from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import SessionLocal, ScenarioDB, SessionDB, MessageDB, CoachFeedbackDB

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Server is running"}


@app.get("/scenarios")
def get_scenarios():

    scenarios = [
        {
            "id": 1,
            "title": "Performance Review Bias",
            "context": "You are discussing promotion readiness with a senior faculty member."
        },
        {
            "id": 2,
            "title": "Idea Ignored in Meeting",
            "context": "Your idea was ignored until repeated by a male colleague."
        }
    ]

    return scenarios


class Message(BaseModel):
    message: str


@app.post("/session/message")
def chat(message: Message):

    user_message = message.message

    # placeholder adversary response
    reply = "This is a simulated adversary response."

    return {
        "user_message": user_message,
        "reply": reply
    }