"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line,
} from "recharts";
import {
  FiUsers, FiTrendingUp, FiDollarSign, FiActivity,
  FiArrowUpRight, FiArrowDownRight, FiEye, FiShield,
  FiAlertTriangle, FiCheckCircle, FiClock, FiBarChart2,
  FiRefreshCw, FiMoreHorizontal, FiFilter, FiShoppingCart,
} from "react-icons/fi";
import { BiBitcoin } from "react-icons/bi";

// Mock data for Dashboard KPIs
const STATS = [
  { label: "Total Users",    value: "142,830",  change: "+12.4%", up: true,  icon: FiUsers,       color: "blue"    },
  { label: "24H Volume",     value: "$4.82B",   change: "+8.7%",  up: true,  icon: FiBarChart2,   color: "emerald" },
  { label: "Total Revenue",  value: "$238,410", change: "+3.2%",  up: true,  icon: FiDollarSign, color: "violet"  },
  { label: "Active Trades",  value: "18,294",   change: "-1.5%",  up: false, icon: FiActivity,   color: "amber"   },
];

// Charts Mock Data
const USER_GROWTH_DATA = [
  { month: "Jan", users: 82000, traders: 41000 },
  { month: "Feb", users: 94000, traders: 52000 },
  { month: "Mar", users: 108000, traders: 63000 },
  { month: "Apr", users: 119000, traders: 71000 },
  { month: "May", users: 128000, traders: 79000 },
  { month: "Jun", users: 136000, traders: 84000 },
  { month: "Jul", users: 142830, traders: 91200 },
];

const REVENUE_DATA = [
  { day: "Mon", revenue: 28400, checkoutFees: 2840 },
  { day: "Tue", revenue: 34200, checkoutFees: 3420 },
  { day: "Wed", revenue: 31800, checkoutFees: 3180 },
  { day: "Thu", revenue: 42100, checkoutFees: 4210 },
  { day: "Fri", revenue: 38900, checkoutFees: 3890 },
  { day: "Sat", revenue: 49500, checkoutFees: 4950 },
  { day: "Sun", revenue: 43500, checkoutFees: 4350 },
];

const BUY_SELL_PIE = [
  { name: "Buy Orders",  value: 64, color: "#10B981" },
  { name: "Sell Orders", value: 36, color: "#EF4444" },
];

const COIN_VOL = [
  { name: "BTC",  volume: 1280 },
  { name: "ETH",  volume: 840  },
  { name: "SOL",  volume: 320  },
  { name: "BNB",  volume: 210  },
  { name: "XRP",  volume: 185  },
  { name: "DOGE", volume: 142  },
];

const RECENT_TRADES = [
  { user: "alice@example.com", pair: "BTC/USDT", type: "BUY",  amount: "0.45 BTC",  value: "$28,674", time: "2 min ago",  status: "completed" },
  { user: "bob@example.com",   pair: "ETH/USDT", type: "SELL", amount: "4.2 ETH",   value: "$13,902", time: "5 min ago",  status: "completed" },
  { user: "carol@example.com", pair: "SOL/USDT", type: "BUY",  amount: "120 SOL",   value: "$18,480", time: "9 min ago",  status: "pending"   },
  { user: "david@example.com", pair: "BNB/USDT", type: "SELL", amount: "30 BNB",    value: "$8,310",  time: "14 min ago", status: "completed" },
  { user: "eve@example.com",   pair: "XRP/USDT", type: "BUY",  amount: "5000 XRP",  value: "$2,800",  time: "18 min ago", status: "failed"    },
];

const ALERTS = [
  { type: "warning",  msg: "Unusual withdrawal spike detected for user #8821",          time: "3 min ago"  },
  { type: "success",  msg: "KYC batch verification completed — 48 users approved",       time: "12 min ago" },
  { type: "error",    msg: "Liquidity pool imbalance detected on SOL/USDT pair",         time: "27 min ago" },
  { type: "info",     msg: "Server maintenance scheduled for 02:00 UTC",                 time: "1 hr ago"   },
];

const colorMap: Record<string, string> = {
  blue:    "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
  violet:  "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
  amber:   "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
};

const statusStyle: Record<string, string> = {
  completed: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  pending:   "bg-amber-100  dark:bg-amber-900/30  text-amber-700  dark:text-amber-400",
  failed:    "bg-red-100    dark:bg-red-900/30    text-red-700    dark:text-red-400",
};

export default function AdminDashboardPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-[#0c0c0e]">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
            Live platform overview — user growth, trading volume, revenue &amp; system stats
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition-all cursor-pointer"
          >
            <FiRefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            Live System
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 flex items-start justify-between shadow-sm"
            >
              <div>
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  {s.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {s.value}
                </p>
                <div className={`flex items-center gap-1 mt-1.5 text-xs font-bold ${s.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                  {s.up ? <FiArrowUpRight className="w-3.5 h-3.5" /> : <FiArrowDownRight className="w-3.5 h-3.5" />}
                  {s.change} vs last 24h
                </div>
              </div>
              <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${colorMap[s.color]}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Graphs Row 1: User Growth + Revenue */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* User Growth Area Chart */}
        <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <FiUsers className="w-4 h-4 text-blue-500" /> Platform User Growth &amp; Active Traders
            </h2>
            <span className="text-xs font-bold text-gray-400">Monthly</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={USER_GROWTH_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gTraders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.4} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip />
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs font-bold text-gray-600 dark:text-gray-300 capitalize">{v}</span>} />
              <Area type="monotone" dataKey="users" name="Registered Users" stroke="#3B82F6" strokeWidth={2} fill="url(#gUsers)" dot={false} />
              <Area type="monotone" dataKey="traders" name="Active Traders" stroke="#10B981" strokeWidth={2} fill="url(#gTraders)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue & Checkout Fees Line Chart */}
        <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <FiDollarSign className="w-4 h-4 text-violet-500" /> Revenue &amp; Checkout Fee Statistics
            </h2>
            <span className="text-xs font-bold text-gray-400">Weekly</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={REVENUE_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.4} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip />
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{v}</span>} />
              <Line type="monotone" dataKey="revenue" name="Total Revenue" stroke="#8B5CF6" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="checkoutFees" name="Checkout Fees" stroke="#F59E0B" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics Graphs Row 2: Coin Volume Bar + Buy/Sell Ratio Pie */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <FiBarChart2 className="w-4 h-4 text-emerald-500" /> Trading Volume by Coin ($ Millions)
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={COIN_VOL} margin={{ top: 4, right: 4, bottom: 0, left: -20 }} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.4} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}M`} />
              <Tooltip formatter={(v) => [`$${v}M`, "Volume"]} />
              <Bar dataKey="volume" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <FiShoppingCart className="w-4 h-4 text-amber-500" /> Overall Order Distribution
          </h2>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={BUY_SELL_PIE} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                {BUY_SELL_PIE.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, "Ratio"]} />
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Grid: Recent Trades + Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Trades Table */}
        <div className="xl:col-span-2 bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <FiActivity className="w-4 h-4 text-blue-500" />
              <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                Recent Trades
              </h2>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <FiFilter className="w-3.5 h-3.5" /> Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50/70 dark:bg-white/[0.02]">
                  <th className="px-5 py-3 text-left">User</th>
                  <th className="px-5 py-3 text-left">Pair</th>
                  <th className="px-5 py-3 text-left">Type</th>
                  <th className="px-5 py-3 text-right">Value</th>
                  <th className="px-5 py-3 text-left">Time</th>
                  <th className="px-5 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/[0.04]">
                {RECENT_TRADES.map((t, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 text-xs font-semibold text-gray-600 dark:text-gray-300 truncate max-w-[140px]">
                      {t.user}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-gray-900 dark:text-white text-xs">
                      {t.pair}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${t.type === "BUY" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-gray-900 dark:text-white text-xs">
                      {t.value}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        {t.time}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md capitalize ${statusStyle[t.status]}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <FiShield className="w-4 h-4 text-violet-500" />
              <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                System Alerts
              </h2>
            </div>
            <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-md">
              {ALERTS.filter((a) => a.type === "error" || a.type === "warning").length}
            </span>
          </div>
          <div className="p-4 space-y-3">
            {ALERTS.map((a, i) => (
              <div key={i} className="p-3 bg-amber-50/50 dark:bg-white/[0.02] border border-amber-200/50 dark:border-white/10 rounded-md">
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{a.msg}</p>
                <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1"><FiClock className="w-3 h-3" /> {a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
