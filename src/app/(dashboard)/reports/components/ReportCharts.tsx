"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const COLORS = ['#4d4ad0', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

export default function ReportCharts({ 
  assignments,
  conditionStats 
}: { 
  assignments: any[],
  conditionStats: any[]
}) {
  const formattedConditionStats = conditionStats.map(s => ({
    ...s,
    name: s.name.toUpperCase()
  }));

  // Process status data
  const activeCount = assignments.filter(a => !a.returnedAt).length;
  const returnedCount = assignments.filter(a => !!a.returnedAt).length;
  
  const statusData = [
    { name: 'Active', value: activeCount },
    { name: 'Returned', value: returnedCount },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Status Distribution */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xl font-bold text-zinc-900 tracking-tight">Assignment Status</h3>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span> Active
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Returned
            </span>
          </div>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                innerRadius={65}
                outerRadius={85}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontSize: '12px', fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Asset Condition */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300">
        <h3 className="text-xl font-bold text-zinc-900 tracking-tight mb-10">Asset Conditions</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedConditionStats}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontSize: '12px', fontWeight: 'bold' }}
              />
              <Bar 
                dataKey="value" 
                fill="#4d4ad0" 
                radius={[4, 4, 0, 0]} 
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
