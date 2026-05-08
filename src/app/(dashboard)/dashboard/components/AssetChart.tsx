"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AssetChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center text-zinc-400 bg-zinc-50/30 rounded-lg border border-dashed border-zinc-200">
        <p className="text-xs font-medium">No data available</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full animate-in fade-in duration-1000">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f1f4" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 500 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 500 }} 
          />
          <Tooltip 
            cursor={{ fill: '#f8f8fa' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white px-3 py-2 rounded-md shadow-sm border border-zinc-200">
                    <p className="text-[10px] font-medium text-zinc-400 mb-0.5">{payload[0].payload.name}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-zinc-950">{payload[0].value}</span>
                      <span className="text-[10px] text-zinc-500 font-medium pt-0.5">Assets</span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="assets" 
            fill="#4d4ad0" 
            radius={[4, 4, 0, 0]} 
            barSize={32}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
