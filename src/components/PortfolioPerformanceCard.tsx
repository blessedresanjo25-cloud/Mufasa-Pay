import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PortfolioAsset } from '../types';

interface PortfolioPerformanceCardProps {
  assets: PortfolioAsset[];
  totalValue?: number;
  totalGainPct?: number;
  totalGainAmount?: number;
}

export const PortfolioPerformanceCard: React.FC<PortfolioPerformanceCardProps> = ({
  assets,
  totalValue = 87230,
  totalGainPct = 24.6,
  totalGainAmount = 17240
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-slate-800/90 bg-[#0d121f] p-5 shadow-xl flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-white tracking-tight">Portfolio Performance</h2>
        <select className="text-xs font-medium rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 py-1 px-2.5 focus:outline-none focus:border-amber-400 cursor-pointer">
          <option>All Time</option>
          <option>1 Year</option>
          <option>6 Months</option>
          <option>30 Days</option>
        </select>
      </div>

      {/* Main Metric */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-mono font-bold text-white tabular-nums">
          ${totalValue.toLocaleString()}
        </span>
        <span className="inline-flex items-center text-xs font-bold text-emerald-400">
          <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
          {totalGainPct}%
        </span>
      </div>
      <div className="text-[11px] font-mono text-emerald-400/90 mb-4">
        +${totalGainAmount.toLocaleString()} All time gain
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Glowing Upward Growth Curve */}
        <div className="sm:col-span-7 h-28 relative flex items-center justify-center">
          <svg viewBox="0 0 240 100" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="portfolioGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Area */}
            <motion.path
              d="M 10 80 Q 50 78, 80 65 T 140 45 T 190 30 T 235 15 L 235 95 L 10 95 Z"
              fill="url(#portfolioGlow)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
            {/* Glowing Line */}
            <motion.path
              d="M 10 80 Q 50 78, 80 65 T 140 45 T 190 30 T 235 15"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <circle cx="235" cy="15" r="4.5" fill="#10b981" stroke="#07090e" strokeWidth="2" />
          </svg>
        </div>

        {/* Asset Allocation Breakdown */}
        <div className="sm:col-span-5 space-y-2 text-xs">
          {assets.map((asset, idx) => (
            <motion.div
              key={asset.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: asset.color }}
                />
                <span className="text-slate-300 font-medium">{asset.name}</span>
              </div>
              <span className="font-mono font-semibold text-slate-300 tabular-nums">
                {asset.allocation}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
