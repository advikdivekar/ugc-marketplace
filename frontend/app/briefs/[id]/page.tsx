"use client";

import { BadgeDollarClock } from 'lucide-react';
import Link from 'next/link';
// import { useQuery } ...
// Using placeholder data to reflect schemas precisely

export default function BriefDetails({ params }: { params: { id: string } }) {
  const brief = {
    id: params.id,
    brand_id: "br_demo",
    product_name: 'Radiance Glow Serum',
    industry: 'Skincare',
    budget: 3500.0,
    created_at: new Date().toISOString(),
    status: 'open',
    brief_description: 'Looking for a natural-lighting unboxing and review of our new glow serum...',
    target_audience: "Gen-Z and Millennials (18-35) interested in cruelty-free skincare.",
    creative_direction: "Authentic, relatable setup. Hook the viewer by mentioning winter dry skin problems, then introduce the product.",
    script_format: "tiktok",
    product_url: 'https://example.com/glow'
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 sm:px-12">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header Block */}
        <div className="glass-card p-8 md:p-12 space-y-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <span className="badge text-purple-300 bg-purple-500/10 border border-purple-500/30">
              {brief.industry}
            </span>
            <span className="text-xl font-bold bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20">
              ₹ {brief.budget.toLocaleString()}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white">{brief.product_name}</h1>
          
          <div className="flex items-center gap-6 pt-4 border-t border-white/10 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="font-semibold text-white">Format:</span> <span className="uppercase">{brief.script_format}</span>
            </div>
            {brief.product_url && (
              <a href={brief.product_url} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300">
                View Product Link
              </a>
            )}
          </div>
        </div>

        {/* Details Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8 glass-card p-8 md:p-12">
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-widest uppercase">Brief Description</h3>
              <p className="text-gray-300 leading-relaxed">{brief.brief_description}</p>
            </section>
            
            {(brief.creative_direction || brief.target_audience) && (
              <div className="space-y-8 pt-8 border-t border-white/10">
                {brief.target_audience && (
                  <section className="space-y-4">
                    <h3 className="text-lg font-bold text-white tracking-widest uppercase">Target Audience</h3>
                    <p className="text-gray-300 leading-relaxed">{brief.target_audience}</p>
                  </section>
                )}
                {brief.creative_direction && (
                  <section className="space-y-4">
                    <h3 className="text-lg font-bold text-white tracking-widest uppercase">Creative Direction</h3>
                    <div className="bg-purple-900/20 p-6 rounded-2xl border border-purple-500/20">
                       <p className="text-purple-200 leading-relaxed italic">{brief.creative_direction}</p>
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6 border-purple-500/30 bg-purple-500/5">
              <h3 className="text-white font-bold mb-4">Ready to Write?</h3>
              <p className="text-sm text-gray-400 mb-6">Pitch your script idea and proposed rate. The brand reviews submissions and approves winners.</p>
              <Link href={`/briefs/submit?id=${brief.id}`} className="btn-premium w-full text-center block">
                Submit Pitch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
