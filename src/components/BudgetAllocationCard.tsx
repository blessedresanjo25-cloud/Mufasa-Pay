import React from 'react';
import { motion } from 'motion/react';
import { Home, Utensils, Car, Gamepad2, ShoppingBag, Sliders } from 'lucide-react';
import { BudgetItem } from './BudgetThresholdModal';

interface BudgetAllocationCardProps {
  budgets: BudgetItem[];
  totalSpent?: number;
  totalBudget?: number;
  onOpenThresholdModal: () => void;
}

export const BudgetAllocationCard: React.FC<BudgetAllocationCardProps> = ({
  budgets,
  totalSpent = 8500,
  totalBudget = 12000,
  onOpenThresholdModal
}) => {
  const overallPercentage = Math.round((totalSpent / totalBudget) * 100);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return <Home className="w-3.5 h-3.5 text-rose-400" />;
      case 'utensils':
        return <Utensils className="w-3.5 h-3.5 text-blue-400" />;
      case 'car':
        return <Car className="w-3.5 h-3.5 text-purple-400" />;
      case 'gamepad':
        return <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

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
        <h2 className="text-sm font-bold text-white tracking-tight">Budget Allocation</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenThresholdModal}
            className="p-1 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
            title="Configure category alert thresholds"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
          <select className="text-xs font-medium rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 py-1 px-2.5 focus:outline-none focus:border-amber-400 cursor-pointer">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Next Month Projection</option>
          </select>
        </div>
      </div>

      {/* Main Budget Bar */}
      <div className="mb-4">
        <div className="flex items-baseline justify-between text-xs mb-1.5">
          <div>
            <span className="font-mono text-base font-bold text-emerald-400 tabular-nums">
              ${totalSpent.toLocaleString()}
            </span>
            <span className="text-slate-400 text-xs ml-1">
              of ${totalBudget.toLocaleString()} used
            </span>
          </div>
          <span className="font-mono font-semibold text-slate-300">{overallPercentage}%</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="bg-emerald-400 h-full rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${overallPercentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Category List */}
      <div className="space-y-3 text-xs">
        {budgets.map((item, idx) => {
          const pct = Math.round((item.spent / item.limit) * 100);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-slate-900 flex items-center justify-center">
                    {getCategoryIcon(item.icon)}
                  </div>
                  <span className="text-slate-300 font-medium">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400 text-[11px] tabular-nums">
                    ${item.spent.toLocaleString()} / ${item.limit.toLocaleString()}
                  </span>
                  <span className="font-mono text-slate-300 font-semibold text-[11px] w-8 text-right tabular-nums">
                    {pct}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(pct, 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
