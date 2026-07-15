import os

from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.routes.router import api_router
from app.database import engine, Base, SessionLocal

import app.models.scenario
import app.models.user
import app.models.session
import app.models.message
import app.models.feedback

Base.metadata.create_all(bind=engine)

# Add columns introduced after initial schema creation — safe to re-run
_MIGRATIONS = [
    "ALTER TABLE coach_feedback ADD COLUMN improved_response TEXT",
    "ALTER TABLE coach_feedback ADD COLUMN strengths TEXT",
    "ALTER TABLE coach_feedback ADD COLUMN areas_for_improvement TEXT",
    "ALTER TABLE coach_feedback ADD COLUMN frameworks_used TEXT",
    "ALTER TABLE coach_feedback ADD COLUMN judge_accuracy INTEGER",
    "ALTER TABLE coach_feedback ADD COLUMN judge_actionability INTEGER",
    "ALTER TABLE coach_feedback ADD COLUMN judge_quality INTEGER",
    "ALTER TABLE coach_feedback ADD COLUMN judge_overall TEXT",
    "ALTER TABLE coach_feedback ADD COLUMN judge_accuracy_rationale TEXT",
    "ALTER TABLE coach_feedback ADD COLUMN judge_actionability_rationale TEXT",
    "ALTER TABLE coach_feedback ADD COLUMN judge_quality_rationale TEXT",
]

# Each statement gets its own transaction: on Postgres a failed ALTER aborts
# the surrounding transaction, so without a rollback every later statement
# would fail with "current transaction is aborted" (SQLite tolerated this).
with engine.connect() as _conn:
    for _sql in _MIGRATIONS:
        try:
            _conn.execute(text(_sql))
            _conn.commit()
        except Exception:
            _conn.rollback()  # column already exists

from app.seed import seed_scenarios

app = FastAPI(title="EmpowerMe API")

# Comma-separated list of allowed origins; regex covers Vercel preview deploys
_cors_origins = [
    o.strip()
    for o in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    if o.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_origin_regex=os.getenv("CORS_ORIGIN_REGEX") or None,
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
