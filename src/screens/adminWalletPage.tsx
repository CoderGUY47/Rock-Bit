"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, AreaChart, Area, PieChart, Pie, Cell,
} from "recharts";
import {
  FiDollarSign, FiTrendingUp, FiTrendingDown, FiUsers,
  FiArrowUpRight, FiArrowDownRight, FiEye, FiSearch, FiFilter,
} from "react-icons/fi";

const USER_WALLETS = [
  { user: "Alice Johnson",  avatar: "AJ", color: "#6366F1", coin: "BTC",  balance: "1.842 BTC",  usd: "$117,490", bought: "$284,930", sold: "$167,440", pnl: "+$12,800", pnlUp: true  },
  { user: "Bob Martinez",   avatar: "BM", color: "#10B981", coin: "ETH",  balance: "22.4 ETH",   usd: "$74,189",  bought: "$138,210", sold: "$64,021",  pnl: "+$6,200",  pnlUp: true  },
  { user: "Carol Nguyen",   avatar: "CN", color: "#F59E0B", coin: "SOL",  balance: "340 SOL",    usd: "$52,360",  bought: "$42,890",  sold: "$0",       pnl: "-$1,200",  pnlUp: false },
  { user: "David Chen",     avatar: "DC", color: "#EF4444", coin: "BNB",  balance: "18 BNB",     usd: "$4,986",   bought: "$4,120",   sold: "$0",       pnl: "-$420",    pnlUp: false },
  { user: "Eve Patel",      avatar: "EP", color: "#8B5CF6", coin: "DOGE", balance: "42,000 DOGE",usd: "$6,300",   bought: "$512,400", sold: "$506,100", pnl: "+$38,400", pnlUp: true  },
  { user: "Frank Müller",   avatar: "FM", color: "#3B82F6", coin: "XRP",  balance: "8,200 XRP",  usd: "$4,592",   bought: "$89,750",  sold: "$85,158",  pnl: "+$4,100",  pnlUp: true  },
];

const DAILY_ACTIVITY = [
  { day: "Mon", deposits: 24800, withdrawals: 18200, netFlow: 6600  },
  { day: "Tue", deposits: 31200, withdrawals: 22400, netFlow: 8800  },
  { day: "Wed", deposits: 28600, withdrawals: 25100, netFlow: 3500  },
  { day: "Thu", deposits: 45200, withdrawals: 31800, netFlow: 13400 },
  { day: "Fri", deposits: 38900, withdrawals: 29400, netFlow: 9500  },
  { day: "Sat", deposits: 52100, withdrawals: 38600, netFlow: 13500 },
  { day: "Sun", deposits: 41300, withdrawals: 33200, netFlow: 8100  },
];

const COIN_ACTIVITY = [
  { day: "Mon", BTC: 18200, ETH: 12100, SOL: 8400, DOGE: 15200 },
  { day: "Tue", BTC: 22400, ETH: 14800, SOL: 9800, DOGE: 19100 },
  { day: "Wed", BTC: 19800, ETH: 11200, SOL: 11400, DOGE: 17600 },
  { day: "Thu", BTC: 28400, ETH: 18900, SOL: 13100, DOGE: 22800 },
  { day: "Fri", BTC: 24100, ETH: 16200, SOL: 12300, DOGE: 20400 },
  { day: "Sat", BTC: 31800, ETH: 21400, SOL: 15200, DOGE: 26100 },
  { day: "Sun", BTC: 26900, ETH: 18100, SOL: 13800, DOGE: 23200 },
];

const COIN_DIST = [
  { name: "BTC",  value: 117490, color: "#F59E0B" },
  { name: "ETH",  value: 74189,  color: "#6366F1" },
  { name: "SOL",  value: 52360,  color: "#10B981" },
  { name: "DOGE", value: 6300,   color: "#F97316" },
  { name: "XRP",  value: 4592,   color: "#3B82F6" },
  { name: "BNB",  value: 4986,   color: "#FBBF24" },
];

const totalUSD   = USER_WALLETS.reduce((s, u) => s + parseFloat(u.usd.replace(/[$,]/g, "")), 0);
const totalBought= USER_WALLETS.reduce((s, u) => s + parseFloat(u.bought.replace(/[$,]/g, "")), 0);
const totalSold  = USER_WALLETS.reduce((s, u) => s + parseFloat(u.sold.replace(/[$,]/g, "")), 0);

const BarTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-[#1a1b23] border border-gray-100 dark:border-white/10 rounded-md p-3 shadow-xl text-xs font-bold">
      <p className="text-gray-700 dark:text-gray-200 mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center justify-between gap-4 mb-0.5">
          <span className="flex items-center gap-1.5" style={{ color: p.fill || p.color }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.fill || p.color }} />
            {p.name}
          </span>
          <span className="text-gray-900 dark:text-white">${Number(p.value).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const PieTip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const pct = ((payload[0].value / totalUSD) * 100).toFixed(1);
  return (
    <div className="bg-white dark:bg-[#1a1b23] border border-gray-100 dark:border-white/10 rounded-md p-3 shadow-xl text-xs font-bold">
      <p className="mb-1" style={{ color: payload[0].payload.color }}>{payload[0].name}</p>
      <p className="text-gray-700 dark:text-gray-200">${payload[0].value.toLocaleString()}</p>
      <p className="text-gray-400 font-medium">{pct}% of total</p>
    </div>
  );
};

export default function AdminWalletPage() {
  const [search, setSearch]   = useState("");
  const [chartTab, setChartTab] = useState<"flow" | "coins">("flow");

  const filtered = USER_WALLETS.filter((u) => {
    const q = search.toLowerCase();
    return !q || u.user.toLowerCase().includes(q) || u.coin.toLowerCase().includes(q);
  });

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-[#0c0c0e]">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Wallet Overview
        </h1>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
          All user wallet balances, buy/sell history and portfolio graphs
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Wallet Value",  value: `$${totalUSD.toLocaleString(undefined,{maximumFractionDigits:0})}`,   icon: FiDollarSign,    color: "blue",    sub: "across all users" },
          { label: "Total Volume Bought", value: `$${totalBought.toLocaleString(undefined,{maximumFractionDigits:0})}`, icon: FiTrendingUp,    color: "emerald", sub: "all-time buy orders" },
          { label: "Total Volume Sold",   value: `$${totalSold.toLocaleString(undefined,{maximumFractionDigits:0})}`,   icon: FiTrendingDown,  color: "red",     sub: "all-time sell orders" },
          { label: "Active Wallets",      value: USER_WALLETS.length.toString(),                                         icon: FiUsers,         color: "violet",  sub: "unique wallet holders" },
        ].map((k) => {
          const Icon = k.icon;
          const bg: Record<string,string> = {
            blue:   "bg-blue-50   dark:bg-blue-900/20   text-blue-600   dark:text-blue-400",
            emerald:"bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
            red:    "bg-red-50    dark:bg-red-900/20    text-red-600    dark:text-red-400",
            violet: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
          };
          return (
            <div key={k.label} className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 flex items-start justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">{k.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">{k.value}</p>
                <p className="text-[11px] text-gray-400 font-medium mt-1">{k.sub}</p>
              </div>
              <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${bg[k.color]}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* Bar / Area Chart */}
        <div className="xl:col-span-3 bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                7-Day Wallet Activity
              </h2>
              <p className="text-xs font-medium text-gray-400 mt-0.5">
                {chartTab === "flow" ? "Deposits vs withdrawals (USD)" : "Buy volume by coin (USD)"}
              </p>
            </div>
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-white/[0.05] rounded-md">
              {(["flow","coins"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setChartTab(t)}
                  className={`px-3 py-1 text-xs font-bold rounded-md capitalize transition-all cursor-pointer ${
                    chartTab === t
                      ? "bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {t === "flow" ? "Cash Flow" : "By Coin"}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            {chartTab === "flow" ? (
              <AreaChart data={DAILY_ACTIVITY} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="gDep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="gWith" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#EF4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.4} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<BarTip />} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs font-bold text-gray-600 dark:text-gray-300 capitalize">{v}</span>} />
                <Area type="monotone" dataKey="deposits"    name="Deposits"     stroke="#10B981" strokeWidth={2} fill="url(#gDep)"  dot={false} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="withdrawals" name="Withdrawals"  stroke="#EF4444" strokeWidth={2} fill="url(#gWith)" dot={false} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="netFlow"     name="Net Flow"     stroke="#6366F1" strokeWidth={2} fill="none"        dot={false} activeDot={{ r: 4 }} strokeDasharray="5 3" />
              </AreaChart>
            ) : (
              <BarChart data={COIN_ACTIVITY} margin={{ top: 4, right: 4, bottom: 0, left: -20 }} barSize={10}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.4} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<BarTip />} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{v}</span>} />
                <Bar dataKey="BTC"  fill="#F59E0B" radius={[2,2,0,0]} />
                <Bar dataKey="ETH"  fill="#6366F1" radius={[2,2,0,0]} />
                <Bar dataKey="SOL"  fill="#10B981" radius={[2,2,0,0]} />
                <Bar dataKey="DOGE" fill="#F97316" radius={[2,2,0,0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Coin Distribution Pie */}
        <div className="xl:col-span-2 bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-1">
            Portfolio Distribution
          </h2>
          <p className="text-xs font-medium text-gray-400 mb-4">Total wallet value by coin</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={COIN_DIST} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value">
                {COIN_DIST.map((c, i) => (
                  <Cell key={i} fill={c.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<PieTip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {COIN_DIST.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-xs font-bold mb-0.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: c.color }} />
                    <span className="text-gray-700 dark:text-gray-200">{c.name}</span>
                  </span>
                  <span className="font-mono" style={{ color: c.color }}>{((c.value / totalUSD) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-1 bg-gray-100 dark:bg-white/[0.06] rounded-full">
                  <div className="h-1 rounded-full" style={{ width: `${(c.value / totalUSD) * 100}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Per-User Wallet Table */}
      <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <FiUsers className="w-4 h-4 text-blue-500" />
            <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">User Wallets</h2>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search user or coin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2 text-xs font-bold bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-md text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none w-56"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50/70 dark:bg-white/[0.02]">
                <th className="px-5 py-3 text-left">User</th>
                <th className="px-5 py-3 text-left">Primary Coin</th>
                <th className="px-5 py-3 text-right">Balance</th>
                <th className="px-5 py-3 text-right">USD Value</th>
                <th className="px-5 py-3 text-right">Total Bought</th>
                <th className="px-5 py-3 text-right">Total Sold</th>
                <th className="px-5 py-3 text-right">PnL</th>
                <th className="px-5 py-3 text-left pl-8">Buy/Sell Ratio</th>
                <th className="px-5 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/[0.04]">
              {filtered.map((u) => {
                const boughtNum = parseFloat(u.bought.replace(/[$,]/g, ""));
                const soldNum   = parseFloat(u.sold.replace(/[$,]/g, ""));
                const total     = boughtNum + soldNum;
                const buyPct    = total > 0 ? (boughtNum / total) * 100 : 100;
                return (
                  <tr key={u.user} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: u.color, color: "#fff" }}
                        >
                          {u.avatar}
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white text-xs">{u.user}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: `${u.color}22`, color: u.color }}>
                        {u.coin}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-xs text-gray-600 dark:text-gray-300 font-medium">{u.balance}</td>
                    <td className="px-5 py-3.5 text-right font-bold text-xs text-gray-900 dark:text-white">{u.usd}</td>
                    <td className="px-5 py-3.5 text-right font-bold text-xs text-emerald-600 dark:text-emerald-400 font-bold">{u.bought}</td>
                    <td className="px-5 py-3.5 text-right font-bold text-xs text-red-500 dark:text-red-400 font-bold">{u.sold}</td>
                    <td className={`px-5 py-3.5 text-right text-xs font-bold ${u.pnlUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                      <div className="flex items-center justify-end gap-0.5">
                        {u.pnlUp ? <FiArrowUpRight className="w-3.5 h-3.5" /> : <FiArrowDownRight className="w-3.5 h-3.5" />}
                        {u.pnl}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 pl-8 w-48">
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 rounded-l-full" style={{ width: `${buyPct}%` }} />
                        <div className="bg-red-400 rounded-r-full flex-1" />
                      </div>
                      <div className="flex justify-between text-[9px] font-bold mt-1 text-gray-400">
                        <span>{buyPct.toFixed(0)}% buy</span>
                        <span>{(100 - buyPct).toFixed(0)}% sell</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <FiEye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-gray-100 dark:border-white/[0.06]">
          <p className="text-xs text-gray-400 font-medium">Showing {filtered.length} of {USER_WALLETS.length} wallets</p>
        </div>
      </div>

    </div>
  );
}
