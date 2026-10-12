import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Crown, 
  Fingerprint, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  X,
  CheckCircle2
} from 'lucide-react';
import { User } from '../types';
import { playBiometricScanSound, playBiometricSuccessSound, playHapticClickSound } from '../utils/audio';

interface FloatingLoginPageProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const FloatingLoginPage: React.FC<FloatingLoginPageProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('alex.morgan@mufasapay.vault');
  const [password, setPassword] = useState('••••••••••••');
  const [isScanning, setIsScanning] = useState(false);
  const [mode, setMode] = useState<'signin' | 'register'>('signin');

  if (!isOpen) return null;

  const handleBiometricLogin = () => {
    setIsScanning(true);
    playBiometricScanSound();

    setTimeout(() => {
      setIsScanning(false);
      playBiometricSuccessSound();

      const user: User = {
        id: 'usr_mufasa_alex',
        name: 'Alex Morgan',
        email: email || 'alex.morgan@mufasapay.vault',
        avatar: '/src/assets/images/avatar_alex_morgan_1791847432646.jpg',
        role: 'Private Wealth Principal',
        accountTier: 'Royal Black',
        emailVerified: true,
        mfaEnabled: true,
        biometricEnabled: true,
        encryptionKeyId: 'KMS-HSM-MUFASA-SEC-2026-PRIMARY',
        createdAt: '2024-01-15T08:00:00Z'
      };

      onLoginSuccess(user);
      onClose();
    }, 1500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHapticClickSound();
    handleBiometricLogin();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      {/* Floating Card with animate-float & Framer Motion entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-500/40 bg-[#0c101d] p-8 text-slate-100 shadow-2xl animate-float"
        style={{
          boxShadow: '0 25px 60px -15px rgba(212, 175, 55, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Glow ambient background element */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-[1px] mx-auto mb-3 shadow-lg shadow-amber-500/30">
            <div className="w-full h-full bg-[#0a0d16] rounded-2xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-amber-400 fill-amber-400/20" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Floating Secure Gateway
          </div>

          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {mode === 'signin' ? 'Sign in to Mufasa Pay' : 'Open Sovereign Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise financial intelligence & biometric vault
          </p>

          {/* Mode Tabs */}
          <div className="flex p-1 mt-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-1.5 rounded-lg transition-colors ${
                mode === 'signin' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-1.5 rounded-lg transition-colors ${
                mode === 'register' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* 1-Click Biometric Button */}
        <div className="mb-5">
          <button
            type="button"
            onClick={handleBiometricLogin}
            disabled={isScanning}
            className="w-full p-4 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 hover:border-amber-400 text-left transition-all flex items-center justify-between group shadow-lg"
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-2.5 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform ${
                isScanning ? 'animate-pulse text-amber-300 ring-2 ring-amber-400' : ''
              }`}>
                <Fingerprint className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block flex items-center gap-1.5">
                  <span>Instant Biometric Login</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono">Touch ID</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  {isScanning ? 'Scanning enclave securely...' : 'One-touch sovereign passkey'}
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
          <span className="relative bg-[#0c101d] px-3 text-[11px] text-slate-500 uppercase tracking-wider">or credential access</span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Master Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-xs tracking-wide shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>Authenticate & Launch Vault</span>
          </button>
        </form>

        {/* Footer Security Notice */}
        <div className="mt-5 pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>AES-256-GCM Zero-Knowledge Enclave Protected</span>
        </div>
      </motion.div>
    </div>
  );
};
