import {
  User,
  KPISummary,
  CashFlowPoint,
  ExpenseCategory,
  RevenueVsExpenseMonth,
  PortfolioAsset,
  Transaction,
  FinancialActivity,
  PaymentGateway,
  PushNotification,
  ConnectedDevice
} from '../types';

export const INITIAL_USER: User = {
  id: 'usr_mufasa_8941',
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

export const INITIAL_KPI: KPISummary = {
  totalBalance: 128430,
  balanceChange: 12.5,
  monthlyIncome: 24680,
  incomeChange: 8.3,
  monthlyExpenses: 12540,
  expenseChange: -6.1,
  netProfit: 12140,
  profitChange: 18.7
};

export const INITIAL_CASH_FLOW_30D: CashFlowPoint[] = [
  { date: 'May 1', income: 14200, expenses: 9800 },
  { date: 'May 4', income: 18500, expenses: 11200 },
  { date: 'May 7', income: 21400, expenses: 10400 },
  { date: 'May 11', income: 19800, expenses: 13500 },
  { date: 'May 14', income: 28420, expenses: 12630 },
  { date: 'May 18', income: 22100, expenses: 11800 },
  { date: 'May 21', income: 25900, expenses: 14100 },
  { date: 'May 25', income: 24200, expenses: 13200 },
  { date: 'May 28', income: 31500, expenses: 12540 }
];

export const INITIAL_EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: 'cat_housing', label: 'Housing', percentage: 32, amount: 4013, color: '#3b82f6', budgetLimit: 4300, thresholdAlertPercent: 90 },
  { id: 'cat_food', label: 'Food & Dining', percentage: 18, amount: 2259, color: '#06b6d4', budgetLimit: 2500, thresholdAlertPercent: 85 },
  { id: 'cat_trans', label: 'Transportation', percentage: 14, amount: 1756, color: '#8b5cf6', budgetLimit: 2000, thresholdAlertPercent: 80 },
  { id: 'cat_subs', label: 'Subscriptions', percentage: 10, amount: 1254, color: '#ec4899', budgetLimit: 1400, thresholdAlertPercent: 85 },
  { id: 'cat_util', label: 'Utilities', percentage: 8, amount: 1003, color: '#6366f1', budgetLimit: 1200, thresholdAlertPercent: 80 },
  { id: 'cat_health', label: 'Healthcare', percentage: 6, amount: 752, color: '#10b981', budgetLimit: 1000, thresholdAlertPercent: 75 },
  { id: 'cat_other', label: 'Other', percentage: 12, amount: 1503, color: '#d4af37', budgetLimit: 1800, thresholdAlertPercent: 80 }
];

export const INITIAL_REVENUE_VS_EXPENSE: RevenueVsExpenseMonth[] = [
  { month: 'Jan', revenue: 21800, expenses: 11400 },
  { month: 'Feb', revenue: 23400, expenses: 12100 },
  { month: 'Mar', revenue: 26500, expenses: 13900 },
  { month: 'Apr', revenue: 28900, expenses: 11800 },
  { month: 'May', revenue: 31200, expenses: 12540 },
  { month: 'Jun', revenue: 34200, expenses: 12540 }
];

export const INITIAL_PORTFOLIO_ASSETS: PortfolioAsset[] = [
  { name: 'Stocks', allocation: 45, color: '#10b981', value: 39253 },
  { name: 'ETFs', allocation: 28, color: '#06b6d4', value: 24424 },
  { name: 'Crypto', allocation: 15, color: '#8b5cf6', value: 13084 },
  { name: 'Bonds', allocation: 8, color: '#d4af37', value: 6978 },
  { name: 'Cash', allocation: 4, color: '#94a3b8', value: 3489 }
];

export const INITIAL_BUDGET_ITEMS = [
  { id: 'b_housing', category: 'Housing', spent: 2800, limit: 3000, color: '#ef4444', icon: 'home', thresholdPercent: 90 },
  { id: 'b_food', category: 'Food', spent: 1200, limit: 2000, color: '#3b82f6', icon: 'utensils', thresholdPercent: 80 },
  { id: 'b_trans', category: 'Transportation', spent: 800, limit: 1500, color: '#8b5cf6', icon: 'car', thresholdPercent: 75 },
  { id: 'b_ent', category: 'Entertainment', spent: 450, limit: 800, color: '#d4af37', icon: 'gamepad', thresholdPercent: 70 },
  { id: 'b_shop', category: 'Shopping', spent: 650, limit: 1200, color: '#10b981', icon: 'shopping-bag', thresholdPercent: 80 }
];

export const INITIAL_INVOICES_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_1092',
    date: 'May 28, 2024',
    description: 'Shopify Subscription',
    type: 'Expense',
    amount: -39.00,
    status: 'Paid',
    category: 'Subscriptions',
    paymentMethod: 'Mufasa Black Virtual •• 9012',
    encryptedHash: '0x8f2a170b99142ec4',
    timestamp: '2024-05-28T14:32:00Z'
  },
  {
    id: 'tx_1091',
    date: 'May 26, 2024',
    description: 'Client Payment - Acme Co.',
    type: 'Income',
    amount: 2400.00,
    status: 'Received',
    category: 'Income',
    paymentMethod: 'Fedwire / Direct SWIFT',
    encryptedHash: '0x3c71a48e892c9081',
    timestamp: '2024-05-26T11:15:00Z'
  },
  {
    id: 'tx_1090',
    date: 'May 22, 2024',
    description: 'Adobe Creative Cloud',
    type: 'Expense',
    amount: -54.99,
    status: 'Paid',
    category: 'Subscriptions',
    paymentMethod: 'Apple Pay Biometric',
    encryptedHash: '0x7b11d95e423f8102',
    timestamp: '2024-05-22T09:22:00Z'
  },
  {
    id: 'tx_1089',
    date: 'May 18, 2024',
    description: 'Freelance Project',
    type: 'Income',
    amount: 1200.00,
    status: 'Received',
    category: 'Income',
    paymentMethod: 'Stripe Direct Settlement',
    encryptedHash: '0x9948ba3351ce8742',
    timestamp: '2024-05-18T16:40:00Z'
  },
  {
    id: 'tx_1088',
    date: 'May 15, 2024',
    description: 'Office Rent',
    type: 'Expense',
    amount: -1800.00,
    status: 'Paid',
    category: 'Housing',
    paymentMethod: 'Instant ACH Vault',
    encryptedHash: '0x14da830177be3290',
    timestamp: '2024-05-15T10:00:00Z'
  }
];

export const INITIAL_FINANCIAL_ACTIVITIES: FinancialActivity[] = [
  {
    id: 'fa_1',
    title: 'Salary Deposit',
    timestamp: 'May 28, 2024 at 9:14 AM',
    amount: 4200.00,
    isPositive: true,
    icon: 'deposit',
    category: 'Payroll & Treasury'
  },
  {
    id: 'fa_2',
    title: 'Spotify Subscription',
    timestamp: 'May 27, 2024 at 8:32 PM',
    amount: 9.99,
    isPositive: false,
    icon: 'spotify',
    category: 'Digital Media'
  },
  {
    id: 'fa_3',
    title: 'Grocery Store',
    timestamp: 'May 26, 2024 at 6:21 PM',
    amount: 68.45,
    isPositive: false,
    icon: 'grocery',
    category: 'Food & Dining'
  },
  {
    id: 'fa_4',
    title: 'Client Payment',
    timestamp: 'May 24, 2024 at 11:09 AM',
    amount: 1200.00,
    isPositive: true,
    icon: 'client',
    category: 'Consulting'
  },
  {
    id: 'fa_5',
    title: 'Electricity Bill',
    timestamp: 'May 22, 2024 at 3:17 PM',
    amount: 120.00,
    isPositive: false,
    icon: 'electricity',
    category: 'Utilities'
  }
];

export const INITIAL_PAYMENT_GATEWAYS: PaymentGateway[] = [
  {
    id: 'gw_stripe',
    name: 'Stripe Connect Global',
    provider: 'stripe',
    status: 'Connected',
    fee: '1.4% + $0.20',
    supportedTypes: ['Visa', 'Mastercard', 'Amex', 'SEPA'],
    encryptionLevel: 'AES-256-GCM / PCI-DSS Level 1'
  },
  {
    id: 'gw_paypal',
    name: 'PayPal Merchant Commerce',
    provider: 'paypal',
    status: 'Connected',
    fee: '2.2% + $0.30',
    supportedTypes: ['PayPal Balance', 'Venmo', 'Pay in 4'],
    encryptionLevel: 'TLS 1.3 / End-to-End Vault'
  },
  {
    id: 'gw_apple',
    name: 'Apple Pay & Touch ID Enclave',
    provider: 'apple_pay',
    status: 'Connected',
    fee: '0.0% Network Fee',
    supportedTypes: ['Apple Card', 'Device Account Number'],
    encryptionLevel: 'Secure Enclave Biometric Attestation'
  },
  {
    id: 'gw_google',
    name: 'Google Pay Tokenization',
    provider: 'google_pay',
    status: 'Connected',
    fee: '0.0% Network Fee',
    supportedTypes: ['Virtual Card Token', 'G-Pay Wallet'],
    encryptionLevel: 'EMVCo Tokenization & Passkey'
  },
  {
    id: 'gw_swift',
    name: 'SWIFT & Fedwire Cross-Border',
    provider: 'swift',
    status: 'Ready',
    fee: '$15.00 Flat Wire',
    supportedTypes: ['Institutional SWIFT', 'SEPA Instant', 'Fedwire'],
    encryptionLevel: 'ISO 20022 Financial Grade PKI'
  },
  {
    id: 'gw_crypto',
    name: 'Mufasa Crypto Rail (USDC / BTC)',
    provider: 'crypto',
    status: 'Ready',
    fee: '0.1% Miner gas',
    supportedTypes: ['USDC (Polygon/Solana)', 'Bitcoin Lightning', 'USDT'],
    encryptionLevel: 'Multi-party Computation (MPC) Vault'
  }
];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif_1',
    title: 'Budget Alert: Housing at 93%',
    message: 'Housing expenses reached $2,800 of your $3,000 threshold limit for May 2024.',
    time: '12m ago',
    type: 'budget',
    read: false,
    linkTab: 'budgets'
  },
  {
    id: 'notif_2',
    title: 'Client Payment Received',
    message: '+$2,400.00 from Acme Co. cleared via SWIFT with biometric verification token.',
    time: '2h ago',
    type: 'transaction',
    read: false,
    linkTab: 'transactions'
  },
  {
    id: 'notif_3',
    title: 'Biometric Login Attested',
    message: 'Face ID / Touch ID authentication confirmed on MacBook Pro M3 (Munich, DE).',
    time: '5h ago',
    type: 'security',
    read: true,
    linkTab: 'security'
  },
  {
    id: 'notif_4',
    title: 'Monthly Cash Flow Report Ready',
    message: 'Net profit surged +18.7% to $12,140. Click to review full analytics breakdown.',
    time: '1d ago',
    type: 'alert',
    read: true,
    linkTab: 'dashboard'
  }
];

export const INITIAL_DEVICES: ConnectedDevice[] = [
  {
    id: 'dev_1',
    name: 'MacBook Pro 16" M3 Max',
    type: 'desktop',
    lastSynced: 'Live (Current device)',
    ip: '192.168.1.142',
    isCurrent: true,
    location: 'Munich, Germany'
  },
  {
    id: 'dev_2',
    name: 'iPhone 15 Pro Max',
    type: 'mobile',
    lastSynced: '2 mins ago',
    ip: '10.0.4.88',
    isCurrent: false,
    location: 'Munich, Germany'
  },
  {
    id: 'dev_3',
    name: 'iPad Pro 13" (M4)',
    type: 'tablet',
    lastSynced: '1 hour ago',
    ip: '10.0.4.92',
    isCurrent: false,
    location: 'Munich, Germany'
  }
];
