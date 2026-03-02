from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List

from lib.database import get_db
from models.brief import Brief
from schemas.brief import BriefCreate, BriefResponse
from dependencies.auth import get_brand_user

router = APIRouter(prefix="/briefs", tags=["Briefs"])

@router.post("", response_model=BriefResponse, status_code=status.HTTP_201_CREATED)
async def create_brief(data: BriefCreate, current_user: dict = Depends(get_brand_user), db: Session = Depends(get_db)):
    """A brand creates a new job posting"""
    
    # Unpack the validated data directly into the newly updated database model
    new_brief = Brief(
        brand_id=current_user["user_id"],
        title=data.title,
        description=data.description,
        budget=data.budget,
        product_url=str(data.product_url), # <-- THE FIX: Convert HttpUrl object to a standard string!
        deadline=str(data.deadline), 
        category=data.category
    )
    
    db.add(new_brief)
    db.commit()
    db.refresh(new_brief)
    return new_brief

@router.get("", response_model=List[BriefResponse])
async def get_all_briefs(db: Session = Depends(get_db)):
    """Anyone can view the open job board"""
    briefs = db.query(Brief).all()
    return briefs