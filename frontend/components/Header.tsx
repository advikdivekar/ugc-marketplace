'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (pathname === '/onboarding') return null;

    const navItems = [
        {
            label: 'Platform',
            children: [
                { label: 'Marketplace', href: '/briefs', desc: 'Explore open campaigns' },
                { label: 'Brand Center', href: '/dashboard/brand', desc: 'Manage your campaigns' },
                { label: 'AI Analytics', href: '/analysis', desc: 'ROI & trend insights' },
            ],
        },
        {
            label: 'Solutions',
            children: [
                { label: 'Pricing', href: '/pricing', desc: 'Plans that scale with you' },
                { label: 'Pro Access', href: '/subscribe', desc: 'Unlock premium features' },
                { label: 'Our Roadmap', href: '/blueprint', desc: 'See what we are building' },
            ],
        },
        {
            label: 'Company',
            children: [
                { label: 'About Clario', href: '/', desc: 'Our mission & methodology' },
                { label: 'Contact', href: '/contact', desc: 'Enterprise & support' },
            ],
        },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-[9999] flex justify-center p-6 pointer-events-none transition-all duration-500">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`w-full max-w-7xl flex items-center justify-between px-8 py-4 rounded-[2rem] border pointer-events-auto shadow-2xl transition-all duration-500 ${scrolled
                    ? 'bg-black/60 backdrop-blur-2xl border-white/[0.06]'
                    : 'bg-black/20 backdrop-blur-md border-white/5'
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Sparkles size={20} color="white" fill="white" />
                    </div>
                    <span className="text-xl font-black text-white tracking-tighter uppercase italic">Clario</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-2">
                    {navItems.map((item) => (
                        <div
                            key={item.label}
                            className="relative"
                            onMouseEnter={() => setActiveDropdown(item.label)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center gap-1.5 px-5 py-2 text-[12px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-all">
                                {item.label}
                                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {activeDropdown === item.label && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/10 p-2 shadow-2xl"
                                    >
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className="flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-white/5"
                                            >
                                                <span className="text-sm font-bold text-white tracking-tight">{child.label}</span>
                                                <span className="text-[10px] text-white/40 uppercase tracking-widest">{child.desc}</span>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Auth CTAs */}
                <div className="flex items-center gap-4 lg:gap-6">
                    <SignedOut>
                        <Link href="/sign-in" className="hidden lg:block text-[11px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
                            Login
                        </Link>
                        <Link href="/sign-up" className="btn-premium !py-2.5 !px-6 text-[11px] font-black uppercase tracking-[0.2em]">
                            Join Now
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/profile" className="hidden lg:block text-[11px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
                            Dashboard
                        </Link>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9 border border-white/10 rounded-lg overflow-hidden",
                                }
                            }}
                        />
                    </SignedIn>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden text-white hover:text-purple-400 transition-colors"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-6 right-6 mt-4 rounded-3xl bg-black/95 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl pointer-events-auto"
                    >
                        <div className="p-6 space-y-6">
                            {navItems.map((item) => (
                                <div key={item.label} className="space-y-3">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{item.label}</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                onClick={() => setMobileOpen(false)}
                                                className="flex flex-col gap-0.5 rounded-xl px-4 py-3 bg-white/5 border border-white/5"
                                            >
                                                <span className="text-sm font-bold text-white">{child.label}</span>
                                                <span className="text-[10px] text-white/40 uppercase tracking-widest">{child.desc}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
