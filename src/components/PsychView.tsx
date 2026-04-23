import React, { useState } from 'react';
import { Brain, Smile, Activity, ShieldAlert, Target } from 'lucide-react';
import { cn } from '../lib/utils';

export function PsychView() {
  const [sentiment, setSentiment] = useState(60); // Long %

  return (
    <div className="space-y-6">
      <div className="elegant-card p-8 bg-dark-panel">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-8 text-center">Retail Performance Index · XAU/USD</h3>
        <div className="flex items-center gap-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold font-mono text-bull">{sentiment}%</span>
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Long</span>
          </div>
          <div className="flex-1 space-y-3">
             <div className="relative h-2 w-full bg-dark-surface rounded-full overflow-hidden flex">
                <div className="h-full bg-bull transition-all duration-1000" style={{ width: `${sentiment}%` }} />
                <div className="h-full bg-bear transition-all duration-1000" style={{ width: `${100 - sentiment}%` }} />
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/20 translate-x-[-50%]" />
             </div>
             <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                <span>RETAIL VERIFIED</span>
                <span className="text-accent-blue">Bias: Cautious</span>
                <span>UTC SYNC</span>
             </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold font-mono text-bear">{100 - sentiment}%</span>
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Short</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="elegant-card p-6 bg-dark-panel">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6 font-mono">Market Cycle State</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { n: 'Optimism', c: 'border-bull/20 text-bull bg-bull/5 hover:bg-bull/10' },
              { n: 'Excitement', c: 'border-bull/20 text-bull bg-bull/5 hover:bg-bull/10' },
              { n: 'Euphoria', c: 'border-accent-blue text-accent-blue bg-accent-blue/5 hover:bg-accent-blue/10' },
              { n: 'Anxiety', c: 'border-dark-border text-gray-500 hover:text-white' },
              { n: 'Disbelief', c: 'border-dark-border text-gray-500 hover:text-white' },
              { n: 'Fear', c: 'border-bear/20 text-bear bg-bear/5 hover:bg-bear/10' },
              { n: 'Panic', c: 'border-bear/20 text-bear bg-bear/5 hover:bg-bear/10' },
              { n: 'Capitulation', c: 'border-accent-blue/40 text-accent-blue bg-accent-blue/10 hover:bg-accent-blue/20' },
              { n: 'Hope', c: 'border-bull/20 text-bull bg-bull/5 hover:bg-bull/10' },
            ].map((p) => (
              <button key={p.n} className={cn("text-[9px] font-bold tracking-widest py-3 rounded-sm border transition-all uppercase", p.c)}>
                {p.n}
              </button>
            ))}
          </div>
        </div>

        <div className="elegant-card p-6 bg-dark-panel">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6 font-mono">Pre-Session Protocol</h3>
          <div className="space-y-2">
             <MindsetCheck label="Well rested (>7h sleep)" />
             <MindsetCheck label="No emotional debt from previous losses" />
             <MindsetCheck label="Trading plan written & clear" />
             <MindsetCheck label="Accepted loss as a probability" />
             <MindsetCheck label="Zero FOMO active" />
          </div>
        </div>
      </div>

      <div className="elegant-card p-6 bg-dark-panel">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6 font-mono">Mental Performance Ledger</h3>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
           {['Focus', 'Calm', 'Neutral', 'Worry', 'Fear', 'Greed'].map(e => (
             <button key={e} className="px-4 py-2 bg-dark-surface border border-dark-border text-[9px] font-bold uppercase tracking-widest text-gray-500 hover:text-white hover:border-gray-500 transition-colors">
               {e}
             </button>
           ))}
        </div>
        <textarea 
          className="w-full elegant-input min-h-[140px] bg-dark-surface/50 p-4 leading-relaxed placeholder:text-gray-600" 
          placeholder="Log emotional state, focus levels, and session observations for neural review..."
        />
        <div className="flex justify-end mt-4">
           <button className="px-8 py-3 bg-accent-blue hover:bg-accent-blue/80 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all shadow-lg active:scale-95">
             Log Entry
           </button>
        </div>
      </div>
    </div>
  );
}

function MindsetCheck({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-4 p-3 border-b border-dark-border hover:bg-dark-surface/30 transition-all cursor-pointer group">
      <input type="checkbox" className="w-3.5 h-3.5 rounded-sm border-dark-border bg-dark-bg accent-accent-blue cursor-pointer" />
      <span className="text-[11px] font-medium text-gray-400 group-hover:text-white transition-colors">{label}</span>
    </label>
  );
}
