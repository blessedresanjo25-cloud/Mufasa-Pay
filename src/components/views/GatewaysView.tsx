import React from 'react';
import { 
  Send, 
  CreditCard, 
  Globe, 
  Smartphone, 
  Coins, 
  CheckCircle2, 
  ExternalLink, 
  Lock,
  Sparkles,
  Zap
} from 'lucide-react';
import { PaymentGateway } from '../../types';
import { playHapticClickSound } from '../../utils/audio';

interface GatewaysViewProps {
  gateways: PaymentGateway[];
  onOpenGatewayModal: () => void;
}

export const GatewaysView: React.FC<GatewaysViewProps> = ({
  gateways,
  onOpenGatewayModal
}) => {
  const getIcon = (provider: PaymentGateway['provider']) => {
    switch (provider) {
      case 'apple_pay':
        return <Smartphone className="w-5 h-5 text-slate-100" />;
      case 'paypal':
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 'crypto':
        return <Coins className="w-5 h-5 text-amber-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#0d121f] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" />
            Cross-Border Settlement Engine
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Third-Party Payment Gateways & Global Rails
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Seamlessly connect Stripe, PayPal, Apple Pay, Google Pay, SWIFT/Fedwire, and multi-chain crypto with client-side biometric verification.
          </p>
        </div>

        <button
          onClick={onOpenGatewayModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shrink-0"
        >
          <Send className="w-4 h-4 text-slate-950" />
          <span>Launch Gateway Transfer</span>
        </button>
      </div>

      {/* Gateway Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gateways.map((gw) => (
          <div
            key={gw.id}
            className="p-5 rounded-2xl bg-[#0d121f] border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700/60 group-hover:scale-105 transition-transform">
                  {getIcon(gw.provider)}
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3" />
                  {gw.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {gw.name}
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Fee: <span className="text-amber-400">{gw.fee}</span>
              </p>

              <div className="mt-3 pt-3 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">
                  Supported Methods
                </span>
                <div className="flex flex-wrap gap-1">
                  {gw.supportedTypes.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-sans"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                {gw.encryptionLevel.split('/')[0]}
              </span>
              <button
                onClick={onOpenGatewayModal}
                className="text-amber-400 hover:underline font-semibold text-[11px] flex items-center gap-1"
              >
                <span>Initiate</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
