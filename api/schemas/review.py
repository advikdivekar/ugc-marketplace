from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ReviewCreate(BaseModel):
    writer_id: str
    rating: int = Field(..., ge=1, le=5) # Forces rating to be between 1 and 5
    comment: Optional[str] = None

class ReviewResponse(BaseModel):
    id: str
    brand_id: str
    writer_id: str
    rating: int
    comment: Optional[str]
    created_at: datetime