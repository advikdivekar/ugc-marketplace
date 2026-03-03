"use client";

import { Mail, MessageSquare, Briefcase } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 sm:px-12 text-white">
            <div className="max-w-6xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Contact Clario Support</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Whether you need help with a campaign dispute, want to discuss enterprise solutions, or just have a general question, our team is here.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Support */}
                    <div className="glass-card p-8 rounded-[2rem] border border-white/5 space-y-4 hover:-translate-y-2 transition-transform">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                            <MessageSquare />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-white">General Support</h3>
                        <p className="text-sm text-gray-400 h-20">For questions about your account, billing, or platform features.</p>
                        <a href="mailto:support@clario.com" className="text-purple-400 font-bold block mt-4 hover:underline">support@clario.com</a>
                    </div>

                    {/* Enterprise */}
                    <div className="glass-card p-8 rounded-[2rem] border border-white/5 space-y-4 hover:-translate-y-2 transition-transform">
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                            <Briefcase />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-white">Enterprise Sales</h3>
                        <p className="text-sm text-gray-400 h-20">For agencies or high-volume brands needing custom API integrations or dedicated account managers.</p>
                        <button className="text-cyan-400 font-bold block mt-4 hover:underline" onClick={() => alert('Opens Intercom or Calendly')}>Book Demo</button>
                    </div>

                    {/* Media */}
                    <div className="glass-card p-8 rounded-[2rem] border border-white/5 space-y-4 hover:-translate-y-2 transition-transform">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-6">
                            <Mail />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-white">Press & Media</h3>
                        <p className="text-sm text-gray-400 h-20">For media inquiries, brand partnerships, and press kits.</p>
                        <a href="mailto:press@clario.com" className="text-green-400 font-bold block mt-4 hover:underline">press@clario.com</a>
                    </div>
                </div>

                <div className="glass-card max-w-3xl mx-auto p-8 rounded-[2rem] border flex flex-col items-center">
                    <h2 className="text-2xl font-bold uppercase mb-6 text-center">Open a Support Ticket</h2>
                    <form className="w-full space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Ticket Submitted"); }}>
                        <div className="grid grid-cols-2 gap-4">
                            <input className="input-field" placeholder="First Name" required />
                            <input className="input-field" placeholder="Last Name" required />
                        </div>
                        <input className="input-field" type="email" placeholder="Email Address" required />
                        <select className="input-field">
                            <option>Dispute Resolution</option>
                            <option>Billing Question</option>
                            <option>Bug Report</option>
                            <option>Other</option>
                        </select>
                        <textarea className="input-field h-32" placeholder="Describe your issue..." required></textarea>
                        <button type="submit" className="btn-premium w-full !py-4">Submit Ticket</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
