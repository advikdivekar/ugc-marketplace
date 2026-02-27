from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from lib.supabase import supabase
from schemas.submission import SubmissionCreate, SubmissionResponse, SubmissionStatusUpdate
from dependencies.auth import get_writer_user, get_brand_user

router = APIRouter(prefix="/submissions", tags=["Submissions"])

@router.post("", response_model=SubmissionResponse, status_code=status.HTTP_201_CREATED)
async def create_submission(data: SubmissionCreate, current_user: dict = Depends(get_writer_user)):
    insert_data = data.model_dump()
    insert_data["video_url"] = str(insert_data["video_url"])
    insert_data["writer_id"] = current_user["user_id"]
    insert_data["status"] = "pending"

    response = supabase.table("submissions").insert(insert_data).execute()
    
    if not response.data:
        raise HTTPException(status_code=400, detail="Submission failed. Check if brief_id is correct.")
        
    return response.data[0]

@router.get("/my-submissions", response_model=List[SubmissionResponse])
async def get_my_submissions(current_user: dict = Depends(get_writer_user)):
    response = supabase.table("submissions").select("*").eq("writer_id", current_user["user_id"]).execute()
    return response.data

@router.patch("/{submission_id}/status", response_model=SubmissionResponse)
async def update_submission_status(
    submission_id: str,
    data: SubmissionStatusUpdate,
    current_user: dict = Depends(get_brand_user)
):
    # 1. Find the submission
    sub_res = supabase.table("submissions").select("*").eq("id", submission_id).execute()
    if not sub_res.data:
        raise HTTPException(status_code=404, detail="Submission not found")
        
    submission = sub_res.data[0]
    
    # 2. Verify the brand actually owns the brief this submission belongs to
    brief_res = supabase.table("briefs").select("brand_id").eq("id", submission["brief_id"]).execute()
    if not brief_res.data or brief_res.data[0]["brand_id"] != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized. You do not own this brief.")
        
    # 3. Update the status
    update_res = supabase.table("submissions").update({"status": data.status}).eq("id", submission_id).execute()
    
    return update_res.data[0]