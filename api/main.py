import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Import all our feature routers
from routers import auth, profiles, briefs, submissions

load_dotenv()

app = FastAPI(
    title="UGC Script Marketplace API",
    version="1.0.0"
)

# CORS configuration for Dev 1's frontend
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

# Connect all routes to the main application
app.include_router(auth.router, prefix="")
app.include_router(profiles.router, prefix="")
app.include_router(briefs.router, prefix="")
app.include_router(submissions.router, prefix="")

@app.get("/health", tags=["System"])
async def health():
    return {"status": "ok"}