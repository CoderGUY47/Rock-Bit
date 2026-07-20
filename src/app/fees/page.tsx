"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiPercent, FiSearch, FiZap, FiShield, FiTrendingDown, FiAward } from "react-icons/fi";

const SPOT_FEE_TIERS = [
  { level: "VIP 0", volume: "< 1M USD",   rbtBal: "< 5,000 RBT",    maker: 0.10,  taker: 0.10 },
  { level: "VIP 1", volume: "≥ 1M USD",   rbtBal: "≥ 5,000 RBT",    maker: 0.09,  taker: 0.09 },
  { level: "VIP 2", volume: "≥ 5M USD",   rbtBal: "≥ 10,000 RBT",   maker: 0.08,  taker: 0.085 },
  { level: "VIP 3", volume: "≥ 15M USD",  rbtBal: "≥ 25,000 RBT",   maker: 0.07,  taker: 0.08 },
  { level: "VIP 4", volume: "≥ 50M USD",  rbtBal: "≥ 50,000 RBT",   maker: 0.06,  taker: 0.075 },
  { level: "VIP 5", volume: "≥ 150M USD", rbtBal: "≥ 100,000 RBT",  maker: 0.05,  taker: 0.07 },
  { level: "VIP 6", volume: "≥ 500M USD", rbtBal: "≥ 250,000 RBT",  maker: 0.04,  taker: 0.06 },
  { level: "VIP 7", volume: "≥ 1.5B USD", rbtBal: "≥ 500,000 RBT",  maker: 0.03,  taker: 0.05 },
  { level: "VIP 8", volume: "≥ 4B USD",   rbtBal: "≥ 1M RBT",       maker: 0.02,  taker: 0.04 },
  { level: "VIP 9", volume: "≥ 10B USD",  rbtBal: "≥ 2.5M RBT",     maker: 0.012, taker: 0.024 },
];

const FUTURES_FEE_TIERS = [
  { level: "VIP 0", volume: "< 5M USD",   rbtBal: "< 5,000 RBT",    maker: 0.02,  taker: 0.05 },
  { level: "VIP 1", volume: "≥ 5M USD",   rbtBal: "≥ 5,000 RBT",    maker: 0.018, taker: 0.048 },
  { level: "VIP 2", volume: "≥ 25M USD",  rbtBal: "≥ 10,000 RBT",   maker: 0.016, taker: 0.045 },
  { level: "VIP 3", volume: "≥ 100M USD", rbtBal: "≥ 25,000 RBT",   maker: 0.014, taker: 0.042 },
  { level: "VIP 4", volume: "≥ 250M USD", rbtBal: "≥ 50,000 RBT",   maker: 0.012, taker: 0.04 },
  { level: "VIP 5", volume: "≥ 750M USD", rbtBal: "≥ 100,000 RBT",  maker: 0.01,  taker: 0.038 },
  { level: "VIP 6", volume: "≥ 2B USD",   rbtBal: "≥ 250,000 RBT",  maker: 0.008, taker: 0.035 },
  { level: "VIP 7", volume: "≥ 5B USD",   rbtBal: "≥ 50,000 RBT",   maker: 0.006, taker: 0.032 },
  { level: "VIP 8", volume: "≥ 15B USD",  rbtBal: "≥ 1M RBT",       maker: 0.004, taker: 0.03 },
  { level: "VIP 9", volume: "≥ 35B USD",  rbtBal: "≥ 2.5M RBT",     maker: 0.002, taker: 0.025 },
];

const DEPOSIT_WITHDRAW_FEES = [
  { coin: "BTC",  name: "Bitcoin",         deposit: "Free", minWithdraw: "0.001 BTC",  fee: "0.0005 BTC" },
  { coin: "ETH",  name: "Ethereum",        deposit: "Free", minWithdraw: "0.01 ETH",   fee: "0.003 ETH" },
  { coin: "USDT", name: "Tether (TRC20)",  deposit: "Free", minWithdraw: "10 USDT",    fee: "1 USDT" },
  { coin: "BNB",  name: "Binance Coin",    deposit: "Free", minWithdraw: "0.05 BNB",   fee: "0.001 BNB" },
  { coin: "RBT",  name: "Rock-Bit Token",  deposit: "Free", minWithdraw: "50 RBT",     fee: "5 RBT" },
  { coin: "SOL",  name: "Solana",          deposit: "Free", minWithdraw: "0.1 SOL",    fee: "0.01 SOL" },
];

const CDN = "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color";
function CoinIcon({ coin }: { coin: string }) {
  const [err, setErr] = useState(false);
  return err ? (
    <span className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 flex items-center justify-center text-[9px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
      {coin.slice(0, 2)}
    </span>
  ) : (
    <img
      src={`${CDN}/${coin.toLowerCase()}.svg`}
      alt={coin}
      className="w-7 h-7 rounded-full object-contain bg-white dark:bg-[#1d1d22] border border-gray-100 dark:border-white/[0.06] p-0.5 shrink-0"
      onError={() => setErr(true)}
    />
  );
}

const STAT_CARDS = [
  { icon: FiTrendingDown, label: "Lowest Maker Fee", value: "0.001%",  sub: "VIP 9 with RBT discount" },
  { icon: FiZap,          label: "Spot Base Fee",    value: "0.10%",   sub: "No VIP tier required" },
  { icon: FiShield,       label: "Deposit Fee",      value: "Free",    sub: "All supported coins" },
  { icon: FiAward,        label: "RBT Discount",     value: "25%",     sub: "Hold RBT to save" },
];

export default function TradingFeePage() {
  const [activeTab, setActiveTab]       = useState<"spot" | "futures" | "deposit">("spot");
  const [useRbtDiscount, setUseRbtDiscount] = useState(true);
  const [searchCoin, setSearchCoin]     = useState("");

  const discountMultiplier = useRbtDiscount ? 0.75 : 1.0;

  const filteredCoins = DEPOSIT_WITHDRAW_FEES.filter(
    (c) =>
      c.coin.toLowerCase().includes(searchCoin.toLowerCase()) ||
      c.name.toLowerCase().includes(searchCoin.toLowerCase())
  );

  const tiers = activeTab === "spot" ? SPOT_FEE_TIERS : FUTURES_FEE_TIERS;

  const tabBtn = (key: "spot" | "futures" | "deposit", label: string) => (
    <button
      key={key}
      onClick={() => setActiveTab(key)}
      className={`px-6 py-3 text-xs font-bold rounded-md transition-all cursor-pointer ${
        activeTab === key
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
          : "text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white flex flex-col font-sans">

      {/* ── Breadcrumb ── */}
      <div className="w-full border-b border-gray-200 dark:border-white/[0.04] bg-white dark:bg-[#141416] pt-10">
        <div className="w-[75%] mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-xs text-gray-400 font-bold select-none">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="text-gray-700 dark:text-gray-300">Trading Fees</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="bg-white dark:bg-[#101012] border-b border-gray-200 dark:border-white/[0.04]">
        <div className="w-[75%] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: headline + stat cards */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40 bg-indigo-50 dark:bg-indigo-900/10 px-3 py-1 rounded-md">
                Transparent Pricing
              </span>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                Simple, Transparent<br />
                <span className="text-indigo-600 dark:text-indigo-400">Fee Structure</span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-white/60 leading-relaxed font-semibold max-w-lg">
                Rock-Bit offers some of the lowest fees in the industry. Save even more by holding Rock-Bit Tokens (RBT) or rising through the VIP tiers.
              </p>
            </div>

            {/* Stat cards grid */}
            <div className="grid grid-cols-2 gap-3">
              {STAT_CARDS.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="bg-gray-50 dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
                  <p className="text-[10px] font-semibold text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: RBT toggle card */}
          <div className="bg-indigo-600 rounded-md p-8 space-y-6 text-white shadow-xl shadow-indigo-600/20">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FiPercent className="w-5 h-5" />
                <h3 className="text-base font-bold">Pay Fees with RBT</h3>
              </div>
              <p className="text-sm text-indigo-100 leading-relaxed font-semibold">
                Enable to deduct fees from your RBT balance at a flat <strong>25% discount</strong>. The more you hold, the more you save.
              </p>
            </div>

            <div className="flex items-center justify-between bg-white/10 rounded-md px-5 py-4">
              <div>
                <p className="text-sm font-bold">RBT Discount</p>
                <p className="text-[11px] text-indigo-200 font-semibold mt-0.5">
                  {useRbtDiscount ? "Active — 25% off all fees" : "Inactive — standard rates apply"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUseRbtDiscount(!useRbtDiscount)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-white/20 transition-colors duration-200 focus:outline-none ${
                  useRbtDiscount ? "bg-white" : "bg-white/20"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-lg ring-0 transition duration-200 ${
                    useRbtDiscount ? "translate-x-5 bg-indigo-600" : "translate-x-0 bg-white"
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Without RBT", maker: "0.10%", taker: "0.10%" },
                { label: "With RBT",    maker: "0.075%", taker: "0.075%", highlight: true },
              ].map((item) => (
                <div key={item.label} className={`rounded-md p-4 space-y-2 ${item.highlight ? "bg-white/20 border border-white/20" : "bg-white/10"}`}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">{item.label}</p>
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-white">Maker: <span className="font-bold">{item.maker}</span></p>
                    <p className="text-xs font-semibold text-white">Taker: <span className="font-bold">{item.taker}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="w-[75%] mx-auto px-6 py-10 space-y-6">

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-1.5 w-fit">
          {tabBtn("spot",    "Spot Trading")}
          {tabBtn("futures", "Futures Trading")}
          {tabBtn("deposit", "Deposit & Withdrawal")}
        </div>

        {/* Spot & Futures Table */}
        {(activeTab === "spot" || activeTab === "futures") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                {activeTab === "spot" ? "Spot" : "Futures"} VIP Level Fees
              </h2>
              {useRbtDiscount && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 px-3 py-1.5 rounded-md">
                  <FiPercent className="w-3 h-3" />
                  RBT 25% discount applied
                </span>
              )}
            </div>

            <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md overflow-x-auto shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/[0.06] bg-indigo-600 text-[10px] font-bold uppercase tracking-wider text-white select-none">
                    <th className="px-6 py-4">VIP Level</th>
                    <th className="px-6 py-4">30d Trading Volume</th>
                    <th className="px-6 py-4">Required RBT Balance</th>
                    <th className="px-6 py-4">Maker Fee</th>
                    <th className="px-6 py-4">Taker Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/[0.04] text-xs font-bold">
                  {tiers.map((tier, idx) => (
                    <tr
                      key={tier.level}
                      className={`transition-colors hover:bg-indigo-50/50 dark:hover:bg-indigo-900/5 ${idx === 0 ? "bg-indigo-50/30 dark:bg-indigo-900/5" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                          {tier.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{tier.volume}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{tier.rbtBal}</td>
                      <td className="px-6 py-4">
                        {useRbtDiscount ? (
                          <div className="flex items-center gap-1.5">
                            <span className="line-through text-gray-400 text-[10px]">{tier.maker.toFixed(4)}%</span>
                            <span className="text-emerald-500 font-bold">{(tier.maker * discountMultiplier).toFixed(4)}%</span>
                          </div>
                        ) : (
                          <span className="text-gray-900 dark:text-white">{tier.maker.toFixed(4)}%</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {useRbtDiscount ? (
                          <div className="flex items-center gap-1.5">
                            <span className="line-through text-gray-400 text-[10px]">{tier.taker.toFixed(4)}%</span>
                            <span className="text-emerald-500 font-bold">{(tier.taker * discountMultiplier).toFixed(4)}%</span>
                          </div>
                        ) : (
                          <span className="text-gray-900 dark:text-white">{tier.taker.toFixed(4)}%</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] font-semibold text-gray-400 px-1">
              * VIP level is determined by the higher of your 30-day trading volume or your RBT balance. Fees are calculated per trade.
            </p>
          </div>
        )}

        {/* Deposit & Withdrawal Table */}
        {activeTab === "deposit" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Deposit & Withdrawal Fees</h2>
              <div className="relative w-full sm:w-64">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                <input
                  type="text"
                  value={searchCoin}
                  onChange={(e) => setSearchCoin(e.target.value)}
                  placeholder="Search coin..."
                  className="w-full pl-9 pr-4 py-2.5 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#141416] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md overflow-x-auto shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/[0.06] bg-indigo-600 text-[10px] font-bold uppercase tracking-wider text-white select-none">
                    <th className="px-6 py-4">Coin</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Deposit Fee</th>
                    <th className="px-6 py-4">Min. Withdrawal</th>
                    <th className="px-6 py-4">Withdrawal Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/[0.04] text-xs font-bold">
                  {filteredCoins.map((item) => (
                    <tr key={item.coin} className="hover:bg-indigo-50/50 dark:hover:bg-indigo-900/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <CoinIcon coin={item.coin} />
                          <span className="font-bold text-gray-900 dark:text-white">{item.coin}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.name}</td>
                      <td className="px-6 py-4">
                        <span className="text-emerald-500 font-bold">{item.deposit}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{item.minWithdraw}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.fee}</td>
                    </tr>
                  ))}
                  {filteredCoins.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-gray-400 font-semibold select-none">
                        No coins matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
