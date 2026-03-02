import razorpay
import os
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from lib.database import get_db
from models.submission import Submission, SubmissionStatus
from dependencies.auth import get_brand_user

router = APIRouter(prefix="/payments", tags=["Payments"])

# Initialize the official Razorpay client
razorpay_client = razorpay.Client(
    auth=(os.environ.get("RAZORPAY_KEY_ID"), os.environ.get("RAZORPAY_KEY_SECRET"))
)

class PaymentCreate(BaseModel):
    amount: int # The budget from the Brief

@router.post("/create-order")
async def create_order(data: PaymentCreate, current_user: dict = Depends(get_brand_user)):
    """Generates a secure Razorpay order ID for the frontend checkout box"""
    order_data = {
        "amount": data.amount * 100, # Razorpay expects paise (multiply INR by 100)
        "currency": "INR",
        "payment_capture": 1
    }
    order = razorpay_client.order.create(data=order_data)
    return {"order_id": order["id"], "amount": order["amount"], "currency": order["currency"]}

class PaymentVerify(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    submission_id: str

@router.post("/verify")
async def verify_payment(data: PaymentVerify, current_user: dict = Depends(get_brand_user), db: Session = Depends(get_db)):
    """Verifies the payment mathematically and marks the application as Paid"""
    try:
        # 1. Verify the mathematical signature so people can't fake successful payments
        razorpay_client.utility.verify_payment_signature({
            'razorpay_order_id': data.razorpay_order_id,
            'razorpay_payment_id': data.razorpay_payment_id,
            'razorpay_signature': data.razorpay_signature
        })
        
        # 2. Update the submission status in our Neon database
        submission = db.query(Submission).filter(Submission.id == data.submission_id).first()
        if not submission:
            raise HTTPException(status_code=404, detail="Submission not found")
            
        submission.status = SubmissionStatus.paid
        db.commit()
        
        return {"message": "Payment successful! The writer has been paid."}
        
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Payment verification failed. Invalid signature.")