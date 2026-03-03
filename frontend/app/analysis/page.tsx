import { BarChart3, TrendingUp, Sparkles, Brain, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AnalysisPage() {
    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 sm:px-12">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-bold uppercase tracking-widest mb-4">
                        <Sparkles size={16} /> Clario Pro Exclusive
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">AI Trend & ROI Analysis</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Predict script success before you spend a dime. Our models analyze thousands of top-performing UGC videos to score your concepts.
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 md:p-12">
                    {/* Locked Overlay */}
                    <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                        <div className="h-20 w-20 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
                            <Lock className="text-purple-400 w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Unlock Predictive Analytics</h2>
                        <p className="text-gray-300 max-w-md mb-8">
                            Subscribe to Clario Pro to access the industry's most advanced UGC script analysis tool.
                        </p>
                        <Link href="/subscribe" className="btn-premium px-12 !py-4 text-sm">
                            Upgrade to Pro
                        </Link>
                    </div>

                    {/* Dummy Content Behind Lock */}
                    <div className="opacity-30 pointer-events-none select-none filter blur-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Industry</label>
                                    <select className="input-field" disabled>
                                        <option>Skincare</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Script Content</label>
                                    <textarea className="input-field min-h-[200px]" disabled value="Hey guys, I've been struggling with dry skin all winter until I found..." />
                                </div>
                                <button className="w-full btn-dark py-4" disabled>Analyze Script</button>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        { title: 'Predicted Hook Retention', value: '78%', icon: <Brain size={16} /> },
                                        { title: 'Est. Conversion', value: '4.2%', icon: <TrendingUp size={16} /> },
                                        { title: 'Trend Match', value: 'High', icon: <Sparkles size={16} /> },
                                        { title: 'ROI Score', value: 'A-', icon: <BarChart3 size={16} /> },
                                    ].map((stat, i) => (
                                        <div key={i} className="glass-card p-4 space-y-2">
                                            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
                                                {stat.icon} {stat.title}
                                            </div>
                                            <div className="text-2xl font-black text-white">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="glass-card h-64 flex items-center justify-center">
                                    <span className="text-gray-600 font-bold uppercase">Chart Area Placeholder</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
