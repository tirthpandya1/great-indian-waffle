from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from typing import Dict, Optional
import firebase_admin
from firebase_admin import credentials, auth
import os
from pydantic import BaseModel

auth_router = APIRouter()

# Initialize Firebase Admin SDK
# In production, use a secure method to store credentials
try:
    cred = credentials.Certificate("firebase-credentials.json")
    firebase_admin.initialize_app(cred)
except (FileNotFoundError, ValueError):
    # For development without credentials file
    firebase_admin.initialize_app()

# OAuth2 scheme for token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class UserSignUp(BaseModel):
    email: str
    password: str
    display_name: Optional[str] = None
    phone_number: Optional[str] = None

class OTPRequest(BaseModel):
    phone_number: str

class OTPVerify(BaseModel):
    session_info: str
    otp_code: str

@auth_router.post("/signup")
async def signup(user_data: UserSignUp):
    """Create a new user account"""
    try:
        user = auth.create_user(
            email=user_data.email,
            password=user_data.password,
            display_name=user_data.display_name,
            phone_number=user_data.phone_number
        )
        return {"uid": user.uid, "message": "User created successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating user: {str(e)}"
        )

@auth_router.post("/signin")
async def signin(credentials: Dict):
    """Sign in with email and password"""
    try:
        # In a real implementation, you would verify the token with Firebase
        # Here we're just returning a success message
        return {"message": "Sign in successful", "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}"
        )

@auth_router.post("/google-signin")
async def google_signin(id_token: Dict):
    """Sign in with Google"""
    try:
        # Verify the ID token from Google
        # In a real implementation, you would verify with Firebase
        return {"message": "Google sign in successful", "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Google authentication failed: {str(e)}"
        )

@auth_router.post("/phone-auth/start")
async def start_phone_auth(request: OTPRequest):
    """Start phone number authentication by sending OTP"""
    try:
        # In a real implementation, you would use Firebase to send the OTP
        # Here we're just returning a mock session info
        return {
            "session_info": "mock-session-info-123456",
            "message": "OTP sent successfully"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to send OTP: {str(e)}"
        )

@auth_router.post("/phone-auth/verify")
async def verify_phone_auth(verify_data: OTPVerify):
    """Verify phone number with OTP"""
    try:
        # In a real implementation, you would verify the OTP with Firebase
        # Here we're just returning a success message
        return {
            "message": "Phone number verified successfully",
            "token_type": "bearer"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"OTP verification failed: {str(e)}"
        )

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Get the current authenticated user"""
    try:
        # Verify the Firebase ID token
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token["uid"]
        user = auth.get_user(uid)
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
