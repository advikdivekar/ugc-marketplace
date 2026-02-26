# /api/schemas/brief.py

# BaseModel: The core class Pydantic uses to create data models.
# Field: Allows us to set strict validation rules (like min/max length).
# HttpUrl: Automatically validates that a string is a properly formatted web address.
from pydantic import BaseModel, Field, HttpUrl

from datetime import date
from typing import Literal

# We define the exact categories allowed. If Dev 1 sends "gaming", the API rejects it.
ALLOWED_CATEGORIES = Literal["skincare", "fitness", "tech", "fashion", "food", "travel", "finance", "other"]


# BriefCreate: The "Input" Schema
# This defines exactly what we expect to receive from Dev 1 when a Brand posts a brief.

class BriefCreate(BaseModel):
    # The '...' means this field is absolutely required. It cannot be left blank.
    # We force the title to be between 5 and 100 characters.
    title: str = Field(..., min_length=5, max_length=100)
    
    # Description needs to be substantial, at least 20 characters.
    description: str = Field(..., min_length=20, max_length=2000)
    
    # HttpUrl ensures Dev 1 passes a valid link (e.g., "https://example.com"), not just "example".
    product_url: HttpUrl
    
    # Budget must be a float (decimal number). 'gt=0' ensures they cannot post a brief for $0 or negative money.
    budget: float = Field(..., gt=0, le=100_000)
    
    # Must be a valid date format (YYYY-MM-DD).
    deadline: date
    
    # Must exactly match one of the strings in ALLOWED_CATEGORIES.
    category: ALLOWED_CATEGORIES



# BriefResponse: The "Output" Schema
# This defines exactly what we send BACK to Dev 1 when they request to see a brief.
# We inherit from BriefCreate so we don't have to type out title, description, etc., again.

class BriefResponse(BriefCreate):
    # The database generates these fields, so we add them to the response.
    id: str
    brand_id: str
    
    # Status defaults to open.
    status: str
    
    # Stored as a string representation of the timestamp.
    created_at: str

    # This Config class is a special Pydantic feature.
    # It tells Pydantic: "When I hand you a database row (which is an object), 
    # treat it like a dictionary and extract the data automatically."
    class Config:
        from_attributes = True