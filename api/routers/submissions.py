from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from lib.supabase import supabase
from schemas.submission import SubmissionCreate, SubmissionResponse
from dependencies.auth import get_writer_user

router = APIRouter(prefix="/submissions", tags=["Submissions"])

@router.post("", response_model=SubmissionResponse, status_code=status.HTTP_201_CREATED)
async def create_submission(data: SubmissionCreate, current_user: dict = Depends(get_writer_user)):
    # Prepare data for Supabase
    insert_data = data.model_dump()
    insert_data["video_url"] = str(insert_data["video_url"])
    insert_data["writer_id"] = current_user["user_id"]
    insert_data["status"] = "pending"

    # Insert into the submissions table
    response = supabase.table("submissions").insert(insert_data).execute()
    
    if not response.data:
        raise HTTPException(status_code=400, detail="Submission failed. Check if the brief_id is correct.")
        
    return response.data[0]

@router.get("/my-submissions", response_model=List[SubmissionResponse])
async def get_my_submissions(current_user: dict = Depends(get_writer_user)):
    # Let writers see the status of all their applications
    response = supabase.table("submissions").select("*").eq("writer_id", current_user["user_id"]).execute()
    return response.data