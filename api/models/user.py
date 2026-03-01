from sqlalchemy import Column, String, DateTime, Enum
from sqlalchemy.sql import func
import enum
from lib.database import Base

# Define our two specific roles
class UserRole(str, enum.Enum):
    brand = "brand"
    writer = "writer"

class User(Base):
    __tablename__ = "users"

    # Clerk generates string IDs like "user_2aXyZ...", so we use String instead of UUID
    id = Column(String, primary_key=True, index=True) 
    email = Column(String, unique=True, index=True, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    display_name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())