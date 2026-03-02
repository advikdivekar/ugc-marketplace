from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from lib.database import get_db
from models.profile import Profile
from schemas.profile import ProfileUpdate, ProfileResponse
from dependencies.auth import get_current_user

router = APIRouter(prefix="/profiles", tags=["Profiles"])

@router.get("/{user_id}", response_model=ProfileResponse)
async def get_profile(user_id: str, db: Session = Depends(get_db)):
    """Fetch a user's public profile"""
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    
    # If they haven't set up a profile yet, return an empty one instead of crashing
    if not profile:
        return {"user_id": user_id, "bio": None, "portfolio_url": None, "avatar_url": None}
        
    return profile

@router.put("", response_model=ProfileResponse)
async def update_profile(data: ProfileUpdate, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    """A user updates their own profile"""
    user_id = current_user["user_id"]
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    
    # If the profile doesn't exist yet, create it
    if not profile:
        profile = Profile(user_id=user_id, **data.model_dump(exclude_unset=True))
        db.add(profile)
    # If it does exist, update it
    else:
        if data.bio is not None: profile.bio = data.bio
        if data.portfolio_url is not None: profile.portfolio_url = data.portfolio_url
        if data.avatar_url is not None: profile.avatar_url = data.avatar_url
        
    db.commit()
    db.refresh(profile)
    return profile