import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Jul', price: 3290 },
  { name: 'Aug', price: 3448 },
  { name: 'Sep', price: 3863 },
  { name: 'Oct', price: 4002 },
  { name: 'Nov', price: 4222 },
  { name: 'Dec', price: 4315 },
  { name: 'Jan', price: 5595 },
  { name: 'Feb', price: 5100 },
  { name: 'Mar', price: 4700 },
  { name: 'Apr', price: 4831 },
];

export function MarketView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="XAU/USD" value="$4,831.25" subValue="+0.84%" status="up" color="text-accent-blue" />
        <MetricCard label="DXY" value="98.4" subValue="Weak · Sup 97.8" status="down" />
        <MetricCard label="FED RATE" value="3.50%" subValue="Hold 99.5%" status="neutral" />
        <MetricCard label="COT NC LONG" value="210k" subValue="+4,641/wk" status="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="elegant-card p-6 bg-dark-panel">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">COT GOLD · CFTC</h3>
            <Info className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <div className="space-y-5">
            <ProgressBar label="Non-Commercial LONG" value={58} color="bg-bull" sub="210,009" />
            <ProgressBar label="Non-Commercial SHORT" value={13} color="bg-bear" sub="47,483" />
            <ProgressBar label="Commercial SHORT" value={71} color="bg-bear" sub="256,839" />
          </div>
          <div className="mt-8 overflow-hidden border border-dark-border">
            <table className="w-full text-left text-[11px] font-mono">
              <thead className="bg-dark-surface text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-2 text-[9px] font-bold">Symbol</th>
                  <th className="px-4 py-2 text-[9px] font-bold">Long</th>
                  <th className="px-4 py-2 text-[9px] font-bold">Short</th>
                  <th className="px-4 py-2 text-[9px] font-bold tracking-normal">Delta Unr.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                <tr className="hover:bg-dark-surface/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-white">XAUUSD</td>
                  <td className="px-4 py-3 text-bull">210,009</td>
                  <td className="px-4 py-3 text-bear">47,483</td>
                  <td className="px-4 py-3 text-bull">+$339k</td>
                </tr>
                <tr className="hover:bg-dark-surface/50 transition-colors">
                  <td className="px-4 py-3 font-bold text-white">XAGUSD</td>
                  <td className="px-4 py-3">55,757</td>
                  <td className="px-4 py-3 text-bear">256,839</td>
                  <td className="px-4 py-3">-$19k</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="elegant-card p-6 bg-dark-panel">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Active Pipeline</h3>
            <span className="text-[10px] text-accent-blue font-bold cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-3">
            <CalendarRow date="Tue 22" event="PMI Manufacturing USA" impact="Medium" bg="bg-emerald-600" />
            <CalendarRow date="Thu 24" event="Jobless Claims" impact="High" active bg="bg-rose-600" />
            <CalendarRow date="Fri 25" event="Michigan Sentiment" impact="High" bg="bg-rose-600" />
            <CalendarRow date="May 02" event="Non-Farm Payrolls" impact="Extreme" bg="bg-rose-600" />
          </div>
        </div>
      </div>

      <div className="elegant-card p-6 h-72">
         <div className="flex items-center justify-between mb-6">
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Performance Metrics</h3>
           <div className="text-[10px] font-mono text-emerald-400 underline decoration-dotted decoration-emerald-900 leading-none">824.15</div>
         </div>
         <ResponsiveContainer width="100%" height="80%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#6B7280" fontSize={9} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B7280" fontSize={9} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F1115', border: '1px solid #2A2D35', borderRadius: '4px', fontSize: '11px' }}
                itemStyle={{ color: '#3B82F6' }}
              />
              <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3, fill: '#3B82F6' }} activeDot={{ r: 5 }} />
            </LineChart>
         </ResponsiveContainer>
      </div>
    </div>
  );
}

function MetricCard({ label, value, subValue, status, color = 'text-white' }: { label: string, value: string, subValue: string, status: 'up' | 'down' | 'neutral', color?: string }) {
  const Icon = status === 'up' ? TrendingUp : status === 'down' ? TrendingDown : Minus;
  const statusColor = status === 'up' ? 'text-bull' : status === 'down' ? 'text-bear' : 'text-gray-500';

  return (
    <div className="elegant-card p-5 hover:bg-dark-surface/50 transition-colors cursor-pointer group">
      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2 group-hover:text-gray-400">
        {label}
        <Icon className={cn("w-3 h-3", statusColor)} />
      </div>
      <div className={cn("text-2xl font-bold tracking-tight mb-2", color)}>{value}</div>
      <div className={cn("text-[10px] font-mono font-bold", statusColor)}>{subValue}</div>
    </div>
  );
}

function ProgressBar({ label, value, color, sub }: { label: string, value: number, color: string, sub: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
        <span>{label}</span>
        <span className="text-white font-mono">{sub} · {value}%</span>
      </div>
      <div className="h-1 w-full bg-dark-surface rounded-full overflow-hidden">
        <div className={cn("h-full transition-all duration-1000", color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function CalendarRow({ date, event, impact, active = false, bg = "bg-emerald-600" }: { date: string, event: string, impact: string, active?: boolean, bg?: string }) {
  return (
    <div className={cn("flex items-center justify-between py-3 px-4 transition-all rounded", active ? "bg-dark-surface border-l-2 border-accent-blue" : "border-b border-dark-border hover:bg-dark-surface/30 px-3")}>
      <div className="flex gap-4 items-center">
        <span className="text-[10px] font-bold text-gray-500 min-w-[44px]">{date}</span>
        <span className="text-xs font-bold text-white/90">{event}</span>
      </div>
      <div className="text-right">
        <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded text-white uppercase tracking-tighter", bg)}>
          {impact}
        </span>
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';
