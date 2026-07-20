"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch, FiX, FiClock, FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
import { notifySuccess } from "@/components/toastProvider";

type OrderStatus = "open" | "filled" | "cancelled";
type OrderSide   = "buy" | "sell";

type Order = {
  id: string;
  pair: string;
  baseCoin: string; // for live price lookup
  side: OrderSide;
  type: "limit" | "market";
  status: OrderStatus;
  price: number | null;
  amount: number;
  filled: number;
  total: number;
  date: string;
};

// ── Pair → CoinGecko ID map ─────────────────────────────────────────────────
const PAIR_COIN_ID: Record<string, string> = {
  BTC:  "bitcoin",
  ETH:  "ethereum",
  SOL:  "solana",
  BNB:  "bnb",
  ADA:  "cardano",
  DOT:  "polkadot",
  RBT:  "",          // no live price for RBT
  USDT: "tether",
};

// ── Dummy order history (realistic, but static) ─────────────────────────────
const ORDERS: Order[] = [
  { id: "ORD-001", pair: "BTC/USDT",  baseCoin: "BTC",  side: "buy",  type: "limit",  status: "open",      price: 67200,  amount: 0.05,  filled: 0,     total: 3360.00, date: "2026-07-19 14:32" },
  { id: "ORD-002", pair: "ETH/USDT",  baseCoin: "ETH",  side: "sell", type: "limit",  status: "open",      price: 3520,   amount: 1.5,   filled: 0.4,   total: 5280.00, date: "2026-07-19 13:15" },
  { id: "ORD-003", pair: "SOL/USDT",  baseCoin: "SOL",  side: "buy",  type: "market", status: "filled",    price: null,   amount: 10,    filled: 10,    total: 901.50,  date: "2026-07-18 09:44" },
  { id: "ORD-004", pair: "BNB/USDT",  baseCoin: "BNB",  side: "buy",  type: "limit",  status: "filled",    price: 285,    amount: 5,     filled: 5,     total: 1425.00, date: "2026-07-18 08:20" },
  { id: "ORD-005", pair: "RBT/USDT",  baseCoin: "RBT",  side: "sell", type: "limit",  status: "cancelled", price: 0.155,  amount: 2000,  filled: 0,     total: 310.00,  date: "2026-07-17 20:11" },
  { id: "ORD-006", pair: "ADA/USDT",  baseCoin: "ADA",  side: "buy",  type: "limit",  status: "open",      price: 0.39,   amount: 500,   filled: 200,   total: 195.00,  date: "2026-07-19 11:58" },
  { id: "ORD-007", pair: "BTC/USDT",  baseCoin: "BTC",  side: "sell", type: "limit",  status: "filled",    price: 68100,  amount: 0.03,  filled: 0.03,  total: 2043.00, date: "2026-07-17 15:30" },
  { id: "ORD-008", pair: "DOT/USDT",  baseCoin: "DOT",  side: "buy",  type: "market", status: "filled",    price: null,   amount: 20,    filled: 20,    total: 136.40,  date: "2026-07-16 10:05" },
  { id: "ORD-009", pair: "ETH/USDT",  baseCoin: "ETH",  side: "buy",  type: "limit",  status: "cancelled", price: 3100,   amount: 0.5,   filled: 0,     total: 1550.00, date: "2026-07-15 18:42" },
  { id: "ORD-010", pair: "SOL/USDT",  baseCoin: "SOL",  side: "sell", type: "limit",  status: "open",      price: 98.00,  amount: 5,     filled: 0,     total: 490.00,  date: "2026-07-19 16:00" },
];

const TRADES = ORDERS.filter((o) => o.status === "filled");

const STATUS_ICONS: Record<OrderStatus, React.ReactNode> = {
  open:      <FiClock       className="w-3.5 h-3.5 text-yellow-500" />,
  filled:    <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500" />,
  cancelled: <FiXCircle     className="w-3.5 h-3.5 text-red-500" />,
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  open:      "text-yellow-500",
  filled:    "text-emerald-500",
  cancelled: "text-red-500",
};

type LivePrice = { price: number; change24h: number; volume24h: string };

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "trades">("orders");
  const [statusFilter, setStatus] = useState<OrderStatus | "all">("all");
  const [sideFilter, setSide]     = useState<OrderSide | "all">("all");
  const [search, setSearch]       = useState("");
  const [livePrices, setLivePrices] = useState<Record<string, LivePrice>>({});
  const [priceLoading, setPriceLoading] = useState(true);

  // ── Fetch live prices ───────────────────────────────────────────────────
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/crypto/prices");
        if (res.ok) {
          const data = await res.json();
          if (data.prices) setLivePrices(data.prices);
        }
      } catch (e) {
        console.error("Failed to fetch prices:", e);
      } finally {
        setPriceLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 12000);
    return () => clearInterval(interval);
  }, []);

  const dataSource = activeTab === "orders" ? ORDERS : TRADES;

  const filtered = dataSource.filter((o) => {
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    const matchSide   = sideFilter   === "all" || o.side   === sideFilter;
    const matchSearch = o.pair.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSide && matchSearch;
  });

  const cancelOrder = (id: string) => {
    notifySuccess("Order Cancelled", `Order ${id} has been cancelled successfully.`);
  };

  const getLivePrice = (baseCoin: string): number | null => {
    const id = PAIR_COIN_ID[baseCoin];
    if (!id) return null;
    return livePrices[id]?.price ?? null;
  };

  const fmtPrice = (n: number) =>
    n >= 1
      ? `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : `$${n.toFixed(5)}`;

  // Derive stats from orders using live prices
  const openOrders = ORDERS.filter((o) => o.status === "open");
  const openValue  = openOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0c0c0e] text-gray-900 dark:text-white flex flex-col font-sans">

      {/* Breadcrumb */}
      <div className="w-full border-b border-gray-200 dark:border-white/[0.04] bg-white dark:bg-[#141416] pt-10">
        <div className="w-[75%] mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-xs text-gray-400 font-bold select-none">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="text-gray-700 dark:text-gray-300">Orders & Trades</span>
          </nav>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white dark:bg-[#101012] border-b border-gray-200 dark:border-white/[0.04]">
        <div className="w-[75%] mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Open Orders",   value: ORDERS.filter(o => o.status === "open").length,      sub: `$${openValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} locked`,  color: "text-yellow-500" },
            { label: "Filled Orders", value: ORDERS.filter(o => o.status === "filled").length,    sub: "Executed trades",   color: "text-emerald-500" },
            { label: "Cancelled",     value: ORDERS.filter(o => o.status === "cancelled").length, sub: "No charges applied", color: "text-red-500" },
            {
              label: "BTC Price",
              value: priceLoading ? "—" : (livePrices["bitcoin"]?.price
                ? `$${livePrices["bitcoin"].price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                : "—"),
              sub: priceLoading
                ? "Loading..."
                : livePrices["bitcoin"]?.change24h !== undefined
                  ? `${livePrices["bitcoin"].change24h >= 0 ? "+" : ""}${livePrices["bitcoin"].change24h.toFixed(2)}% 24h`
                  : "",
              color: !priceLoading && (livePrices["bitcoin"]?.change24h ?? 0) >= 0 ? "text-emerald-500" : "text-red-500",
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-50 dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-5 space-y-1">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{stat.label}</p>
              <div className="flex items-center gap-2">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                {stat.label === "BTC Price" && priceLoading && <FiLoader className="w-4 h-4 text-gray-400 animate-spin" />}
              </div>
              {stat.sub && <p className="text-[10px] font-semibold text-gray-400">{stat.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="w-[75%] mx-auto px-6 py-8 space-y-6">
        {/* Sub-tabs */}
        <div className="flex items-center gap-2 bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-1.5 w-fit">
          {(["orders", "trades"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                activeTab === tab ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              {tab === "orders" ? "Order History" : "Trade History"}
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pair or order ID..."
              className="pl-9 pr-3 py-2 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#141416] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors w-56" />
          </div>

          <div className="flex items-center gap-1.5">
            {(["all", "buy", "sell"] as const).map((s) => (
              <button key={s} onClick={() => setSide(s)}
                className={`px-3.5 py-1.5 rounded-md text-[11px] font-bold capitalize transition-colors cursor-pointer ${
                  sideFilter === s ? "bg-indigo-600 text-white" : "border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 hover:border-indigo-500 bg-white dark:bg-[#141416]"
                }`}>
                {s === "all" ? "All Sides" : s}
              </button>
            ))}
          </div>

          {activeTab === "orders" && (
            <div className="flex items-center gap-1.5">
              {(["all", "open", "filled", "cancelled"] as const).map((s) => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`px-3.5 py-1.5 rounded-md text-[11px] font-bold capitalize transition-colors cursor-pointer ${
                    statusFilter === s ? "bg-indigo-600 text-white" : "border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 hover:border-indigo-500 bg-white dark:bg-[#141416]"
                  }`}>
                  {s === "all" ? "All Status" : s}
                </button>
              ))}
            </div>
          )}

          {(search || statusFilter !== "all" || sideFilter !== "all") && (
            <button onClick={() => { setSearch(""); setStatus("all"); setSide("all"); }}
              className="flex items-center gap-1 text-[11px] text-red-500 hover:text-red-700 font-bold cursor-pointer">
              <FiX className="w-3.5 h-3.5" /> Reset
            </button>
          )}

          {/* Live indicator */}
          {!priceLoading && (
            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-bold text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live prices
            </span>
          )}
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md overflow-x-auto shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/[0.06] bg-gray-50/50 dark:bg-[#1d1d22]/50 text-[10px] font-bold uppercase tracking-wider text-gray-400 select-none">
                <th className="px-5 py-4">Order ID</th>
                <th className="px-5 py-4">Pair</th>
                <th className="px-5 py-4">Side</th>
                <th className="px-5 py-4">Type</th>
                {activeTab === "orders" && <th className="px-5 py-4">Status</th>}
                <th className="px-5 py-4">Order Price</th>
                <th className="px-5 py-4">Live Price</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Filled</th>
                <th className="px-5 py-4">Total (USDT)</th>
                <th className="px-5 py-4">Date</th>
                {activeTab === "orders" && <th className="px-5 py-4">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.04] text-xs font-bold">
              {filtered.map((order) => {
                const livePrice = getLivePrice(order.baseCoin);
                const priceDiff = order.price && livePrice
                  ? ((livePrice - order.price) / order.price) * 100
                  : null;

                return (
                  <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                    <td className="px-5 py-4 text-indigo-600 dark:text-indigo-400 font-bold">{order.id}</td>
                    <td className="px-5 py-4 text-gray-900 dark:text-white">{order.pair}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${order.side === "buy" ? "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400" : "bg-red-50 dark:bg-red-900/10 text-red-500"}`}>
                        {order.side.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 capitalize text-gray-500 dark:text-gray-400">{order.type}</td>
                    {activeTab === "orders" && (
                      <td className="px-5 py-4">
                        <span className={`flex items-center gap-1.5 ${STATUS_LABEL[order.status]}`}>
                          {STATUS_ICONS[order.status]}
                          <span className="capitalize">{order.status}</span>
                        </span>
                      </td>
                    )}
                    <td className="px-5 py-4 text-gray-900 dark:text-white">
                      {order.price ? fmtPrice(order.price) : <span className="text-gray-400">Market</span>}
                    </td>
                    {/* Live market price — REAL from API */}
                    <td className="px-5 py-4">
                      {priceLoading ? (
                        <span className="text-gray-400">—</span>
                      ) : livePrice ? (
                        <div className="space-y-0.5">
                          <span className="text-gray-900 dark:text-white">{fmtPrice(livePrice)}</span>
                          {priceDiff !== null && (
                            <div className={`text-[10px] font-bold ${priceDiff >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                              {priceDiff >= 0 ? "↑" : "↓"} {Math.abs(priceDiff).toFixed(2)}%
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-[10px]">N/A</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-700 dark:text-white/80">{order.amount}</td>
                    <td className="px-5 py-4">
                      <span className={order.filled === order.amount ? "text-emerald-500" : "text-gray-500 dark:text-gray-400"}>
                        {order.filled}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-900 dark:text-white">${order.total.toFixed(2)}</td>
                    <td className="px-5 py-4 text-gray-400 font-semibold">{order.date}</td>
                    {activeTab === "orders" && (
                      <td className="px-5 py-4">
                        {order.status === "open" ? (
                          <button onClick={() => cancelOrder(order.id)}
                            className="text-[10px] text-red-500 hover:text-red-700 font-bold cursor-pointer hover:underline transition-colors">
                            Cancel
                          </button>
                        ) : (
                          <span className="text-[10px] text-gray-300 dark:text-gray-700">—</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={activeTab === "orders" ? 12 : 10} className="px-6 py-10 text-center text-gray-400 font-semibold select-none">
                    No orders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-[10px] font-semibold text-gray-400 px-1">
          * Order history shows dummy data. Live Price column is fetched in real-time from Binance via our API.
        </p>
      </div>
    </div>
  );
}
