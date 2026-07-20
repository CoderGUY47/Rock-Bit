'use client';
import React, { useState, useEffect } from 'react';
import { BASE_CURRENCIES, COINGECKO_TO_SYMBOL, getCoinImg, type Currency } from './walletTypes';

// ── Currency Badge (icon + label) ──────────────────────────────────────────
function CurrencyBadge({ cur }: { cur: Currency }) {
  if (cur.type === 'crypto') return (
    <><img src={getCoinImg(cur.id)} alt={cur.id} className="w-3.5 h-3.5 object-contain" /><span>{cur.label}</span></>
  );
  return <span className="text-[#3b82f6]">{cur.label}</span>;
}

// ── Unified Dropdown (Fiat + Crypto sections) ───────────────────────────────
function CurrencyDropdown({ currencies, exclude, onSelect }: {
  currencies: Currency[];
  exclude: string;
  onSelect: (id: string) => void;
}) {
  const fiats   = currencies.filter(c => c.type === 'fiat'   && c.id !== exclude);
  const cryptos = currencies.filter(c => c.type === 'crypto' && c.id !== exclude);
  const itemCls = 'w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-900 dark:text-white cursor-pointer transition-colors';

  return (
    <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-[#1f2026] border border-gray-200 dark:border-white/[0.06] rounded-xl shadow-xl z-50 py-1.5 animate-[fadeIn_0.15s_ease-out] overflow-y-auto max-h-56">
      <p className="px-3 pt-1.5 pb-0.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Fiat</p>
      {fiats.map(c => <button key={c.id} onClick={() => onSelect(c.id)} className={itemCls}>{c.label}</button>)}
      <p className="px-3 pt-2 pb-0.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-t border-gray-100 dark:border-white/[0.04] mt-1">Crypto</p>
      {cryptos.map(c => (
        <button key={c.id} onClick={() => onSelect(c.id)} className={`${itemCls} flex items-center gap-2`}>
          <img src={getCoinImg(c.id)} alt={c.id} className="w-3.5 h-3.5 object-contain" />{c.label}
        </button>
      ))}
    </div>
  );
}

// ── Single Input Box ────────────────────────────────────────────────────────
function CurrencyInput({ label, value, readOnly, cur, isOpen, onToggle, onAmountChange, currencies, exclude, onSelect }: {
  label: string; value: string; readOnly?: boolean; cur: Currency;
  isOpen: boolean; onToggle: () => void; onAmountChange?: (v: string) => void;
  currencies: Currency[]; exclude: string; onSelect: (id: string) => void;
}) {
  const inputCls = 'flex-1 text-sm font-semibold bg-transparent text-gray-900 dark:text-white outline-none w-0';
  const btnCls   = 'flex items-center gap-1.5 bg-gray-50 dark:bg-[#2c2d36] px-3 py-1.5 rounded-xl border border-gray-200 dark:border-white/[0.06] cursor-pointer text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#343540] transition-colors whitespace-nowrap';

  return (
    <div className="flex-1 w-full bg-white dark:bg-[#1c1d24] border border-gray-200 dark:border-white/[0.08] p-3.5 rounded-2xl">
      <p className="text-[10px] text-gray-400 mb-1.5 font-bold uppercase tracking-wider">{label}</p>
      <div className="flex items-center justify-between gap-2">
        {readOnly
          ? <input readOnly value={value} className={inputCls} />
          : <input type="text" value={value} onChange={e => onAmountChange?.(e.target.value)} className={inputCls} />
        }
        <div className="relative">
          <button onClick={onToggle} className={btnCls}>
            <CurrencyBadge cur={cur} />
            <span className="text-gray-400 text-[10px]">&#9662;</span>
          </button>
          {isOpen && <CurrencyDropdown currencies={currencies} exclude={exclude} onSelect={onSelect} />}
        </div>
      </div>
    </div>
  );
}

// ── Main SelectCurrency Component ───────────────────────────────────────────
export interface SelectCurrencyProps {
  onNext: () => void;
  mode: 'buy' | 'sell';
  onToggleMode: () => void;
}

export function SelectCurrency({ onNext }: SelectCurrencyProps) {
  const [leftId,     setLeftId]     = useState('VND');
  const [rightId,    setRightId]    = useState('BTC');
  const [leftAmount, setLeftAmount] = useState('3,000,000');
  const [openLeft,   setOpenLeft]   = useState(false);
  const [openRight,  setOpenRight]  = useState(false);
  const [currencies, setCurrencies] = useState<Currency[]>(BASE_CURRENCIES);
  const [liveRates,  setLiveRates]  = useState(false);

  useEffect(() => {
    async function fetchLive() {
      try {
        const res = await fetch('/api/crypto/prices');
        if (!res.ok) return;
        const { prices } = await res.json();
        if (!prices) return;
        setCurrencies(prev => prev.map(cur => {
          if (cur.type !== 'crypto') return cur;
          const geckoId = Object.keys(COINGECKO_TO_SYMBOL).find(k => COINGECKO_TO_SYMBOL[k] === cur.id);
          return geckoId && prices[geckoId]?.price ? { ...cur, usdRate: prices[geckoId].price } : cur;
        }));
        setLiveRates(true);
      } catch { /* keep fallback */ }
    }
    fetchLive();
    const t = setInterval(fetchLive, 30000);
    return () => clearInterval(t);
  }, []);

  const leftCur  = currencies.find(c => c.id === leftId)!;
  const rightCur = currencies.find(c => c.id === rightId)!;
  const numLeft  = parseFloat(leftAmount.replace(/,/g, '')) || 0;
  const rightAmount = ((numLeft * leftCur.usdRate) / rightCur.usdRate).toFixed(rightCur.type === 'fiat' ? 2 : 8);

  function handleSwap() {
    setLeftId(rightId); setRightId(leftId);
    setLeftAmount(rightAmount.replace(/,/g, ''));
  }

  return (
    <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-2xl p-6 shadow-xs select-none animate-[fadeIn_0.2s_ease-out]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">Confirm Information</h2>
        <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${liveRates ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-gray-100 dark:bg-white/[0.04] text-gray-400'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${liveRates ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
          {liveRates ? 'Live rates' : 'Loading...'}
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <CurrencyInput label="Pay" value={leftAmount} cur={leftCur} isOpen={openLeft}
          onToggle={() => { setOpenLeft(!openLeft); setOpenRight(false); }}
          onAmountChange={setLeftAmount}
          currencies={currencies} exclude={rightId}
          onSelect={id => { setLeftId(id); setOpenLeft(false); }}
        />

        <button onClick={handleSwap} className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20 cursor-pointer hover:bg-indigo-600 transition-colors active:scale-95">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 3L4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4" />
          </svg>
        </button>

        <CurrencyInput label="Get" value={rightAmount} readOnly cur={rightCur} isOpen={openRight}
          onToggle={() => { setOpenRight(!openRight); setOpenLeft(false); }}
          currencies={currencies} exclude={leftId}
          onSelect={id => { setRightId(id); setOpenRight(false); }}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={onNext} className="bg-primary hover:bg-[#6366f1] text-white font-bold text-xs px-8 py-3 rounded-full transition-all cursor-pointer shadow-md shadow-primary/10">
          Continue
        </button>
      </div>
    </div>
  );
}
