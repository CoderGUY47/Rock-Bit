'use client';

import React, { useState } from 'react';
import { StepBar }          from '@/components/stepBar';
import { OverviewCoinsList } from '@/components/overviewCoinsList';
import { OverviewTab }      from '@/components/overviewTab';
import { SelectCurrency }   from '@/components/selectCurrency';
import { ConfirmPayment, PaymentComplete } from '@/components/paymentSteps';

type Step = 1 | 2 | 3 | 4;
type Mode = 'overview' | 'buy' | 'sell';

export default function WalletPage() {
  const [step,         setStep]         = useState<Step>(1);
  const [activeTab,    setActiveTab]    = useState<Mode>('overview');
  const [selectedCoin, setSelectedCoin] = useState<string | null>('USDT');

  const pageTitle = activeTab === 'overview' ? 'Wallet' : activeTab === 'buy' ? 'Buy Crypto' : 'Sell Crypto';
  const breadcrumbs = activeTab === 'overview'
    ? ['Home', 'Wallet']
    : ['Home', 'Wallet', activeTab === 'buy' ? 'Buy crypto' : 'Sell crypto'];

  const navBtnCls = (active: boolean) =>
    `flex-1 lg:flex-none text-left px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center lg:text-left ${
      active ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-transparent text-gray-500 hover:bg-gray-55 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
    }`;

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0c0c0e] min-h-screen text-gray-900 dark:text-white font-sans">

      {/* Breadcrumb Header */}
      <div className="border-b border-gray-200 dark:border-white/[0.04] bg-white dark:bg-[#141416]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{pageTitle}</h1>
          <nav className="flex items-center gap-2 text-xs text-gray-400 font-semibold select-none">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb}>
                {i < breadcrumbs.length - 1 ? (
                  <button onClick={() => { if (crumb === 'Wallet') { setSelectedCoin(null); setActiveTab('overview'); } }}
                    className="hover:text-primary transition-colors cursor-pointer font-bold">{crumb}</button>
                ) : (
                  <span className="text-gray-700 dark:text-gray-300 font-bold">{crumb}</span>
                )}
                {i < breadcrumbs.length - 1 && <span className="text-gray-300 dark:text-gray-700">/</span>}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto w-full px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Sidebar */}
          <aside className="w-full lg:w-56 shrink-0 flex lg:flex-col gap-1.5 bg-white dark:bg-[#141416] p-2 border border-gray-200 dark:border-white/[0.04] rounded-2xl select-none">
            <div className="hidden lg:block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-1 px-3">Overview</div>
            <button onClick={() => { setActiveTab('overview'); setSelectedCoin(null); setStep(1); }} className={navBtnCls(activeTab === 'overview')}>Overview</button>
            <button onClick={() => { setActiveTab('buy');      setStep(1); }}                       className={navBtnCls(activeTab === 'buy')}>Buy Crypto</button>
            <button onClick={() => { setActiveTab('sell');     setStep(2); }}                       className={navBtnCls(activeTab === 'sell')}>Sell Crypto</button>
          </aside>

          {/* Content */}
          <div className="flex-1 w-full min-w-0">
            <StepBar step={step} mode={activeTab} />

            {activeTab === 'overview' && (
              selectedCoin === null
                ? <OverviewCoinsList onSelectCoin={setSelectedCoin} />
                : <OverviewTab selectedCoin={selectedCoin} onBackToList={() => setSelectedCoin(null)}
                    onNavigate={mode => { setActiveTab(mode); setStep(mode === 'buy' ? 1 : 2); }} />
            )}

            {activeTab === 'buy' && (
              <>
                {step === 1 && <SelectCurrency onNext={() => setStep(2)} mode="buy" onToggleMode={() => { setActiveTab('sell'); setStep(2); }} />}
                {step === 2 && <ConfirmPayment  onNext={() => setStep(3)} onBack={() => setStep(1)} mode="buy" />}
                {step === 3 && <PaymentComplete onReset={() => setStep(1)} mode="buy" />}
              </>
            )}

            {activeTab === 'sell' && (
              <>
                {step === 2 && <SelectCurrency onNext={() => setStep(3)} mode="sell" onToggleMode={() => { setActiveTab('buy'); setStep(1); }} />}
                {step === 3 && <ConfirmPayment  onNext={() => setStep(4)} onBack={() => setStep(2)} mode="sell" />}
                {step === 4 && <PaymentComplete onReset={() => setStep(2)} mode="sell" />}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
