import { Terminal, Code, Cpu, Database, Webhook } from 'lucide-react';

export default function BlueprintPage() {
    const roadmapItems = [
        {
            quarter: 'Q1',
            status: 'completed',
            title: 'Core Platform Refactoring',
            desc: 'Migration to Next.js 16 App Router, FastAPI structural updates, Neon Serverless DB integration.',
            icon: <Database className="w-5 h-5" />
        },
        {
            quarter: 'Q2',
            status: 'in-progress',
            title: 'Clerk Auth & Escrow Engine',
            desc: 'Implement JWT route protection, Razorpay webhook handlers, milestone-based payouts.',
            icon: <Webhook className="w-5 h-5" />
        },
        {
            quarter: 'Q3',
            status: 'planned',
            title: 'AI Script Analysis',
            desc: 'Train Gemini 2.5 Flash on 50k+ top-performing UGC ads for predictive ROI scoring.',
            icon: <Cpu className="w-5 h-5" />
        },
        {
            quarter: 'Q4',
            status: 'planned',
            title: 'Creator API Access',
            desc: 'Public API for high-volume creators to automate pitching via their own internal tools.',
            icon: <Terminal className="w-5 h-5" />
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 sm:px-12 font-mono">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4 border-b border-white/10 pb-8">
                    <h1 className="text-3xl text-purple-400 flex items-center gap-3">
                        <Code size={28} />
                        ~/clario/system_blueprint
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Transparent engineering roadmap. We build in public because our infrastructure is our moat.
                    </p>
                </div>

                <div className="space-y-8">
                    {roadmapItems.map((item, i) => (
                        <div key={i} className={`glass-card p-6 border-l-4 ${item.status === 'completed' ? 'border-l-green-500' :
                                item.status === 'in-progress' ? 'border-l-purple-500' : 'border-l-gray-700'
                            }`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3 text-white">
                                    <span className={`p-2 rounded bg-black/50 ${item.status === 'completed' ? 'text-green-400' :
                                            item.status === 'in-progress' ? 'text-purple-400 animate-pulse' : 'text-gray-500'
                                        }`}>
                                        {item.icon}
                                    </span>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">[{item.quarter}]</div>
                                        <h3 className="text-lg font-bold">{item.title}</h3>
                                    </div>
                                </div>
                                <span className={`text-xs px-2 py-1 bg-black/50 rounded ${item.status === 'completed' ? 'text-green-400 border border-green-500/30' :
                                        item.status === 'in-progress' ? 'text-purple-400 border border-purple-500/30' : 'text-gray-500 border border-white/10'
                                    }`}>
                                    {item.status.toUpperCase()}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm pl-11">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-6 bg-black/50 border border-white/5 rounded">
                    <div className="text-green-400 mb-2">$ system_status --check</div>
                    <div className="text-gray-300">
                        [OK] Frontend Node: Next.js 16 Active<br />
                        [OK] Backend Node: FastAPI Connected<br />
                        [OK] Auth Gateway: Clerk Operative<br />
                        <span className="text-purple-400 animate-pulse">_</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
