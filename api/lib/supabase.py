import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# The string inside get() must exactly match the variable name in your .env file
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise ValueError("Missing Supabase credentials in .env file.")

# Initialize the client with the verified keys
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)