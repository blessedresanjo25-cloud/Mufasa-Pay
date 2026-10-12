import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Receipt, 
  PlusCircle, 
  PieChart, 
  TrendingUp, 
  FileText, 
  BarChart3, 
  Target, 
  CreditCard, 
  Settings, 
  Fingerprint,
  Send,
  Crown,
  X
} from 'lucide-react';
import { ActiveTab } from '../types';
import { playHapticClickSound } from '../utils/audio';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenUpgradeModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onOpenUpgradeModal
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'transactions', label: 'Transactions', icon: <ArrowLeftRight className="w-4 h-4" /> },
    { id: 'expenses', label: 'Expenses', icon: <Receipt className="w-4 h-4" /> },
    { id: 'income', label: 'Income', icon: <PlusCircle className="w-4 h-4" /> },
    { id: 'budgets', label: 'Budgets', icon: <PieChart className="w-4 h-4" /> },
    { id: 'investments', label: 'Investments', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'invoices', label: 'Invoices', icon: <FileText className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'goals', label: 'Goals', icon: <Target className="w-4 h-4" /> },
    { id: 'cards', label: 'Cards', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'gateways', label: 'Gateways & Pay', icon: <Send className="w-4 h-4 text-amber-400" /> },
    { id: 'security', label: 'Biometrics & MFA', icon: <Fingerprint className="w-4 h-4 text-emerald-400" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const handleItemClick = (id: ActiveTab) => {
    playHapticClickSound();
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#090d16] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Logo */}
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              {/* Luxury Gold Lion / Crown Icon */}
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-[1px] shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-[#0a0d16] rounded-xl flex items-center justify-center">
                  <Crown className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
                  Mufasa <span className="gold-gradient-text">Pay</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
                  Private Wealth
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links with layoutId shared sliding highlight */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)] relative">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors z-10 ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/30 -z-10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom "Upgrade to Royal Pro" Card */}
        <div className="p-4 border-t border-slate-800/60">
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-slate-900 via-[#111626] to-[#0c101c] p-4 text-white shadow-xl">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Crown className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-white tracking-tight">Upgrade to Pro</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-snug mb-3">
              Get advanced insights, AI reports and more.
            </p>

            <button
              onClick={onOpenUpgradeModal}
              className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wide shadow-md shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Upgrade Now</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
