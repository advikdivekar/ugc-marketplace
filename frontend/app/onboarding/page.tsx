"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Briefcase, Sparkles, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { completeOnboarding } from "@/lib/actions/onboarding";
import { apiClient } from "@/lib/api";
import { useUser, useClerk } from "@clerk/nextjs";

export default function OnboardingPage() {
    const [role, setRole] = useState<"brand" | "writer" | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { user } = useUser();
    const { session } = useClerk();

    const handleComplete = async () => {
        if (!role) return;
        setIsLoading(true);
        try {
            const res = await completeOnboarding(role);
            if (res.success) {
                // Sync with our backend database
                const token = await session?.getToken();
                await apiClient('/auth/sync', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: user?.primaryEmailAddress?.emailAddress,
                        role: role,
                        display_name: user?.fullName || user?.firstName || "Anonymous"
                    }),
                    token: token || undefined
                });

                // Refresh the session to ensure the role is in the JWT
                if (session) {
                    await session.reload();
                }

                setIsSuccess(true);

                // Final destination
                const destination = role === "brand" ? "/dashboard/brand" : "/dashboard/writer";

                // Small delay for the success animation to be seen
                setTimeout(() => {
                    window.location.href = destination;
                }, 2000);
            } else {
                alert("Failed to save profile. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 relative overflow-hidden font-outfit">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_70%)]" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-right from-transparent via-white/10 to-transparent" />

            <div className="max-w-5xl w-full relative z-10">
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div className="text-center space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/50 text-xs font-bold uppercase tracking-[0.2em]"
                                >
                                    <Sparkles size={14} className="text-purple-400" /> Identity Genesis
                                </motion.div>
                                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight italic uppercase">
                                    Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Destiny.</span>
                                </h1>
                                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                                    Welcome back, <span className="text-white font-medium">{user?.firstName || 'Creator'}</span>.
                                    Are you here to build empires or craft the stories that power them?
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Brand Card */}
                                <motion.div
                                    onMouseEnter={() => !isLoading && setRole("brand")}
                                    onClick={() => !isLoading && setRole("brand")}
                                    className={`group relative glass-card cursor-pointer transition-all duration-500 overflow-hidden ${role === "brand"
                                        ? "border-purple-500/50 scale-[1.02] bg-purple-500/5"
                                        : "border-white/5 hover:border-white/20 grayscale hover:grayscale-0"
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="p-10 flex flex-col items-center text-center gap-8 relative z-10">
                                        <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-2xl ${role === "brand"
                                            ? "bg-purple-500 text-white rotate-6 shadow-purple-500/40"
                                            : "bg-white/5 text-gray-500 group-hover:text-white"
                                            }`}>
                                            <Users size={48} strokeWidth={1.5} />
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-3xl font-black text-white uppercase italic tracking-wider">I am a Brand</h3>
                                            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                                                Looking to deploy high-converting UGC campaigns and scale product visibility through elite storytelling.
                                            </p>
                                        </div>

                                        <div className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all ${role === "brand" ? "text-purple-400 opacity-100 translate-y-0" : "text-white/20 opacity-0 translate-y-2"
                                            }`}>
                                            Selection Confirmed <CheckCircle2 size={14} />
                                        </div>
                                    </div>

                                    {/* Animated Corner accent */}
                                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/40 to-transparent blur-2xl transition-opacity ${role === 'brand' ? 'opacity-100' : 'opacity-0'}`} />
                                </motion.div>

                                {/* Writer Card */}
                                <motion.div
                                    onMouseEnter={() => !isLoading && setRole("writer")}
                                    onClick={() => !isLoading && setRole("writer")}
                                    className={`group relative glass-card cursor-pointer transition-all duration-500 overflow-hidden ${role === "writer"
                                        ? "border-blue-500/50 scale-[1.02] bg-blue-500/5"
                                        : "border-white/5 hover:border-white/20 grayscale hover:grayscale-0"
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="p-10 flex flex-col items-center text-center gap-8 relative z-10">
                                        <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-2xl ${role === "writer"
                                            ? "bg-blue-500 text-white -rotate-6 shadow-blue-500/40"
                                            : "bg-white/5 text-gray-500 group-hover:text-white"
                                            }`}>
                                            <Briefcase size={48} strokeWidth={1.5} />
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-3xl font-black text-white uppercase italic tracking-wider">I am a Writer</h3>
                                            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
                                                An elite script architect crafting viral hooks and cinematic narratives for the world's fastest-growing brands.
                                            </p>
                                        </div>

                                        <div className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all ${role === "writer" ? "text-blue-400 opacity-100 translate-y-0" : "text-white/20 opacity-0 translate-y-2"
                                            }`}>
                                            Selection Confirmed <CheckCircle2 size={14} />
                                        </div>
                                    </div>

                                    {/* Animated Corner accent */}
                                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/40 to-transparent blur-2xl transition-opacity ${role === 'writer' ? 'opacity-100' : 'opacity-0'}`} />
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: role ? 1 : 0.2 }}
                                className="flex flex-col items-center gap-6"
                            >
                                <button
                                    onClick={handleComplete}
                                    disabled={!role || isLoading}
                                    className="group relative overflow-hidden btn-premium px-16 !py-5 bg-white text-black font-black uppercase italic tracking-tighter text-xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95 disabled:grayscale"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        {isLoading ? (
                                            <Loader2 className="animate-spin" size={24} />
                                        ) : (
                                            <>
                                                Initialize Access <ArrowRight size={24} />
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>
                                <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">
                                    Secure end-to-end synchronization via Clerk v5
                                </p>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-8"
                        >
                            <div className="relative inline-block">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', damping: 12 }}
                                    className={`w-32 h-32 rounded-full flex items-center justify-center ${role === 'brand' ? 'bg-purple-500' : 'bg-blue-500'}`}
                                >
                                    <CheckCircle2 size={64} className="text-white" />
                                </motion.div>
                                <div className={`absolute inset-0 rounded-full blur-2xl animate-pulse ${role === 'brand' ? 'bg-purple-500/50' : 'bg-blue-500/50'}`} />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-5xl font-black text-white uppercase italic">Access Granted.</h2>
                                <p className="text-gray-400 text-lg font-light tracking-wide">
                                    Calibrating your {role} control center...
                                </p>
                            </div>
                            <div className="w-64 h-1 bg-white/5 mx-auto rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                    className={`w-1/2 h-full bg-gradient-to-r ${role === 'brand' ? 'from-purple-500' : 'from-blue-500'} to-transparent`}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
