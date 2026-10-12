import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  Fingerprint, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  Smartphone, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { User } from '../types';
import { playBiometricScanSound, playBiometricSuccessSound, playHapticClickSound } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  defaultMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'verify_email' | 'mfa'>(defaultMode);
  const [email, setEmail] = useState('alex.morgan@mufasapay.vault');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Alex Morgan');
  const [verificationCode, setVerificationCode] = useState(['5', '8', '2', '9', '1', '4']);
  const [mfaCode, setMfaCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setErrorMsg('');
    }
  }, [isOpen, defaultMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mode === 'verify_email' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [mode, timer]);

  if (!isOpen) return null;

  const handleBiometricLogin = () => {
    setIsBiometricScanning(true);
    playBiometricScanSound();

    setTimeout(() => {
      setIsBiometricScanning(false);
      playBiometricSuccessSound();
      
      const loggedUser: User = {
        id: 'usr_mufasa_alex',
        name: 'Alex Morgan',
        email: 'alex.morgan@mufasapay.vault',
        avatar: '/src/assets/images/avatar_alex_morgan_1791847432646.jpg',
        role: 'Private Wealth Principal',
        accountTier: 'Royal Black',
        emailVerified: true,
        mfaEnabled: true,
        biometricEnabled: true,
        encryptionKeyId: 'KMS-HSM-MUFASA-SEC-2026-PRIMARY',
        createdAt: '2024-01-15T08:00:00Z'
      };

      onLoginSuccess(loggedUser);
      onClose();
    }, 1400);
  };

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    playHapticClickSound();
    
    // If MFA is required for this account
    setMode('mfa');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    playHapticClickSound();
    setTimer(45);
    setMode('verify_email');
  };

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    playBiometricSuccessSound();

    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: name || 'Valued Client',
      email: email,
      avatar: '/src/assets/images/avatar_alex_morgan_1791847432646.jpg',
      role: 'Private Wealth Member',
      accountTier: 'Elite Gold',
      emailVerified: true,
      mfaEnabled: true,
      biometricEnabled: true,
      encryptionKeyId: 'KMS-HSM-MUFASA-SEC-2026-PRIMARY',
      createdAt: new Date().toISOString()
    };

    onLoginSuccess(newUser);
    onClose();
  };

  const handleVerifyMfa = (e: React.FormEvent) => {
    e.preventDefault();
    playBiometricSuccessSound();

    const loggedUser: User = {
      id: 'usr_mufasa_alex',
      name: name || 'Alex Morgan',
      email: email,
      avatar: '/src/assets/images/avatar_alex_morgan_1791847432646.jpg',
      role: 'Private Wealth Principal',
      accountTier: 'Royal Black',
      emailVerified: true,
      mfaEnabled: true,
      biometricEnabled: true,
      encryptionKeyId: 'KMS-HSM-MUFASA-SEC-2026-PRIMARY',
      createdAt: '2024-01-15T08:00:00Z'
    };

    onLoginSuccess(loggedUser);
    onClose();
  };

  const handleCodeChange = (index: number, val: string, isMfa = false) => {
    if (!/^\d*$/.test(val)) return;
    const targetState = isMfa ? mfaCode : verificationCode;
    const setter = isMfa ? setMfaCode : setVerificationCode;

    const newArr = [...targetState];
    newArr[index] = val ? val.slice(-1) : '';
    setter(newArr);

    if (val && index < 5) {
      const nextInput = document.getElementById(`${isMfa ? 'mfa' : 'code'}-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-amber-500/25 bg-[#0b0f19] text-slate-100 shadow-2xl transition-all"
        style={{
          boxShadow: '0 0 60px -10px rgba(212, 175, 55, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Banner */}
        <div className="p-6 pb-4 border-b border-slate-800/80 bg-slate-900/40 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Mufasa Pay Sovereign Portal
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            {mode === 'login' && 'Sign in to Mufasa Pay'}
            {mode === 'register' && 'Open Royal Account'}
            {mode === 'verify_email' && 'Verify Email Address'}
            {mode === 'mfa' && 'Multi-Factor Authentication'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login' && 'Access private wealth management and multi-currency rails'}
            {mode === 'register' && 'Experience military-grade encrypted financial operations'}
            {mode === 'verify_email' && `We sent a 6-digit confirmation token to ${email}`}
            {mode === 'mfa' && 'Enter the 6-digit TOTP code from your Authenticator app'}
          </p>

          {/* Quick tab switcher between login & register */}
          {(mode === 'login' || mode === 'register') && (
            <div className="flex p-1 mt-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-1.5 rounded-lg transition-colors ${
                  mode === 'login' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
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
                Create Account
              </button>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          {/* MODE: LOGIN */}
          {mode === 'login' && (
            <>
              {/* Biometric 1-Click Login Banner */}
              <button
                type="button"
                onClick={handleBiometricLogin}
                disabled={isBiometricScanning}
                className="w-full p-3.5 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 hover:border-amber-400 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover:scale-105 transition-transform ${
                    isBiometricScanning ? 'animate-pulse text-amber-300' : ''
                  }`}>
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Streamlined Biometric Login</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono">Touch ID / Face ID</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {isBiometricScanning ? 'Scanning hardware enclave...' : 'Instant passkey authorization'}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
                <span className="relative bg-[#0b0f19] px-3 text-[11px] text-slate-500 uppercase tracking-wider">or sign in with credentials</span>
              </div>

              <form onSubmit={handleStandardLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.morgan@mufasapay.vault"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-300">Master Password</label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Demo reset code sent to your email."); }} className="text-[11px] text-amber-400 hover:underline">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-4 h-4 text-slate-950" />
                  <span>Authenticate & Continue</span>
                </button>
              </form>
            </>
          )}

          {/* MODE: REGISTER */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@organization.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Create Secure Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 10 characters with symbols"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  required
                  id="terms"
                  defaultChecked
                  className="mt-1 accent-amber-400 rounded cursor-pointer"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-400">
                  I agree to Mufasa Pay's zero-knowledge client encryption protocols and biometric token storage terms.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Continue to Email Verification</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </form>
          )}

          {/* MODE: EMAIL VERIFICATION */}
          {mode === 'verify_email' && (
            <form onSubmit={handleVerifyEmail} className="space-y-4">
              <div className="text-center">
                <span className="text-xs text-slate-400">Enter the 6-digit verification code:</span>
              </div>
              <div className="flex justify-center gap-2">
                {verificationCode.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`code-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(idx, e.target.value, false)}
                    className="w-10 h-12 text-center text-lg font-mono font-bold rounded-lg bg-slate-900 border border-slate-700 text-amber-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                ))}
              </div>

              <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                {timer > 0 ? (
                  <span>Resend code in {timer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setTimer(45)}
                    className="text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Resend Code
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Verify & Activate Account</span>
              </button>
            </form>
          )}

          {/* MODE: MFA (TOTP) */}
          {mode === 'mfa' && (
            <form onSubmit={handleVerifyMfa} className="space-y-4">
              <div className="text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-xs text-slate-400">Enter code from Google Authenticator or 1Password:</span>
              </div>
              <div className="flex justify-center gap-2">
                {mfaCode.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`mfa-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    placeholder="•"
                    onChange={(e) => handleCodeChange(idx, e.target.value, true)}
                    className="w-10 h-12 text-center text-lg font-mono font-bold rounded-lg bg-slate-900 border border-slate-700 text-amber-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                ))}
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 text-center">
                Demo quick-fill: Entering any digit validates your session
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Confirm MFA & Launch Dashboard</span>
              </button>
            </form>
          )}
        </div>

        {/* Security watermark */}
        <div className="px-6 py-3 border-t border-slate-800/80 bg-slate-900/60 text-center text-[11px] text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>FIPS 140-2 Level 3 Enclave Security Protected</span>
        </div>
      </div>
    </div>
  );
};
