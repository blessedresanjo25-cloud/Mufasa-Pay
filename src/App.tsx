import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ConnectedDevice,
  ActiveTab
} from './types';
import { 
  INITIAL_USER, 
  INITIAL_KPI, 
  INITIAL_CASH_FLOW_30D, 
  INITIAL_EXPENSE_CATEGORIES, 
  INITIAL_REVENUE_VS_EXPENSE, 
  INITIAL_PORTFOLIO_ASSETS, 
  INITIAL_BUDGET_ITEMS, 
  INITIAL_INVOICES_TRANSACTIONS, 
  INITIAL_FINANCIAL_ACTIVITIES, 
  INITIAL_PAYMENT_GATEWAYS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_DEVICES 
} from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PageTransition } from './components/PageTransition';
import { KPICards } from './components/KPICards';
import { CashFlowChart } from './components/CashFlowChart';
import { ProfitLossCard } from './components/ProfitLossCard';
import { ExpenseBreakdownDonut } from './components/ExpenseBreakdownDonut';
import { RevenueVsExpenseBarChart } from './components/RevenueVsExpenseBarChart';
import { PortfolioPerformanceCard } from './components/PortfolioPerformanceCard';
import { BudgetAllocationCard } from './components/BudgetAllocationCard';
import { RecentInvoicesTable } from './components/RecentInvoicesTable';
import { FinancialActivityFeed } from './components/FinancialActivityFeed';
import { BiometricModal } from './components/BiometricModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { BudgetThresholdModal, BudgetItem } from './components/BudgetThresholdModal';
import { NotificationCenter } from './components/NotificationCenter';
import { AuthModal } from './components/AuthModal';
import { UpgradeModal } from './components/UpgradeModal';
import { LoginPageView } from './components/views/LoginPageView';
import { TransactionsView } from './components/views/TransactionsView';
import { SecurityVaultView } from './components/views/SecurityVaultView';
import { CardsView } from './components/views/CardsView';
import { GatewaysView } from './components/views/GatewaysView';
import { playPushAlertSound } from './utils/audio';
import { Bell, X, AlertTriangle } from 'lucide-react';

export default function App() {
  // Top-level auth state with sessionStorage persistence
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('mufasa_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = sessionStorage.getItem('mufasa_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('May 1, 2024 – May 31, 2024');
  const [syncTime, setSyncTime] = useState('Just now');

  // Financial Data State
  const [kpi, setKpi] = useState<KPISummary>(INITIAL_KPI);
  const [cashFlowData, setCashFlowData] = useState<CashFlowPoint[]>(INITIAL_CASH_FLOW_30D);
  const [cashFlowPeriod, setCashFlowPeriod] = useState('30d');
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(INITIAL_EXPENSE_CATEGORIES);
  const [revenueVsExpense, setRevenueVsExpense] = useState<RevenueVsExpenseMonth[]>(INITIAL_REVENUE_VS_EXPENSE);
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>(INITIAL_PORTFOLIO_ASSETS);
  const [budgets, setBudgets] = useState<BudgetItem[]>(INITIAL_BUDGET_ITEMS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_INVOICES_TRANSACTIONS);
  const [activities, setActivities] = useState<FinancialActivity[]>(INITIAL_FINANCIAL_ACTIVITIES);
  const [gateways, setGateways] = useState<PaymentGateway[]>(INITIAL_PAYMENT_GATEWAYS);
  const [notifications, setNotifications] = useState<PushNotification[]>(INITIAL_NOTIFICATIONS);
  const [devices, setDevices] = useState<ConnectedDevice[]>(INITIAL_DEVICES);

  // Modals & Drawers
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGatewayModalOpen, setIsGatewayModalOpen] = useState(false);
  const [isThresholdModalOpen, setIsThresholdModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Biometric Auth Modal State
  const [biometricModalConfig, setBiometricModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    amount?: number;
    onSuccess: () => void;
  }>({
    isOpen: false,
    title: 'Biometric Authorization',
    subtitle: 'Verify with Touch ID or Face ID to proceed.',
    onSuccess: () => {}
  });

  // Floating Toast Alert
  const [activeToast, setActiveToast] = useState<{
    id: string;
    title: string;
    message: string;
    type: 'success' | 'alert' | 'budget';
  } | null>(null);

  // Simulated device sync timer
  useEffect(() => {
    const timer = setInterval(() => {
      const seconds = Math.floor(Math.random() * 8) + 2;
      setSyncTime(`${seconds}s ago`);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setIsAuthenticated(true);
    setUser(loggedInUser);
    setActiveTab('dashboard');
    try {
      sessionStorage.setItem('mufasa_authenticated', 'true');
      sessionStorage.setItem('mufasa_user', JSON.stringify(loggedInUser));
    } catch {
      // Ignore
    }
    showToast('Welcome back, ' + loggedInUser.name, 'Biometric session authenticated successfully.', 'success');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      sessionStorage.removeItem('mufasa_authenticated');
      sessionStorage.removeItem('mufasa_user');
    } catch {
      // Ignore
    }
    showToast('Signed Out', 'Your session has been securely closed.', 'success');
  };

  const showToast = (title: string, message: string, type: 'success' | 'alert' | 'budget' = 'success') => {
    const id = Math.random().toString();
    setActiveToast({ id, title, message, type });
    playPushAlertSound();
    setTimeout(() => {
      setActiveToast((curr) => (curr?.id === id ? null : curr));
    }, 4500);
  };

  const requireBiometricAuth = (
    title: string,
    subtitle: string,
    amount: number | undefined,
    onSuccess: () => void
  ) => {
    setBiometricModalConfig({
      isOpen: true,
      title,
      subtitle,
      amount,
      onSuccess
    });
  };

  const handlePaymentSuccess = (newTx: Transaction, amount: number) => {
    setTransactions((prev) => [newTx, ...prev]);

    const newAct: FinancialActivity = {
      id: 'fa_' + Math.random().toString(36).substring(2, 7),
      title: newTx.description,
      timestamp: 'Just now',
      amount: amount,
      isPositive: false,
      icon: 'wire',
      category: newTx.category
    };
    setActivities((prev) => [newAct, ...prev]);

    setKpi((prev) => ({
      ...prev,
      totalBalance: prev.totalBalance - amount,
      monthlyExpenses: prev.monthlyExpenses + amount,
      netProfit: prev.netProfit - amount
    }));

    setBudgets((prev) =>
      prev.map((b) => {
        if (b.category.toLowerCase().includes(newTx.category.toLowerCase()) || 
            newTx.category.toLowerCase().includes(b.category.toLowerCase())) {
          const newSpent = b.spent + amount;
          const pct = Math.round((newSpent / b.limit) * 100);
          if (pct >= b.thresholdPercent) {
            setTimeout(() => {
              triggerBudgetPushAlert(b.category, pct, newSpent, b.limit);
            }, 600);
          }
          return { ...b, spent: newSpent };
        }
        return b;
      })
    );

    const newNotif: PushNotification = {
      id: 'notif_' + Math.random().toString(36).substring(2, 8),
      title: 'Payment Dispatched & Settled',
      message: `$${amount.toFixed(2)} sent to ${newTx.description} via ${newTx.paymentMethod}. Proof: ${newTx.encryptedHash}`,
      time: 'Just now',
      type: 'transaction',
      read: false,
      linkTab: 'transactions'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(
      'Payment Settled & Encrypted',
      `$${amount.toFixed(2)} transferred to ${newTx.description}. Biometric signature attached.`,
      'success'
    );
  };

  const handleSimulateInflow = () => {
    const depositAmount = 3500;
    const newTx: Transaction = {
      id: 'tx_' + Math.random().toString(36).substring(2, 8),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: 'Capital Inflow - Sequoia Fund',
      type: 'Income',
      amount: depositAmount,
      status: 'Received',
      category: 'Income',
      paymentMethod: 'Fedwire Instant ACH',
      encryptedHash: '0x' + Math.random().toString(16).substring(2, 18),
      timestamp: new Date().toISOString()
    };

    setTransactions((prev) => [newTx, ...prev]);

    const newAct: FinancialActivity = {
      id: 'fa_' + Math.random().toString(36).substring(2, 7),
      title: 'Capital Inflow - Sequoia Fund',
      timestamp: 'Just now',
      amount: depositAmount,
      isPositive: true,
      icon: 'deposit',
      category: 'Treasury'
    };
    setActivities((prev) => [newAct, ...prev]);

    setKpi((prev) => ({
      ...prev,
      totalBalance: prev.totalBalance + depositAmount,
      monthlyIncome: prev.monthlyIncome + depositAmount,
      netProfit: prev.netProfit + depositAmount
    }));

    const newNotif: PushNotification = {
      id: 'notif_' + Math.random().toString(36).substring(2, 8),
      title: 'Incoming Wire Received',
      message: `+$${depositAmount.toLocaleString()} credited to Mufasa Vault from Sequoia Fund.`,
      time: 'Just now',
      type: 'transaction',
      read: false,
      linkTab: 'transactions'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(
      'Capital Inflow Received',
      `+$${depositAmount.toLocaleString()} credited to your balance via Fedwire.`,
      'success'
    );
  };

  const triggerBudgetPushAlert = (category: string, percent: number, spent: number, limit: number) => {
    const newNotif: PushNotification = {
      id: 'notif_' + Math.random().toString(36).substring(2, 8),
      title: `Budget Alert: ${category} at ${percent}%`,
      message: `Spending reached $${spent.toLocaleString()} of $${limit.toLocaleString()} budget limit. Immediate threshold review recommended.`,
      time: 'Just now',
      type: 'budget',
      read: false,
      linkTab: 'budgets'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(
      `Budget Alert: ${category} (${percent}%)`,
      `You've reached $${spent.toLocaleString()} of your $${limit.toLocaleString()} threshold.`,
      'budget'
    );
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          // 3. Tree 1: NOT authenticated -> render ONLY AuthScreen (standalone full-screen)
          <motion.div
            key="auth-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col"
          >
            <LoginPageView onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        ) : (
          // 3. Tree 2: Authenticated -> render existing app shell with 400ms fade/scale-in transition
          <motion.div
            key="app-shell"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col min-h-screen"
          >
            {/* Top Banner Hero Header */}
            <div className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#0a0f1c] via-[#070a14] to-[#07090e] px-4 md:px-8 py-8 md:py-10 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-10 left-1/3 w-64 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-4xl mx-auto">
                <div className="flex items-center justify-between text-[11px] font-semibold tracking-widest text-slate-400 uppercase mb-3">
                  <span className="text-cyan-400">Smarter Finance · Brighter Tomorrow</span>
                  <span className="hidden sm:inline text-slate-500">Plan · Analyze · Grow</span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-2">
                  Finance <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Dashboard</span>
                </h1>

                <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto font-normal">
                  Track cash flow, budgets, profit, and portfolio performance with Mufasa Pay.
                </p>
              </div>
            </div>

            {/* Main App Container */}
            <div className="flex-1 flex max-w-[1720px] w-full mx-auto">
              <Sidebar
                activeTab={activeTab}
                onSelectTab={setActiveTab}
                isOpenMobile={isMobileMenuOpen}
                onCloseMobile={() => setIsMobileMenuOpen(false)}
                onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
              />

              <div className="flex-1 md:pl-64 flex flex-col min-w-0">
                <Header
                  user={user}
                  notifications={notifications}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
                  onOpenNotificationCenter={() => setIsNotificationCenterOpen(true)}
                  onOpenAuthModal={() => setIsAuthModalOpen(true)}
                  onOpenGatewayModal={() => setIsGatewayModalOpen(true)}
                  onOpenThresholdModal={() => setIsThresholdModalOpen(true)}
                  onTriggerInflow={handleSimulateInflow}
                  onSignOut={handleSignOut}
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                  syncTime={syncTime}
                />

                <PageTransition keyValue={activeTab}>
                  <main className="flex-1 p-4 md:p-8 space-y-6">
                    {activeTab === 'dashboard' && (
                      <div className="space-y-6">
                        <KPICards kpi={kpi} />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          <div className="lg:col-span-8">
                            <CashFlowChart
                              data={cashFlowData}
                              period={cashFlowPeriod}
                              onPeriodChange={setCashFlowPeriod}
                            />
                          </div>
                          <div className="lg:col-span-4">
                            <ProfitLossCard
                              totalIncome={kpi.monthlyIncome}
                              totalExpenses={kpi.monthlyExpenses}
                              operatingProfit={10320}
                              otherIncome={1820}
                              netProfit={kpi.netProfit}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          <div className="lg:col-span-6">
                            <ExpenseBreakdownDonut
                              categories={expenseCategories}
                              totalExpenses={kpi.monthlyExpenses}
                            />
                          </div>
                          <div className="lg:col-span-6">
                            <RevenueVsExpenseBarChart data={revenueVsExpense} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          <div className="lg:col-span-6">
                            <PortfolioPerformanceCard assets={portfolioAssets} />
                          </div>
                          <div className="lg:col-span-6">
                            <BudgetAllocationCard
                              budgets={budgets}
                              totalSpent={8500}
                              totalBudget={12000}
                              onOpenThresholdModal={() => setIsThresholdModalOpen(true)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          <div className="lg:col-span-7">
                            <RecentInvoicesTable
                              transactions={transactions}
                              onViewAllClick={() => setActiveTab('transactions')}
                              onSelectTx={(tx) => {
                                showToast(
                                  'Encrypted Ledger Proof',
                                  `Hash: ${tx.encryptedHash} · Method: ${tx.paymentMethod}`,
                                  'success'
                                );
                              }}
                            />
                          </div>
                          <div className="lg:col-span-5">
                            <FinancialActivityFeed
                              activities={activities}
                              onViewAllClick={() => setActiveTab('transactions')}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'transactions' && (
                      <TransactionsView
                        transactions={transactions}
                        onOpenGatewayModal={() => setIsGatewayModalOpen(true)}
                        onSelectTx={(tx) => {
                          showToast(
                            'Ledger Hash Verified',
                            `${tx.description} · ${tx.encryptedHash}`,
                            'success'
                          );
                        }}
                      />
                    )}

                    {(activeTab === 'expenses' || activeTab === 'budgets') && (
                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-[#0d121f] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h2 className="text-xl font-extrabold text-white">
                              {activeTab === 'expenses' ? 'Expense Intelligence' : 'Budget Allocation & Threshold Rules'}
                            </h2>
                            <p className="text-xs text-slate-400 mt-1">
                              Configure automated push alerts and spending limits for each financial department.
                            </p>
                          </div>
                          <button
                            onClick={() => setIsThresholdModalOpen(true)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:brightness-110"
                          >
                            Configure Alert Thresholds
                          </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <ExpenseBreakdownDonut
                            categories={expenseCategories}
                            totalExpenses={kpi.monthlyExpenses}
                          />
                          <BudgetAllocationCard
                            budgets={budgets}
                            totalSpent={8500}
                            totalBudget={12000}
                            onOpenThresholdModal={() => setIsThresholdModalOpen(true)}
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'security' && (
                      <SecurityVaultView
                        devices={devices}
                        onTriggerBiometricTest={() => {
                          requireBiometricAuth(
                            'Biometric Security Enclave Test',
                            'Scan Touch ID or Face ID to verify biometric hardware attestation.',
                            undefined,
                            () => {
                              showToast('Biometric Attested', 'Hardware token validated successfully.', 'success');
                            }
                          );
                        }}
                        onSyncDevices={() => {
                          setSyncTime('Just now');
                          showToast('Cloud Sync Completed', 'All 3 connected devices are synchronized end-to-end.', 'success');
                        }}
                        syncStatus={syncTime}
                      />
                    )}

                    {activeTab === 'cards' && (
                      <CardsView
                        onTriggerBiometricAuth={(onSuccess) => {
                          requireBiometricAuth(
                            'Authorize Card Reveal',
                            'Scan biometric token to reveal PAN and CVV security code.',
                            undefined,
                            onSuccess
                          );
                        }}
                      />
                    )}

                    {activeTab === 'gateways' && (
                      <GatewaysView
                        gateways={gateways}
                        onOpenGatewayModal={() => setIsGatewayModalOpen(true)}
                      />
                    )}

                    {(activeTab === 'income' || activeTab === 'investments' || activeTab === 'invoices' || activeTab === 'reports' || activeTab === 'goals' || activeTab === 'settings') && (
                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-[#0d121f] border border-slate-800 flex items-center justify-between">
                          <div>
                            <h2 className="text-xl font-bold text-white capitalize">{activeTab} Overview</h2>
                            <p className="text-xs text-slate-400 mt-1">Real-time telemetry and management portal</p>
                          </div>
                          <button
                            onClick={() => setActiveTab('dashboard')}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
                          >
                            Back to Dashboard
                          </button>
                        </div>

                        {activeTab === 'investments' && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <PortfolioPerformanceCard assets={portfolioAssets} />
                            <CashFlowChart
                              data={cashFlowData}
                              period={cashFlowPeriod}
                              onPeriodChange={setCashFlowPeriod}
                            />
                          </div>
                        )}

                        {activeTab === 'invoices' && (
                          <RecentInvoicesTable
                            transactions={transactions}
                            onViewAllClick={() => setActiveTab('transactions')}
                          />
                        )}

                        {activeTab === 'settings' && (
                          <div className="p-6 rounded-2xl bg-[#0d121f] border border-slate-800 space-y-4">
                            <h3 className="text-base font-bold text-white">Application Preferences</h3>
                            <div className="space-y-3 text-xs">
                              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                                <div>
                                  <span className="font-semibold text-white block">Theme Mode</span>
                                  <span className="text-slate-400">Obsidian Dark with Royal Gold Trim</span>
                                </div>
                                <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 font-mono text-[11px] font-bold">
                                  Active
                                </span>
                              </div>
                              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                                <div>
                                  <span className="font-semibold text-white block">Real-time Push Notifications</span>
                                  <span className="text-slate-400">Audio synthetic chimes & browser notifications</span>
                                </div>
                                <span className="text-emerald-400 font-bold">Enabled</span>
                              </div>
                              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                                <div>
                                  <span className="font-semibold text-white block">Client-side Encryption</span>
                                  <span className="text-slate-400">AES-256-GCM / SHA-256</span>
                                </div>
                                <span className="text-emerald-400 font-bold">Active</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </main>
                </PageTransition>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Push Toast Alert */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-2xl bg-[#0e1322] border border-amber-500/40 shadow-2xl text-slate-100 animate-slide-up flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            {activeToast.type === 'budget' ? (
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            ) : (
              <Bell className="w-5 h-5 text-amber-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white flex items-center justify-between">
              <span>{activeToast.title}</span>
              <button
                onClick={() => setActiveToast(null)}
                className="text-slate-400 hover:text-white text-xs ml-2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </h4>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
              {activeToast.message}
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      <BiometricModal
        isOpen={biometricModalConfig.isOpen}
        onClose={() => setBiometricModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onSuccess={biometricModalConfig.onSuccess}
        title={biometricModalConfig.title}
        subtitle={biometricModalConfig.subtitle}
        amount={biometricModalConfig.amount}
      />

      <PaymentGatewayModal
        isOpen={isGatewayModalOpen}
        onClose={() => setIsGatewayModalOpen(false)}
        gateways={gateways}
        onInitiateBiometricAuth={({ amount, recipient, gateway, category, onVerified }) => {
          requireBiometricAuth(
            'Authorize Gateway Transfer',
            `Confirm payment of $${amount.toFixed(2)} to ${recipient} via ${gateway}.`,
            amount,
            onVerified
          );
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <BudgetThresholdModal
        isOpen={isThresholdModalOpen}
        onClose={() => setIsThresholdModalOpen(false)}
        budgets={budgets}
        onSaveBudgets={(updated) => {
          setBudgets(updated);
          showToast('Budget Rules Updated', 'Threshold alert limits saved to your device.', 'success');
        }}
        onTriggerTestAlert={triggerBudgetPushAlert}
      />

      <NotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          showToast('Notifications Marked Read', 'All alerts marked as read.', 'success');
        }}
        onClearAll={() => {
          setNotifications([]);
          showToast('Cleared', 'Notification tray cleared.', 'success');
        }}
        onSelectNotification={(notif) => {
          setNotifications((prev) =>
            prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
          );
          if (notif.linkTab) {
            setActiveTab(notif.linkTab as ActiveTab);
          }
          setIsNotificationCenterOpen(false);
        }}
        onTriggerDemoNotification={() => {
          const sampleAlerts = [
            {
              title: 'Budget Alert: Dining & Food reached 85%',
              msg: '$1,700 of $2,000 category budget consumed.',
              type: 'budget' as const
            },
            {
              title: 'Stripe Settlement Received',
              msg: '+$1,850.00 settled into vault with AES-256 token.',
              type: 'transaction' as const
            },
            {
              title: 'Biometric Passkey Attested',
              msg: 'Touch ID signed session from iPhone 15 Pro.',
              type: 'security' as const
            }
          ];
          const chosen = sampleAlerts[Math.floor(Math.random() * sampleAlerts.length)];
          const newNotif: PushNotification = {
            id: 'notif_' + Math.random().toString(36).substring(2, 8),
            title: chosen.title,
            message: chosen.msg,
            time: 'Just now',
            type: chosen.type,
            read: false,
            linkTab: chosen.type === 'budget' ? 'budgets' : 'transactions'
          };
          setNotifications((prev) => [newNotif, ...prev]);
          showToast(chosen.title, chosen.msg, chosen.type === 'budget' ? 'budget' : 'success');
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          showToast('Welcome back, ' + loggedInUser.name, 'Biometric session authenticated successfully.', 'success');
        }}
      />

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgraded={() => {
          if (user) {
            setUser({ ...user, accountTier: 'Royal Black' });
          }
          showToast('Upgraded to Sovereign Tier', 'Private wealth banking privileges unlocked!', 'success');
        }}
      />
    </div>
  );
}
