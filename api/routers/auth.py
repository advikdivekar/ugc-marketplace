from fastapi import APIRouter, HTTPException, status
from lib.supabase import supabase
from schemas.auth import RegisterRequest, AuthRequest, AuthResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register_user(data: RegisterRequest):
    try:
        # Register the user in Supabase Auth securely
        auth_response = supabase.auth.sign_up({
            "email": data.email,
            "password": data.password
        })
        
        user_id = auth_response.user.id
        
        # Create the corresponding public profile record linked to the Auth ID
        supabase.table("profiles").insert({
            "id": user_id,
            "role": data.role,
            "display_name": data.display_name
        }).execute()

        # Return the auth payload including the JWT token
        return AuthResponse(
            user_id=user_id,
            role=data.role,
            access_token=auth_response.session.access_token
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=str(e)
        )

@router.post("/login", response_model=AuthResponse, status_code=status.HTTP_200_OK)
async def login_user(data: AuthRequest):
    try:
        # Authenticate credentials via Supabase
        auth_response = supabase.auth.sign_in_with_password({
            "email": data.email,
            "password": data.password
        })
        
        user_id = auth_response.user.id
        
        # Fetch the user's role to inform frontend routing (Brand vs Writer dashboard)
        profile_response = supabase.table("profiles").select("role").eq("id", user_id).execute()
        
        if not profile_response.data:
            raise HTTPException(status_code=404, detail="Profile not found")
            
        user_role = profile_response.data[0]["role"]

        return AuthResponse(
            user_id=user_id,
            role=user_role,
            access_token=auth_response.session.access_token
        )
        
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid email or password"
        )