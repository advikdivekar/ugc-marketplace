from pydantic import BaseModel
from typing import List, Any

class EarningStats(BaseModel):
    total_earned: float
    pending_balance: float
    completed_jobs: int

class EarningsResponse(BaseModel):
    stats: EarningStats
    transactions: List[Any] # We use Any here to easily pass Supabase's joined JSON data