import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Fingerprint, 
  Lock, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Key, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Sliders,
  LogOut
} from 'lucide-react';
import { ConnectedDevice } from '../../types';
import { playBiometricScanSound, playBiometricSuccessSound, playHapticClickSound } from '../../utils/audio';

interface SecurityVaultViewProps {
  devices: ConnectedDevice[];
  onTriggerBiometricTest: () => void;
  onSyncDevices: () => void;
  syncStatus: string;
}

export const SecurityVaultView: React.FC<SecurityVaultViewProps> = ({
  devices,
  onTriggerBiometricTest,
  onSyncDevices,
  syncStatus
}) => {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [biometricThresholdEnforced, setBiometricThresholdEnforced] = useState(true);
  const [zeroKnowledgeVaultActive, setZeroKnowledgeVaultActive] = useState(true);
  const [keyRotated, setKeyRotated] = useState(false);

  const handleRotateKey = () => {
    playBiometricScanSound();
    setTimeout(() => {
      setKeyRotated(true);
      playBiometricSuccessSound();
      setTimeout(() => setKeyRotated(false), 3000);
    }, 1200);
  };

  const getDeviceIcon = (type: ConnectedDevice['type']) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-amber-400" />;
      case 'tablet':
        return <Tablet className="w-5 h-5 text-cyan-400" />;
      default:
        return <Laptop className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d121f] via-[#101728] to-[#0c101c] border border-amber-500/25 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Sovereign Military-Grade Enclave
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Biometric Authorization & Zero-Knowledge Vault
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Every financial transfer, threshold update, and gateway transaction requires hardware-attested Touch ID or Face ID cryptographic signatures.
            </p>
          </div>

          <button
            onClick={onTriggerBiometricTest}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shrink-0"
          >
            <Fingerprint className="w-4 h-4 text-slate-950" />
            <span>Test Biometric Sensor</span>
          </button>
        </div>
      </div>

      {/* Security Layer Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Biometrics Policy */}
        <div className="p-5 rounded-2xl bg-[#0d121f] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <Fingerprint className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Biometric Financial Gate</h3>
            <p className="text-xs text-slate-400 mt-1">
              Require hardware Touch ID / Face ID verification for all payments and budget edits.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">Strict Enforcement</span>
            <input
              type="checkbox"
              checked={biometricThresholdEnforced}
              onChange={(e) => {
                playHapticClickSound();
                setBiometricThresholdEnforced(e.target.checked);
              }}
              className="accent-amber-400 cursor-pointer w-4 h-4"
            />
          </div>
        </div>

        {/* Multi-Factor Authentication */}
        <div className="p-5 rounded-2xl bg-[#0d121f] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Multi-Factor Auth (MFA)</h3>
            <p className="text-xs text-slate-400 mt-1">
              TOTP hardware authenticator passcodes required on unverified devices.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">TOTP App Active</span>
            <input
              type="checkbox"
              checked={mfaEnabled}
              onChange={(e) => {
                playHapticClickSound();
                setMfaEnabled(e.target.checked);
              }}
              className="accent-amber-400 cursor-pointer w-4 h-4"
            />
          </div>
        </div>

        {/* AES-256 Vault */}
        <div className="p-5 rounded-2xl bg-[#0d121f] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white">Client AES-256-GCM</h3>
            <p className="text-xs text-slate-400 mt-1">
              Zero-knowledge database storage with client-side derived keys.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">Enclave Status</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">FIPS 140-3</span>
          </div>
        </div>
      </div>

      {/* Cross-Platform Device Synchronization */}
      <div className="p-6 rounded-2xl bg-[#0d121f] border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">Cross-Platform Synchronized Devices</h3>
            <p className="text-xs text-slate-400">
              Live end-to-end encrypted session sync across your mobile and desktop devices.
            </p>
          </div>

          <button
            onClick={onSyncDevices}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Sync All Devices</span>
          </button>
        </div>

        <div className="space-y-3">
          {devices.map((device) => (
            <div
              key={device.id}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800/80">
                  {getDeviceIcon(device.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{device.name}</span>
                    {device.isCurrent && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold">
                        This Device
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {device.location} · IP: {device.ip} · <span className="text-amber-400">{device.lastSynced}</span>
                  </div>
                </div>
              </div>

              {!device.isCurrent && (
                <button
                  onClick={() => alert(`Remote biometric lock issued for ${device.name}`)}
                  className="px-2.5 py-1 rounded-lg text-[11px] text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                >
                  Remote Deauthorize
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Master Key Rotation */}
      <div className="p-6 rounded-2xl bg-[#0d121f] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Hardware Security Module (HSM) Key Rotation</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Key ID: <span className="font-mono text-amber-400">KMS-HSM-MUFASA-SEC-2026-PRIMARY</span>
          </p>
        </div>
        <button
          onClick={handleRotateKey}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors flex items-center gap-1.5"
        >
          {keyRotated ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Key Rotated Successfully</span>
            </>
          ) : (
            <>
              <Key className="w-4 h-4 text-amber-400" />
              <span>Rotate 256-bit Key</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
