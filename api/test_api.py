import requests

BASE_URL = "http://127.0.0.1:8000"

def run_tests():
    print("\n🚀 STARTING ECOM_PROJECT API DIAGNOSTICS...\n")

    # --- 1. PUBLIC ENDPOINTS (Expecting 200 OK) ---
    print("🟢 TESTING PUBLIC ROUTES (Should return 200 OK)")
    
    # Health Check
    try:
        res = requests.get(f"{BASE_URL}/health")
        print(f"   [GET /health] Status: {res.status_code} -> {res.json()}")
    except Exception as e:
         print(f"   [GET /health] ❌ FAILED TO CONNECT: {e}")

    # Get Open Jobs (Briefs)
    try:
        res = requests.get(f"{BASE_URL}/briefs")
        print(f"   [GET /briefs] Status: {res.status_code} -> Jobs Found: {len(res.json())}")
    except Exception as e:
         print(f"   [GET /briefs] ❌ FAILED TO CONNECT: {e}")


    # --- 2. PROTECTED ENDPOINTS (Expecting 401/403 Unauthorized) ---
    print("\n🔒 TESTING SECURE ROUTES (Should be blocked by Clerk - 401/403)")

    # Test Auth Sync
    try:
        res = requests.post(f"{BASE_URL}/auth/sync", json={
            "email": "hacker@test.com", "role": "brand", "display_name": "Hacker"
        })
        print(f"   [POST /auth/sync] Status: {res.status_code} -> Security Working: {res.status_code in [401, 403]}")
    except Exception as e:
         print(f"   [POST /auth/sync] ❌ Error: {e}")

    # Test Posting a Job without logging in
    try:
        res = requests.post(f"{BASE_URL}/briefs", json={
            "title": "Fake Job", "content": "Fake content", "budget": 1000
        })
        print(f"   [POST /briefs]    Status: {res.status_code} -> Security Working: {res.status_code in [401, 403]}")
    except Exception as e:
         print(f"   [POST /briefs]    ❌ Error: {e}")
         
    print("\n✅ DIAGNOSTICS COMPLETE!\n")

if __name__ == "__main__":
    run_tests()