import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SubscribePage() {
    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 sm:px-12">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Upgrade to Clario Pro</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Unlock predictive AI scoring, automated script generation, and priority talent matching.
                    </p>
                </div>

                <div className="glass-card max-w-lg mx-auto p-8 rounded-[2rem] border border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-transparent">
                    <div className="flex justify-between items-end mb-6">
                        <div className="text-left">
                            <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Brand Pro</h2>
                            <p className="text-purple-400 font-medium mt-1">Billed Monthly</p>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-black text-white">₹19,999</div>
                            <p className="text-gray-500 text-sm">/ month</p>
                        </div>
                    </div>

                    <ul className="space-y-4 text-left text-sm text-gray-300 mb-8">
                        <li className="flex gap-3 items-center"><Check className="text-purple-400 w-5 h-5 flex-shrink-0" /> AI Trend & ROI Analysis Tool</li>
                        <li className="flex gap-3 items-center"><Check className="text-purple-400 w-5 h-5 flex-shrink-0" /> Generative Script Copilot</li>
                        <li className="flex gap-3 items-center"><Check className="text-purple-400 w-5 h-5 flex-shrink-0" /> Direct-hire Top 1% Creators</li>
                        <li className="flex gap-3 items-center"><Check className="text-purple-400 w-5 h-5 flex-shrink-0" /> Priority marketplace listing</li>
                        <li className="flex gap-3 items-center"><Check className="text-purple-400 w-5 h-5 flex-shrink-0" /> Dedicated Account Manager</li>
                    </ul>

                    <Link href="/subscribe/checkout" className="btn-premium w-full !py-4 flex justify-between items-center group">
                        Start your Pro Trial
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-center text-xs text-gray-500 mt-4">Cancel anytime. 7-day money-back guarantee.</p>
                </div>
            </div>
        </div>
    );
}
