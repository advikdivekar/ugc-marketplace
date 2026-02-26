from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Optional
from lib.supabase import supabase
from schemas.brief import BriefCreate, BriefResponse, BriefStatusUpdate
from dependencies.auth import get_brand_user

router = APIRouter(prefix="/briefs", tags=["Briefs"])

@router.post("", response_model=BriefResponse, status_code=status.HTTP_201_CREATED)
async def create_brief(data: BriefCreate, current_user: dict = Depends(get_brand_user)):
    # Convert Pydantic model to dictionary and format the date/URL to strings
    insert_data = data.model_dump()
    insert_data["deadline"] = str(insert_data["deadline"])
    insert_data["product_url"] = str(insert_data["product_url"])
    
    # Attach the brand_id strictly from the verified JWT token
    insert_data["brand_id"] = current_user["user_id"]
    insert_data["status"] = "open"

    response = supabase.table("briefs").insert(insert_data).execute()
    
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create brief")
        
    return response.data[0]

@router.get("", response_model=List[BriefResponse])
async def list_open_briefs(
    category: Optional[str] = None, 
    min_budget: Optional[float] = None
):
    # Base query: Only show open briefs to writers
    query = supabase.table("briefs").select("*, profiles!inner(display_name)").eq("status", "open")
    
    # Apply optional filters if Dev 1 sends them
    if category:
        query = query.eq("category", category)
    if min_budget:
        query = query.gte("budget", min_budget)
        
    response = query.order("created_at", desc=True).execute()
    
    # Format the nested profile data to flat brand_name for the frontend
    formatted_data = []
    for row in response.data:
        row["brand_name"] = row.get("profiles", {}).get("display_name")
        formatted_data.append(row)
        
    return formatted_data

@router.get("/{brief_id}", response_model=BriefResponse)
async def get_single_brief(brief_id: str):
    response = supabase.table("briefs").select("*, profiles!inner(display_name)").eq("id", brief_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Brief not found")
        
    brief_data = response.data[0]
    brief_data["brand_name"] = brief_data.get("profiles", {}).get("display_name")
    
    return brief_data

@router.patch("/{brief_id}/status", response_model=BriefResponse)
async def update_brief_status(
    brief_id: str, 
    data: BriefStatusUpdate, 
    current_user: dict = Depends(get_brand_user)
):
    # Ownership guard: Ensure the brand updating the brief actually owns it
    verify = supabase.table("briefs").select("brand_id").eq("id", brief_id).execute()
    
    if not verify.data or verify.data[0]["brand_id"] != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to modify this brief")
        
    response = supabase.table("briefs").update({"status": data.status}).eq("id", brief_id).execute()
    return response.data[0]