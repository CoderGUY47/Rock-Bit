"use client";

import React, { useState } from "react";
import { FiTrendingUp, FiLock, FiLayers, FiZap, FiGrid } from "react-icons/fi";

const STAKING_POOLS = [
  { id: 1, name: "Curve Finance Staking", token: "USDT", apy: "12.45%", tvl: "$152.4M", duration: "Flexible", risk: "Low" },
  { id: 2, name: "Uniswap V3 Liquidity", token: "ETH", apy: "24.18%", tvl: "$98.2M", duration: "30 Days Lock", risk: "Medium" },
  { id: 3, name: "Aave Lending Pool", token: "USDC", apy: "8.92%", tvl: "$342.9M", duration: "Flexible", risk: "Low" },
  { id: 4, name: "Lido Liquid Staking", token: "SOL", apy: "6.85%", tvl: "$72.1M", duration: "Flexible", risk: "Medium" },
  { id: 5, name: "Yearn Finance Vaults", token: "WBTC", apy: "15.30%", tvl: "$45.6M", duration: "60 Days Lock", risk: "Medium" },
];

export default function DefiStakingPage() {
  const [selectedPool, setSelectedPool] = useState(STAKING_POOLS[0]);
  const [amount, setAmount] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleStake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return alert("Please enter a valid staking amount");
    if (!agreed) return alert("You must agree to the Terms of Service");
    alert(`Successfully staked ${amount} ${selectedPool.token} in ${selectedPool.name}!`);
    setAmount("");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-teal-600 to-emerald-700 dark:from-teal-650/20 dark:to-emerald-750/20 p-8 rounded-2xl border border-emerald-500/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xl shadow-emerald-500/5 select-none">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
            DeFi Staking & Mining
          </h1>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-xl">
            Stake stablecoins, BTC, or ETH directly into validated DeFi smart contracts. Clean dashboard management with zero gas-fee execution.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0 bg-white/10 dark:bg-white/5 p-4 rounded-xl backdrop-blur-xs">
          <div className="text-right">
            <span className="block text-xs font-bold text-gray-805 dark:text-gray-400">Total DeFi TVL</span>
            <span className="text-xl font-black text-gray-950 dark:text-white">$711.2M</span>
          </div>
          <FiZap className="w-10 h-10 text-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pools Table/List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-lg font-black text-gray-900 dark:text-white">DeFi Vaults</h2>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Gas-free transactions</span>
          </div>

          <div className="space-y-3">
            {STAKING_POOLS.map((pool) => (
              <div
                key={pool.id}
                onClick={() => setSelectedPool(pool)}
                className={`bg-black/2 dark:bg-white/[0.04] border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all duration-300 ${
                  selectedPool.id === pool.id
                    ? "border-emerald-500/60 shadow-lg shadow-emerald-500/5 bg-emerald-500/5 dark:bg-emerald-500/5"
                    : "border-black/5 dark:border-white/[0.04] hover:bg-black/5 dark:hover:bg-white/[0.06] hover:border-black/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Token Badge */}
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-teal-500 to-emerald-650 flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-md">
                    {pool.token}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-gray-900 dark:text-white">{pool.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                        {pool.duration}
                      </span>
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">TVL: {pool.tvl}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-8">
                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">EST APY</span>
                    <span className="text-lg font-black text-[#58bd7d] flex items-center gap-1">
                      <FiTrendingUp className="w-4 h-4" /> {pool.apy}
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Risk Level</span>
                    <span className={`text-xs font-bold flex items-center gap-1 sm:justify-end ${
                      pool.risk === "Low" ? "text-emerald-500" : "text-amber-500"
                    }`}>
                      {pool.risk}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stake Panel */}
        <div className="bg-black/2 dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.04] rounded-2xl p-6 space-y-6 h-fit">
          <div className="border-b border-black/5 dark:border-white/5 pb-4">
            <h3 className="text-lg font-black text-gray-900 dark:text-white">Stake Assets</h3>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">
              Contract: {selectedPool.name}
            </p>
          </div>

          <form onSubmit={handleStake} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Stake Amount</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 font-bold text-sm text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-emerald-500 transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {selectedPool.token}
                </span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-gray-400 dark:text-gray-500 px-1">
                <span>Flexible Redemptions</span>
                <span>Available: 15.24 {selectedPool.token}</span>
              </div>
            </div>

            <div className="bg-emerald-500/5 dark:bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-500 dark:text-gray-400">
                <span>Staking Yield</span>
                <span className="text-[#58bd7d] font-black">{selectedPool.apy}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-gray-500 dark:text-gray-400">
                <span>Staking Terms</span>
                <span className="text-gray-900 dark:text-white font-bold">{selectedPool.duration}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-gray-500 dark:text-gray-400">
                <span>Redemption Period</span>
                <span className="text-gray-900 dark:text-white font-bold">Instant</span>
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer select-none py-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="mt-0.5 rounded-sm border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] leading-relaxed font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                I agree to place my assets in {selectedPool.name} contracts. I acknowledge smart contract risks associated with DeFi protocols.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              Start Staking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
