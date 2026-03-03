from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from lib.database import get_db
from models.brief import Brief
from schemas.brief import BriefCreate, BriefResponse, BriefStatusUpdate
from dependencies.auth import get_brand_user, get_current_user

router = APIRouter(prefix="/briefs", tags=["Briefs"])

@router.post("", response_model=BriefResponse, status_code=status.HTTP_201_CREATED)
async def create_brief(data: BriefCreate, current_user: dict = Depends(get_brand_user), db: Session = Depends(get_db)):
    """A brand creates a new job posting"""
    
    new_brief = Brief(
        brand_id=current_user["user_id"],
        product_name=data.product_name,
        product_url=str(data.product_url) if data.product_url else None,
        brief_description=data.brief_description,
        target_audience=data.target_audience,
        creative_direction=data.creative_direction,
        script_format=data.script_format,
        industry=data.industry,
        budget=data.budget,
    )
    
    db.add(new_brief)
    db.commit()
    db.refresh(new_brief)
    return new_brief

@router.get("", response_model=List[BriefResponse])
async def get_all_briefs(brand_id: Optional[str] = None, db: Session = Depends(get_db)):
    """List briefs. Optionally filter by brand_id."""
    query = db.query(Brief)
    if brand_id:
        query = query.filter(Brief.brand_id == brand_id)
    briefs = query.all()
    return briefs

@router.get("/{brief_id}", response_model=BriefResponse)
async def get_brief(brief_id: str, db: Session = Depends(get_db)):
    """Get a single brief by ID"""
    brief = db.query(Brief).filter(Brief.id == brief_id).first()
    if not brief:
        raise HTTPException(status_code=404, detail="Brief not found")
    return brief

@router.patch("/{brief_id}", response_model=BriefResponse)
async def update_brief_status(brief_id: str, data: BriefStatusUpdate, current_user: dict = Depends(get_brand_user), db: Session = Depends(get_db)):
    """Update a brief's status (close, fund, etc.)"""
    brief = db.query(Brief).filter(Brief.id == brief_id).first()
    if not brief:
        raise HTTPException(status_code=404, detail="Brief not found")
    if brief.brand_id != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not your brief")
    brief.status = data.status
    db.commit()
    db.refresh(brief)
    return brief