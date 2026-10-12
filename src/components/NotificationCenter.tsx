import React from 'react';
import { 
  Bell, 
  X, 
  CheckCheck, 
  AlertTriangle, 
  ArrowDownLeft, 
  ShieldCheck, 
  Sparkles, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { PushNotification } from '../types';
import { playHapticClickSound, playPushAlertSound } from '../utils/audio';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: PushNotification[];
  onMarkAllRead: () => void;
  onClearAll: () => void;
  onSelectNotification: (notif: PushNotification) => void;
  onTriggerDemoNotification: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClearAll,
  onSelectNotification,
  onTriggerDemoNotification
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRequestPushPermission = async () => {
    playHapticClickSound();
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        playPushAlertSound();
        new Notification('Mufasa Pay Push Active', {
          body: 'Real-time biometric & transaction push alerts are now active on this device.',
          icon: '/favicon.ico'
        });
      }
    }
  };

  const getIcon = (type: PushNotification['type']) => {
    switch (type) {
      case 'budget':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'transaction':
        return <ArrowDownLeft className="w-4 h-4 text-emerald-400" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-[#0b0f19] border-l border-amber-500/20 shadow-2xl flex flex-col text-slate-100"
        style={{
          boxShadow: '-10px 0 40px -10px rgba(0,0,0,0.8)'
        }}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Push Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] font-mono">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">Cross-device instant alerts & budget triggers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Browser Permission Prompt */}
        <div className="px-5 py-3 bg-amber-950/20 border-b border-amber-500/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-amber-300">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Enable native browser push</span>
          </div>
          <button
            onClick={handleRequestPushPermission}
            className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/40 transition-colors"
          >
            Enable
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-5 py-2.5 bg-slate-900/40 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={onMarkAllRead}
            className="hover:text-amber-400 transition-colors flex items-center gap-1 text-[11px]"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onTriggerDemoNotification}
              className="text-amber-400 hover:underline text-[11px] font-medium"
            >
              + Trigger Demo Alert
            </button>
            <button
              onClick={onClearAll}
              className="hover:text-slate-200 transition-colors text-[11px]"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <Bell className="w-10 h-10 text-slate-700 mb-3" />
              <p className="text-sm font-semibold text-slate-400">All caught up</p>
              <p className="text-xs text-slate-600 mt-1">No pending transaction or budget notifications.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onSelectNotification(notif)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  notif.read 
                    ? 'bg-slate-900/30 border-slate-800/60 opacity-80 hover:opacity-100 hover:border-slate-700' 
                    : 'bg-slate-900/90 border-amber-500/30 hover:border-amber-400/60 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800/80 shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-xs font-bold truncate ${notif.read ? 'text-slate-300' : 'text-white'}`}>
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {notif.message}
                    </p>
                    {notif.linkTab && (
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-400 hover:underline">
                        <span>View details</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/40 text-[11px] text-slate-500 flex items-center justify-between">
          <span>End-to-End Encrypted Push</span>
          <span className="font-mono text-emerald-400">Active · 3 Devices</span>
        </div>
      </div>
    </div>
  );
};
