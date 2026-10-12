import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Search, 
  Filter, 
  Download, 
  Lock, 
  CheckCircle2, 
  ShieldCheck, 
  Send,
  Sparkles
} from 'lucide-react';
import { Transaction } from '../../types';
import { playHapticClickSound } from '../../utils/audio';

interface TransactionsViewProps {
  transactions: Transaction[];
  onOpenGatewayModal: () => void;
  onSelectTx: (tx: Transaction) => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  onOpenGatewayModal,
  onSelectTx
}) => {
  const [filterType, setFilterType] = useState<'All' | 'Income' | 'Expense'>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = transactions.filter((tx) => {
    const matchesType = filterType === 'All' || tx.type === filterType;
    const matchesStatus = filterStatus === 'All' || tx.status === filterStatus;
    const matchesSearch = 
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.encryptedHash.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const handleExport = () => {
    playHapticClickSound();
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["ID,Date,Description,Type,Amount,Status,Method,SHA256_Hash"]
      .concat(filtered.map(t => `${t.id},${t.date},"${t.description}",${t.type},${t.amount},${t.status},"${t.paymentMethod}",${t.encryptedHash}`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mufasa_pay_ledger_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0d121f] border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Cryptographic Transaction Ledger</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-normal">
              AES-256 Verified
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-rail audit trail with zero-knowledge tamper proofs and automated categorization.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExport}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onOpenGatewayModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Send className="w-4 h-4 text-slate-950" />
            <span>New Transfer</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by payee, category, method, or hash..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          {/* Type tabs */}
          <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            {(['All', 'Income', 'Expense'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  filterType === t ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Status selector */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Received">Received</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0d121f] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 font-semibold text-[11px]">
                <th className="p-4 font-normal">Date & Time</th>
                <th className="p-4 font-normal">Description / Payee</th>
                <th className="p-4 font-normal">Rail & Method</th>
                <th className="p-4 font-normal">Category</th>
                <th className="p-4 font-normal">Amount</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal text-right">Cryptographic Proof</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((tx) => {
                const isIncome = tx.type === 'Income';
                return (
                  <tr
                    key={tx.id}
                    onClick={() => onSelectTx(tx)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors group"
                  >
                    <td className="p-4 text-slate-400 whitespace-nowrap text-[11px]">
                      {tx.date}
                    </td>
                    <td className="p-4 font-semibold text-white group-hover:text-amber-300 transition-colors">
                      {tx.description}
                    </td>
                    <td className="p-4 text-slate-300 font-mono text-[11px]">
                      {tx.paymentMethod}
                    </td>
                    <td className="p-4 text-slate-400">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px]">
                        {tx.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold whitespace-nowrap tabular-nums">
                      <span className={isIncome ? 'text-emerald-400' : 'text-slate-100'}>
                        {isIncome ? `+$${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `-$${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
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
                    <td className="p-4 text-right font-mono text-[11px] text-slate-500">
                      <span className="group-hover:text-amber-400 transition-colors">
                        {tx.encryptedHash}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
