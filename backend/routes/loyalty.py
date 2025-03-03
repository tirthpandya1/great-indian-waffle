from fastapi import APIRouter, HTTPException
from typing import Dict

loyalty_router = APIRouter()

# Placeholder loyalty program management
LOYALTY_POINTS = {}

@loyalty_router.post("/add_points")
async def add_loyalty_points(data: Dict):
    """Add loyalty points for a user"""
    user_id = data.get("user_id")
    points = data.get("points", 0)
    
    if user_id is None:
        raise HTTPException(status_code=400, detail="User ID is required")
    
    current_points = LOYALTY_POINTS.get(user_id, 0)
    LOYALTY_POINTS[user_id] = current_points + points
    
    return {
        "user_id": user_id,
        "total_points": LOYALTY_POINTS[user_id],
        "points_added": points
    }

@loyalty_router.get("/points/{user_id}")
async def get_loyalty_points(user_id: str):
    """Retrieve loyalty points for a user"""
    points = LOYALTY_POINTS.get(user_id, 0)
    return {"user_id": user_id, "total_points": points}
