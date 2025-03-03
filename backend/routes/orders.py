from fastapi import APIRouter, HTTPException
from typing import List, Dict

orders_router = APIRouter()

# Placeholder orders management
ORDERS = []

@orders_router.post("/create")
async def create_order(order: Dict):
    """Create a new order"""
    order_id = len(ORDERS) + 1
    order["id"] = order_id
    ORDERS.append(order)
    return {"order_id": order_id, "message": "Order placed successfully"}

@orders_router.get("/history/{user_id}")
async def get_order_history(user_id: str):
    """Retrieve order history for a specific user"""
    user_orders = [order for order in ORDERS if order.get("user_id") == user_id]
    return user_orders
