from fastapi import APIRouter
from app.api.v1 import tools, users, network

api_router = APIRouter()

api_router.include_router(tools.router, prefix="/v1")
api_router.include_router(users.router, prefix="/v1")
api_router.include_router(network.router, prefix="/v1")