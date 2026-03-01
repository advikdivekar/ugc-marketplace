from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.sql import func
from lib.database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Brief(Base):
    __tablename__ = "briefs"

    # We generate a unique ID for every job
    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    
    # This links the job strictly to the Brand that posted it
    brand_id = Column(String, ForeignKey("users.id"), nullable=False)
    
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    budget = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())