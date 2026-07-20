"use client";

import React, { useState } from "react";
import {
  FiDollarSign, FiTrendingUp, FiArrowUpRight, FiArrowDownRight,
  FiSend, FiDownload, FiRefreshCw, FiPieChart, FiLock, FiCheckCircle,
} from "react-icons/fi";
import { BiBitcoin } from "react-icons/bi";

const ASSETS = [
  { coin: "Bitcoin",  symbol: "BTC",  balance: "2.4500 BTC",  usd: "$156,359.00", allocation: "48%", color: "#F59E0B" },
  { coin: "Ethereum", symbol: "ETH",  balance: "18.200 ETH",  usd: "$60,278.40",  allocation: "25%", color: "#6366F1" },
  { coin: "Solana",   symbol: "SOL",  balance: "250.00 SOL",  usd: "$38,500.00",  allocation: "16%", color: "#10B981" },
  { coin: "Tether",   symbol: "USDT", balance: "24,500 USDT", usd: "$24,500.00",  allocation: "11%", color: "#3B82F6" },
];

export default function AssetOverviewPage() {
  const [selectedWallet, setSelectedWallet] = useState<"spot" | "funding" | "futures">("spot");

  const totalUSD = ASSETS.reduce((acc, a) => acc + parseFloat(a.usd.replace(/[$,]/g, "")), 0);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-[#0c0c0e]">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Asset Overview
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
            Total portfolio valuation, balances, and asset allocation
          </p>
        </div>
        <div className="flex gap-2">
          {(["spot", "funding", "futures"] as const).map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWallet(w)}
              className={`px-4 py-2 text-xs font-bold rounded-md capitalize transition-all cursor-pointer ${
                selectedWallet === w
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50"
              }`}
            >
              {w} Wallet
            </button>
          ))}
        </div>
      </div>

      {/* Main Balance Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-md p-6 text-white shadow-md flex flex-wrap justify-between items-center gap-6">
        <div>
          <p className="text-xs font-bold text-blue-100 uppercase tracking-wider mb-1">Total Estimated Balance</p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold font-mono">${totalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md flex items-center gap-1">
              <FiArrowUpRight className="w-3.5 h-3.5" /> +4.25% 24h
            </span>
          </div>
          <p className="text-xs text-blue-200 mt-2">≈ 4.382019 BTC</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-blue-600 hover:bg-blue-50 rounded-md text-xs font-bold transition-all shadow-sm cursor-pointer">
            <FiDownload className="w-4 h-4" /> Deposit
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs font-bold transition-all border border-white/20 cursor-pointer">
            <FiSend className="w-4 h-4" /> Withdraw
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs font-bold transition-all border border-white/20 cursor-pointer">
            <FiRefreshCw className="w-4 h-4" /> Transfer
          </button>
        </div>
      </div>

      {/* Asset Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ASSETS.map((a) => (
          <div key={a.symbol} className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: `${a.color}22`, color: a.color }}>
                  {a.symbol[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{a.coin}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{a.symbol}</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: `${a.color}15`, color: a.color }}>
                {a.allocation}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-gray-400">Balance</p>
              <p className="text-base font-bold text-gray-900 dark:text-white font-mono mt-0.5">{a.balance}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">{a.usd}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Allocation & Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <FiPieChart className="w-4 h-4 text-blue-500" /> Asset Distribution
          </h2>
          <div className="space-y-4">
            {ASSETS.map((a) => (
              <div key={a.symbol}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-700 dark:text-gray-200">{a.coin} ({a.symbol})</span>
                  <span className="font-mono" style={{ color: a.color }}>{a.usd} ({a.allocation})</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: a.allocation, background: a.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <FiLock className="w-4 h-4 text-emerald-500" /> Security Status
          </h2>
          <div className="space-y-3 text-xs font-bold">
            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-md text-emerald-700 dark:text-emerald-400">
              <span className="flex items-center gap-2"><FiCheckCircle className="w-4 h-4" /> 2FA Protection</span>
              <span>Enabled</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-md text-emerald-700 dark:text-emerald-400">
              <span className="flex items-center gap-2"><FiCheckCircle className="w-4 h-4" /> Withdrawal Whitelist</span>
              <span>Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-md text-blue-700 dark:text-blue-400">
              <span className="flex items-center gap-2"><FiCheckCircle className="w-4 h-4" /> Anti-Phishing Code</span>
              <span>Configured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
