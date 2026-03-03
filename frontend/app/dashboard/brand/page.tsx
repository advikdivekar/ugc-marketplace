"use client";

import { useState } from 'react';
import { BadgeDollarSign, LayoutDashboard, Target, Link as LinkIcon, Edit3 } from 'lucide-react';
import Link from 'next/link';

import { useBriefs } from '../../../hooks/use-briefs';
import { useEffect } from 'react';

export default function BrandDashboard() {
    const [activeTab, setActiveTab] = useState('briefs');
    const { briefs, loading, fetchAllBriefs } = useBriefs();

    useEffect(() => {
        fetchAllBriefs();
    }, [fetchAllBriefs]);

    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 sm:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Brand Dashboard</h1>
                        <p className="text-gray-400 mt-2">Manage your campaigns, review submissions, and track ROI.</p>
                    </div>
                    <Link href="/briefs/new" className="btn-premium !py-3">
                        Create Campaign
                    </Link>
                </div>

                {/* Custom Tabs */}
                <div className="flex gap-4 border-b border-white/10 mb-8 overflow-x-auto pb-4 custom-scrollbar">
                    {['briefs', 'submissions', 'talent', 'wallet'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab
                                ? 'bg-white text-black'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Tab Content Placeholder */}
                {activeTab === 'briefs' && (
                    <>
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="spinner border-purple-500 w-10 h-10" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {briefs.map((brief) => (
                                    <div key={brief.id} className="glass-card p-6 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <span className="badge border-green-500/30 text-green-400 bg-green-500/10 uppercase">
                                                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse mr-1" />
                                                {brief.status}
                                            </span>
                                            <div className="flex items-center gap-1 text-purple-400 font-medium">
                                                <BadgeDollarSign size={16} /> ₹{brief.budget?.toLocaleString() || 0}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{brief.product_name}</h3>
                                        <div className="pt-4 border-t border-white/10 flex justify-between items-center text-sm">
                                            <span className="text-gray-400">Industry</span>
                                            <span className="font-bold text-white capitalize">{brief.industry || 'N/A'}</span>
                                        </div>
                                        <Link href={`/briefs/${brief.id}`} className="w-full btn-dark block text-center !py-3 bg-white/5 mt-4">
                                            View Campaign
                                        </Link>
                                    </div>
                                ))}
                                {briefs.length === 0 && (
                                    <div className="col-span-full py-20 text-center text-gray-500">
                                        No campaigns created yet. Start by generating a new brief above.
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {activeTab !== 'briefs' && (
                    <div className="glass-card p-12 text-center">
                        <LayoutDashboard className="mx-auto h-12 w-12 text-purple-400 mb-4 opacity-50" />
                        <h2 className="text-2xl font-bold text-white mb-2 cursor-pointer">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} View
                        </h2>
                        <p className="text-gray-400">This feature connects entirely to backend APIs mapping data visualization.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
