import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { Transaction } from '../types';

interface RecentInvoicesTableProps {
  transactions: Transaction[];
  onViewAllClick: () => void;
  onSelectTx?: (tx: Transaction) => void;
}

export const RecentInvoicesTable: React.FC<RecentInvoicesTableProps> = ({
  transactions,
  onViewAllClick,
  onSelectTx
}) => {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const displayTransactions = transactions.slice(0, 10);

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-[#0d121f] p-5 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-white tracking-tight">Recent Invoices & Payments</h2>
        <button
          onClick={onViewAllClick}
          className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold text-[11px]">
              <th className="pb-3 font-normal">Date</th>
              <th className="pb-3 font-normal">Description</th>
              <th className="pb-3 font-normal">Type</th>
              <th className="pb-3 font-normal">Amount</th>
              <th className="pb-3 font-normal text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {displayTransactions.map((tx, idx) => {
              const isIncome = tx.type === 'Income';

              return (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    setSelectedTx(tx);
                    if (onSelectTx) onSelectTx(tx);
                  }}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3 text-slate-400 whitespace-nowrap text-[11px]">
                    {tx.date}
                  </td>
                  <td className="py-3 text-white font-medium group-hover:text-amber-300 transition-colors">
                    <div className="flex items-center gap-1.5">
                      <span>{tx.description}</span>
                    </div>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                        isIncome
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 font-mono font-semibold whitespace-nowrap tabular-nums">
                    <span className={isIncome ? 'text-emerald-400' : 'text-slate-200'}>
                      {isIncome ? `+$${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `-$${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </span>
                  </td>
                  <td className="py-3 text-right whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                        tx.status === 'Paid'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : tx.status === 'Received'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Row Encryption Hash Card Popout */}
      {selectedTx && (
        <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300 font-medium">{selectedTx.description}</span>
            <span className="font-mono text-slate-500">· Hash: {selectedTx.encryptedHash}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-mono">{selectedTx.paymentMethod}</span>
            <button
              onClick={() => setSelectedTx(null)}
              className="text-slate-400 hover:text-white ml-2 text-xs"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
