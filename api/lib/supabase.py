import os
from supabase import create_client, Client, ClientOptions
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise ValueError("Missing Supabase credentials in .env file.")

# Force a longer timeout (30 seconds) to prevent premature drop-offs
opts = ClientOptions(postgrest_client_timeout=30)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY, options=opts)