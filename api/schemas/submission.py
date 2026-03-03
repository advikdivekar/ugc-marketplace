from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Literal

class SubmissionCreate(BaseModel):
    brief_id: str
    script_content: str = Field(..., min_length=10, max_length=5000)
    proposed_price: Optional[float] = None

class SubmissionResponse(BaseModel):
    id: str
    brief_id: str
    writer_id: str
    script_content: str
    proposed_price: Optional[float] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class SubmissionStatusUpdate(BaseModel):
    status: Literal["approved", "rejected"]