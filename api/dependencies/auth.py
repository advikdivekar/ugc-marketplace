import os
import urllib.request
import json
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt

security = HTTPBearer()
CLERK_SECRET_KEY = os.environ.get("CLERK_SECRET_KEY")

def get_clerk_jwks():
    """Fetches Clerk's public keys to verify our tokens"""
    req = urllib.request.Request("https://api.clerk.com/v1/jwks")
    req.add_header("Authorization", f"Bearer {CLERK_SECRET_KEY}")
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except Exception:
        raise HTTPException(status_code=500, detail="Could not connect to Clerk security servers")

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        # Decode the token header to find which key signed it
        unverified_header = jwt.get_unverified_header(token)
        print(f"DEBUG: Token Header: {unverified_header}")
        
        jwks = get_clerk_jwks()
        
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
                break
                
        if not rsa_key:
            print("DEBUG: No matching RSA key found in JWKS")
            raise HTTPException(status_code=401, detail="Invalid token signature")

        # Verify the token mathematically
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=["RS256"],
            options={"verify_aud": False} 
        )
        print(f"DEBUG: Token Payload: {payload}")
        return payload
        
    except jwt.ExpiredSignatureError:
        print("DEBUG: Token Expired")
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError as e:
        print(f"DEBUG: JWT Error: {str(e)}")
        raise HTTPException(status_code=401, detail=f"Invalid authentication credentials: {str(e)}")
    except Exception as e:
        print(f"DEBUG: Unexpected Auth Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during authentication")

from lib.database import get_db
from models.user import User, UserRole
from sqlalchemy.orm import Session

async def get_current_user(payload: dict = Depends(verify_token), db: Session = Depends(get_db)):
    # Clerk stores the unique user ID in the 'sub' (subject) claim of the token
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID not found in token")
    
    # Check if user exists in database
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        # In this app, users are created during onboarding. 
        # If not found, they need to complete onboarding.
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Profile not finalized. Please complete onboarding.")
    
    return db_user

async def get_brand_user(user: User = Depends(get_current_user)):
    if user.role != UserRole.brand:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Access denied. This action requires a Brand account."
        )
    return {"user_id": user.id, "email": user.email, "role": user.role}

async def get_writer_user(user: User = Depends(get_current_user)):
    if user.role != UserRole.writer:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Access denied. This action requires a Writer account."
        )
    return {"user_id": user.id, "email": user.email, "role": user.role}