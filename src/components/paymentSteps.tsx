'use client';
import React, { useState } from 'react';
import { FiCheck, FiCopy, FiChevronRight, FiCreditCard, FiCloud } from 'react-icons/fi';

// ── ConfirmPayment (Step 2) ─────────────────────────────────────────────────
export function ConfirmPayment({ onNext, onBack, mode }: { onNext: () => void; onBack: () => void; mode: 'buy' | 'sell' }) {
  const [acctName,    setAcctName]    = useState('Veum Cecilia');
  const [acctNumber,  setAcctNumber]  = useState(mode === 'buy' ? '548422222221' : 'V548422222221');
  const [address,     setAddress]     = useState('079 Dariana Knoll, CA');
  const [swiftCode,   setSwiftCode]   = useState('UI8');
  const [bankAddress, setBankAddress] = useState('55416 Powlowski Spring, CA');

  const inputCls = 'w-full px-4 py-3 text-xs rounded-xl border border-gray-200 dark:border-white/[0.04] bg-white dark:bg-[#1d1d22] text-gray-900 dark:text-white font-semibold outline-none';

  return (
    <div className="space-y-6 select-none animate-[fadeIn_0.2s_ease-out]">
      {/* Summary Bar */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-2xl p-6 shadow-xs">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Confirm Information</h2>
        <p className="text-xs text-gray-400 font-medium mb-5">
          {mode === 'buy' ? 'You Are About To Receive 1.356 BTC on Rock-Bit' : 'You Are About To Receive 1.356 BTC On Rock-Bit'}
        </p>
        <div className="flex flex-wrap items-center gap-5">
          {/* Pay/Sell */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 text-white">
              {mode === 'buy' ? <span className="font-bold text-xs">VND</span> : <FiCreditCard className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{mode === 'buy' ? 'Pay' : 'Sell'}</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{mode === 'buy' ? '3,000,000 VND' : '0.00207026 BTC'}</div>
            </div>
          </div>
          <FiChevronRight className="text-gray-300 w-4 h-4 hidden sm:block" />
          {/* Get */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 text-white">
              {mode === 'buy' ? <FiCreditCard className="w-5 h-5" /> : <span className="font-bold text-xs">VND</span>}
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Get</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{mode === 'buy' ? '0.00207026 BTC' : '3,000,000 VND'}</div>
            </div>
          </div>
          <FiChevronRight className="text-gray-300 w-4 h-4 hidden sm:block" />
          {/* For */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0 text-white"><FiCloud className="w-5 h-5" /></div>
            <div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">For</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">Rock-Bit</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Form */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Payment Details</h3>
        <p className="text-xs text-gray-400 font-semibold mb-4">Bank account</p>
        <div className="space-y-4">
          {[
            { label: 'Account name',   value: acctName,    setter: setAcctName,    highlight: true },
            { label: 'Account number', value: acctNumber,  setter: setAcctNumber,  highlight: false },
            { label: 'Address',        value: address,      setter: setAddress,      highlight: false },
            { label: 'SWIFT Code',     value: swiftCode,   setter: setSwiftCode,   highlight: false },
            { label: 'Bank Address',   value: bankAddress, setter: setBankAddress, highlight: false },
          ].map(({ label, value, setter, highlight }) => (
            <div key={label}>
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">{label}</label>
              <input type="text" value={value} onChange={e => setter(e.target.value)}
                className={`${inputCls} ${highlight ? 'border-indigo-500 focus:ring-1 focus:ring-indigo-500' : ''}`} />
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-gray-100 dark:border-white/[0.03] pt-5">
          <p className="text-xs font-bold text-gray-900 dark:text-white mb-1">Reference code</p>
          <p className="text-[10px] text-gray-400 font-medium mb-3">You MUST include the Reference Code in your deposit in order to credit your account!</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">Reference Code:</p>
          <div className="border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-center font-bold text-sm text-gray-900 dark:text-white bg-white dark:bg-[#1d1d22]">BLUTUKHY34PB</div>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={onBack}  className="flex-1 py-3.5 rounded-full border border-indigo-500 text-[#3b82f6] hover:bg-[#3b82f6]/5 font-bold text-xs transition-colors cursor-pointer text-center">Cancel</button>
          <button onClick={onNext}  className="flex-1 py-3.5 rounded-full bg-primary hover:bg-[#6366f1] text-white font-bold text-xs transition-colors cursor-pointer text-center shadow-md shadow-primary/15">Let's move on!</button>
        </div>
      </div>
    </div>
  );
}

// ── PaymentComplete (Step 3/4) ──────────────────────────────────────────────
export function PaymentComplete({ onReset, mode }: { onReset: () => void; mode: 'buy' | 'sell' }) {
  const details = [
    { label: 'Account name',   value: 'Veum Cecilia' },
    { label: 'Account number', value: '548422222221' },
    { label: 'Address',        value: '079 Dariana Knoll, CA' },
    { label: 'SWIFT Code',     value: 'UI8' },
    { label: 'Bank Address',   value: '55416 Powlowski Spring, CA' },
  ];

  return (
    <div className="space-y-6 select-none animate-[fadeIn_0.2s_ease-out]">
      {/* Success */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-2xl p-6 shadow-xs text-center">
        <h2 className="text-xl font-bold text-[#58bd7d] flex items-center justify-center gap-2 mb-3">
          Success
          <span className="w-5 h-5 bg-[#58bd7d] rounded-full flex items-center justify-center">
            <FiCheck className="w-3 h-3 text-white" strokeWidth={4} />
          </span>
        </h2>
        <p className="text-xs text-gray-500 font-medium mb-6">
          {mode === 'buy' ? 'You successfully bought 1.356 BTC on Rock-Bit!' : 'You successfully sold 1,356 BTC on Rock-Bit!'}
        </p>
        <div className="border border-gray-105 dark:border-white/[0.04] rounded-xl overflow-hidden text-xs">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 dark:border-white/[0.04] bg-gray-55 dark:bg-[#1c1d24]">
            <span className="text-gray-400 font-medium">Status</span>
            <span className="font-bold text-[#58bd7d]">Completed</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-gray-400 font-medium">Transaction ID</span>
            <span className="font-bold text-gray-800 dark:text-gray-200">0msx836930...87r398 ID</span>
          </div>
        </div>
      </div>

      {/* Bank details */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Payment Details</h3>
        <p className="text-xs text-gray-400 font-semibold mb-4">Bank account</p>
        <div className="space-y-3.5">
          {details.map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-white/[0.03]">
              <span className="text-xs text-gray-400 font-medium">{label}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white">{value}</span>
                <button className="text-gray-400 hover:text-primary transition-colors cursor-pointer p-1"><FiCopy className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-gray-100 dark:border-white/[0.03] pt-5">
          <p className="text-xs font-bold text-gray-900 dark:text-white mb-1">Reference code</p>
          <p className="text-[10px] text-gray-400 font-medium mb-3">You MUST include the Reference Code in your deposit in order to credit your account!</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">Reference Code:</p>
          <div className="border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-3 text-center font-bold text-xs text-gray-900 dark:text-white bg-white dark:bg-[#1d1d22]">BLUTUKHY34PB</div>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={onReset} className="flex-1 py-3.5 rounded-full border border-indigo-500 text-[#3b82f6] hover:bg-[#3b82f6]/5 font-bold text-xs transition-colors cursor-pointer text-center">Cancel</button>
          <button onClick={onReset} className="flex-1 py-3.5 rounded-full bg-primary hover:bg-[#6366f1] text-white font-bold text-xs transition-colors cursor-pointer text-center shadow-md shadow-primary/15">Let's move on!</button>
        </div>
      </div>
    </div>
  );
}
