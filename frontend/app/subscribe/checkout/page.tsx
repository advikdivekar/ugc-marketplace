export default function SubscribeCheckoutPage() {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-20 px-6">
            <div className="glass-card p-8 rounded-[2rem] max-w-md w-full text-center space-y-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/50">
                    <span className="text-purple-400 font-black text-2xl">PRO</span>
                </div>
                <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Complete Subscription</h1>
                <p className="text-gray-400 text-sm">
                    You are subscribing to Clario Brand Pro for ₹19,999/month.
                </p>
                <div className="p-4 bg-black/50 border border-white/5 rounded-xl space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Plan</span>
                        <span className="text-white">Brand Pro (Monthly)</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Due Today</span>
                        <span className="text-white font-bold">₹19,999</span>
                    </div>
                </div>
                <button className="btn-premium w-full !py-4" onClick={() => alert('Razorpay Recurring Checkout Modal Here')}>
                    Pay securely with Razorpay
                </button>
            </div>
        </div>
    );
}
