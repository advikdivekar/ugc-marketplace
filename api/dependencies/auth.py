import os
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

JWT_SECRET = os.environ.get("SUPABASE_JWT_SECRET")
ALGORITHM = "HS256"

security = HTTPBearer()

# Verifies the JWT token and extracts the user ID and role
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(
            token, 
            JWT_SECRET, 
            algorithms=[ALGORITHM], 
            audience="authenticated"
        )
        
        user_id: str = payload.get("sub")
        role: str = payload.get("user_metadata", {}).get("role")
        
        if not user_id or not role:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Invalid token payload"
            )
            
        return {"user_id": user_id, "role": role}
        
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Token invalid or expired"
        )

# Blocks access if the user is not a Brand
def get_brand_user(user=Depends(get_current_user)):
    if user["role"] != "brand":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Access denied: Brands only"
        )
    return user

# Blocks access if the user is not a Writer
def get_writer_user(user=Depends(get_current_user)):
    if user["role"] != "writer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Access denied: Writers only"
        )
    return user