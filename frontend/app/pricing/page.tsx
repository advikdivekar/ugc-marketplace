import { Check, X } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 sm:px-12 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Simple, Transparent Pricing</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        No hidden fees. We only win when your brand wins.
                        Compare our model against traditional agencies and direct sourcing.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Direct Writers */}
                    <div className="glass-card p-8 rounded-[2rem] border border-white/5 space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-gray-300 uppercase tracking-widest">Direct Writers</h3>
                            <div className="text-3xl items-baseline flex gap-1 font-bold">
                                Varies
                                <span className="text-sm font-normal text-gray-400 lowercase">per script</span>
                            </div>
                        </div>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex gap-3 items-start"><X className="text-red-400 shrink-0 w-5 h-5" /> Quality varies wildly</li>
                            <li className="flex gap-3 items-start"><X className="text-red-400 shrink-0 w-5 h-5" /> Endless back-and-forth</li>
                            <li className="flex gap-3 items-start"><X className="text-red-400 shrink-0 w-5 h-5" /> No escrow protection</li>
                            <li className="flex gap-3 items-start"><Check className="text-green-400 shrink-0 w-5 h-5" /> Can be cheap</li>
                        </ul>
                    </div>

                    {/* Clario (Recommended) */}
                    <div className="relative glass-card p-8 rounded-[2rem] border border-purple-500/50 bg-purple-500/5 space-y-6 transform md:-translate-y-4 shadow-2xl shadow-purple-500/10">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                            The Clario Way
                        </div>
                        <div className="space-y-2 text-center pt-2">
                            <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Pay Per Approved Script</h3>
                            <div className="text-4xl items-baseline justify-center flex gap-1 font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                Set your budget
                            </div>
                        </div>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex gap-3 items-start"><Check className="text-green-400 shrink-0 w-5 h-5" /> Hundreds of pitches</li>
                            <li className="flex gap-3 items-start"><Check className="text-green-400 shrink-0 w-5 h-5" /> Top 1% vetted talent</li>
                            <li className="flex gap-3 items-start"><Check className="text-green-400 shrink-0 w-5 h-5" /> Secure milestone escrow</li>
                            <li className="flex gap-3 items-start"><Check className="text-green-400 shrink-0 w-5 h-5" /> AI-powered trend analysis</li>
                        </ul>
                        <div className="pt-4">
                            <Link href="/briefs/new" className="btn-premium w-full !py-4 block text-center">
                                Start a Campaign
                            </Link>
                        </div>
                    </div>

                    {/* Agencies */}
                    <div className="glass-card p-8 rounded-[2rem] border border-white/5 space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-gray-300 uppercase tracking-widest">Traditional Agency</h3>
                            <div className="text-3xl items-baseline flex gap-1 font-bold">
                                ₹50k+
                                <span className="text-sm font-normal text-gray-400 lowercase">retainer</span>
                            </div>
                        </div>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex gap-3 items-start"><X className="text-red-400 shrink-0 w-5 h-5" /> High upfront costs</li>
                            <li className="flex gap-3 items-start"><X className="text-red-400 shrink-0 w-5 h-5" /> Slow turnaround times</li>
                            <li className="flex gap-3 items-start"><Check className="text-green-400 shrink-0 w-5 h-5" /> Managed service</li>
                            <li className="flex gap-3 items-start"><Check className="text-green-400 shrink-0 w-5 h-5" /> Predictable volume</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-bold mb-4">Want full access to the AI Tools?</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">Get access to AI Trend Analysis, Competitor Blueprints, and automated script suggestions with Clario Pro.</p>
                    <Link href="/subscribe" className="text-purple-400 hover:text-purple-300 font-bold uppercase tracking-widest border border-purple-500/30 px-6 py-3 rounded-full hover:bg-purple-500/10 transition">
                        View Pro Subscription
                    </Link>
                </div>
            </div>
        </div>
    );
}
