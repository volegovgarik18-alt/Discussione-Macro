import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Globe2, 
  BrainCircuit, 
  Settings2, 
  Sparkles,
  RefreshCcw,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { MarketView } from './components/MarketView';
import { MacroView } from './components/MacroView';
import { PsychView } from './components/PsychView';
import { ToolView } from './components/ToolView';
import { cn } from './lib/utils';

type Tab = 'Market' | 'Macro' | 'Psychology' | 'Tools';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Market');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-[#E0E0E0] selection:bg-accent-blue/30 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="h-14 border-b border-dark-border bg-dark-panel flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div className="text-accent-blue font-bold text-xl tracking-tight italic">
            CORE<span className="text-white not-italic">TRADE</span>
          </div>
          
          <div className="hidden md:flex space-x-6 h-full items-center">
            <TabButton current={activeTab} target="Market" onClick={setActiveTab} />
            <TabButton current={activeTab} target="Macro" onClick={setActiveTab} />
            <TabButton current={activeTab} target="Psychology" onClick={setActiveTab} />
            <TabButton current={activeTab} target="Tools" onClick={setActiveTab} />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] uppercase tracking-wider text-gray-500">System Ready</div>
            <div className="text-sm font-mono text-bull">XAU: 4831.25</div>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
              onClick={handleRefresh}
              className="p-2 text-gray-500 hover:text-white transition-colors"
             >
               <RefreshCcw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
             </button>
             <div className="h-8 w-8 rounded-full bg-accent-blue flex items-center justify-center text-xs font-bold text-white">
               JD
             </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner / Alerts */}
      <div className="h-8 bg-[#0A0B0D] border-b border-dark-border px-6 flex items-center overflow-hidden">
        <div className="flex items-center gap-3 text-[10px] font-mono whitespace-nowrap animate-marquee w-full text-gray-500">
          <ShieldAlert className="w-3.5 h-3.5 text-bear" />
          <span className="text-bear uppercase font-bold tracking-widest">Active Position Alert:</span>
          <span>XAU/USD defensive premium active · US yields flattening · Watch Michigan Sentiment (Fri)</span>
          <span className="mx-4">|</span>
          <span>DXY weakness persists · System: Normal · Latency: 14ms</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-accent-blue mb-2">
            <Sparkles className="w-4 h-4" />
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Intelligence Node</h2>
          </div>
          <div className="elegant-card p-5 bg-dark-panel/40 border-accent-blue/20">
             <div className="flex gap-6 items-center">
               <div className="flex-1">
                 <p className="text-sm font-medium text-white/90 leading-relaxed italic">
                   "XAU/USD holds corrective structure above 4831. COT data confirms institutional accumulation (NC Long +4.6k), while retail sentiment remains under 65%."
                 </p>
               </div>
               <button className="flex items-center gap-2 px-4 py-2 bg-accent-blue/10 hover:bg-accent-blue/20 border border-accent-blue/30 rounded text-[11px] font-mono text-accent-blue transition-all">
                 Briefing <ArrowRight className="w-3 h-3" />
               </button>
             </div>
          </div>
        </div>

        <section className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === 'Market' && <MarketView />}
              {activeTab === 'Macro' && <MacroView />}
              {activeTab === 'Psychology' && <PsychView />}
              {activeTab === 'Tools' && <ToolView />}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* Footer Status Bar */}
      <footer className="h-8 border-t border-dark-border bg-dark-panel px-6 flex items-center justify-between text-[10px] text-gray-500 font-mono mt-auto">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-bull"></span>
            <span>System: Normal</span>
          </span>
          <span>Latency: 14ms</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>UTC {new Date().toISOString().split('T')[1].split('.')[0]}</span>
          <span className="text-accent-blue uppercase font-bold tracking-widest cursor-pointer hover:text-accent-blue/80">Help Center</span>
        </div>
      </footer>
    </div>
  );
}

function TabButton({ current, target, onClick }: { current: Tab, target: Tab, onClick: (t: Tab) => void }) {
  const active = current === target;
  return (
    <button
      onClick={() => onClick(target)}
      className={cn(
        "h-full px-4 text-sm font-medium transition-all relative mt-4 pb-4",
        active ? "tab-active" : "tab-inactive"
      )}
    >
      {target}
      {active && (
        <motion.div 
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue"
        />
      )}
    </button>
  );
}

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
