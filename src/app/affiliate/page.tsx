"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiUserPlus, FiLink, FiTrendingUp, FiChevronDown, FiAward } from "react-icons/fi";

const TIERS = [
  { name: "Bronze Tier", refers: "0 - 5 referrals", pct: "20%", bg: "from-amber-700/10 to-amber-600/5", border: "border-amber-600/30", text: "text-amber-500" },
  { name: "Silver Tier", refers: "6 - 20 referrals", pct: "30%", bg: "from-slate-400/10 to-slate-300/5", border: "border-slate-400/30", text: "text-slate-400" },
  { name: "Gold Tier", refers: "21 - 100 referrals", pct: "40%", bg: "from-yellow-600/10 to-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-500" },
  { name: "Diamond Tier", refers: "100+ referrals", pct: "50%", bg: "from-cyan-600/10 to-cyan-500/5", border: "border-cyan-500/30", text: "text-cyan-400" },
];

const FAQS = [
  { q: "How is the commission calculated?", a: "Your commission is calculated as a percentage of the net trading fees paid by your referrals. For example, if a referred trader pays $100 in trading fees, and you are on the Gold Tier, you will receive $40 in commission." },
  { q: "When are affiliate payouts distributed?", a: "Affiliate payouts are computed daily and deposited directly into your Spot Wallet in USDT, BTC, or RBT depending on what token the referral paid fees in. Settlements occur every 24 hours." },
  { q: "Is there a limit to how much I can earn?", a: "No! There is absolutely no limit to the number of friends you can refer or the amount of commissions you can earn. Some of our top affiliates earn over $10,000 monthly." },
  { q: "What marketing materials do you provide?", a: "Once approved, you will have access to a full dashboard of banner designs, custom landing page links, promotional videos, and real-time click/conversion analytics." },
];

export default function AffiliatePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculator state
  const [referredCount, setReferredCount] = useState(15);
  const [avgVolume, setAvgVolume] = useState(25000);

  // Fee calculation helper: assume 0.1% average fee rate (maker/taker)
  const averageFeeRate = 0.001;

  // Commission Tier lookup based on referred count
  const getCommissionRate = (count: number) => {
    if (count <= 5) return 0.20;
    if (count <= 20) return 0.30;
    if (count <= 100) return 0.40;
    return 0.50;
  };

  const currentRate = getCommissionRate(referredCount);
  const estimatedEarnings = referredCount * avgVolume * averageFeeRate * currentRate;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white flex flex-col font-sans transition-colors duration-300">

      {/* ── Breadcrumb Header ────────────────────────────────────────── */}
      <div className="w-full border-b border-gray-200 dark:border-white/[0.04] bg-white/80 dark:bg-[#141416]/80 backdrop-blur-md relative z-10 pt-10">
        <div className="w-[75%] mx-auto px-6 py-5 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-gray-400 font-bold select-none">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="text-gray-700 dark:text-gray-300">Affiliate Program</span>
          </nav>
        </div>
      </div>

      {/* ── Hero Banner Section ────────────────────────────────────────── */}
      <div className="relative py-16 md:py-24 overflow-hidden border-b border-gray-200 dark:border-white/[0.04] bg-white dark:bg-[#101012] bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.05),transparent_50%)]">
        <div className="w-[75%] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              Earn Lifetime <br />
              <span className="text-indigo-600 dark:text-indigo-400">
                50% Commission
              </span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-white/60 leading-relaxed font-semibold max-w-xl">
              Invite your audience to Rock-Bit and build a recurring income stream. Receive lifetime payouts on every trade made by your referred community.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={() => alert("Redirecting to affiliate registration form...")}
                className="px-8 py-3.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 cursor-pointer transition-all active:scale-98"
              >
                Join Now & Start Earning
              </button>
            </div>
          </div>

          {/* Quick Metrics display */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white/80 dark:bg-[#141416]/80 border border-gray-200 dark:border-white/[0.04] p-6 rounded-md shadow-xs space-y-2">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">$3.2M+</span>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Total Paid Out</p>
            </div>
            <div className="bg-white/80 dark:bg-[#141416]/80 border border-gray-200 dark:border-white/[0.04] p-6 rounded-md shadow-xs space-y-2">
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">12k+</span>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Global Affiliates</p>
            </div>
            <div className="bg-white/80 dark:bg-[#141416]/80 border border-gray-200 dark:border-white/[0.04] p-6 rounded-md shadow-xs space-y-2">
              <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">50%</span>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Max Commission</p>
            </div>
            <div className="bg-white/80 dark:bg-[#141416]/80 border border-gray-200 dark:border-white/[0.04] p-6 rounded-md shadow-xs space-y-2">
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">24/7</span>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Daily Settlements</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Steps Section ────────────────────────────────────────── */}
      <div className="w-[75%] mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Start earning in 3 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] p-8 rounded-md shadow-xs space-y-4 hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-850 rounded-md flex items-center justify-center">
              <FiUserPlus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">1. Join the Program</h3>
            <p className="text-xs text-gray-500 dark:text-white/60 font-semibold leading-relaxed">
              Register as an affiliate partner. Registration is free and takes less than two minutes.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] p-8 rounded-md shadow-xs space-y-4 hover:border-purple-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-850 rounded-md flex items-center justify-center">
              <FiLink className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">2. Share Your Link</h3>
            <p className="text-xs text-gray-500 dark:text-white/60 font-semibold leading-relaxed">
              Promote your unique referral link across social media, blogs, channels, or communities.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] p-8 rounded-md shadow-xs space-y-4 hover:border-pink-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-pink-50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-850 rounded-md flex items-center justify-center">
              <FiTrendingUp className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">3. Recieve Commission</h3>
            <p className="text-xs text-gray-500 dark:text-white/60 font-semibold leading-relaxed">
              Earn up to 50% commission whenever your referred users make a trade. Payouts arrive daily.
            </p>
          </div>
        </div>
      </div>

      {/* ── Commission Tiers & Calculator Section ─────────────────── */}
      <div className="bg-white dark:bg-[#101012] border-t border-b border-gray-200 dark:border-white/[0.04]">
        <div className="w-[75%] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Tiers List (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Commission Tiers</h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Increase referrals to boost commission</p>
            </div>

            <div className="space-y-3">
              {TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`bg-gradient-to-r ${tier.bg} border ${tier.border} p-4.5 rounded-md flex items-center justify-between transition-transform duration-350 hover:translate-x-1.5`}
                >
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{tier.name}</h4>
                    <p className="text-[10px] text-gray-450 dark:text-white/40 font-bold uppercase tracking-wider">{tier.refers}</p>
                  </div>
                  <span className={`text-2xl font-bold ${tier.text}`}>{tier.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Earnings Calculator (7 cols) */}
          <div className="lg:col-span-7 bg-gray-50 dark:bg-[#141416]/50 border border-gray-200 dark:border-white/[0.04] p-8 rounded-md shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Earnings Calculator</h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Estimate your monthly referral payouts</p>
            </div>

            <div className="space-y-5">
              {/* Slider 1: Friends Invited */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-500 dark:text-white/60">Friends Invited</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">{referredCount} friends</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="150"
                  value={referredCount}
                  onChange={(e) => setReferredCount(Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Slider 2: Average Monthly Volume */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-500 dark:text-white/60">Avg. Trading Volume per Friend</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">${avgVolume.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={avgVolume}
                  onChange={(e) => setAvgVolume(Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            {/* Calculations Output */}
            <div className="border-t border-gray-200 dark:border-white/[0.06] pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Estimated Monthly Earnings</span>
                <span className="text-3xl font-bold text-emerald-500">${estimatedEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="bg-white dark:bg-[#1d1d22] px-4 py-3 rounded-md border border-gray-200 dark:border-white/[0.04] flex items-center gap-3">
                <FiAward className="w-5 h-5 text-indigo-500" />
                <div className="space-y-0.5">
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Your Level</span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{(currentRate * 100)}% Commission Tier</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
