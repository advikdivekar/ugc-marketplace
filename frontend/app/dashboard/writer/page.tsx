"use client";

import { useState } from 'react';
import { BadgeDollarSign, Heart, PlaySquare, Settings, CheckCircle2, Search } from 'lucide-react';

export default function WriterDashboard() {
  const [activeTab, setActiveTab] = useState('pitches');

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 sm:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Creator Hub</h1>
            <p className="text-gray-400 mt-2">Manage your pitches, track approved scripts, and view earnings.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white hover:bg-white/10 transition-colors">
              Withdraw Funds
            </button>
            <button className="btn-premium !py-3">
               Explore Briefs
            </button>
          </div>
        </div>

        <div className="flex gap-4 border-b border-white/10 mb-8 overflow-x-auto pb-4 custom-scrollbar">
          {['pitches', 'active work', 'portfolio', 'earnings', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="glass-card p-4 flex flex-col items-center justify-center min-h-[400px] text-center border-dashed border-2 border-white/10 !bg-transparent">
             <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
               <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">No active {activeTab} yet</h3>
             <p className="text-gray-400 max-w-sm mb-6">
                When you interact with the marketplace, your content mapping this section will show up here natively from your FastAPI backend endpoints.
             </p>
             <button className="btn-white text-sm">Browse Marketplace Briefs</button>
        </div>
      </div>
    </div>
  );
}
