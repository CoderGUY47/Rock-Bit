"use client";

import React, { useState } from "react";
import { FiDownload, FiSend, FiRefreshCw, FiGift, FiSearch, FiFilter, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const HISTORIES = [
  { id: "#TX-9012", type: "Deposit",    coin: "BTC",  amount: "+0.45 BTC",   usd: "$28,674.00", status: "completed", date: "Jul 20, 2026 14:32", address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
  { id: "#TX-9011", type: "Withdraw",   coin: "USDT", amount: "-1,500 USDT",  usd: "$1,500.00",  status: "completed", date: "Jul 20, 2026 12:15", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
  { id: "#TX-9010", type: "Transfer",   coin: "ETH",  amount: "4.20 ETH",    usd: "$13,902.00", status: "completed", date: "Jul 19, 2026 18:45", address: "Spot → Margin Wallet" },
  { id: "#TX-9009", type: "Reward",     coin: "SOL",  amount: "+5.00 SOL",   usd: "$770.00",    status: "completed", date: "Jul 18, 2026 09:10", address: "Staking Reward Claim" },
  { id: "#TX-9008", type: "Deposit",    coin: "USDT", amount: "+5,000 USDT",  usd: "$5,000.00",  status: "pending",   date: "Jul 17, 2026 16:20", address: "0x321...890" },
  { id: "#TX-9007", type: "Withdraw",   coin: "BTC",  amount: "-0.10 BTC",   usd: "$6,382.00",  status: "failed",    date: "Jul 15, 2026 11:05", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
];

const typeIcon: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  Deposit:  { icon: FiDownload,  color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  Withdraw: { icon: FiSend,      color: "text-red-600 dark:text-red-400",         bg: "bg-red-50 dark:bg-red-900/20"     },
  Transfer: { icon: FiRefreshCw, color: "text-blue-600 dark:text-blue-400",       bg: "bg-blue-50 dark:bg-blue-900/20"   },
  Reward:   { icon: FiGift,      color: "text-violet-600 dark:text-violet-400 font-bold", bg: "bg-violet-50 dark:bg-violet-900/20" },
};

const statusStyle: Record<string, string> = {
  completed: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  pending:   "bg-amber-100  dark:bg-amber-900/30  text-amber-700  dark:text-amber-400",
  failed:    "bg-red-100    dark:bg-red-900/30    text-red-700    dark:text-red-400",
};

export default function AssetHistoryPage() {
  const [search, setSearch]       = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = HISTORIES.filter((h) => {
    const q = search.toLowerCase();
    const matchSearch = !q || h.id.toLowerCase().includes(q) || h.coin.toLowerCase().includes(q) || h.address.toLowerCase().includes(q);
    const matchType = typeFilter === "all" || h.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-[#0c0c0e]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Asset Transaction History
        </h1>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
          Detailed audit logs of deposits, withdrawals, internal transfers, and staking rewards
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by TxID, coin or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-md text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <div className="flex items-center gap-2">
          <FiFilter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-sm bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-md px-3 py-2.5 text-gray-700 dark:text-gray-300 font-bold focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="Deposit">Deposits</option>
            <option value="Withdraw">Withdrawals</option>
            <option value="Transfer">Transfers</option>
            <option value="Reward">Rewards</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50/70 dark:bg-white/[0.02]">
                <th className="px-5 py-3 text-left">TxID</th>
                <th className="px-5 py-3 text-left">Type</th>
                <th className="px-5 py-3 text-left">Coin</th>
                <th className="px-5 py-3 text-right">Amount</th>
                <th className="px-5 py-3 text-right">USD Value</th>
                <th className="px-5 py-3 text-left">Destination / Detail</th>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/[0.04]">
              {filtered.map((h) => {
                const cfg = typeIcon[h.type];
                const Icon = cfg.icon;
                return (
                  <tr key={h.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 font-bold text-xs text-gray-900 dark:text-white">{h.id}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${cfg.bg}`}>
                          <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                        </div>
                        <span className="font-bold text-xs text-gray-900 dark:text-white">{h.type}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-xs text-gray-900 dark:text-white">{h.coin}</td>
                    <td className={`px-5 py-3.5 text-right font-bold text-xs ${h.amount.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : h.amount.startsWith("-") ? "text-red-500 dark:text-red-400" : "text-gray-900 dark:text-white"}`}>
                      {h.amount}
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-xs text-gray-900 dark:text-white">{h.usd}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-500 dark:text-gray-400 font-medium max-w-[200px] truncate">{h.address}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-400 font-medium whitespace-nowrap">{h.date}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md capitalize ${statusStyle[h.status]}`}>
                        {h.status}
                      </span>
                    </td>
                  </tr>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-xs font-bold text-gray-400">
                    No transactions match your search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
