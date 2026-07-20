'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { getCoinImg } from './walletTypes';

// ── Constants ────────────────────────────────────────────────────────────────
const MASK = '••••••••'; // fixed 8-dot mask — same width every time

const FIAT_RATES: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: '$',  rate: 1        },
  EUR: { symbol: '€',  rate: 0.917    },
  GBP: { symbol: '£',  rate: 0.781    },
  VND: { symbol: '₫',  rate: 25460    },
  JPY: { symbol: '¥',  rate: 157.3    },
  AUD: { symbol: 'A$', rate: 1.534    },
};

// CoinGecko id → coin symbol (matches /api/crypto/prices response)
const GECKO: Record<string, string> = {
  bitcoin: 'BTC', ethereum: 'ETH', solana: 'SOL', bnb: 'BNB',
  xrp: 'XRP', cardano: 'ADA', avalanche: 'AVAX', near: 'NEAR', tether: 'USDT',
};

const BASE_COINS = [
  { id: 'USDT', name: 'Tether USD',    apr: '7.46% APR', price: 1.001964,  exchange: 10075.56, spot: 0.0,    available: 0.00004989, color: '#3b82f6' },
  { id: 'ETH',  name: 'Ethereum',      apr: '7.46% APR', price: 3522.70,   exchange: 10.0,     spot: 5.42,   available: 0.0,        color: '#8b5cf6' },
  { id: 'BNB',  name: 'Binance',       apr: '7.46% APR', price: 580.00,    exchange: 4.5,      spot: 1.25,   available: 0.0,        color: '#f3ba2f' },
  { id: 'SOL',  name: 'Solana',        apr: '7.46% APR', price: 150.00,    exchange: 100.0,    spot: 24.5,   available: 0.0,        color: '#10b981' },
  { id: 'XRP',  name: 'XRP',           apr: '7.46% APR', price: 0.60,      exchange: 500.0,    spot: 120.0,  available: 0.0,        color: '#23292f' },
  { id: 'ADA',  name: 'Cardano',       apr: '7.46% APR', price: 0.38,      exchange: 1500.0,   spot: 300.0,  available: 0.0,        color: '#0033ad' },
  { id: 'AVAX', name: 'Avalanche',     apr: '7.46% APR', price: 28.50,     exchange: 25.0,     spot: 5.0,    available: 0.0,        color: '#e84142' },
  { id: 'NEAR', name: 'Near Protocol', apr: '7.46% APR', price: 5.20,      exchange: 80.0,     spot: 15.0,   available: 0.0,        color: '#000000' },
];

const BTC_FALLBACK = 64513.27;

// ── Component ─────────────────────────────────────────────────────────────────
export function OverviewCoinsList({ onSelectCoin }: { onSelectCoin: (coin: string) => void }) {
  const [searchQuery,  setSearchQuery]  = useState('');
  const [showBalance,  setShowBalance]  = useState(true);
  const [currency,     setCurrency]     = useState('USD');
  const [showCurrMenu, setShowCurrMenu] = useState(false);
  const [coins,        setCoins]        = useState(BASE_COINS);
  const [btcPrice,     setBtcPrice]     = useState(BTC_FALLBACK);
  const [liveRates,    setLiveRates]    = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // ── Fetch live prices ──────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchLive() {
      try {
        const res = await fetch('/api/crypto/prices');
        if (!res.ok) return;
        const { prices } = await res.json();
        if (!prices) return;
        setCoins(prev => prev.map(coin => {
          const geckoId = Object.keys(GECKO).find(k => GECKO[k] === coin.id);
          return geckoId && prices[geckoId]?.price
            ? { ...coin, price: prices[geckoId].price }
            : coin;
        }));
        if (prices['bitcoin']?.price) setBtcPrice(prices['bitcoin'].price);
        setLiveRates(true);
      } catch { /* keep fallback */ }
    }
    fetchLive();
    const t = setInterval(fetchLive, 30000);
    return () => clearInterval(t);
  }, []);

  // ── Close currency dropdown on outside click ───────────────────────────────
  useEffect(() => {
    function onClickOut(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowCurrMenu(false);
    }
    document.addEventListener('mousedown', onClickOut);
    return () => document.removeEventListener('mousedown', onClickOut);
  }, []);

  // ── Derived values ─────────────────────────────────────────────────────────
  const fiat     = FIAT_RATES[currency];
  let totalUSD   = 0;
  coins.forEach(c => { totalUSD += (c.exchange + c.spot + c.available) * c.price; });
  const totalBTC     = totalUSD / btcPrice;
  const totalFiat    = totalUSD * fiat.rate;

  const fmtUSD  = (n: number) => `${fiat.symbol}${(n * fiat.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const fmtCoin = (n: number, id: string) => `${n.toFixed(8)} ${id}`;

  const filtered = coins.filter(c =>
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* ── Top Overview Card ─────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-2xl p-6 shadow-xs select-none animate-[fadeIn_0.2s_ease-out]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Balance block */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Overview</h2>
              <span className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full ${liveRates ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-gray-100 dark:bg-white/[0.04] text-gray-400'}`}>
                <span className={`w-1 h-1 rounded-full ${liveRates ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
                {liveRates ? 'Live' : '...'}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 block">Total Balance</span>
            {/* Fixed-width container prevents layout shift */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white w-[220px] inline-block">
                {showBalance ? totalBTC.toFixed(8) : MASK}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#58bd7d] text-white">BTC</span>
            </div>
            <span className="text-xs text-gray-400 font-bold block mt-1">
              {showBalance
                ? `${fiat.symbol}${totalFiat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : MASK}
            </span>
          </div>

          {/* Controls block */}
          <div className="space-y-4">
            <div className="flex gap-2.5">
              {/* Search */}
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 dark:border-white/[0.06] rounded-xl bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-primary" />
              </div>

              {/* Currency dropdown — now functional */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowCurrMenu(v => !v)}
                  className="px-4 py-2 text-xs border border-gray-200 dark:border-white/[0.06] rounded-xl bg-transparent text-[#3b82f6] font-bold flex items-center gap-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors whitespace-nowrap"
                >
                  {currency} <span className="text-gray-400 text-[10px]">&#9662;</span>
                </button>
                {showCurrMenu && (
                  <div className="absolute right-0 top-full mt-2 w-28 bg-white dark:bg-[#1f2026] border border-gray-200 dark:border-white/[0.06] rounded-xl shadow-xl z-50 py-1 animate-[fadeIn_0.15s_ease-out]">
                    {Object.keys(FIAT_RATES).map(cur => (
                      <button
                        key={cur}
                        onClick={() => { setCurrency(cur); setShowCurrMenu(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold cursor-pointer transition-colors ${cur === currency ? 'text-[#3b82f6] bg-indigo-50 dark:bg-indigo-900/10' : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                      >
                        {cur}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button onClick={() => setShowBalance(v => !v)}
              className="w-full py-2.5 rounded-xl bg-primary hover:bg-[#6366f1] text-white font-bold text-xs transition-colors cursor-pointer text-center shadow-md shadow-primary/15">
              {showBalance ? 'Hide balance' : 'Show balance'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Asset Table ───────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-2xl p-6 shadow-xs select-none animate-[fadeIn_0.2s_ease-out]">
        <div className="overflow-x-auto">
          {/* table-fixed + explicit column widths prevent any layout shift */}
          <table className="w-full text-left text-xs table-fixed">
            <colgroup>
              <col className="w-8" />
              <col className="w-48" />
              <col className="w-28" />
              <col className="w-44" />
              <col className="w-44" />
              <col className="w-44" />
            </colgroup>
            <thead>
              <tr className="text-gray-400 font-bold border-b border-gray-100 dark:border-white/[0.03] uppercase tracking-wider">
                <th className="pb-3">#</th>
                <th className="pb-3">Asset</th>
                <th className="pb-3 text-center">Earn</th>
                <th className="pb-3 text-right">On Orders</th>
                <th className="pb-3 text-right">Available Balance</th>
                <th className="pb-3 text-right">Total Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.03]">
              {filtered.map((coin, i) => {
                const total = coin.exchange + coin.spot + coin.available;
                return (
                  <tr key={coin.id} onClick={() => onSelectCoin(coin.id)} className="hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors cursor-pointer">
                    <td className="py-4 font-bold text-gray-400">{i + 1}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 dark:bg-white/5 shrink-0" style={{ color: coin.color }}>
                          <img src={getCoinImg(coin.id)} alt={coin.id} className="w-5 h-5 object-contain" onError={e => { (e.target as HTMLElement).style.display = 'none'; }} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">{coin.id}</div>
                          <div className="text-[10px] text-gray-400 font-medium">{coin.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center text-[#58bd7d] font-bold">{coin.apr}</td>
                    <td className="py-4 text-right">
                      <div className="font-bold text-gray-900 dark:text-white">{showBalance ? fmtCoin(coin.spot, coin.id) : MASK}</div>
                      <div className="text-[10px] text-gray-400 font-semibold">{showBalance ? fmtUSD(coin.spot * coin.price) : MASK}</div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="font-bold text-gray-900 dark:text-white">{showBalance ? fmtCoin(coin.exchange, coin.id) : MASK}</div>
                      <div className="text-[10px] text-gray-400 font-semibold">{showBalance ? fmtUSD(coin.exchange * coin.price) : MASK}</div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="font-bold text-gray-900 dark:text-white">{showBalance ? fmtCoin(total, coin.id) : MASK}</div>
                      <div className="text-[10px] text-gray-400 font-semibold">{showBalance ? fmtUSD(total * coin.price) : MASK}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
