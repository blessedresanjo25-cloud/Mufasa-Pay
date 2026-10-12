import React, { useState } from 'react';
import { BellRing, X, Sliders, ShieldCheck, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { playHapticClickSound, playPushAlertSound } from '../utils/audio';

export interface BudgetItem {
  id: string;
  category: string;
  spent: number;
  limit: number;
  color: string;
  icon: string;
  thresholdPercent: number;
}

interface BudgetThresholdModalProps {
  isOpen: boolean;
  onClose: () => void;
  budgets: BudgetItem[];
  onSaveBudgets: (updated: BudgetItem[]) => void;
  onTriggerTestAlert: (categoryName: string, percent: number, spent: number, limit: number) => void;
}

export const BudgetThresholdModal: React.FC<BudgetThresholdModalProps> = ({
  isOpen,
  onClose,
  budgets,
  onSaveBudgets,
  onTriggerTestAlert
}) => {
  const [items, setItems] = useState<BudgetItem[]>(budgets);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleThresholdChange = (id: string, newThreshold: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, thresholdPercent: newThreshold } : item));
  };

  const handleLimitChange = (id: string, newLimit: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, limit: newLimit } : item));
  };

  const handleSave = () => {
    playHapticClickSound();
    onSaveBudgets(items);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleTestAlert = (item: BudgetItem) => {
    playPushAlertSound();
    const percent = Math.round((item.spent / item.limit) * 100);
    onTriggerTestAlert(item.category, percent, item.spent, item.limit);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-amber-500/25 bg-[#0c101c] text-slate-100 shadow-2xl transition-all"
        style={{
          boxShadow: '0 0 50px -10px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Customizable Budget Threshold Alerts</h2>
              <p className="text-xs text-slate-400">Real-time push notifications when category spend reaches threshold</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Thresholds monitor live spending. When any expense category exceeds its designated threshold %, a priority push notification and SMS alert are immediately dispatched to your authenticated devices.
            </span>
          </div>

          {items.map((item) => {
            const currentPct = Math.round((item.spent / item.limit) * 100);
            const isExceeded = currentPct >= item.thresholdPercent;

            return (
              <div 
                key={item.id} 
                className={`p-4 rounded-xl border transition-all ${
                  isExceeded 
                    ? 'border-rose-500/40 bg-rose-950/15' 
                    : 'border-slate-800 bg-slate-900/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{item.category}</span>
                    {isExceeded && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-rose-400 font-medium">
                        <AlertTriangle className="w-3 h-3 text-rose-400" />
                        Trigger Active ({currentPct}%)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleTestAlert(item)}
                      className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1 border border-slate-700"
                    >
                      <BellRing className="w-3 h-3 text-amber-400" />
                      Test Alert
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Monthly Budget Limit ($)</span>
                    <input
                      type="number"
                      step="100"
                      value={item.limit}
                      onChange={(e) => handleLimitChange(item.id, Number(e.target.value) || 1)}
                      className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-amber-300 font-mono font-semibold focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Alert Trigger Threshold (%)</span>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="range"
                        min="50"
                        max="100"
                        step="5"
                        value={item.thresholdPercent}
                        onChange={(e) => handleThresholdChange(item.id, Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                      <span className="font-mono text-xs font-bold text-white w-9 text-right">
                        {item.thresholdPercent}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar preview */}
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(currentPct, 100)}%`,
                      backgroundColor: isExceeded ? '#ef4444' : item.color
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                  <span>Current: ${item.spent.toLocaleString()} ({currentPct}%)</span>
                  <span>Cap: ${item.limit.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Thresholds Updated!</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Save Alert Rules</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
