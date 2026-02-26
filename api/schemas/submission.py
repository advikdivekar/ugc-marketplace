from pydantic import BaseModel, Field, HttpUrl
from datetime import datetime
from typing import Optional

class SubmissionCreate(BaseModel):
    brief_id: str
    video_url: HttpUrl
    pitch: str = Field(..., min_length=10, max_length=1000)

class SubmissionResponse(SubmissionCreate):
    id: str
    writer_id: str
    status: str # 'pending', 'accepted', 'rejected'
    created_at: datetime
    
    # We will join the profile table to show the writer's name to the brand
    writer_name: Optional[str] = None