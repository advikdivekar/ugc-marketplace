from fastapi import APIRouter, Depends
from lib.supabase import supabase
from schemas.earning import EarningsResponse, EarningStats
from dependencies.auth import get_writer_user

router = APIRouter(prefix="/earnings", tags=["Earnings"])

@router.get("/my-dashboard", response_model=EarningsResponse)
async def get_my_earnings(current_user: dict = Depends(get_writer_user)):
    # The magic query: Fetch the submission AND the attached brief's title and budget
    res = supabase.table("submissions").select(
        "id, status, created_at, briefs(title, budget)"
    ).eq("writer_id", current_user["user_id"]).execute()

    submissions = res.data
    
    total_earned = 0.0
    pending_balance = 0.0
    completed_jobs = 0
    transactions = []

    for sub in submissions:
        # Extract the budget from the joined brief data safely
        brief_data = sub.get("briefs")
        budget = brief_data.get("budget", 0.0) if brief_data else 0.0
        
        # Calculate the writer's wallet balances based on status
        if sub["status"] == "paid":
            total_earned += budget
            completed_jobs += 1
        elif sub["status"] == "accepted":
            # Accepted but not yet paid through Razorpay
            pending_balance += budget 
            
        # Only show accepted or paid jobs in the financial history
        if sub["status"] in ["accepted", "paid"]:
            transactions.append({
                "submission_id": sub["id"],
                "brief_title": brief_data.get("title", "Unknown Brief") if brief_data else "Unknown Brief",
                "amount": budget,
                "status": sub["status"],
                "date": sub["created_at"]
            })

    # Package it perfectly for Dev 1's frontend dashboard
    stats = EarningStats(
        total_earned=total_earned,
        pending_balance=pending_balance,
        completed_jobs=completed_jobs
    )

    return EarningsResponse(stats=stats, transactions=transactions)