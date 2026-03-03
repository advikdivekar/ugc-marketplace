"use client";

import { useState } from 'react';
import { BadgeDollarSign, Link as LinkIcon, Edit3, Target, LayoutDashboard, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateBriefPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        product_name: '',
        industry: 'tech',
        script_format: 'tiktok',
        budget: '',
        brief_description: '',
        product_url: '',
        target_audience: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Usually calls your `useCreateBrief` hook
        alert("Creation Flow: Connecting to Backend Endpoint...");
        router.push('/dashboard/brand');
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 sm:px-12 flex justify-center">
            <div className="w-full max-w-3xl">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">
                    <span className="hover:text-white cursor-pointer transition-colors" onClick={() => router.back()}>Dashboard</span>
                    <ChevronRight size={14} />
                    <span className="text-purple-400">New Brief</span>
                </div>

                <div className="mb-10 space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Create Campaign</h1>
                    <p className="text-gray-400">Detail your product requirements to receive pitches from elite writers.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-card p-6 md:p-10 space-y-8 rounded-[2rem] relative overflow-hidden">
                    {/* Subtle gradient bloob under form */}
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

                    {/* Title & URL Level */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div className="space-y-2">
                            <label className="form-label flex gap-2 items-center"><Edit3 size={12} /> Product Name</label>
                            <input
                                required
                                className="form-input !py-4"
                                placeholder="e.g. Lumina Smart Desk"
                                value={formData.product_name}
                                onChange={e => setFormData({ ...formData, product_name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="form-label flex gap-2 items-center"><LinkIcon size={12} /> Product URL</label>
                            <input
                                className="form-input !py-4"
                                placeholder="https://lumina.com/desk"
                                value={formData.product_url}
                                onChange={e => setFormData({ ...formData, product_url: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 relative z-10">
                        <label className="form-label flex gap-2 items-center"><LayoutDashboard size={12} /> Concept & Description</label>
                        <textarea
                            required
                            rows={4}
                            className="form-input !py-4 resize-none"
                            placeholder="Describe the main hooks, the vibe, and what viewers need to take away..."
                            value={formData.brief_description}
                            onChange={e => setFormData({ ...formData, brief_description: e.target.value })}
                        />
                    </div>

                    {/* Selectors Level */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div className="space-y-2">
                            <label className="form-label">Industry</label>
                            <select
                                className="form-input !py-4 appearance-none"
                                value={formData.industry}
                                onChange={e => setFormData({ ...formData, industry: e.target.value })}
                            >
                                <option value="tech">Technology</option>
                                <option value="skincare">Skincare</option>
                                <option value="fitness">Fitness</option>
                                <option value="fashion">Fashion</option>
                                <option value="food">Food</option>
                                <option value="travel">Travel</option>
                                <option value="finance">Finance</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="form-label">Delivery Format</label>
                            <select
                                className="form-input !py-4 appearance-none"
                                value={formData.script_format}
                                onChange={e => setFormData({ ...formData, script_format: e.target.value })}
                            >
                                <option value="tiktok">TikTok Video</option>
                                <option value="shorts">YouTube Shorts</option>
                                <option value="reel">Instagram Reels</option>
                                <option value="pinterest">Pinterest Idea Pin</option>
                                <option value="other">Other Format</option>
                            </select>
                        </div>
                    </div>

                    {/* Audience & Budget Mapping */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div className="space-y-2">
                            <label className="form-label flex gap-2 items-center"><Target size={12} /> Target Audience</label>
                            <input
                                className="form-input !py-4"
                                placeholder="E.g., Gen-Z College Students"
                                value={formData.target_audience}
                                onChange={e => setFormData({ ...formData, target_audience: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="form-label flex gap-2 items-center"><BadgeDollarSign size={12} /> Campaign Budget (INR)</label>
                            <input
                                required
                                type="number"
                                min="500"
                                className="form-input !py-4"
                                placeholder="₹ 5000"
                                value={formData.budget}
                                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Submit Action */}
                    <div className="pt-6 relative z-10">
                        <button type="submit" className="btn-premium w-full !py-4 text-[13px]">
                            Publish Campaign
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-4">
                            Your brief will instantly become available on the marketplace.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
