from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from lib.database import get_db
from models.submission import Submission, SubmissionStatus
from models.brief import Brief
from dependencies.auth import get_writer_user

router = APIRouter(prefix="/earnings", tags=["Earnings"])

@router.get("")
async def get_writer_earnings(current_user: dict = Depends(get_writer_user), db: Session = Depends(get_db)):
    """Calculates the total amount of money a Writer has successfully earned"""
    writer_id = current_user["user_id"]
    
    # SQL Magic: Join the Submissions and Briefs tables together, 
    # find only the 'paid' ones for this writer, and sum up the budget!
    total = db.query(func.sum(Brief.budget)).select_from(Submission).join(
        Brief, Submission.brief_id == Brief.id
    ).filter(
        Submission.writer_id == writer_id,
        Submission.status == SubmissionStatus.paid
    ).scalar()
    
    return {
        "writer_id": writer_id,
        "total_earnings_inr": total or 0 # Return 0 if they haven't made anything yet
    }