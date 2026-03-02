from pydantic import BaseModel
from typing import Optional

class ProfileUpdate(BaseModel):
    bio: Optional[str] = None
    portfolio_url: Optional[str] = None
    avatar_url: Optional[str] = None

class ProfileResponse(BaseModel):
    user_id: str
    bio: Optional[str] = None
    portfolio_url: Optional[str] = None
    avatar_url: Optional[str] = None