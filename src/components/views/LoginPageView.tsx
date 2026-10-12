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
  KeyRound,
  AlertCircle
} from 'lucide-react';
import { User } from '../../types';
import { playBiometricScanSound, playBiometricSuccessSound, playHapticClickSound } from '../../utils/audio';

interface LoginPageViewProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginPageView: React.FC<LoginPageViewProps> = ({
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('alex.morgan@mufasapay.vault');
  const [password, setPassword] = useState('SecurePass2026!');
  const [name, setName] = useState('Alex Morgan');
  const [isScanning, setIsScanning] = useState(false);
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [errorMsg, setErrorMsg] = useState('');

  const handleBiometricLogin = () => {
    setIsScanning(true);
    playBiometricScanSound();

    setTimeout(() => {
      setIsScanning(false);
      playBiometricSuccessSound();

      const user: User = {
        id: 'usr_mufasa_alex',
        name: name || 'Alex Morgan',
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
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHapticClickSound();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    playBiometricSuccessSound();
    const user: User = {
      id: 'usr_mufasa_alex',
      name: name || 'Alex Morgan',
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
  };

  return (
    <div className="min-h-screen w-full bg-[#07090e] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[250px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-500/35 bg-[#0b0f1a] p-8 text-slate-100 shadow-2xl z-10"
        style={{
          boxShadow: '0 30px 90px -20px rgba(212, 175, 55, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-[1px] mx-auto mb-3 shadow-xl shadow-amber-500/30">
            <div className="w-full h-full bg-[#07090e] rounded-2xl flex items-center justify-center">
              <Crown className="w-7 h-7 text-amber-400 fill-amber-400/20" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Mufasa Pay Sovereign Enclave
          </div>

          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {mode === 'signin' ? 'Sign in to Mufasa Pay' : 'Open Royal Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Elite financial intelligence & biometric vault
          </p>

          <div className="flex p-1 mt-5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 rounded-lg transition-colors ${
                mode === 'signin' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); }}
              className={`flex-1 py-1.5 rounded-lg transition-colors ${
                mode === 'register' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Biometric 1-Touch Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleBiometricLogin}
            disabled={isScanning}
            className="w-full p-3.5 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 hover:border-amber-400 text-left transition-all flex items-center justify-between group shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform ${
                isScanning ? 'animate-pulse text-amber-300 ring-2 ring-amber-400' : ''
              }`}>
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block flex items-center gap-1.5">
                  <span>Instant Biometric Login</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono">Touch ID</span>
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {isScanning ? 'Scanning enclave...' : 'One-touch passkey'}
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
          <span className="relative bg-[#0b0f1a] px-3 text-xs text-slate-500 uppercase tracking-wider">or credentials</span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.morgan@mufasapay.vault"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Master Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-xs tracking-wide shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4 text-slate-950" />
            <span>Sign In to Dashboard</span>
          </button>
        </form>

        {/* Footer Security Notice */}
        <div className="mt-5 pt-3 border-t border-slate-800 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>AES-256-GCM Secure Enclave Protected</span>
        </div>
      </motion.div>
    </div>
  );
};
