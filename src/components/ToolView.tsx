import React, { useState } from 'react';
import { Calculator, Shield, Play, RotateCcw } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { cn } from '../lib/utils';

export function ToolView() {
  const [cap, setCap] = useState(10000);
  const [risk, setRisk] = useState(1);
  const [sl, setSl] = useState(20);
  const [price, setPrice] = useState(4831);

  const riskUSD = cap * (risk / 100);
  const lots = riskUSD / sl;
  const oz = lots * 100;
  const nominalVal = oz * price;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="elegant-card p-6 bg-dark-panel">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-4 h-4 text-accent-blue" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Lot size calculator (XAU/USD)</h3>
          </div>
          <div className="space-y-5">
            <InputGroup label="Account Capital ($)" value={cap} onChange={setCap} />
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span>Risk per trade</span>
                <span className="text-accent-blue font-mono">{risk}%</span>
              </div>
              <input 
                type="range" min="0.1" max="5" step="0.1" value={risk} 
                onChange={e => setRisk(parseFloat(e.target.value))} 
                className="w-full h-1 bg-dark-surface rounded-full appearance-none accent-accent-blue cursor-pointer"
              />
            </div>
            <InputGroup label="Stop Loss (pts/pips)" value={sl} onChange={setSl} />
            <InputGroup label="Current Price ($)" value={price} onChange={setPrice} />
          </div>
          
          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-dark-border pt-8">
            <ResultRow label="Risk exposure" value={`$${riskUSD.toLocaleString()}`} />
            <ResultRow label="Volume (lots)" value={`${lots.toFixed(4)}`} highlight />
            <ResultRow label="Leverage oz" value={`${oz.toFixed(2)} oz`} />
            <ResultRow label="Execution value" value={`$${nominalVal.toLocaleString()}`} />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
             <button className="py-3 bg-emerald-600 hover:bg-emerald-500 rounded-sm font-bold text-white text-[10px] uppercase tracking-widest transition-colors">
               Buy XAUUSD
             </button>
             <button className="py-3 bg-rose-600 hover:bg-rose-500 rounded-sm font-bold text-white text-[10px] uppercase tracking-widest transition-colors">
               Sell XAUUSD
             </button>
          </div>
        </div>

        <div className="elegant-card p-6 flex flex-col bg-dark-panel">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-4 h-4 text-accent-blue" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">Monte Carlo simulation</h3>
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed font-medium mb-6">
            Execute 500 potential price paths based on historical volatility and drift parameters. Simulation requires GPU compute context.
          </p>
          <div className="flex-1 min-h-[160px] flex items-center justify-center border border-dark-border bg-dark-bg rounded-sm mb-6 group cursor-pointer hover:bg-dark-surface transition-colors">
             <div className="text-center">
               <Play className="w-10 h-10 text-accent-blue mx-auto mb-3 opacity-30 group-hover:opacity-60 transition-opacity" />
               <span className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em]">Cold Start Engine</span>
             </div>
          </div>
          <button className="w-full py-3 bg-dark-surface hover:bg-dark-border border border-dark-border text-white text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-3">
            <RotateCcw className="w-3 h-3 text-accent-blue" /> Refresh simulation
          </button>
        </div>
      </div>

      <div className="elegant-card p-6 bg-dark-panel">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-8 font-mono">Execution parameters (R:R)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputGroup label="Entry Position ($)" value={price} onChange={setPrice} />
            <InputGroup label="Stop Guard ($)" value={price - 20} onChange={() => {}} />
            <InputGroup label="Take Profit ($)" value={price + 40} onChange={() => {}} />
        </div>
        <div className="mt-10 flex items-center gap-12 justify-center p-8 bg-dark-surface rounded-sm border border-dark-border">
           <RRMetric label="Point Risk" value="20.0" />
           <div className="h-10 w-[1px] bg-dark-border" />
           <RRMetric label="Profit Factor" value="2.00R" highlight />
           <div className="h-10 w-[1px] bg-dark-border" />
           <RRMetric label="Break-even WR" value="33.3%" />
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
      <input 
        type="number" value={value} onChange={e => onChange(parseFloat(e.target.value))}
        className="elegant-input w-full"
      />
    </div>
  );
}

function ResultRow({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div>
      <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1.5">{label}</div>
      <div className={cn("text-xl font-bold tracking-tight", highlight ? "text-accent-blue" : "text-white/90")}>{value}</div>
    </div>
  );
}

function RRMetric({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="text-center">
      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 font-mono">{label}</div>
      <div className={cn("text-2xl font-bold tracking-tight", highlight ? "text-bull" : "text-white/90")}>{value}</div>
    </div>
  );
}
