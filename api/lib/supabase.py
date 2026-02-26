# api/lib/supabase.py
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

# Fail fast if credentials are missing
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials in .env file.")

# Export a single client instance to be reused across all routers
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)