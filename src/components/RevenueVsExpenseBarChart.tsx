import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RevenueVsExpenseMonth } from '../types';

interface RevenueVsExpenseBarChartProps {
  data: RevenueVsExpenseMonth[];
}

export const RevenueVsExpenseBarChart: React.FC<RevenueVsExpenseBarChartProps> = ({
  data
}) => {
  const [hoveredMonth, setHoveredMonth] = useState<RevenueVsExpenseMonth | null>(data[data.length - 1]);

  const maxVal = 40000;
  const chartHeight = 160;

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-[#0d121f] p-5 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight">Revenue vs Expense</h2>
          <div className="flex items-center gap-3 text-xs mt-0.5">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              Revenue
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
              Expenses
            </span>
          </div>
        </div>

        <select className="text-xs font-medium rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 py-1 px-2.5 focus:outline-none focus:border-amber-400 cursor-pointer">
          <option>Last 6 Months</option>
          <option>This Year</option>
          <option>Last 12 Months</option>
        </select>
      </div>

      {/* Chart Canvas */}
      <div className="relative pt-6 pb-2">
        {hoveredMonth && (
          <div className="absolute right-2 top-0 z-10 rounded-lg bg-slate-900/95 border border-slate-700/80 px-2.5 py-1.5 text-[11px] shadow-lg backdrop-blur-md">
            <div className="font-semibold text-slate-300 text-[10px] mb-0.5">{hoveredMonth.month} 2024</div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Revenue: ${hoveredMonth.revenue.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Expenses: ${hoveredMonth.expenses.toLocaleString()}</span>
            </div>
          </div>
        )}

        <div className="flex items-end justify-between h-[160px] pt-4 px-2 border-b border-slate-800">
          {data.map((item, idx) => {
            const revHeight = (item.revenue / maxVal) * chartHeight;
            const expHeight = (item.expenses / maxVal) * chartHeight;
            const isHovered = hoveredMonth?.month === item.month;

            return (
              <div
                key={item.month}
                onMouseEnter={() => setHoveredMonth(item)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="flex items-end gap-1.5 h-[130px]">
                  {/* Revenue Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: revHeight }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 16,
                      delay: idx * 0.09
                    }}
                    className={`w-3.5 rounded-t-sm transition-colors ${
                      isHovered ? 'bg-[#10b981] brightness-125' : 'bg-[#10b981]/80 group-hover:bg-[#10b981]'
                    }`}
                  />

                  {/* Expense Bar (trailing by 60ms) */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: expHeight }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 16,
                      delay: idx * 0.09 + 0.06
                    }}
                    className={`w-3.5 rounded-t-sm transition-colors ${
                      isHovered ? 'bg-[#3b82f6] brightness-125' : 'bg-[#3b82f6]/80 group-hover:bg-[#3b82f6]'
                    }`}
                  />
                </div>

                <span className={`text-[11px] font-sans transition-colors ${
                  isHovered ? 'text-amber-400 font-bold' : 'text-slate-500'
                }`}>
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>

        {/* Y Axis Guide ticks */}
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1 px-1">
          <span>$0</span>
          <span>$10K</span>
          <span>$20K</span>
          <span>$30K</span>
          <span>$40K</span>
        </div>
      </div>
    </div>
  );
};
