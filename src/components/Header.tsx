import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Calendar, 
  ChevronDown, 
  ShieldCheck, 
  Smartphone, 
  Plus, 
  Sparkles,
  ArrowUpRight,
  Sliders,
  Send,
  LogOut
} from 'lucide-react';
import { User, PushNotification } from '../types';
import { playHapticClickSound } from '../utils/audio';

interface HeaderProps {
  user: User | null;
  notifications: PushNotification[];
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onOpenMobileMenu: () => void;
  onOpenNotificationCenter: () => void;
  onOpenAuthModal: () => void;
  onOpenGatewayModal: () => void;
  onOpenThresholdModal: () => void;
  onTriggerInflow: () => void;
  onSignOut: () => void;
  dateRange: string;
  onDateRangeChange: (val: string) => void;
  syncTime: string;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  notifications,
  searchTerm,
  onSearchChange,
  onOpenMobileMenu,
  onOpenNotificationCenter,
  onOpenAuthModal,
  onOpenGatewayModal,
  onOpenThresholdModal,
  onTriggerInflow,
  onSignOut,
  dateRange,
  onDateRangeChange,
  syncTime
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-[#07090e]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Search & Profile Bar */}
      <div className="px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Search bar */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 md:hidden transition-colors"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar matching image */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search transactions, invoices, or anything..."
              className="w-full pl-10 pr-12 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/40 transition-all"
            />
            <div className="absolute right-2.5 top-2 px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800 text-[10px] font-mono text-slate-400">
              ⌘ K
            </div>
          </div>
        </div>

        {/* Right: Sync Status, Notification Bell, User Account */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          {/* Cross-Platform Cloud Sync status pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Encrypted Sync: {syncTime}</span>
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => {
              playHapticClickSound();
              onOpenNotificationCenter();
            }}
            className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            title="Notification Center"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-md">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth Button with Sign Out menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-900/80 transition-colors text-left"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-amber-400/40 ring-1 ring-amber-400/20">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden sm:block">
                  <span className="text-xs font-bold text-white block leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-tight">
                    Personal Account
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0c101d] border border-slate-800 shadow-2xl py-2 z-50 text-xs">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <span className="font-bold text-white block">{user.name}</span>
                    <span className="text-[10px] text-slate-400 truncate block">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onSignOut();
                    }}
                    className="w-full px-4 py-2.5 text-left text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Greeting Row & Action Toolbar */}
      <div className="px-4 md:px-8 py-3.5 border-t border-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
            Good morning, {user ? user.name.split(' ')[0] : 'Alex'}!
          </h1>
          <p className="text-xs text-slate-400">
            Here's your financial overview for today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Range Picker */}
          <div className="relative inline-flex items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={dateRange}
                onChange={(e) => onDateRangeChange(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer appearance-none pr-4 text-xs font-sans"
              >
                <option value="May 1, 2024 – May 31, 2024">May 1, 2024 – May 31, 2024</option>
                <option value="Apr 1, 2024 – Apr 30, 2024">Apr 1, 2024 – Apr 30, 2024</option>
                <option value="Q2 2024 (Apr – Jun)">Q2 2024 (Apr – Jun)</option>
                <option value="Year to Date 2024">Year to Date 2024</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 pointer-events-none -ml-3" />
            </div>
          </div>

          {/* Action Buttons */}
          <button
            onClick={onOpenGatewayModal}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 text-slate-950" />
            <span>Send & Pay</span>
          </button>

          <button
            onClick={onTriggerInflow}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
            title="Simulate realistic client deposit"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simulate Deposit</span>
          </button>
        </div>
      </div>
    </header>
  );
};
