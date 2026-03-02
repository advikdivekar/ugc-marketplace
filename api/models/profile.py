from sqlalchemy import Column, String, ForeignKey
from lib.database import Base

class Profile(Base):
    __tablename__ = "profiles"

    # The user_id is both the Primary Key and the Foreign Key!
    # This ensures one user can only ever have one profile.
    user_id = Column(String, ForeignKey("users.id"), primary_key=True, index=True)
    
    bio = Column(String, nullable=True)
    portfolio_url = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)