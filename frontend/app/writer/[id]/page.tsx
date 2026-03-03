import { Star, Play, MapPin, Briefcase, Mail } from 'lucide-react';

// This is a dynamic route matching `/writer/[id]` representing a public writer portfolio
export default function PublicWriterProfile({ params }: { params: { id: string } }) {
    // In a real app, you would fetch profile details based on `params.id` here

    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 sm:px-12">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="glass-card p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                        <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full p-1">
                            <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden relative">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" alt="Avatar" className="w-full h-full object-cover opacity-80" />
                            </div>
                        </div>

                        <div className="text-center md:text-left flex-1 space-y-4">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Sarah Jenkins</h1>
                                <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mt-2">UGC Skincare Creator</p>
                            </div>

                            <p className="text-gray-400 max-w-2xl leading-relaxed text-sm">
                                Specializing in aesthetic, natural-light unboxing and high-conversion hooks for D2C beauty brands. Over $200k generated in documented ad revenue from my scripts.
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                                <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-full text-sm font-bold border border-yellow-500/20">
                                    <Star fill="currentColor" size={14} /> 4.9 (42)
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-400 bg-white/5 px-3 py-1.5 rounded-full text-sm font-bold border border-white/10">
                                    <MapPin size={14} /> Los Angeles, CA
                                </div>
                                <div className="flex items-center gap-1.5 text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full text-sm font-bold border border-green-500/20">
                                    <Briefcase size={14} /> 5 Active Campaigns
                                </div>
                            </div>
                        </div>

                        <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0">
                            <button className="btn-premium w-full !py-4 px-8 text-sm">
                                Propose Concept
                            </button>
                            <button className="btn-dark w-full !py-4 px-8 text-sm flex items-center justify-center gap-2">
                                <Mail size={16} /> Contact
                            </button>
                        </div>
                    </div>
                </div>

                {/* Portfolio Showcase */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold uppercase tracking-widest text-white">Top Performing Scripts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="glass-card group rounded-[2rem] overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all duration-300">
                                <div className="aspect-[9/16] bg-[#0a0a0a] relative group flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-20 group-hover:scale-110 transition-transform">
                                        <Play className="text-white ml-1 w-8 h-8 filter drop-shadow-lg" />
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 z-20">
                                        <p className="text-sm font-bold text-white shadow-black drop-shadow-md">Glow Recipe Watermelon Toner</p>
                                        <p className="text-xs text-green-400 font-bold mt-1">ROI: 320%</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reviews */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold uppercase tracking-widest text-white">Brand Reviews</h2>
                    <div className="space-y-4">
                        {[1, 2].map(review => (
                            <div key={review} className="glass-card p-6 rounded-2xl border border-white/5 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20" />
                                        <div>
                                            <p className="text-sm font-bold text-white">Lumina Skincare</p>
                                            <p className="text-xs text-gray-400">Oct 12, 2023</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-yellow-500 gap-0.5">
                                        <Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} />
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm pl-13">"Sarah absolutely nailed the creative direction. The hook was exactly what we needed for our top-of-funnel TikTok ads."</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
