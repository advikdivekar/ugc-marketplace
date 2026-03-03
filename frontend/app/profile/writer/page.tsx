"use client";

import { motion } from 'framer-motion';
import { Star, ShieldCheck, Mail, Link as LinkIcon, Instagram, Youtube, Video } from 'lucide-react';

export default function WriterPortfolio() {
  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 sm:px-12">
      <div className="mx-auto max-w-5xl">
        
        {/* Profile Card */}
        <div className="glass-card p-8 md:p-12 mb-12 relative overflow-hidden flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
          {/* Avatar Base */}
          <div className="relative shrink-0">
             <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-1">
               <div className="w-full h-full rounded-full bg-black/50 border-[4px] border-[#111]" />
             </div>
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               className="absolute -bottom-2 -right-2 bg-green-400 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full border border-black shadow-xl"
             >
               Top 1%
             </motion.div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4 z-10">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
               <div>
                  <h1 className="text-3xl font-black text-white flex items-center gap-2 justify-center sm:justify-start">
                    Alex Mercer <ShieldCheck size={20} className="text-blue-400" />
                  </h1>
                  <p className="text-purple-400 font-medium">UGC Skincare & Tech Specialist</p>
               </div>
               <div className="flex gap-4">
                  <button className="bg-white/5 border border-white/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition">
                     <Mail size={16} />
                  </button>
                  <button className="btn-premium !py-2">Invite to Brief</button>
               </div>
            </div>

            <p className="text-gray-400 max-w-2xl leading-relaxed text-sm">
              Helping brands scale via TikTok & Reels. My scripts have generated over 15M+ organic views for beauty brands. Focusing on problem-solution hooks with native storytelling.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
               <div className="flex items-center gap-1.5 text-sm text-gray-300">
                  <Star fill="#ffb800" color="#ffb800" size={16} /> <span className="font-bold text-white">4.9</span> (124 reviews)
               </div>
               <div className="flex items-center gap-1.5 text-sm text-gray-300">
                  <Video size={16} className="text-gray-500" /> <span className="font-bold text-white">42</span> Scripts Delivered
               </div>
               <div className="flex items-center gap-1.5 text-sm text-gray-300">
                  <Instagram size={16} className="text-gray-500" /> <span className="font-bold text-white">65K</span> Followers
               </div>
            </div>
          </div>
        </div>

        {/* Portfolio Videos Map placeholder */}
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Recent Written Scripts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[1,2,3].map((item) => (
             <div key={item} className="glass-card-light rounded-3xl overflow-hidden group border border-white/5">
                <div className="aspect-[9/16] bg-gray-900 relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
                   <div className="absolute bottom-4 left-4 z-20 space-y-1">
                      <p className="text-xs uppercase tracking-widest text-purple-400 font-bold">Skincare</p>
                      <p className="text-white font-medium text-sm">Glow Serum Viral Hook</p>
                   </div>
                   {/* Play overlay mock */}
                   <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
                      <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center">
                        <LinkIcon size={20} className="text-white" />
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
