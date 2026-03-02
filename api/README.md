# 🚀 UGC Marketplace API

Welcome to the backend! This API is built with FastAPI, secured by Clerk, and powered by a Serverless Postgres database (Neon). 

## 🛠️ Getting Started (Local Development)

To run this API on your local machine, follow these steps:

1. **Activate the virtual environment:**
   ```bash
   source ../.venv/bin/activate
Install dependencies (if you haven't already):

Bash
pip install -r requirements.txt
Start the server:

Bash
uvicorn main:app --reload
View the Swagger UI (Interactive Docs):
Open your browser and go to: http://127.0.0.1:8000/docs

🔒 Authentication (Clerk)
We are using Clerk for authentication. The backend does not handle passwords. When a user logs in on the frontend, Clerk provides a "Session Token" (a JWT). To access any protected route, the frontend must attach this token to the request headers.

Required Header:

JSON
{
  "Authorization": "Bearer <YOUR_CLERK_SESSION_TOKEN>"
}
Frontend Hint: If using React/Next.js, you can get this token using Clerk's useAuth() hook:

JavaScript
const { getToken } = useAuth();
const token = await getToken();
🛣️ Core Endpoints
1. System Health (Public)

Check if the API is awake and running.

Endpoint: GET /health

Auth Required: No

Returns: {"status": "ok"}

2. Sync User to Database (Protected)

Call this immediately after a user signs up or logs in. It registers their Clerk ID in our Postgres database.

Endpoint: POST /auth/sync

Auth Required: Yes

JSON Body:

JSON
{
  "email": "user@example.com",
  "role": "brand", // Must be "brand" or "writer"
  "display_name": "Acme Corp"
}
Returns: 201 Created or 200 OK (if already exists)

3. Get All Jobs (Public)

Fetches the public job board for Writers to browse.

Endpoint: GET /briefs

Auth Required: No

Returns: Array of Job objects.

4. Post a New Job (Protected - Brands Only)

Allows a Brand to post a new brief.

Endpoint: POST /briefs

Auth Required: Yes

JSON Body Requirements:

JSON
{
  "title": "Need a TikTok Video for Skincare",
  "description": "Looking for a 30s UGC video demonstrating our new moisturizer. Must show face.",
  "product_url": "[https://example.com/skincare](https://example.com/skincare)",
  "deadline": "2026-12-31", // Must be pure date YYYY-MM-DD
  "category": "skincare",   // Must be strictly lowercase from allowed list
  "budget": 5000            // In cents/rupees
}
Returns: 201 Created

🚨 Error Handling
If you send bad data from the frontend, Pydantic will reject it with a 422 Unprocessable Entity. The response will tell you exactly which field failed:

JSON
{
  "detail": [
    {
      "type": "string_too_short",
      "loc": ["body", "description"],
      "msg": "String should have at least 20 characters"
    }
  ]
}
If you forget the Clerk token, or the token is expired, you will get a 401 Unauthorized or 403 Forbidden.


***

Once you've pasted that in and saved it, your API folder is officially a wrapped present! 

