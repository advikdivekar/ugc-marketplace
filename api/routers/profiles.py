from fastapi import APIRouter, HTTPException, Depends, status
from lib.supabase import supabase
from schemas.profile import ProfileUpdate, ProfileResponse
from dependencies.auth import get_current_user

router = APIRouter(prefix="/profiles", tags=["Profiles"])

@router.get("/{user_id}", response_model=ProfileResponse)
async def get_profile(user_id: str):
    # Fetch profile by ID. This is public data so no auth dependency is required.
    response = supabase.table("profiles").select("*").eq("id", user_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Profile not found")
        
    return response.data[0]

@router.patch("/{user_id}", response_model=ProfileResponse)
async def update_profile(
    user_id: str, 
    data: ProfileUpdate, 
    current_user: dict = Depends(get_current_user) # Requires a valid JWT
):
    # Enforce ownership: Users can only update their own profiles
    if current_user["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this profile")
    
    # Drop None values so we only update the specific fields provided by the frontend
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No valid fields to update")

    response = supabase.table("profiles").update(update_data).eq("id", user_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Profile not found or update failed")
        
    return response.data[0]