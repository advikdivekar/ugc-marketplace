import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routers import auth, profiles, briefs

load_dotenv()

app = FastAPI(
    title="UGC Script Marketplace API",
    version="1.0.0"
)

# Set up CORS so Dev 1's local Next.js frontend can talk to this API without security blocks
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

# Attach our specific feature routers to the main application
app.include_router(auth.router, prefix="", tags=["Auth"])
app.include_router(profiles.router, prefix="", tags=["Profiles"])
app.include_router(briefs.router, prefix="", tags=["Briefs"])

# A simple endpoint for deployment platforms (like Render) to verify the server is running
@app.get("/health", tags=["System"])
async def health():
    return {"status": "ok"}