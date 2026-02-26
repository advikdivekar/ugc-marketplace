from pydantic import BaseModel, EmailStr, Field
from typing import Literal

# Payload for new user registration
class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    role: Literal["brand", "writer"]
    display_name: str = Field(..., min_length=2, max_length=50)

# Payload for existing user login
class AuthRequest(BaseModel):
    email: EmailStr
    password: str

# Standard response returned after successful authentication
class AuthResponse(BaseModel):
    user_id: str
    role: str
    access_token: str