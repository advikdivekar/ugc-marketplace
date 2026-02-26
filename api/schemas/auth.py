from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Literal

class RegisterRequest(BaseModel):
    # We keep EmailStr for basic format checking
    email: str 
    password: str = Field(..., min_length=8)
    role: Literal["brand", "writer"]
    display_name: str = Field(..., min_length=2, max_length=50)

    # We manually validate the email format without the "real domain" check
    @field_validator("email")
    @classmethod
    def validate_email_format(cls, v):
        if "@" not in v or "." not in v:
            raise ValueError("Invalid email format")
        return v.lower().strip()

class AuthRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    user_id: str
    role: str
    access_token: str