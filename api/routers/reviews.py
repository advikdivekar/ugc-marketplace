from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from lib.supabase import supabase
from schemas.review import ReviewCreate, ReviewResponse
from dependencies.auth import get_brand_user

router = APIRouter(prefix="/reviews", tags=["Reviews"])

@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
async def create_review(data: ReviewCreate, current_user: dict = Depends(get_brand_user)):
    # Package the review data
    insert_data = data.model_dump()
    insert_data["brand_id"] = current_user["user_id"]

    # Insert into Supabase
    res = supabase.table("reviews").insert(insert_data).execute()
    
    if not res.data:
        raise HTTPException(status_code=400, detail="Failed to post review. Check if writer_id is correct.")
        
    return res.data[0]

@router.get("/writer/{writer_id}", response_model=List[ReviewResponse])
async def get_writer_reviews(writer_id: str):
    # Fetch all reviews for a specific writer to display on their public profile
    res = supabase.table("reviews").select("*").eq("writer_id", writer_id).execute()
    return res.datafrom fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from lib.database import get_db
from models.review import Review
from schemas.review import ReviewCreate, ReviewResponse
from dependencies.auth import get_brand_user

router = APIRouter(prefix="/reviews", tags=["Reviews"])

@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
async def create_review(data: ReviewCreate, current_user: dict = Depends(get_brand_user), db: Session = Depends(get_db)):
    """A Brand leaves a review for a Writer after a completed job"""
    new_review = Review(
        brand_id=current_user["user_id"],
        writer_id=data.writer_id,
        rating=data.rating,
        comment=data.comment
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review

@router.get("/writer/{writer_id}", response_model=List[ReviewResponse])
async def get_writer_reviews(writer_id: str, db: Session = Depends(get_db)):
    """Fetch all reviews for a specific writer to display on their public profile"""
    reviews = db.query(Review).filter(Review.writer_id == writer_id).all()
    return reviews