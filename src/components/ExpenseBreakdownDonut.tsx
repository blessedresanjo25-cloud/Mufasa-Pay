import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExpenseCategory } from '../types';
import { AnimatedNumber } from './AnimatedNumber';

interface ExpenseBreakdownDonutProps {
  categories: ExpenseCategory[];
  totalExpenses: number;
}

export const ExpenseBreakdownDonut: React.FC<ExpenseBreakdownDonutProps> = ({
  categories,
  totalExpenses
}) => {
  const [activeCategory, setActiveCategory] = useState<ExpenseCategory | null>(null);

  const radius = 64;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;
  const slices = categories.map((cat, index) => {
    const strokeDasharray = `${(cat.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += cat.percentage;
    return {
      ...cat,
      index,
      strokeDasharray,
      strokeDashoffset
    };
  });

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-[#0d121f] p-5 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white tracking-tight">Expense Breakdown</h2>
        <select className="text-xs font-medium rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 py-1 px-2.5 focus:outline-none focus:border-amber-400 cursor-pointer">
          <option>This Month</option>
          <option>Last 3 Months</option>
          <option>Year to Date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        {/* SVG Donut Chart */}
        <div className="sm:col-span-5 flex justify-center items-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90 transform">
              {slices.map((slice) => {
                const isHovered = activeCategory?.id === slice.id;
                return (
                  <motion.circle
                    key={slice.id}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={slice.strokeDasharray}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: slice.strokeDashoffset }}
                    transition={{
                      duration: 1.2,
                      delay: slice.index * 0.08,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setActiveCategory(slice)}
                    onMouseLeave={() => setActiveCategory(null)}
                  />
                );
              })}
            </svg>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-lg font-mono font-bold text-white tabular-nums tracking-tight">
                {activeCategory ? (
                  `$${activeCategory.amount.toLocaleString()}`
                ) : (
                  <AnimatedNumber value={totalExpenses} prefix="$" decimals={0} duration={1200} />
                )}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {activeCategory ? activeCategory.label : 'Total Expenses'}
              </span>
              {activeCategory && (
                <span className="text-[10px] text-amber-400 font-mono mt-0.5">
                  {activeCategory.percentage}% of total
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Categories Legend List with slide/fade from left staggered 60ms */}
        <div className="sm:col-span-7 space-y-2 text-xs">
          {categories.map((cat, idx) => {
            const isHovered = activeCategory?.id === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActiveCategory(cat)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`flex items-center justify-between py-1 px-2 rounded-lg cursor-pointer transition-colors ${
                  isHovered ? 'bg-slate-800/80' : 'hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className={`font-medium ${isHovered ? 'text-white' : 'text-slate-300'}`}>
                    {cat.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-400 text-[11px] tabular-nums">{cat.percentage}%</span>
                  <span className="text-white font-semibold text-[11px] tabular-nums">
                    ${cat.amount.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
