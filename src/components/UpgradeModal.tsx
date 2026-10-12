import React from 'react';
import { Crown, Check, X, Sparkles, Shield, Zap } from 'lucide-react';
import { playBiometricSuccessSound } from '../utils/audio';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgraded: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onUpgraded
}) => {
  if (!isOpen) return null;

  const handleSelectTier = () => {
    playBiometricSuccessSound();
    onUpgraded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-amber-500/30 bg-[#0c101d] text-slate-100 shadow-2xl"
        style={{
          boxShadow: '0 0 60px -10px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 mx-auto mb-4 shadow-lg shadow-amber-500/25">
            <div className="w-full h-full bg-[#0a0d16] rounded-2xl flex items-center justify-center">
              <Crown className="w-7 h-7 text-amber-400 fill-amber-400/20" />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Mufasa Royal Sovereign Tier
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto">
            Private banking infrastructure, unlimited multi-currency SWIFT wires, zero-knowledge encrypted cloud backups, and dedicated wealth management.
          </p>

          <div className="my-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-baseline justify-center gap-1.5">
            <span className="text-3xl font-extrabold text-amber-400 font-mono">$250</span>
            <span className="text-xs text-slate-400 font-medium">/ month billed annually</span>
          </div>

          <div className="space-y-2.5 text-left text-xs mb-6 max-w-sm mx-auto">
            {[
              'Unlimited Zero-Fee SWIFT & Fedwire Transactions',
              'Sub-second Biometric Enclave Signatures & Passkeys',
              'Dedicated 24/7 Sovereign Concierge Banker',
              'Real-Time Multi-Asset Portfolio Telemetry & AI Reports',
              'Heavy Titanium Metallic Physical Card with Custom Engraving',
              'Cross-Platform End-to-End Encrypted Cloud Synchronization'
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-slate-300">
                <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleSelectTier}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-extrabold text-sm tracking-wide shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Upgrade to Sovereign Royal Tier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
