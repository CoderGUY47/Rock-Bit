"use client";

import React, { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area,
} from "recharts";
import {
  FiTrendingUp, FiTrendingDown, FiUsers, FiArrowUpRight,
  FiArrowDownRight, FiActivity, FiBarChart2,
} from "react-icons/fi";

const COINS = [
  { symbol: "BTC",  name: "Bitcoin",      color: "#F59E0B", buyers: 8420, sellers: 5130, price: "$63,820", vol: "$1.28B", change: +2.4 },
  { symbol: "ETH",  name: "Ethereum",     color: "#6366F1", buyers: 6190, sellers: 4870, price: "$3,312",  vol: "$840M",  change: +1.8 },
  { symbol: "SOL",  name: "Solana",       color: "#10B981", buyers: 4320, sellers: 5900, price: "$154",    vol: "$320M",  change: -0.6 },
  { symbol: "BNB",  name: "BNB",          color: "#FBBF24", buyers: 3210, sellers: 2890, price: "$277",    vol: "$210M",  change: +0.4 },
  { symbol: "XRP",  name: "Ripple",       color: "#3B82F6", buyers: 5870, sellers: 7100, price: "$0.56",   vol: "$185M",  change: -1.2 },
  { symbol: "DOGE", name: "Dogecoin",     color: "#F97316", buyers: 9100, sellers: 6800, price: "$0.15",   vol: "$142M",  change: +3.1 },
  { symbol: "ADA",  name: "Cardano",      color: "#8B5CF6", buyers: 2400, sellers: 3100, price: "$0.45",   vol: "$98M",   change: -0.9 },
  { symbol: "AVAX", name: "Avalanche",    color: "#EF4444", buyers: 1900, sellers: 2200, price: "$37",     vol: "$76M",   change: -1.5 },
];

const totalBuyers  = COINS.reduce((s, c) => s + c.buyers,  0);
const totalSellers = COINS.reduce((s, c) => s + c.sellers, 0);
const PIE_DATA = [
  { name: "Buyers",  value: totalBuyers  },
  { name: "Sellers", value: totalSellers },
];
const PIE_COLORS = ["#10B981", "#EF4444"];

const LINE_DATA = [
  { day: "Mon", BTC: 7200, ETH: 5100, SOL: 3800, XRP: 4900, DOGE: 6200 },
  { day: "Tue", BTC: 8100, ETH: 5600, SOL: 4200, XRP: 5300, DOGE: 7800 },
  { day: "Wed", BTC: 7600, ETH: 4900, SOL: 5100, XRP: 4700, DOGE: 8300 },
  { day: "Thu", BTC: 9200, ETH: 6300, SOL: 4800, XRP: 6100, DOGE: 9100 },
  { day: "Fri", BTC: 8700, ETH: 5800, SOL: 5300, XRP: 5800, DOGE: 8700 },
  { day: "Sat", BTC: 9500, ETH: 6700, SOL: 6100, XRP: 6400, DOGE: 9800 },
  { day: "Sun", BTC: 8420, ETH: 6190, SOL: 4320, XRP: 5870, DOGE: 9100 },
];

const sorted        = [...COINS].sort((a, b) => (b.buyers + b.sellers) - (a.buyers + a.sellers));
const mostActive    = sorted.slice(0, 3);
const leastActive   = sorted.slice(-3).reverse();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-[#1a1b23] border border-gray-100 dark:border-white/10 rounded-md p-3 shadow-xl text-xs font-bold">
      <p className="text-gray-700 dark:text-gray-200 mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center justify-between gap-4 mb-0.5">
          <span className="flex items-center gap-1.5" style={{ color: p.color }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="text-gray-900 dark:text-white">{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const total = totalBuyers + totalSellers;
  return (
    <div className="bg-white dark:bg-[#1a1b23] border border-gray-100 dark:border-white/10 rounded-md p-3 shadow-xl text-xs font-bold">
      <p className="mb-1" style={{ color: payload[0].payload.fill }}>
        {payload[0].name}
      </p>
      <p className="text-gray-700 dark:text-gray-200">{payload[0].value.toLocaleString()} users</p>
      <p className="text-gray-400 font-medium">{((payload[0].value / total) * 100).toFixed(1)}% of total</p>
    </div>
  );
};

export default function AdminBuyCryptoPage() {
  const [activeTab, setActiveTab] = useState<"area" | "line">("area");
  const total = totalBuyers + totalSellers;

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-[#0c0c0e]">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Buy &amp; Sell Analytics
        </h1>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
          Real-time breakdown of user buy/sell activity across all crypto pairs
        </p>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Active Users", value: total.toLocaleString(), icon: FiUsers,        color: "blue",    sub: "across all pairs" },
          { label: "Total Buyers",       value: totalBuyers.toLocaleString(),  icon: FiTrendingUp,   color: "emerald", sub: `${((totalBuyers/total)*100).toFixed(1)}% of users` },
          { label: "Total Sellers",      value: totalSellers.toLocaleString(), icon: FiTrendingDown, color: "red",     sub: `${((totalSellers/total)*100).toFixed(1)}% of users` },
          { label: "Active Pairs",       value: COINS.length.toString(),       icon: FiBarChart2,    color: "violet",  sub: "trading pairs live" },
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white ">{k.value}</p>
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

        {/* Pie Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
          <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-1">
            Buy vs Sell Ratio
          </h2>
          <p className="text-xs text-gray-400 font-medium mb-4">Overall user distribution</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={PIE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {PIE_DATA.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v) => <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {PIE_DATA.map((d, i) => (
              <div key={d.name}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-600 dark:text-gray-300">{d.name}</span>
                  <span className="font-mono" style={{ color: PIE_COLORS[i] }}>
                    {((d.value / total) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-white/[0.06] rounded-full">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${(d.value / total) * 100}%`, background: PIE_COLORS[i] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Line / Area Chart */}
        <div className="xl:col-span-3 bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                7-Day Trading Volume
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Active users per coin per day</p>
            </div>
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-white/[0.05] rounded-md">
              {(["area", "line"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-1 text-xs font-bold rounded-md capitalize transition-all cursor-pointer ${
                    activeTab === t
                      ? "bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            {activeTab === "area" ? (
              <AreaChart data={LINE_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  {[
                    { id: "BTC", color: "#F59E0B" },
                    { id: "ETH", color: "#6366F1" },
                    { id: "SOL", color: "#10B981" },
                    { id: "XRP", color: "#3B82F6" },
                    { id: "DOGE",color: "#F97316" },
                  ].map((g) => (
                    <linearGradient key={g.id} id={`grad${g.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={g.color} stopOpacity={0.18} />
                      <stop offset="95%" stopColor={g.color} stopOpacity={0}    />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.4} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{v}</span>} />
                {[
                  { key: "BTC",  color: "#F59E0B" },
                  { key: "ETH",  color: "#6366F1" },
                  { key: "SOL",  color: "#10B981" },
                  { key: "XRP",  color: "#3B82F6" },
                  { key: "DOGE", color: "#F97316" },
                ].map((s) => (
                  <Area key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2}
                    fill={`url(#grad${s.key})`} dot={false} activeDot={{ r: 4 }} />
                ))}
              </AreaChart>
            ) : (
              <LineChart data={LINE_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.4} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{v}</span>} />
                {[
                  { key: "BTC",  color: "#F59E0B" },
                  { key: "ETH",  color: "#6366F1" },
                  { key: "SOL",  color: "#10B981" },
                  { key: "XRP",  color: "#3B82F6" },
                  { key: "DOGE", color: "#F97316" },
                ].map((s) => (
                  <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2.5}
                    dot={false} activeDot={{ r: 4 }} />
                ))}
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Per-Coin Breakdown Table */}
      <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <FiActivity className="w-4 h-4 text-blue-500" />
            <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
              Per-Coin Buy / Sell Breakdown
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Buyers
            </span>
            <span className="flex items-center gap-1 text-red-500 dark:text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Sellers
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50/70 dark:bg-white/[0.02]">
                <th className="px-5 py-3 text-left">Coin</th>
                <th className="px-5 py-3 text-right">Price</th>
                <th className="px-5 py-3 text-right">24H Change</th>
                <th className="px-5 py-3 text-right">Buyers</th>
                <th className="px-5 py-3 text-right">Sellers</th>
                <th className="px-5 py-3 text-right">Total Users</th>
                <th className="px-5 py-3 text-left pl-8">Buy/Sell Bar</th>
                <th className="px-5 py-3 text-left">Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/[0.04]">
              {COINS.map((c, i) => {
                const total = c.buyers + c.sellers;
                const buyPct = (c.buyers / total) * 100;
                const isMost = i < 2;
                const isLeast = i >= COINS.length - 2;
                return (
                  <tr key={c.symbol} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: `${c.color}22`, color: c.color }}>
                          {c.symbol[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-xs">{c.symbol}</p>
                          <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500">{c.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-gray-900 dark:text-white text-xs">{c.price}</td>
                    <td className={`px-5 py-3.5 text-right text-xs font-bold ${c.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                      <div className="flex items-center justify-end gap-0.5">
                        {c.change >= 0 ? <FiArrowUpRight className="w-3.5 h-3.5" /> : <FiArrowDownRight className="w-3.5 h-3.5" />}
                        {Math.abs(c.change)}%
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {c.buyers.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-xs font-bold text-red-500 dark:text-red-400">
                      {c.sellers.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-xs font-bold text-gray-900 dark:text-white">
                      {total.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 pl-8 w-48">
                      <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                        <div className="bg-emerald-500 rounded-l-full transition-all" style={{ width: `${buyPct}%` }} />
                        <div className="bg-red-400 rounded-r-full flex-1 transition-all" />
                      </div>
                      <div className="flex justify-between text-[9px] font-bold mt-1 text-gray-400">
                        <span>{buyPct.toFixed(0)}% buy</span>
                        <span>{(100 - buyPct).toFixed(0)}% sell</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {isMost && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                          🔥 Most Active
                        </span>
                      )}
                      {isLeast && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400">
                          Low Activity
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Most & Least Active */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🔥</span>
            <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Most Active Pairs</h2>
          </div>
          <div className="space-y-3">
            {mostActive.map((c, i) => (
              <div key={c.symbol} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${c.color}22`, color: c.color }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white mb-0.5">
                    <span>{c.symbol} / USDT</span>
                    <span className="font-mono">{(c.buyers + c.sellers).toLocaleString()} users</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-white/[0.06] rounded-full">
                    <div className="h-1.5 rounded-full" style={{ width: `${Math.min(100, ((c.buyers + c.sellers) / (mostActive[0].buyers + mostActive[0].sellers)) * 100)}%`, background: c.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📉</span>
            <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Lowest Activity Pairs</h2>
          </div>
          <div className="space-y-3">
            {leastActive.map((c, i) => (
              <div key={c.symbol} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white mb-0.5">
                    <span>{c.symbol} / USDT</span>
                    <span className="font-mono text-gray-400 font-medium">{(c.buyers + c.sellers).toLocaleString()} users</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-white/[0.06] rounded-full">
                    <div className="h-1.5 rounded-full bg-gray-300 dark:bg-white/20" style={{ width: `${Math.min(100, ((c.buyers + c.sellers) / (mostActive[0].buyers + mostActive[0].sellers)) * 100)}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
