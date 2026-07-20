"use client";

/**
 * AdminCheckoutPage Component
 * Provides searchable order logs, checkout fee tracking, and status filtering.
 */
import React, { useState } from "react";
import {
  FiShoppingCart, FiDollarSign, FiCheckCircle, FiClock,
  FiXCircle, FiSearch, FiFilter, FiArrowUpRight, FiUser,
  FiTrendingUp, FiEye,
} from "react-icons/fi";

const ORDERS = [
  { id: "#ORD-8821", user: "alice@example.com",  coin: "BTC",  type: "BUY",  qty: "0.45 BTC",   total: "$28,674", fee: "$28.67",  status: "completed", date: "Jul 20, 2026 14:32" },
  { id: "#ORD-8820", user: "bob@example.com",    coin: "ETH",  type: "SELL", qty: "4.20 ETH",   total: "$13,902", fee: "$13.90",  status: "completed", date: "Jul 20, 2026 14:28" },
  { id: "#ORD-8819", user: "carol@example.com",  coin: "SOL",  type: "BUY",  qty: "120 SOL",    total: "$18,480", fee: "$18.48",  status: "pending",   date: "Jul 20, 2026 14:20" },
  { id: "#ORD-8818", user: "david@example.com",  coin: "BNB",  type: "SELL", qty: "30 BNB",     total: "$8,310",  fee: "$8.31",   status: "completed", date: "Jul 20, 2026 14:10" },
  { id: "#ORD-8817", user: "eve@example.com",    coin: "XRP",  type: "BUY",  qty: "5000 XRP",   total: "$2,800",  fee: "$2.80",   status: "failed",    date: "Jul 20, 2026 13:58" },
  { id: "#ORD-8816", user: "frank@example.com",  coin: "DOGE", type: "BUY",  qty: "10000 DOGE", total: "$1,500",  fee: "$1.50",   status: "completed", date: "Jul 20, 2026 13:45" },
  { id: "#ORD-8815", user: "grace@example.com",  coin: "ADA",  type: "SELL", qty: "2000 ADA",   total: "$900",    fee: "$0.90",   status: "pending",   date: "Jul 20, 2026 13:30" },
  { id: "#ORD-8814", user: "henry@example.com",  coin: "BTC",  type: "BUY",  qty: "0.12 BTC",   total: "$7,659",  fee: "$7.66",   status: "completed", date: "Jul 20, 2026 13:15" },
  { id: "#ORD-8813", user: "iris@example.com",   coin: "AVAX", type: "SELL", qty: "50 AVAX",    total: "$1,850",  fee: "$1.85",   status: "failed",    date: "Jul 20, 2026 13:00" },
  { id: "#ORD-8812", user: "james@example.com",  coin: "ETH",  type: "BUY",  qty: "2.00 ETH",   total: "$6,624",  fee: "$6.62",   status: "completed", date: "Jul 20, 2026 12:48" },
];

const COIN_COLORS: Record<string, string> = {
  BTC: "#F59E0B", ETH: "#6366F1", SOL: "#10B981",
  BNB: "#FBBF24", XRP: "#3B82F6", DOGE: "#F97316",
  ADA: "#8B5CF6", AVAX: "#EF4444",
};

const statusStyle: Record<string, string> = {
  completed: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  pending:   "bg-amber-100  dark:bg-amber-900/30  text-amber-700  dark:text-amber-400",
  failed:    "bg-red-100    dark:bg-red-900/30    text-red-700    dark:text-red-400",
};

const statusIcon: Record<string, React.ElementType> = {
  completed: FiCheckCircle,
  pending:   FiClock,
  failed:    FiXCircle,
};

export default function AdminCheckoutPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const completed = ORDERS.filter((o) => o.status === "completed").length;
  const pending   = ORDERS.filter((o) => o.status === "pending").length;
  const failed    = ORDERS.filter((o) => o.status === "failed").length;
  const totalRev  = ORDERS.filter((o) => o.status === "completed")
    .reduce((s, o) => s + parseFloat(o.total.replace(/[$,]/g, "")), 0);
  const totalFees = ORDERS.filter((o) => o.status === "completed")
    .reduce((s, o) => s + parseFloat(o.fee.replace(/[$,]/g, "")), 0);

  const filtered = ORDERS.filter((o) => {
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.user.toLowerCase().includes(search.toLowerCase()) ||
      o.coin.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    const matchType   = filterType   === "all" || o.type   === filterType;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-[#0c0c0e]">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Checkout Management
        </h1>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
          Track, review and manage all user orders and transactions
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {[
          { label: "Total Orders",  value: ORDERS.length.toString(), icon: FiShoppingCart, color: "blue"   },
          { label: "Completed",     value: completed.toString(),      icon: FiCheckCircle,  color: "emerald"},
          { label: "Pending",       value: pending.toString(),        icon: FiClock,        color: "amber"  },
          { label: "Failed",        value: failed.toString(),         icon: FiXCircle,      color: "red"    },
          { label: "Total Revenue", value: `$${totalRev.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: FiDollarSign, color: "violet" },
        ].map((k) => {
          const Icon = k.icon;
          const bg: Record<string, string> = {
            blue:   "bg-blue-50   dark:bg-blue-900/20   text-blue-600   dark:text-blue-400",
            emerald:"bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
            amber:  "bg-amber-50  dark:bg-amber-900/20  text-amber-600  dark:text-amber-400",
            red:    "bg-red-50    dark:bg-red-900/20    text-red-600    dark:text-red-400",
            violet: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
          };
          return (
            <div key={k.label} className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-4 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{k.label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white font-mono">{k.value}</p>
              </div>
              <div className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${bg[k.color]}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Fee Summary */}
      <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 flex flex-wrap gap-6 items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center">
            <FiTrendingUp className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Fees Collected</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">${totalFees.toFixed(2)}</p>
          </div>
        </div>
        <div className="h-10 w-px bg-gray-100 dark:bg-white/[0.06] hidden sm:block" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <FiUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Unique Users</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{new Set(ORDERS.map((o) => o.user)).size}</p>
          </div>
        </div>
        <div className="h-10 w-px bg-gray-100 dark:bg-white/[0.06] hidden sm:block" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
            <FiArrowUpRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Success Rate</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {((completed / ORDERS.length) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search order ID, user or coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-md text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <div className="flex items-center gap-2">
          <FiFilter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-md px-3 py-2.5 text-gray-700 dark:text-gray-300 font-bold focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-sm bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-md px-3 py-2.5 text-gray-700 dark:text-gray-300 font-bold focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="BUY">Buy Only</option>
            <option value="SELL">Sell Only</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50/70 dark:bg-white/[0.02]">
                <th className="px-5 py-3 text-left">Order ID</th>
                <th className="px-5 py-3 text-left">User</th>
                <th className="px-5 py-3 text-left">Coin</th>
                <th className="px-5 py-3 text-left">Type</th>
                <th className="px-5 py-3 text-right">Quantity</th>
                <th className="px-5 py-3 text-right">Total</th>
                <th className="px-5 py-3 text-right">Fee</th>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/[0.04]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-5 py-10 text-center text-sm font-bold text-gray-400">
                    No orders match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((o) => {
                  const StatusIcon = statusIcon[o.status];
                  return (
                    <tr key={o.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3.5 font-bold text-xs text-gray-900 dark:text-white">{o.id}</td>
                      <td className="px-5 py-3.5 text-xs text-gray-500 dark:text-gray-400 font-medium max-w-[140px] truncate">{o.user}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={{ background: `${COIN_COLORS[o.coin]}22`, color: COIN_COLORS[o.coin] }}>
                            {o.coin[0]}
                          </div>
                          <span className="font-bold text-xs text-gray-900 dark:text-white">{o.coin}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${o.type === "BUY" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`}>
                          {o.type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-xs text-gray-600 dark:text-gray-300 font-medium">{o.qty}</td>
                      <td className="px-5 py-3.5 text-right font-bold text-xs text-gray-900 dark:text-white">{o.total}</td>
                      <td className="px-5 py-3.5 text-right font-bold text-xs text-gray-400 dark:text-gray-500 font-medium">{o.fee}</td>
                      <td className="px-5 py-3.5 text-xs text-gray-400 dark:text-gray-500 font-medium whitespace-nowrap">{o.date}</td>
                      <td className="px-5 py-3.5">
                        <span className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md w-fit capitalize ${statusStyle[o.status]}`}>
                          <StatusIcon className="w-3 h-3" />
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <FiEye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-100 dark:border-white/[0.06] flex items-center justify-between">
          <p className="text-xs text-gray-400 font-medium">Showing {filtered.length} of {ORDERS.length} orders</p>
          <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Export CSV →
          </button>
        </div>
      </div>

    </div>
  );
}
