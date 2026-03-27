from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import scenarios, chat
from app.database import engine, Base

# Create tables logic moved from database.py
from app.models.core import *
Base.metadata.create_all(bind=engine)

app = FastAPI(title="EmpowerMe API")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scenarios.router)
app.include_router(chat.router)

@app.get("/")
def home():
    return {"message": "Server is running"}
