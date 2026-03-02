from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.types import DateTime
from sqlalchemy.sql import func
from lib.database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Brief(Base):
    __tablename__ = "briefs"

    id = Column(String, primary_key=True, default=generate_uuid)
    brand_id = Column(String, nullable=False) 
    title = Column(String, nullable=False)
    
    # 1. Renamed from 'content' to 'description'
    description = Column(String, nullable=False) 
    
    # 2. Added the missing columns required by Pydantic
    product_url = Column(String, nullable=False)
    deadline = Column(String, nullable=False) # Storing as String (YYYY-MM-DD) for simplicity
    category = Column(String, nullable=False)
    status = Column(String, default="open")
    
    budget = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())