from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import routers
from routes.menu import menu_router
from routes.orders import orders_router
from routes.users import users_router
from routes.loyalty import loyalty_router
from routes.auth import auth_router

app = FastAPI(
    title="Great Indian Waffle API",
    description="Backend API for restaurant management and ordering",
    version="0.1.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(menu_router, prefix="/menu", tags=["Menu"])
app.include_router(orders_router, prefix="/orders", tags=["Orders"])
app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(loyalty_router, prefix="/loyalty", tags=["Loyalty"])
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])

@app.get("/")
async def root():
    return {"message": "Welcome to Great Indian Waffle API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
