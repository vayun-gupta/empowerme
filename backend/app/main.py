from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.router import api_router
from app.database import engine, Base, SessionLocal

import app.models.scenario
import app.models.user
import app.models.session
import app.models.message
import app.models.feedback

Base.metadata.create_all(bind=engine)

from app.seed import seed_scenarios

app = FastAPI(title="EmpowerMe API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.on_event("startup")
def on_startup():
    db = SessionLocal()
    try:
        seed_scenarios(db)
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "EmpowerMe API is running"}
