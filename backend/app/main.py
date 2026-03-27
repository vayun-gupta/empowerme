from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.router import api_router
from app.database import engine, Base

# Create tables logic
import app.models.scenario
import app.models.user
import app.models.session
import app.models.message
import app.models.feedback
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

app.include_router(api_router)

@app.get("/")
def home():
    return {"message": "Server is running"}
