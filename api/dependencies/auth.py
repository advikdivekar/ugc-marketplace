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
            raise HTTPException(status_code=401, detail="Invalid token signature")

        # Verify the token mathematically
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=["RS256"],
            options={"verify_aud": False} 
        )
        return payload
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

async def get_current_user(payload: dict = Depends(verify_token)):
    # Clerk stores the unique user ID in the 'sub' (subject) claim of the token
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID not found in token")
    
    return {"user_id": user_id}

# We will temporarily just pass the user through here. 
# Once our database is wired up in the next step, we will add the role checks back!
async def get_brand_user(user: dict = Depends(get_current_user)):
    return user

async def get_writer_user(user: dict = Depends(get_current_user)):
    return user