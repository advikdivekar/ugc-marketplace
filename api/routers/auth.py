from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from lib.database import get_db
from models.user import User
from dependencies.auth import verify_token

router = APIRouter(prefix="/auth", tags=["Auth"])

class UserCreate(BaseModel):
    email: str
    role: str
    display_name: str

@router.post("/sync", status_code=status.HTTP_201_CREATED)
async def sync_clerk_user(data: UserCreate, payload: dict = Depends(verify_token), db: Session = Depends(get_db)):
    """
    After a user signs up on the frontend using Clerk, 
    the frontend sends their details here to save in our Neon database.
    """
    user_id = payload.get("sub")
    # Check if user already exists
    existing_user = db.query(User).filter(User.id == user_id).first()
    if existing_user:
        return {"message": "User already exists in database", "user_id": existing_user.id}
        
    # Create new user in Neon
    new_user = User(
        id=current_user["user_id"],
        email=data.email,
        role=data.role,
        display_name=data.display_name
    )
    
    db.add(new_user)
    db.commit()
    
    return {"message": "User successfully synced to Neon!", "user_id": new_user.id}