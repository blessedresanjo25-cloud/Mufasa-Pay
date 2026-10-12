import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Lock, 
  Wifi, 
  Sparkles, 
  Copy, 
  Check, 
  Plus
} from 'lucide-react';
import { playHapticClickSound } from '../../utils/audio';

interface CardsViewProps {
  onTriggerBiometricAuth: (onSuccess: () => void) => void;
}

export const CardsView: React.FC<CardsViewProps> = ({ onTriggerBiometricAuth }) => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  const handleRevealToggle = () => {
    if (!revealed) {
      // Must pass biometric authentication first!
      onTriggerBiometricAuth(() => {
        setRevealed(true);
      });
    } else {
      setRevealed(false);
    }
  };

  const handleCopyCard = () => {
    playHapticClickSound();
    navigator.clipboard?.writeText?.('4242 8819 0421 9012');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#0d121f] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Mufasa Royal Metallic Cards</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-normal">
              Physical & Virtual
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic CVV refresh, zero foreign transaction fees, and instant biometric authorization on Apple Pay & Google Pay.
          </p>
        </div>

        <button
          onClick={() => alert("New virtual card provisioned in your secure vault.")}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Issue Virtual Card</span>
        </button>
      </div>

      {/* Card Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* The Royal Black Titanium Card */}
        <div 
          className="relative aspect-[1.586/1] rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all"
          style={{
            background: 'linear-gradient(135deg, #0b0f19 0%, #171d2c 45%, #080a11 100%)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.9), 0 0 30px -5px rgba(212, 175, 55, 0.2)'
          }}
        >
          {/* Subtle gold metallic shimmer line */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-amber-400/10 pointer-events-none" />

          {/* Top Row: Chip, Contactless, Mufasa emblem */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              {/* EMV Chip Visual */}
              <div className="w-11 h-9 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 border border-amber-300 shadow-sm flex items-center justify-center p-1">
                <div className="w-full h-full border border-amber-700/40 rounded-xs grid grid-cols-2 gap-0.5">
                  <div className="border-r border-b border-amber-800/40" />
                  <div className="border-b border-amber-800/40" />
                  <div className="border-r border-amber-800/40" />
                  <div />
                </div>
              </div>
              <Wifi className="w-5 h-5 text-amber-400/80 rotate-90" />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold text-white tracking-widest uppercase">
                MUFASA <span className="gold-gradient-text">BLACK</span>
              </span>
            </div>
          </div>

          {/* Middle: Card Number */}
          <div className="my-auto relative z-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold tracking-widest text-slate-100 tabular-nums">
                {revealed ? '4242  8819  0421  9012' : '••••  ••••  ••••  9012'}
              </span>
              <button
                onClick={handleCopyCard}
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 transition-colors"
                title="Copy card number"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-6 mt-3 text-xs font-mono text-slate-400">
              <div>
                <span className="text-[10px] block text-slate-500 uppercase tracking-wider">Valid Thru</span>
                <span className="text-white font-semibold">{revealed ? '08/29' : '••/••'}</span>
              </div>
              <div>
                <span className="text-[10px] block text-slate-500 uppercase tracking-wider">CVV</span>
                <span className="text-amber-400 font-bold">{revealed ? '842' : '•••'}</span>
              </div>
              <div>
                <span className="text-[10px] block text-slate-500 uppercase tracking-wider">Tier</span>
                <span className="text-amber-300 font-semibold">Titanium Sovereign</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Cardholder & Network Logo */}
          <div className="flex items-center justify-between relative z-10 pt-2 border-t border-slate-800/60">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Cardholder</span>
              <span className="text-xs font-bold text-slate-200 tracking-wider uppercase font-sans">
                ALEX MORGAN
              </span>
            </div>

            {/* Mastercard Interlocking Circles in Gold & Ruby */}
            <div className="flex items-center -space-x-3">
              <div className="w-7 h-7 rounded-full bg-amber-500/90 shadow-xs" />
              <div className="w-7 h-7 rounded-full bg-rose-600/80 mix-blend-screen shadow-xs" />
            </div>
          </div>
        </div>

        {/* Card Controls Panel */}
        <div className="p-6 rounded-2xl bg-[#0d121f] border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Card Security Controls</h3>
            <p className="text-xs text-slate-400 mb-4">
              Protected by Mufasa Biometric Enclave. Sensitive credentials are hidden behind Touch ID / Face ID.
            </p>

            <div className="space-y-3">
              {/* Reveal CVV Toggle */}
              <button
                onClick={handleRevealToggle}
                className="w-full p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:border-amber-400 text-left transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {revealed ? 'Hide Card Details' : 'Reveal Number & CVV'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {revealed ? 'Credentials visible' : 'Requires Biometric verification'}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-amber-400 font-semibold font-mono">
                  {revealed ? 'Active' : 'Authenticate'}
                </span>
              </button>

              {/* Freeze Card Toggle */}
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Freeze Physical Card</span>
                  <span className="text-[11px] text-slate-400">Immediately pauses all POS & online charges</span>
                </div>
                <input
                  type="checkbox"
                  checked={isFrozen}
                  onChange={(e) => {
                    playHapticClickSound();
                    setIsFrozen(e.target.checked);
                  }}
                  className="accent-amber-400 cursor-pointer w-4 h-4"
                />
              </div>

              {/* Spending Limits */}
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-300 font-medium">Daily ATM & POS Limit</span>
                  <span className="font-mono text-amber-400 font-bold">$25,000 / $50,000</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Apple Pay / G-Pay Enrolled</span>
            <span className="text-emerald-400 font-semibold">Active · 2 Devices</span>
          </div>
        </div>
      </div>
    </div>
  );
};
