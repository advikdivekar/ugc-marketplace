"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BadgeDollarSign, Clock, LayoutGrid, Target, Plus } from 'lucide-react';
import { useBriefs } from '../../hooks/use-briefs';
import { useEffect } from 'react';
import Link from 'next/link';

export default function BriefsFeedbackBoard() {
    const [searchQuery, setSearchQuery] = useState('');
    const { briefs, loading, fetchAllBriefs } = useBriefs();

    useEffect(() => {
        fetchAllBriefs();
    }, [fetchAllBriefs]);

    const filteredBriefs = briefs.filter(b => b.product_name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 sm:px-12">
            <div className="mx-auto max-w-7xl">
                {/* Header Actions */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Open Briefs</h1>
                        <p className="text-gray-400">Discover and pitch high-paying UGC campaigns.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-purple-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm text-white placeholder-gray-500 w-full md:w-64 focus:border-purple-500 outline-none transition-all focus:ring-1 focus:ring-purple-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white hover:bg-white/10 transition-colors">
                            <Filter size={16} /> Filters
                        </button>
                        <Link href="/briefs/new" className="btn-premium flex items-center gap-2 !py-3">
                            <Plus size={16} /> Create
                        </Link>
                    </div>
                </div>

                {/* Grid Layout */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="spinner border-purple-500 w-10 h-10" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBriefs.map((brief, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                key={brief.id}
                                className="glass-card flex flex-col justify-between group p-6 rounded-[2rem] hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <span className="badge text-purple-300 border-purple-500/30 bg-purple-500/10">
                                            {brief.industry || 'Other'}
                                        </span>
                                        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                            <BadgeDollarSign size={14} className="text-green-400" />
                                            <span className="text-sm font-semibold text-white">
                                                ₹{brief.budget?.toLocaleString('en-IN') || 0}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{brief.product_name}</h3>
                                        <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                                            {brief.brief_description}
                                        </p>
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                            <LayoutGrid size={14} className="text-gray-400" />
                                            <span className="uppercase tracking-widest">{brief.script_format || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                            <Clock size={14} className="text-gray-400" />
                                            <span className="uppercase tracking-widest">Active</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500" />
                                        <span className="text-sm text-gray-300">Brand Partner</span>
                                    </div>
                                    <Link
                                        href={`/briefs/submit?id=${brief.id}`}
                                        className="text-xs font-bold uppercase tracking-widest text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition-all group-hover:border-purple-500 group-hover:text-purple-400"
                                    >
                                        Submit
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                        {filteredBriefs.length === 0 && !loading && (
                            <div className="col-span-full py-20 text-center text-gray-500">
                                No campaigns found matching your criteria.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
