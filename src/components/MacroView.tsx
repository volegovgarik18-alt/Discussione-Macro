import React, { useState, useEffect } from 'react';
import { Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '../lib/utils';

const cpiData = [
  { name: '2024Q1', value: 3.5 },
  { name: 'Q2', value: 3.3 },
  { name: 'Q3', value: 2.6 },
  { name: 'Q4', value: 2.9 },
  { name: '2025Q1', value: 2.8 },
  { name: 'Q2', value: 2.6 },
  { name: 'Q3', value: 2.7 },
  { name: 'Q4', value: 2.9 },
  { name: '2026Q1', value: 2.6 },
];

export function MacroView() {
  const [macroScore, setMacroScore] = useState(5.5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MacroMetric label="CPI USA YoY" value="2.6%" status="warn" sub="Stable" />
        <MacroMetric label="CPI Trend (3m)" value="Down" status="neutral" sub="-0.30% delta" />
        <MacroMetric label="Fed Fund Rate" value="3.50%" status="neutral" sub="Hold bias" />
        <MacroMetric label="Real Rate" value="-0.90%" status="pos" sub="Favors Gold" />
      </div>

      <div className="elegant-card p-6 bg-dark-panel">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Global Sentiment Matrix</h3>
          <div className="flex items-center gap-6 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent-blue" /> Current</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 border-t border-dashed border-gray-600" /> Target 2.0</span>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cpiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2D35" vertical={false} />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={9} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B7280" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F1115', border: '1px solid #2A2D35', borderRadius: '4px', fontSize: '11px' }}
                itemStyle={{ color: '#3B82F6' }}
              />
              <Line type="stepAfter" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3, fill: '#3B82F6' }} />
              <Line type="monotone" dataKey={() => 2} stroke="#6B7280" strokeDasharray="4 4" strokeWidth={1} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="elegant-card p-6 bg-dark-panel">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6">Inflation & Labor</h3>
          <div className="space-y-5">
            <SelectOption label="Current CPI" options={['Deflation', '1-3%', '3-5%', '5-10%+', '>10%']} defaultIdx={1} />
            <SelectOption label="CPI Trend" options={['Falling', 'Stable', 'Rising']} defaultIdx={1} />
            <SelectOption label="Wage Growth" options={['Weak', 'Moderate', 'Strong']} defaultIdx={1} />
          </div>
        </div>
        <div className="elegant-card p-6 bg-dark-panel">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6">Dollar & Fed</h3>
          <div className="space-y-5">
            <SelectOption label="DXY Trend" options={['Very Weak', 'Weak', 'Neutral', 'Strong']} defaultIdx={1} />
            <SelectOption label="Fed Expectation" options={['Aggressive Cuts', 'Mixed', 'Hold', 'Rate Hikes']} defaultIdx={2} />
            <SelectOption label="Geopolitics" options={['Calm', 'Moderate', 'Elevated', 'Crisis']} defaultIdx={3} />
          </div>
        </div>
      </div>

      <div className={cn(
        "p-6 rounded-sm border-l-4 transition-all bg-dark-surface",
        macroScore > 6 ? "border-bull" : "border-accent-blue"
      )}>
        <h4 className={cn("text-xs font-bold uppercase tracking-widest mb-2", macroScore > 6 ? "text-bull" : "text-accent-blue")}>
          Consensual Analysis: {macroScore > 6 ? "Accumulation State" : "Mixed Outlook"}
        </h4>
        <p className="text-xs text-gray-400 leading-relaxed font-medium">
          Moderate inflation paired with a weak DXY and acute geopolitical tensions create a strong structural tailwind. 
          System latency: 14ms. Ready for order execution.
        </p>
      </div>
    </div>
  );
}

function MacroMetric({ label, value, status, sub }: { label: string, value: string, status: 'pos' | 'neg' | 'warn' | 'neutral', sub: string }) {
  const colors = {
    pos: 'text-bull',
    neg: 'text-bear',
    warn: 'text-accent-blue',
    neutral: 'text-gray-500'
  };
  return (
    <div className="elegant-card p-5 bg-dark-panel hover:bg-dark-surface/50 transition-colors cursor-pointer">
      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">{label}</div>
      <div className={cn("text-2xl font-bold tracking-tight mb-2", colors[status])}>{value}</div>
      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">{sub}</div>
    </div>
  );
}

function SelectOption({ label, options, defaultIdx }: { label: string, options: string[], defaultIdx: number }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
      <select className="elegant-input w-full appearance-none cursor-pointer">
        {options.map((opt, i) => (
          <option key={opt} value={i} selected={i === defaultIdx}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
