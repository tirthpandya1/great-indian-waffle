from fastapi import APIRouter, HTTPException
from typing import Dict

users_router = APIRouter()

# Placeholder user management
USERS = []

@users_router.post("/register")
async def register_user(user: Dict):
    """Register a new user"""
    user_id = len(USERS) + 1
    user["id"] = user_id
    USERS.append(user)
    return {"user_id": user_id, "message": "User registered successfully"}

@users_router.get("/profile/{user_id}")
async def get_user_profile(user_id: int):
    """Retrieve user profile"""
    user = next((user for user in USERS if user.get("id") == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
