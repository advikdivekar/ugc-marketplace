from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from lib.database import get_db
from models.submission import Submission, SubmissionStatus
from schemas.submission import SubmissionCreate, SubmissionResponse
from dependencies.auth import get_writer_user

router = APIRouter(prefix="/submissions", tags=["Submissions"])

@router.post("", response_model=SubmissionResponse, status_code=status.HTTP_201_CREATED)
async def create_submission(data: SubmissionCreate, current_user: dict = Depends(get_writer_user), db: Session = Depends(get_db)):
    """A Writer submits an application to a Brand's Brief"""
    new_submission = Submission(
        brief_id=data.brief_id,
        writer_id=current_user["user_id"],
        video_url=data.video_url,
        pitch=data.pitch,
        status=SubmissionStatus.pending
    )
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    return new_submission

@router.get("/brief/{brief_id}", response_model=List[SubmissionResponse])
async def get_brief_submissions(brief_id: str, db: Session = Depends(get_db)):
    """A Brand views all applications for their specific job"""
    submissions = db.query(Submission).filter(Submission.brief_id == brief_id).all()
    return submissions