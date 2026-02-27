from pydantic import BaseModel, Field, HttpUrl
from datetime import datetime
from typing import Optional, Literal

class SubmissionCreate(BaseModel):
    brief_id: str
    video_url: HttpUrl
    pitch: str = Field(..., min_length=10, max_length=1000)

class SubmissionResponse(BaseModel):
    id: str
    brief_id: str
    writer_id: str
    video_url: HttpUrl
    pitch: str
    status: str
    created_at: datetime
    writer_name: Optional[str] = None

class SubmissionStatusUpdate(BaseModel):
    status: Literal["accepted", "rejected"]