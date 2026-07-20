"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiCopy,
  FiCheck,
  FiUsers,
  FiPercent,
  FiAward,
  FiArrowUpRight,
  FiLayers,
} from "react-icons/fi";

import { notifySuccess } from "@/components/toastProvider";

export function ReferralsTab() {
  const [copied, setCopied] = useState<"link" | "code" | null>(null);
  const refCode = "N84CRDKK";
  const refLink = "https://rockbit.io/login?ref=N84CRDKK";

  function copyToClipboard(text: string, type: "link" | "code") {
    navigator.clipboard.writeText(text);
    setCopied(type);
    notifySuccess(
      "Saved Successfully",
      `${type === "link" ? "Referral link" : "Referral code"} copied to clipboard!`,
    );
    setTimeout(() => setCopied(null), 2000);
  }

  // Mock Referral History data
  const payouts = [
    {
      id: "#PAY-8291",
      date: "2026-07-18",
      user: "user1***@gmail.com",
      volume: "$12,500.00",
      earned: "$25.00 USD",
      status: "Credited",
    },
    {
      id: "#PAY-7928",
      date: "2026-07-10",
      user: "crypto***@outlook.com",
      volume: "$8,250.00",
      earned: "$16.50 USD",
      status: "Credited",
    },
    {
      id: "#PAY-7519",
      date: "2026-07-01",
      user: "trader***@yahoo.com",
      volume: "$3,400.00",
      earned: "$6.80 USD",
      status: "Processing",
    },
  ];

  return (
    <div className="space-y-6 select-none animate-[fadeIn_0.2s_ease-out]">
      {/* ── Header: Rewards & Commission Tier ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Rewards Card */}
        <div className="lg:col-span-2 bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-24 -top-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Total rewards
            </p>
            <h2 className="text-3xl font-bold text-[#58bd7d] mt-1.5 flex items-baseline gap-1">
              $1,056.00{" "}
              <span className="text-sm text-gray-450 dark:text-gray-400 font-bold">
                USD
              </span>
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-3">
              You are earning 20% of the trading fees your referrals pay.{" "}
              <a
                href="#"
                className="text-indigo-600 dark:text-indigo-500 hover:underline font-bold transition-all"
              >
                Learn More
              </a>
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <div className="bg-gray-50 dark:bg-[#1c1d24] border border-gray-100 dark:border-white/[0.02] px-4 py-3 rounded-md flex-1">
              <div className="flex items-center gap-2 mb-1">
                <FiUsers className="w-4 h-4 text-indigo-500" />
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  Total Referrals
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                3 Users
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-[#1c1d24] border border-gray-100 dark:border-white/[0.02] px-4 py-3 rounded-md flex-1">
              <div className="flex items-center gap-2 mb-1">
                <FiPercent className="w-4 h-4 text-purple-500" />
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  Base Rate
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                20%
              </p>
            </div>
          </div>
        </div>

        {/* VIP Tier Progress Card */}
        <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Referral Tier
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 flex items-center gap-1">
                <FiAward className="w-3 h-3" /> Bronze
              </span>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-900 dark:text-white">
                  Silver Tier
                </span>
                <span className="text-gray-400">3/6 Referrals</span>
              </div>
              <div className="h-2 w-full bg-gray-150 dark:bg-white/[0.04] rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-indigo-600 rounded-full transition-all" />
              </div>
              <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                Invite 3 more active friends to unlock Silver level and get
                **25%** commissions.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-white/[0.03] pt-4 mt-4 flex justify-between items-center text-[10px] font-bold text-gray-450 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <FiLayers className="w-3.5 h-3.5 text-indigo-500" /> Next Level:
              Silver
            </span>
            <span className="text-indigo-600 dark:text-indigo-500 flex items-center">
              25% Commission <FiArrowUpRight className="ml-0.5 w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* ── Invite Section ──────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5">
          Invite friends to earn 20%
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
          {/* Referral Link */}
          <div>
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">
              Referral Link
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                readOnly
                value={refLink}
                className="w-full pl-4 pr-16 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-[#1d1d22] text-gray-500 dark:text-gray-400 outline-none"
              />
              <button
                onClick={() => copyToClipboard(refLink, "link")}
                className="absolute right-2 text-gray-400 hover:text-indigo-500 transition-colors p-1.5 cursor-pointer"
                title="Copy Link"
              >
                {copied === "link" ? (
                  <FiCheck className="w-4 h-4 text-emerald-500" />
                ) : (
                  <FiCopy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Referral Code */}
          <div>
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">
              Referral Code
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                readOnly
                value={refCode}
                className="w-full pl-4 pr-20 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#1d1d22] text-gray-900 dark:text-white outline-none"
              />
              <button
                onClick={() => copyToClipboard(refCode, "code")}
                className="absolute right-2 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] transition-colors cursor-pointer"
              >
                {copied === "code" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Referral Payout History (New Feature) ────────────────────────── */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">
          Payout History
        </h3>
        <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-wider">
          Tracks individual commissions credited to your account
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead>
              <tr className="text-gray-400 font-bold border-b border-gray-100 dark:border-white/[0.03] uppercase tracking-wider">
                <th className="pb-3">Payout ID</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Referred User</th>
                <th className="pb-3">Trading Volume</th>
                <th className="pb-3 text-right">Commission Earned</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.03]">
              {payouts.map((pay) => (
                <tr
                  key={pay.id}
                  className="hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors"
                >
                  <td className="py-4 font-bold text-gray-900 dark:text-white">
                    {pay.id}
                  </td>
                  <td className="py-4 text-gray-500 font-semibold">
                    {pay.date}
                  </td>
                  <td className="py-4 text-gray-500 font-semibold">
                    {pay.user}
                  </td>
                  <td className="py-4 font-bold text-gray-800 dark:text-gray-200">
                    {pay.volume}
                  </td>
                  <td className="py-4 text-right text-emerald-500 font-bold">
                    {pay.earned}
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pay.status === "Credited"
                          ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600"
                          : "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600"
                      }`}
                    >
                      {pay.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── My Wallet Action ────────────────────────────────────────────── */}
      <div className="pt-2">
        <Link href="/wallet">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-8 py-3 rounded-full transition-all cursor-pointer shadow-md shadow-indigo-500/10 active:scale-98">
            My Wallet
          </button>
        </Link>
      </div>
    </div>
  );
}
