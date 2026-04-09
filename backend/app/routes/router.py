from fastapi import APIRouter
from app.routes import scenarios, sessions, dashboard, adversary, coach

api_router = APIRouter(prefix="/api")

api_router.include_router(scenarios.router)
api_router.include_router(sessions.router)
api_router.include_router(dashboard.router)
api_router.include_router(adversary.router)
api_router.include_router(coach.router)
