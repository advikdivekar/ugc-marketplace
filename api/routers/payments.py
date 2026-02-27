import os
import razorpay
from fastapi import APIRouter, HTTPException, Depends, status
from lib.supabase import supabase
from schemas.payment import OrderCreate, OrderResponse, PaymentVerification
from dependencies.auth import get_brand_user

router = APIRouter(prefix="/payments", tags=["Payments"])

# Initialize Razorpay Client
razorpay_client = razorpay.Client(
    auth=(os.environ.get("RAZORPAY_KEY_ID"), os.environ.get("RAZORPAY_KEY_SECRET"))
)

@router.post("/create-order", response_model=OrderResponse)
async def create_order(data: OrderCreate, current_user: dict = Depends(get_brand_user)):
    try:
        # Create an order in Razorpay
        order_data = {
            "amount": data.amount * 100, # Convert INR to paise automatically
            "currency": "INR",
            "receipt": f"receipt_{data.submission_id}",
            "payment_capture": 1 # Auto-capture payment
        }
        order = razorpay_client.order.create(data=order_data)
        
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/verify")
async def verify_payment(data: PaymentVerification, current_user: dict = Depends(get_brand_user)):
    try:
        # Razorpay signature verification
        razorpay_client.utility.verify_payment_signature({
            'razorpay_order_id': data.razorpay_order_id,
            'razorpay_payment_id': data.razorpay_payment_id,
            'razorpay_signature': data.razorpay_signature
        })
        
        # If verification passes, update the submission status to 'paid'
        supabase.table("submissions").update({"status": "paid"}).eq("id", data.submission_id).execute()
        
        return {"status": "success", "message": "Payment verified and secured."}
    
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid payment signature. Potential fraud detected.")