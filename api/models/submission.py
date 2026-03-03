from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
import enum
import uuid
from lib.database import Base

def generate_uuid():
    return str(uuid.uuid4())

# Define the exact stages of a job application
class SubmissionStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    paid = "paid"

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(String, primary_key=True, default=generate_uuid, index=True)
    
    # The links to our other tables
    brief_id = Column(String, ForeignKey("briefs.id"), nullable=False)
    writer_id = Column(String, ForeignKey("users.id"), nullable=False)
    
    # The application content
    script_content = Column(String, nullable=False)
    proposed_price = Column(Float, nullable=True)
    
    # Tracking the money/acceptance flow
    status = Column(Enum(SubmissionStatus), default=SubmissionStatus.pending, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())