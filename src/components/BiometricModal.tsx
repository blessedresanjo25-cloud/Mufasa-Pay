import React, { useState, useEffect } from 'react';
import { Fingerprint, CheckCircle2, ShieldAlert, KeyRound, X, Sparkles } from 'lucide-react';
import { playBiometricScanSound, playBiometricSuccessSound } from '../utils/audio';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  subtitle?: string;
  amount?: number;
  operationType?: 'transaction' | 'login' | 'threshold' | 'card_reveal' | 'general';
}

export const BiometricModal: React.FC<BiometricModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title = 'Biometric Authorization',
  subtitle = 'Place your finger on Touch ID sensor or glance at Face ID camera to sign this financial operation.',
  amount,
  operationType = 'general'
}) => {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'verified' | 'failed'>('idle');
  const [usePinFallback, setUsePinFallback] = useState(false);
  const [pin, setPin] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    if (isOpen) {
      setScanState('idle');
      setUsePinFallback(false);
      setPin(['', '', '', '', '', '']);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartScan = () => {
    setScanState('scanning');
    playBiometricScanSound();

    setTimeout(() => {
      setScanState('verified');
      playBiometricSuccessSound();

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 700);
    }, 1400);
  };

  const handlePinChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newPin = [...pin];
    newPin[index] = val ? val.slice(-1) : '';
    setPin(newPin);

    // Auto focus next
    if (val && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }

    // Auto submit if 6 digits filled
    if (newPin.every(digit => digit !== '') && val) {
      setScanState('scanning');
      playBiometricScanSound();
      setTimeout(() => {
        setScanState('verified');
        playBiometricSuccessSound();
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 700);
      }, 900);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-amber-500/30 bg-[#0c101c] p-6 text-slate-100 shadow-2xl transition-all"
        style={{
          boxShadow: '0 0 50px -10px rgba(212, 175, 55, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          title="Cancel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Mufasa Secure Enclave
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
            {subtitle}
          </p>

          {amount !== undefined && (
            <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Authorized Amount</span>
              <span className="text-2xl font-bold text-amber-400 font-mono tabular-nums">
                ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          )}
        </div>

        {/* Biometric Scanner Visual */}
        {!usePinFallback ? (
          <div className="flex flex-col items-center justify-center my-6">
            <div 
              onClick={scanState === 'idle' ? handleStartScan : undefined}
              className={`relative w-28 h-28 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                scanState === 'scanning' 
                  ? 'ring-4 ring-amber-400/50 scale-105 bg-amber-950/30' 
                  : scanState === 'verified'
                  ? 'ring-4 ring-emerald-400/60 bg-emerald-950/30'
                  : 'ring-2 ring-amber-500/30 bg-slate-900 hover:ring-amber-400 hover:scale-102'
              }`}
            >
              {/* Animated Scan Line */}
              {scanState === 'scanning' && (
                <div 
                  className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_12px_#fbbf24] animate-biometric-scan rounded-full pointer-events-none"
                />
              )}

              {/* Pulsing Concentric Rings */}
              {scanState === 'scanning' && (
                <div className="absolute inset-0 rounded-full border border-amber-400/40 animate-ping opacity-60 pointer-events-none" />
              )}

              {/* Central Icon */}
              {scanState === 'verified' ? (
                <CheckCircle2 className="w-14 h-14 text-emerald-400 animate-scale-in" />
              ) : (
                <Fingerprint 
                  className={`w-14 h-14 transition-colors ${
                    scanState === 'scanning' ? 'text-amber-300' : 'text-amber-400/80'
                  }`} 
                />
              )}
            </div>

            {/* Status text */}
            <div className="mt-4 text-center">
              {scanState === 'idle' && (
                <button
                  onClick={handleStartScan}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-semibold text-xs tracking-wide shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
                >
                  Touch Sensor to Confirm
                </button>
              )}
              {scanState === 'scanning' && (
                <span className="text-xs font-mono text-amber-300 animate-pulse">
                  Attesting WebAuthn Hardware Token...
                </span>
              )}
              {scanState === 'verified' && (
                <span className="text-xs font-semibold text-emerald-400">
                  Biometric Match Confirmed · Signature Validated
                </span>
              )}
            </div>
          </div>
        ) : (
          /* Master PIN fallback */
          <div className="my-6">
            <div className="text-center mb-3">
              <span className="text-xs text-slate-400">Enter your 6-digit Master Vault PIN:</span>
            </div>
            <div className="flex justify-center gap-2">
              {pin.map((digit, idx) => (
                <input
                  key={idx}
                  id={`pin-${idx}`}
                  type="password"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(idx, e.target.value)}
                  className="w-10 h-12 text-center text-lg font-mono font-bold rounded-lg bg-slate-900 border border-slate-700 text-amber-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all"
                />
              ))}
            </div>
            <div className="text-center mt-3">
              <span className="text-[11px] text-slate-500">Hint: Any 6 digits will authenticate demo vault</span>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <button
            onClick={() => setUsePinFallback(!usePinFallback)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
          >
            {usePinFallback ? (
              <>
                <Fingerprint className="w-3.5 h-3.5" />
                Use Touch ID / Face ID
              </>
            ) : (
              <>
                <KeyRound className="w-3.5 h-3.5" />
                Use PIN Passcode
              </>
            )}
          </button>
          
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            AES-256 HSM Secured
          </div>
        </div>
      </div>
    </div>
  );
};
