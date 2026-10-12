import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  ArrowDownToLine, 
  Music, 
  ShoppingCart, 
  UserCheck, 
  Zap,
  CreditCard
} from 'lucide-react';
import { FinancialActivity } from '../types';

interface FinancialActivityFeedProps {
  activities: FinancialActivity[];
  onViewAllClick: () => void;
}

export const FinancialActivityFeed: React.FC<FinancialActivityFeedProps> = ({
  activities,
  onViewAllClick
}) => {
  const getActivityIcon = (icon: string) => {
    switch (icon) {
      case 'deposit':
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ArrowDownToLine className="w-4 h-4" />
          </div>
        );
      case 'spotify':
        return (
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <Music className="w-4 h-4" />
          </div>
        );
      case 'grocery':
        return (
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <ShoppingCart className="w-4 h-4" />
          </div>
        );
      case 'client':
        return (
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
        );
      case 'electricity':
        return (
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <CreditCard className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-[#0d121f] p-5 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white tracking-tight">Financial Activity</h2>
        <button
          onClick={onViewAllClick}
          className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-3.5 text-xs">
        {activities.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between group hover:bg-slate-800/30 p-1.5 -mx-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {getActivityIcon(item.icon)}
              <div>
                <h4 className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                  {item.timestamp}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span
                className={`font-mono font-bold text-xs tabular-nums ${
                  item.isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {item.isPositive
                  ? `+$${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : `-$${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
