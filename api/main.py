# api/main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

# Initialize the FastAPI application
app = FastAPI(
    title="UGC Script Marketplace API",
    version="1.0.0"
)

# Configure CORS to allow Dev 1's local frontend to communicate with the API
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

# Base health check endpoint for DevOps (Dev 3 / Render)
@app.get("/health", tags=["System"])
async def health():
    return {"status": "ok"}