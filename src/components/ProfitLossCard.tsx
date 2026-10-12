import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface ProfitLossCardProps {
  totalIncome: number;
  totalExpenses: number;
  operatingProfit: number;
  otherIncome: number;
  netProfit: number;
}

export const ProfitLossCard: React.FC<ProfitLossCardProps> = ({
  totalIncome,
  totalExpenses,
  operatingProfit,
  otherIncome,
  netProfit
}) => {
  return (
    <div className="rounded-2xl border border-slate-800/90 bg-[#0d121f] p-5 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white tracking-tight">Profit & Loss</h2>
        <select className="text-xs font-medium rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 py-1 px-2.5 focus:outline-none focus:border-amber-400 cursor-pointer">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Year to Date</option>
        </select>
      </div>

      {/* Rows */}
      <div className="space-y-3.5 text-xs">
        {/* Total Income */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Total Income</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white tabular-nums">
              ${totalIncome.toLocaleString()}
            </span>
            <span className="inline-flex items-center text-[11px] font-medium text-emerald-400">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              8.3%
            </span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Total Expenses</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white tabular-nums">
              ${totalExpenses.toLocaleString()}
            </span>
            <span className="inline-flex items-center text-[11px] font-medium text-rose-400">
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
              6.1%
            </span>
          </div>
        </div>

        {/* Operating Profit */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Operating Profit</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white tabular-nums">
              ${operatingProfit.toLocaleString()}
            </span>
            <span className="inline-flex items-center text-[11px] font-medium text-emerald-400">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              14.2%
            </span>
          </div>
        </div>

        {/* Other Income */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Other Income</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white tabular-nums">
              ${otherIncome.toLocaleString()}
            </span>
            <span className="inline-flex items-center text-[11px] font-medium text-emerald-400">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              22.1%
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-slate-800" />

      {/* Net Profit Row */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-sm font-bold text-white">Net Profit</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-emerald-400 tabular-nums">
            ${netProfit.toLocaleString()}
          </span>
          <span className="inline-flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            18.7%
          </span>
        </div>
      </div>
    </div>
  );
};
