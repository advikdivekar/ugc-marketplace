from datetime import datetime
from pydantic import BaseModel, Field, HttpUrl
from typing import Literal, Optional

# The exact industries allowed in the marketplace
ALLOWED_INDUSTRIES = Literal["skincare", "fitness", "tech", "fashion", "food", "travel", "finance", "other"]
ALLOWED_FORMATS = Literal["tiktok", "shorts", "reel", "pinterest", "other"]

class BriefCreate(BaseModel):
    product_name: str = Field(..., min_length=3, max_length=100)
    product_url: Optional[str] = None
    brief_description: str = Field(..., min_length=20, max_length=2000)
    target_audience: Optional[str] = None
    creative_direction: Optional[str] = None
    script_format: Optional[ALLOWED_FORMATS] = None
    industry: Optional[ALLOWED_INDUSTRIES] = None
    budget: float = Field(..., gt=0, le=100_000)

class BriefStatusUpdate(BaseModel):
    status: Literal["open", "funded", "in_progress", "closed"]

class BriefResponse(BaseModel):
    id: str
    brand_id: str
    product_name: str
    product_url: Optional[str] = None
    brief_description: str
    target_audience: Optional[str] = None
    creative_direction: Optional[str] = None
    script_format: Optional[str] = None
    industry: Optional[str] = None
    budget: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True