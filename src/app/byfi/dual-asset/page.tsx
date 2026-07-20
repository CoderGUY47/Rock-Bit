"use client";

import React, { useState } from "react";
import { FiTrendingUp, FiCheckCircle, FiInfo, FiLayers, FiCalendar } from "react-icons/fi";

const PRODUCTS = [
  { id: 1, pair: "BTC-USDT", apy: "135.42%", type: "Buy Low", strikePrice: "$63,500", duration: "3 Days", progress: 78 },
  { id: 2, pair: "BTC-USDT", apy: "112.18%", type: "Sell High", strikePrice: "$65,800", duration: "5 Days", progress: 42 },
  { id: 3, pair: "ETH-USDT", apy: "148.91%", type: "Buy Low", strikePrice: "$3,350", duration: "2 Days", progress: 91 },
  { id: 4, pair: "ETH-USDT", apy: "124.50%", type: "Sell High", strikePrice: "$3,550", duration: "7 Days", progress: 35 },
  { id: 5, pair: "SOL-USDT", apy: "162.30%", type: "Buy Low", strikePrice: "$142", duration: "4 Days", progress: 66 },
];

export default function DualAssetPage() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [amount, setAmount] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return alert("Please enter a valid subscription amount");
    if (!agreed) return alert("You must agree to the risk statement");
    alert(`Successfully subscribed to ${selectedProduct.pair} Dual Asset product!`);
    setAmount("");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 dark:from-blue-600/20 dark:to-indigo-700/20 p-8 rounded-2xl border border-blue-500/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xl shadow-blue-500/5 select-none">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
            Dual Asset Investment
          </h1>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-xl">
            Maximize yield by predicting market directions. High-APY investment products with automated returns settled in base or quote asset.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0 bg-white/10 dark:bg-white/5 p-4 rounded-xl backdrop-blur-xs">
          <div className="text-right">
            <span className="block text-xs font-bold text-gray-805 dark:text-gray-400">Total Value Locked</span>
            <span className="text-xl font-black text-gray-950 dark:text-white">$45,821,392</span>
          </div>
          <FiLayers className="w-10 h-10 text-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products List (Left side) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-lg font-black text-gray-900 dark:text-white">Active Staking Pools</h2>
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">5 Pools available</span>
          </div>

          <div className="space-y-3">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className={`bg-black/2 dark:bg-white/[0.04] border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all duration-300 ${
                  selectedProduct.id === prod.id
                    ? "border-blue-500/60 shadow-lg shadow-blue-500/5 bg-blue-500/5 dark:bg-blue-500/5"
                    : "border-black/5 dark:border-white/[0.04] hover:bg-black/5 dark:hover:bg-white/[0.06] hover:border-black/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-yellow-500 to-amber-600 flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-md">
                    {prod.pair.split("-")[0]}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-gray-900 dark:text-white">{prod.pair}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        prod.type === "Buy Low" ? "bg-green-500/10 text-[#58bd7d]" : "bg-blue-500/10 text-blue-500"
                      }`}>
                        {prod.type}
                      </span>
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">Strike: {prod.strikePrice}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-8">
                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">APY</span>
                    <span className="text-lg font-black text-[#58bd7d] flex items-center gap-1">
                      <FiTrendingUp className="w-4 h-4" /> {prod.apy}
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Duration</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1 sm:justify-end">
                      <FiCalendar className="w-4 h-4 text-gray-400" /> {prod.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Simulator Card (Right side) */}
        <div className="bg-black/2 dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.04] rounded-2xl p-6 space-y-6 h-fit">
          <div className="border-b border-black/5 dark:border-white/5 pb-4">
            <h3 className="text-lg font-black text-gray-900 dark:text-white">Subscribe</h3>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">
              Pool: {selectedProduct.pair} ({selectedProduct.type})
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Investment Amount</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 font-bold text-sm text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  USDT
                </span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-gray-400 dark:text-gray-500 px-1">
                <span>Min: 10 USDT</span>
                <span>Balance: 5,284.12 USDT</span>
              </div>
            </div>

            <div className="bg-blue-500/5 dark:bg-blue-500/5 rounded-xl p-4 border border-blue-500/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-500 dark:text-gray-400">
                <span>Annualized Yield (APY)</span>
                <span className="text-[#58bd7d] font-black">{selectedProduct.apy}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-gray-500 dark:text-gray-400">
                <span>Strike Price</span>
                <span className="text-gray-900 dark:text-white font-black">{selectedProduct.strikePrice}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-gray-500 dark:text-gray-400">
                <span>Settlement Date</span>
                <span className="text-gray-900 dark:text-white font-bold">{selectedProduct.duration}</span>
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
                I understand that dual asset investment contains volatility risk and settlement could be in quote/base coin.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-750 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-blue-500/20"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
