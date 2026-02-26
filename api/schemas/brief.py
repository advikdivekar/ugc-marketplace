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

class BriefResponse(BriefCreate):
    id: str
    brand_id: str
    status: str
    created_at: str
    
    # Optional field to hold the brand's display name when we join tables
    brand_name: Optional[str] = None