"use client";

import React, { useState } from "react";
import { FiTrendingUp, FiPlus, FiBriefcase, FiCompass, FiShield } from "react-icons/fi";

const LIQUIDITY_POOLS = [
  { id: 1, pair: "BTC / USDT", apr: "42.15%", liquidity: "$48.2M", vol24h: "$12.4M", share: "0.00%" },
  { id: 2, pair: "ETH / USDT", apr: "38.92%", liquidity: "$32.9M", vol24h: "$8.9M", share: "0.00%" },
  { id: 3, pair: "SOL / USDT", apr: "65.40%", liquidity: "$15.4M", vol24h: "$5.1M", share: "0.00%" },
  { id: 4, pair: "USDC / USDT", apr: "3.24%", liquidity: "$124.8M", vol24h: "$24.9M", share: "0.00%" },
  { id: 5, pair: "LINK / USDT", apr: "48.18%", liquidity: "$8.2M", vol24h: "$1.8M", share: "0.00%" },
];

export default function LiquidMiningPage() {
  const [selectedPool, setSelectedPool] = useState(LIQUIDITY_POOLS[0]);
  const [tokenAAmount, setTokenAAmount] = useState("");
  const [tokenBAmount, setTokenBAmount] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleAddLiquidity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenAAmount || Number(tokenAAmount) <= 0 || !tokenBAmount || Number(tokenBAmount) <= 0) {
      return alert("Please enter valid amounts for both tokens");
    }
    if (!agreed) return alert("You must agree to the liquidity terms");
    alert(`Successfully added liquidity to ${selectedPool.pair} pool!`);
    setTokenAAmount("");
    setTokenBAmount("");
  };

  const tokens = selectedPool.pair.split(" / ");

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-blue-600 to-cyan-600 dark:from-blue-600/20 dark:to-cyan-650/20 p-8 rounded-2xl border border-blue-500/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xl shadow-blue-500/5 select-none">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
            Liquidity Mining (AMM)
          </h1>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-xl">
            Add liquidity to Automated Market Maker pools. Earn trading fees as LP tokens, and stake them to claim high-yield liquid farming rewards.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0 bg-white/10 dark:bg-white/5 p-4 rounded-xl backdrop-blur-xs">
          <div className="text-right">
            <span className="block text-xs font-bold text-gray-805 dark:text-gray-400">Trading Fee Share</span>
            <span className="text-xl font-black text-gray-950 dark:text-white">0.30% Pool Fee</span>
          </div>
          <FiCompass className="w-10 h-10 text-cyan-500 animate-spin-slow" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pools list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-lg font-black text-gray-900 dark:text-white">Mining Pools</h2>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Stake LP tokens for bonus rewards</span>
          </div>

          <div className="space-y-3">
            {LIQUIDITY_POOLS.map((pool) => (
              <div
                key={pool.id}
                onClick={() => setSelectedPool(pool)}
                className={`bg-black/2 dark:bg-white/[0.04] border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all duration-300 ${
                  selectedPool.id === pool.id
                    ? "border-blue-500/60 shadow-lg shadow-blue-500/5 bg-blue-500/5 dark:bg-blue-500/5"
                    : "border-black/5 dark:border-white/[0.04] hover:bg-black/5 dark:hover:bg-white/[0.06] hover:border-black/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Token icons overlay container */}
                  <div className="flex items-center -space-x-4 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
                      {pool.pair.split(" / ")[0]}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
                      {pool.pair.split(" / ")[1]}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-gray-900 dark:text-white">{pool.pair}</h3>
                    <div className="flex items-center gap-4 mt-1 text-xs font-bold text-gray-400 dark:text-gray-500">
                      <span>Liquidity: {pool.liquidity}</span>
                      <span>24H Vol: {pool.vol24h}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-8">
                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">EST APR</span>
                    <span className="text-lg font-black text-[#58bd7d] flex items-center gap-1">
                      <FiTrendingUp className="w-4 h-4" /> {pool.apr}
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide font-semibold">Your Share</span>
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                      {pool.share}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Liquidity Interface Form */}
        <div className="bg-black/2 dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.04] rounded-2xl p-6 space-y-6 h-fit">
          <div className="border-b border-black/5 dark:border-white/5 pb-4">
            <h3 className="text-lg font-black text-gray-900 dark:text-white">Add Liquidity</h3>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">
              Pool: {selectedPool.pair}
            </p>
          </div>

          <form onSubmit={handleAddLiquidity} className="space-y-4">
            {/* Input Token A */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Input {tokens[0]}</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  value={tokenAAmount}
                  onChange={(e) => {
                    setTokenAAmount(e.target.value);
                    setTokenBAmount(e.target.value ? (Number(e.target.value) * 1.25).toString() : "");
                  }}
                  className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 font-bold text-sm text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {tokens[0]}
                </span>
              </div>
            </div>

            {/* Plus Divider */}
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <FiPlus className="w-4 h-4" />
              </div>
            </div>

            {/* Input Token B */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Input {tokens[1]}</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  value={tokenBAmount}
                  onChange={(e) => {
                    setTokenBAmount(e.target.value);
                    setTokenAAmount(e.target.value ? (Number(e.target.value) / 1.25).toString() : "");
                  }}
                  className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 font-bold text-sm text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {tokens[1]}
                </span>
              </div>
            </div>

            <div className="bg-blue-500/5 dark:bg-blue-500/5 rounded-xl p-4 border border-blue-500/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-500 dark:text-gray-400">
                <span>EST Pool Share</span>
                <span className="text-gray-900 dark:text-white font-black">&lt; 0.01%</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-gray-500 dark:text-gray-400">
                <span>EST APR Yield</span>
                <span className="text-[#58bd7d] font-black">{selectedPool.apr}</span>
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer select-none py-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="mt-0.5 rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-[10px] leading-relaxed font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                I agree to provide liquidity to the AMM pool. I understand the risk of Impermanent Loss.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-750 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-blue-500/20"
            >
              Supply Liquidity
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
