import os
from dotenv import load_dotenv

# 1. LOAD THE .ENV FILE FIRST!
load_dotenv()

# 2. NOW import the rest of the app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import *
from lib.database import engine, Base

# Import all our feature routers
from routers import auth  #profiles, briefs, submissions, payments, earning, review

# This line tells SQLAlchemy: "Look at all the models I just imported, 
# and create the actual tables in my Neon database."
Base.metadata.create_all(bind=engine)

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

#app.include_router(profiles.router, prefix="")
#app.include_router(briefs.router, prefix="")
#app.include_router(submissions.router, prefix="")
#app.include_router(payments.router, prefix="")
#app.include_router(earnings.router, prefix="")
#app.include_router(reviews.router, prefix="")

@app.get("/health", tags=["System"])
async def health():
    return {"status": "ok"}