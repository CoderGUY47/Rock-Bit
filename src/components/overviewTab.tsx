'use client';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { coinData, getCoinImg } from './walletTypes';

interface Props {
  selectedCoin: string;
  onBackToList: () => void;
  onNavigate: (mode: 'buy' | 'sell') => void;
}

function StatCard({ label, value, price, unit }: { label: string; value: number; price: number; unit: string }) {
  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (
    <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-2xl p-5 flex justify-between items-center flex-1 shadow-xs">
      <div className="flex items-center gap-2.5">
        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{label}</span>
      </div>
      <div className="text-right">
        <div className="text-xs font-bold text-gray-900 dark:text-white">{value.toFixed(8)} {unit}</div>
        <div className="text-[10px] text-gray-400 font-semibold">${fmt(value * price)}</div>
      </div>
    </div>
  );
}

export function OverviewTab({ selectedCoin, onBackToList, onNavigate }: Props) {
  const data = coinData[selectedCoin] || coinData.USDT;

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] p-6 rounded-2xl gap-4">
        <div className="flex items-center gap-3 select-none">
          <button onClick={onBackToList} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer text-gray-500 dark:text-gray-400">
            <FiChevronLeft className="w-5 h-5 stroke-[3]" />
          </button>
          <div>
            <span className="font-bold text-gray-900 dark:text-white text-base">{selectedCoin}</span>
            <span className="text-xs text-gray-400 font-medium ml-2">{data.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate('buy')} className="px-6 py-2.5 bg-primary hover:bg-[#6366f1] text-white font-bold text-xs rounded-full transition-colors cursor-pointer">Buy Crypto</button>
          <button onClick={() => onNavigate('sell')} className="px-6 py-2.5 bg-white dark:bg-[#1f2026] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-white/[0.06] hover:bg-gray-55 dark:hover:bg-gray-800 font-bold text-xs rounded-full transition-colors cursor-pointer">Sell Crypto</button>
        </div>
      </div>

      {/* Chart + Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Chart card */}
        <div className="md:col-span-2 bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-2xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2.5 mb-2 select-none">
              <span className="font-bold text-gray-900 dark:text-white text-base">{data.pair}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg text-white bg-[#58bd7d]">{data.change}</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4 select-none">
              <span className="text-xs text-gray-400 font-semibold">Total Balance</span>
              <span className="text-base font-bold text-gray-900 dark:text-white">{data.balanceDisplay}</span>
            </div>
          </div>
          <div className="mt-6">
            <svg className="w-full h-32" viewBox="0 0 400 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={data.chartColor} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={data.chartColor} stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 10 100 L 25 100 L 45 72 L 60 68 L 75 82 L 95 82 L 115 78 L 135 52 L 155 56 L 175 76 L 195 82 L 215 92 L 235 86 L 255 96 L 275 90 L 295 78 L 315 78 L 335 100 L 355 100 L 355 120 L 10 120 Z" fill="url(#gradient-chart)" />
              <path d="M 10 100 L 25 100 L 45 72 L 60 68 L 75 82 L 95 82 L 115 78 L 135 52 L 155 56 L 175 76 L 195 82 L 215 92 L 235 86 L 255 96 L 275 90 L 295 78 L 315 78 L 335 100 L 355 100" fill="none" stroke={data.chartColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Stats cards */}
        <div className="flex flex-col justify-between gap-4 h-full">
          <StatCard label="Exchange" value={data.exchange} price={data.price} unit={data.unit} />
          <StatCard label="Spot"     value={data.spot}     price={data.price} unit={data.unit} />
          <StatCard label="Available" value={data.available} price={data.price} unit={data.unit} />
        </div>
      </div>
    </div>
  );
}
