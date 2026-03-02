from datetime import datetime
from pydantic import BaseModel, Field, HttpUrl, field_validator
from datetime import date
from typing import Literal, Optional

# The exact categories allowed in the marketplace
ALLOWED_CATEGORIES = Literal["skincare", "fitness", "tech", "fashion", "food", "travel", "finance", "other"]

class BriefCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=100)
    description: str = Field(..., min_length=20, max_length=2000)
    product_url: HttpUrl
    budget: float = Field(..., gt=0, le=100_000)
    deadline: date
    category: ALLOWED_CATEGORIES

    # Custom validator to block past dates
    @field_validator("deadline")
    @classmethod
    def deadline_must_be_future(cls, v):
        if v <= date.today():
            raise ValueError("Deadline must be a future date")
        return v

class BriefStatusUpdate(BaseModel):
    status: Literal["open", "closed", "completed"]

class BriefResponse(BaseModel):
    id: str
    brand_id: str
    title: str
    description: str
    budget: int
    product_url: str
    deadline: str
    category: str
    status: str
    created_at: datetime # <-- THE FIX: Change this from str to datetime!

    class Config:
        from_attributes = True