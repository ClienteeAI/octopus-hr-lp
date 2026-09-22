import React from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const funnelData = [
  { name: 'Zdroje', value: 100, fill: '#3B82F6' },
  { name: 'Prověření', value: 75, fill: '#60A5FA' },
  { name: 'Pohovory', value: 40, fill: '#93C5FD' },
  { name: 'Nabídky', value: 15, fill: '#BFDBFE' },
];

const scoreData = [
  { name: 'Score', value: 64, fill: '#10B981' },
  { name: 'Remaining', value: 36, fill: '#E2E8F0' },
];

export const DashboardMockup = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
    >
      {/* Header */}
      <div className="h-12 bg-slate-50 border-bottom border-slate-200 flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="ml-4 h-6 w-64 bg-slate-200 rounded-md animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="p-6 grid grid-cols-12 gap-6 bg-white">
        {/* Left Sidebar / Stats */}
        <div className="col-span-12 md:col-span-4 space-y-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Skóre efektivity náboru</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">64</span>
              <span className="text-slate-400 font-medium">/ 100</span>
            </div>
            <div className="mt-4 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '64%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-highlight"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Panel AI diagnostiky</h4>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <div className="h-2 flex-1 bg-slate-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Main Area */}
        <div className="col-span-12 md:col-span-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-100 h-48">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Náborový trychtýř</h4>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={funnelData} layout="vertical">
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-4 rounded-xl border border-slate-100 h-48 flex flex-col items-center justify-center">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 self-start">Srovnání s trhem</h4>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={scoreData}
                    innerRadius={40}
                    outerRadius={55}
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {scoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-bold text-primary">64%</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-100 h-40">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Analytické grafy</h4>
            <div className="flex items-end justify-between h-20 gap-2">
              {[40, 70, 45, 90, 65, 80, 55, 75].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="w-full bg-accent/20 rounded-t-sm border-t-2 border-accent"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
