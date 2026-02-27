from pydantic import BaseModel
from typing import Optional

class OrderCreate(BaseModel):
    submission_id: str
    amount: int # Razorpay expects amount in paise (e.g., 500.00 INR = 50000 paise)

class OrderResponse(BaseModel):
    order_id: str
    amount: int
    currency: str

class PaymentVerification(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    submission_id: str