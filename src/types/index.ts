export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  accountTier: 'Royal Black' | 'Elite Gold' | 'Standard';
  emailVerified: boolean;
  mfaEnabled: boolean;
  biometricEnabled: boolean;
  encryptionKeyId: string;
  createdAt: string;
}

export interface KPISummary {
  totalBalance: number;
  balanceChange: number;
  monthlyIncome: number;
  incomeChange: number;
  monthlyExpenses: number;
  expenseChange: number;
  netProfit: number;
  profitChange: number;
}

export interface CashFlowPoint {
  date: string;
  income: number;
  expenses: number;
}

export interface ExpenseCategory {
  id: string;
  label: string;
  percentage: number;
  amount: number;
  color: string;
  budgetLimit: number;
  thresholdAlertPercent: number;
}

export interface RevenueVsExpenseMonth {
  month: string;
  revenue: number;
  expenses: number;
}

export interface PortfolioAsset {
  name: string;
  allocation: number;
  color: string;
  value: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'Income' | 'Expense';
  amount: number;
  status: 'Paid' | 'Received' | 'Pending' | 'Flagged';
  category: string;
  paymentMethod: string;
  encryptedHash: string;
  timestamp: string;
}

export interface FinancialActivity {
  id: string;
  title: string;
  timestamp: string;
  amount: number;
  isPositive: boolean;
  icon: 'deposit' | 'spotify' | 'grocery' | 'client' | 'electricity' | 'wire' | 'shopping';
  category: string;
}

export interface PaymentGateway {
  id: string;
  name: string;
  provider: 'stripe' | 'paypal' | 'apple_pay' | 'google_pay' | 'swift' | 'crypto';
  status: 'Connected' | 'Ready';
  fee: string;
  supportedTypes: string[];
  encryptionLevel: string;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'transaction' | 'security' | 'budget';
  read: boolean;
  linkTab?: string;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  lastSynced: string;
  ip: string;
  isCurrent: boolean;
  location: string;
}

export type ActiveTab = 
  | 'dashboard' 
  | 'transactions' 
  | 'expenses' 
  | 'income' 
  | 'budgets' 
  | 'investments' 
  | 'invoices' 
  | 'reports' 
  | 'goals' 
  | 'cards' 
  | 'gateways' 
  | 'security' 
  | 'settings';
