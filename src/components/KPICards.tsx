import React from 'react';
import { motion } from 'motion/react';
import { 
  Wallet, 
  BarChart2, 
  X, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { KPISummary } from '../types';
import { AnimatedNumber } from './AnimatedNumber';
import { fadeUp, staggerContainer, popIn } from '../utils/motion';

interface KPICardsProps {
  kpi: KPISummary;
}

export const KPICards: React.FC<KPICardsProps> = ({ kpi }) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {/* 1. Total Balance */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-slate-800/90 bg-[#0d121f] p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
            <Wallet className="w-5 h-5" />
          </div>
          <button className="text-slate-500 hover:text-slate-300 transition-colors p-1" title="Options">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div>
          <span className="text-xs text-slate-400 font-medium block">Total Balance</span>
          <div className="text-2xl font-mono font-bold text-white tracking-tight my-1 tabular-nums">
            <AnimatedNumber value={kpi.totalBalance} prefix="$" decimals={0} duration={1000} />
          </div>
          <motion.div
            variants={popIn}
            className="flex items-center text-xs text-emerald-400 font-medium"
          >
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>{kpi.balanceChange}%</span>
            <span className="text-slate-500 ml-1 font-normal">vs last month</span>
          </motion.div>
        </div>
      </motion.div>

      {/* 2. Monthly Income */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-slate-800/90 bg-[#0d121f] p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
            <BarChart2 className="w-5 h-5" />
          </div>
          <button className="text-slate-500 hover:text-slate-300 transition-colors p-1" title="Options">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div>
          <span className="text-xs text-slate-400 font-medium block">Monthly Income</span>
          <div className="text-2xl font-mono font-bold text-white tracking-tight my-1 tabular-nums">
            <AnimatedNumber value={kpi.monthlyIncome} prefix="$" decimals={0} duration={1000} />
          </div>
          <motion.div
            variants={popIn}
            className="flex items-center text-xs text-emerald-400 font-medium"
          >
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>{kpi.incomeChange}%</span>
            <span className="text-slate-500 ml-1 font-normal">vs last month</span>
          </motion.div>
        </div>
      </motion.div>

      {/* 3. Monthly Expenses */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-slate-800/90 bg-[#0d121f] p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
            <X className="w-5 h-5 stroke-[2.5]" />
          </div>
          <button className="text-slate-500 hover:text-slate-300 transition-colors p-1" title="Options">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div>
          <span className="text-xs text-slate-400 font-medium block">Monthly Expenses</span>
          <div className="text-2xl font-mono font-bold text-white tracking-tight my-1 tabular-nums">
            <AnimatedNumber value={kpi.monthlyExpenses} prefix="$" decimals={0} duration={1000} />
          </div>
          <motion.div
            variants={popIn}
            className="flex items-center text-xs text-rose-400 font-medium"
          >
            <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            <span>{Math.abs(kpi.expenseChange)}%</span>
            <span className="text-slate-500 ml-1 font-normal">vs last month</span>
          </motion.div>
        </div>
      </motion.div>

      {/* 4. Net Profit */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl border border-slate-800/90 bg-[#0d121f] p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30">
            <PieChart className="w-5 h-5" />
          </div>
          <button className="text-slate-500 hover:text-slate-300 transition-colors p-1" title="Options">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div>
          <span className="text-xs text-slate-400 font-medium block">Net Profit</span>
          <div className="text-2xl font-mono font-bold text-white tracking-tight my-1 tabular-nums">
            <AnimatedNumber value={kpi.netProfit} prefix="$" decimals={0} duration={1000} />
          </div>
          <motion.div
            variants={popIn}
            className="flex items-center text-xs text-emerald-400 font-medium"
          >
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            <span>{kpi.profitChange}%</span>
            <span className="text-slate-500 ml-1 font-normal">vs last month</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
