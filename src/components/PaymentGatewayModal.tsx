import React, { useState } from 'react';
import { 
  CreditCard, 
  Send, 
  X, 
  Lock, 
  ShieldCheck, 
  Smartphone, 
  Globe, 
  Coins, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PaymentGateway, Transaction } from '../types';
import { packageEncryptedTransaction, computeSHA256 } from '../utils/crypto';
import { playHapticClickSound } from '../utils/audio';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  gateways: PaymentGateway[];
  onInitiateBiometricAuth: (paymentData: {
    amount: number;
    recipient: string;
    gateway: string;
    category: string;
    onVerified: () => void;
  }) => void;
  onPaymentSuccess: (newTx: Transaction, amount: number) => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  gateways,
  onInitiateBiometricAuth,
  onPaymentSuccess
}) => {
  const [selectedGatewayId, setSelectedGatewayId] = useState<string>('gw_stripe');
  const [recipient, setRecipient] = useState<string>('Apex Global Holdings Ltd.');
  const [amount, setAmount] = useState<string>('350.00');
  const [category, setCategory] = useState<string>('Subscriptions');
  const [note, setNote] = useState<string>('Q2 Multi-Cloud Infrastructure Invoice');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showEncryptionPreview, setShowEncryptionPreview] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentGateway = gateways.find(g => g.id === selectedGatewayId) || gateways[0];

  const handlePayClick = (e: React.FormEvent) => {
    e.preventDefault();
    playHapticClickSound();

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    // Trigger Biometric verification modal first!
    onInitiateBiometricAuth({
      amount: numericAmount,
      recipient,
      gateway: currentGateway.name,
      category,
      onVerified: async () => {
        setIsProcessing(true);
        const timestamp = new Date().toISOString();
        const hash = await computeSHA256(`${recipient}-${numericAmount}-${timestamp}`);
        
        setTimeout(() => {
          setIsProcessing(false);
          const newTx: Transaction = {
            id: 'tx_' + Math.random().toString(36).substring(2, 8),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            description: recipient,
            type: 'Expense',
            amount: -numericAmount,
            status: 'Paid',
            category: category,
            paymentMethod: currentGateway.name,
            encryptedHash: hash,
            timestamp
          };

          onPaymentSuccess(newTx, numericAmount);
          onClose();
        }, 800);
      }
    });
  };

  const getGatewayIcon = (provider: string) => {
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

  const sampleEncryption = packageEncryptedTransaction(
    parseFloat(amount) || 0,
    recipient,
    currentGateway.name,
    new Date().toISOString()
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-amber-500/20 bg-[#0b0f19] text-slate-100 shadow-2xl transition-all"
        style={{
          boxShadow: '0 0 50px -10px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Third-Party Payment Gateway Transfer</h2>
              <p className="text-xs text-slate-400">Encrypted multi-rail institutional settlement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handlePayClick} className="p-6 space-y-5">
          {/* Gateway Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Payment Rail / Gateway
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {gateways.map((gw) => (
                <button
                  type="button"
                  key={gw.id}
                  onClick={() => {
                    setSelectedGatewayId(gw.id);
                    playHapticClickSound();
                  }}
                  className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                    selectedGatewayId === gw.id
                      ? 'border-amber-400 bg-amber-500/10 text-white shadow-sm ring-1 ring-amber-400/30'
                      : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="p-1.5 rounded-lg bg-slate-800/80">
                      {getGatewayIcon(gw.provider)}
                    </div>
                    {selectedGatewayId === gw.id && (
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div className="text-xs font-semibold text-white truncate">{gw.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{gw.fee}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Recipient / Entity
              </label>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Acme Corp, Adobe, Landlord"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-amber-400 font-bold text-sm">$</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white font-mono font-semibold placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="Housing">Housing & Facilities</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Transportation">Transportation</option>
                <option value="Subscriptions">Software & Subscriptions</option>
                <option value="Utilities">Utilities & Telecom</option>
                <option value="Healthcare">Healthcare & Wellness</option>
                <option value="Other">Other Expenses</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Reference / Memo
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Transaction memo"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Encryption & Security Transparency Accordion */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Client-Side AES-256-GCM Vault</span>
                <span className="text-slate-500 font-mono text-[11px]">· {currentGateway.encryptionLevel}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowEncryptionPreview(!showEncryptionPreview)}
                className="text-[11px] text-amber-400 hover:underline"
              >
                {showEncryptionPreview ? 'Hide Payload' : 'Inspect Cipher'}
              </button>
            </div>

            {showEncryptionPreview && (
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Ciphertext:</span>
                  <span className="text-amber-300">{sampleEncryption.cipherText}</span>
                </div>
                <div className="flex justify-between">
                  <span>KMS HSM Key:</span>
                  <span className="text-slate-300">{sampleEncryption.keyId}</span>
                </div>
                <div className="flex justify-between">
                  <span>ECDSA Signature:</span>
                  <span className="text-emerald-400">{sampleEncryption.signature}</span>
                </div>
              </div>
            )}
          </div>

          {/* Biometric trigger button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Authorizing Settlement...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Verify with Biometrics & Pay ${amount || '0.00'}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
