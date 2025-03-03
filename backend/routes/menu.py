from fastapi import APIRouter, HTTPException
from typing import List

menu_router = APIRouter()

# Placeholder menu data
MENU_ITEMS = [
    {
        "id": 1,
        "name": "Classic Masala Waffle",
        "description": "Traditional Indian spices infused waffle",
        "price": 149,
        "category": "Savory Waffles",
        "image_url": "/assets/classic_masala_waffle.jpg"
    },
    {
        "id": 2,
        "name": "Chocolate Chai Waffle",
        "description": "Rich chocolate waffle with chai spice blend",
        "price": 179,
        "category": "Sweet Waffles",
        "image_url": "/assets/chocolate_chai_waffle.jpg"
    }
]

@menu_router.get("/", response_model=List[dict])
async def get_menu():
    """Retrieve the entire restaurant menu"""
    return MENU_ITEMS

@menu_router.get("/{item_id}", response_model=dict)
async def get_menu_item(item_id: int):
    """Retrieve a specific menu item by ID"""
    item = next((item for item in MENU_ITEMS if item["id"] == item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item
