"use client";

import React, { useState } from "react";
import { FiRefreshCw, FiArrowRight, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const WALLETS = ["Spot Wallet", "Margin Wallet", "Funding Wallet", "Futures Wallet"];
const COINS = ["USDT", "BTC", "ETH", "SOL", "BNB"];

export default function AssetTransferPage() {
  const [fromWallet, setFromWallet] = useState("Spot Wallet");
  const [toWallet, setToWallet]     = useState("Margin Wallet");
  const [coin, setCoin]             = useState("USDT");
  const [amount, setAmount]         = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSwapWallets = () => {
    setFromWallet(toWallet);
    setToWallet(fromWallet);
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    setSuccessMsg(`Transferred ${amount} ${coin} from ${fromWallet} to ${toWallet} successfully!`);
    setAmount("");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-[#0c0c0e]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Internal Asset Transfer
        </h1>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
          Move funds instantly between your Spot, Margin, Funding and Futures wallets with zero fees
        </p>
      </div>

      <div className="max-w-2xl bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-6 shadow-sm">
        {successMsg && (
          <div className="mb-5 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-md text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5 shrink-0" /> {successMsg}
          </div>
        )}

        <form onSubmit={handleTransfer} className="space-y-5">
          {/* From -> To Row */}
          <div className="grid grid-cols-1 sm:grid-cols-5 items-center gap-3 bg-gray-50 dark:bg-white/[0.02] p-4 rounded-md border border-gray-100 dark:border-white/[0.04]">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">From</label>
              <select
                value={fromWallet}
                onChange={(e) => setFromWallet(e.target.value)}
                className="w-full text-xs font-bold bg-white dark:bg-[#1a1c22] border border-gray-200 dark:border-white/10 rounded-md p-2.5 text-gray-900 dark:text-white focus:outline-none"
              >
                {WALLETS.filter((w) => w !== toWallet).map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSwapWallets}
                className="p-2.5 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-blue-600 dark:text-blue-400 hover:rotate-180 transition-transform duration-300 cursor-pointer shadow-sm"
              >
                <FiRefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">To</label>
              <select
                value={toWallet}
                onChange={(e) => setToWallet(e.target.value)}
                className="w-full text-xs font-bold bg-white dark:bg-[#1a1c22] border border-gray-200 dark:border-white/10 rounded-md p-2.5 text-gray-900 dark:text-white focus:outline-none"
              >
                {WALLETS.filter((w) => w !== fromWallet).map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Coin Select */}
          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1.5">Select Asset</label>
            <select
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
              className="w-full text-xs font-bold bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-md p-3 text-gray-900 dark:text-white focus:outline-none"
            >
              {COINS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Amount</label>
              <span className="text-xs text-gray-400 font-bold">Available: <span className="text-gray-800 dark:text-gray-200">2,450.00 {coin}</span></span>
            </div>
            <div className="relative">
              <input
                type="number"
                step="any"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full text-sm font-bold bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-md p-3 pr-16 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setAmount("2450.00")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                MAX
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-md text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center justify-between">
            <span>Transfer Fee: <strong className="text-emerald-600 dark:text-emerald-400">FREE</strong></span>
            <span>Execution: <strong>Instant</strong></span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md text-sm font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Confirm Transfer <FiArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
