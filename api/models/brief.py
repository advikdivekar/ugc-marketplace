from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime
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
    product_name = Column(String, nullable=False)
    product_url = Column(String, nullable=True)
    brief_description = Column(String, nullable=False)
    target_audience = Column(String, nullable=True)
    creative_direction = Column(String, nullable=True)
    script_format = Column(String, nullable=True)
    industry = Column(String, nullable=True)
    budget = Column(Float, nullable=False)
    status = Column(String, default="open")
    created_at = Column(DateTime(timezone=True), server_default=func.now())