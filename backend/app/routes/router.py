from fastapi import APIRouter
from app.routes import scenarios, chat

api_router = APIRouter()

api_router.include_router(scenarios.router)
api_router.include_router(chat.router)
