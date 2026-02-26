from pydantic import BaseModel, Field
from typing import List, Optional

# Defines the optional fields a user can update
class ProfileUpdate(BaseModel):
    display_name: Optional[str] = Field(None, min_length=2, max_length=50)
    bio: Optional[str] = Field(None, max_length=500)
    niche: Optional[List[str]] = None
    avatar_url: Optional[str] = None
    razorpay_account_id: Optional[str] = None

# Defines the complete profile data returned to the frontend
class ProfileResponse(BaseModel):
    id: str
    role: str
    display_name: str
    bio: Optional[str] = None
    niche: Optional[List[str]] = None
    avatar_url: Optional[str] = None
    avg_rating: float
    completed_jobs: int
    razorpay_account_id: Optional[str] = None