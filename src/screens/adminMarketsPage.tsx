"use client";

import React, { useState, useRef, useEffect } from "react";
import { TradingChart } from "@/components/tradingChart";
import { Candle, generateInitialCandles } from "@/scheme/exchange";
import {
  FiSearch, FiTrendingUp, FiTrendingDown, FiStar, FiBarChart2,
  FiZap, FiActivity, FiArrowUpRight, FiArrowDownRight,
} from "react-icons/fi";
import { BiBitcoin } from "react-icons/bi";

const MARKETS = [
  { symbol: "BTC/USDT",  name: "Bitcoin",      price: "$63,820.00", change: "+2.4%", up: true,  vol: "$1.28B", high: "$64,200", low: "$62,100" },
  { symbol: "ETH/USDT",  name: "Ethereum",     price: "$3,312.50",  change: "+1.8%", up: true,  vol: "$840M",  high: "$3,350",  low: "$3,240"  },
  { symbol: "SOL/USDT",  name: "Solana",       price: "$154.20",    change: "-0.6%", up: false, vol: "$320M",  high: "$158.00", low: "$151.50" },
  { symbol: "BNB/USDT",  name: "BNB",          price: "$277.80",    change: "+0.4%", up: true,  vol: "$210M",  high: "$280.00", low: "$272.00" },
  { symbol: "XRP/USDT",  name: "Ripple",       price: "$0.5640",    change: "-1.2%", up: false, vol: "$185M",  high: "$0.58",   low: "$0.55"   },
  { symbol: "DOGE/USDT", name: "Dogecoin",     price: "$0.1520",    change: "+3.1%", up: true,  vol: "$142M",  high: "$0.16",   low: "$0.14"   },
  { symbol: "ADA/USDT",  name: "Cardano",      price: "$0.4510",    change: "-0.9%", up: false, vol: "$98M",   high: "$0.47",   low: "$0.44"   },
  { symbol: "AVAX/USDT", name: "Avalanche",    price: "$37.40",     change: "-1.5%", up: false, vol: "$76M",   high: "$39.00",  low: "$36.50"  },
];

export default function AdminMarketsPage() {
  const [selectedPair, setSelectedPair]       = useState("BTC/USDT");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const [search, setSearch]                   = useState("");
  const [activeTab, setActiveTab]             = useState<"all" | "spot" | "futures" | "gainers">("all");
  
  // Trading Chart States
  const [candles, setCandles]                 = useState<Candle[]>([]);
  const [hoveredCandle, setHoveredCandle]     = useState<Candle | null>(null);
  const [chartMousePos, setChartMousePos]     = useState<{ x: number; y: number } | null>(null);
  const chartSvgRef                           = useRef<SVGSVGElement | null>(null);

  const selectedMarket = MARKETS.find((m) => m.symbol === selectedPair) ?? MARKETS[0];
  const currentPrice   = parseFloat(selectedMarket.price.replace(/[$,]/g, ""));

  // Generate initial candles whenever pair or timeframe changes
  useEffect(() => {
    setCandles(generateInitialCandles(currentPrice, selectedTimeframe));
  }, [selectedPair, selectedTimeframe, currentPrice]);

  const filteredMarkets = MARKETS.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch = !q || m.symbol.toLowerCase().includes(q) || m.name.toLowerCase().includes(q);
    if (activeTab === "gainers") return matchSearch && m.up;
    return matchSearch;
  });

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-[#0c0c0e]">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Admin Markets &amp; Live Terminal
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
            Real-time exchange &amp; spot trading charts with market overview
          </p>
        </div>

        {/* Selected Pair Header Info */}
        <div className="flex items-center gap-4 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] p-3 rounded-md shadow-sm">
          <span className="font-bold text-sm text-gray-900 dark:text-white">{selectedMarket.symbol}</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedMarket.price}</span>
          <span className={`text-xs font-bold ${selectedMarket.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
            {selectedMarket.change}
          </span>
          <span className="text-xs text-gray-400 font-medium hidden sm:inline">24h Vol: {selectedMarket.vol}</span>
        </div>
      </div>

      {/* ── LIVE EXCHANGE & SPOT TRADING CHART SECTION ────────────────────── */}
      <div className="bg-white dark:bg-[#111218] rounded-md border border-gray-200 dark:border-white/10 overflow-hidden shadow-md">
        <div className="px-5 py-3 border-b border-gray-200 dark:border-white/10 flex items-center justify-between flex-wrap gap-3 bg-gray-50/80 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <FiActivity className="w-4 h-4 text-blue-500" />
            <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
              {selectedPair} Live Candlestick &amp; Spot Terminal Chart
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Timeframe buttons */}
            <div className="flex gap-1 bg-gray-200 dark:bg-white/10 p-0.5 rounded-md">
              {["1m", "15m", "1H", "4H", "1D"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-2 py-0.5 text-[11px] font-bold rounded capitalize transition-all cursor-pointer ${
                    selectedTimeframe === tf
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:text-white"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Pair Switcher */}
            <div className="flex items-center gap-1.5">
              {MARKETS.slice(0, 4).map((m) => (
                <button
                  key={m.symbol}
                  onClick={() => setSelectedPair(m.symbol)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    selectedPair === m.symbol
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {m.symbol.split('/')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-Time Trading Chart Component */}
        <div className="h-[420px] w-full relative">
          <TradingChart
            candles={candles}
            selectedTimeframe={selectedTimeframe}
            currentPrice={currentPrice}
            hoveredCandle={hoveredCandle}
            setHoveredCandle={setHoveredCandle}
            chartMousePos={chartMousePos}
            setChartMousePos={setChartMousePos}
            chartSvgRef={chartSvgRef}
          />
        </div>
      </div>

      {/* ── MARKETS TABLE & CATEGORIES ───────────────────────────────────────── */}
      <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] overflow-hidden shadow-sm">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 dark:border-white/[0.06]">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-gray-100 dark:bg-white/[0.05] rounded-md">
            {(["all", "spot", "futures", "gainers"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-md capitalize transition-all cursor-pointer ${
                  activeTab === t
                    ? "bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
                }`}
              >
                {t === "gainers" ? "Top Gainers 🔥" : t}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search market pair..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-1.5 text-xs font-bold bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-md text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none w-52"
            />
          </div>
        </div>

        {/* Markets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-50/70 dark:bg-white/[0.02]">
                <th className="px-5 py-3 text-left">Market Pair</th>
                <th className="px-5 py-3 text-right">Price</th>
                <th className="px-5 py-3 text-right">24H Change</th>
                <th className="px-5 py-3 text-right">24H High</th>
                <th className="px-5 py-3 text-right">24H Low</th>
                <th className="px-5 py-3 text-right">24H Volume</th>
                <th className="px-5 py-3 text-center">Trade Chart</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/[0.04]">
              {filteredMarkets.map((m) => (
                <tr
                  key={m.symbol}
                  onClick={() => setSelectedPair(m.symbol)}
                  className={`hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer ${
                    selectedPair === m.symbol ? "bg-blue-50/40 dark:bg-blue-900/10" : ""
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                        {m.symbol[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-xs">{m.symbol}</p>
                        <p className="text-[10px] font-medium text-gray-400">{m.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right font-bold text-gray-900 dark:text-white text-xs">{m.price}</td>
                  <td className={`px-5 py-3.5 text-right text-xs font-bold ${m.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                    <div className="flex items-center justify-end gap-0.5">
                      {m.up ? <FiArrowUpRight className="w-3.5 h-3.5" /> : <FiArrowDownRight className="w-3.5 h-3.5" />}
                      {m.change}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right text-xs text-gray-600 dark:text-gray-300 font-medium">{m.high}</td>
                  <td className="px-5 py-3.5 text-right text-xs text-gray-600 dark:text-gray-300 font-medium">{m.low}</td>
                  <td className="px-5 py-3.5 text-right text-xs text-gray-500 dark:text-gray-400 font-medium">{m.vol}</td>
                  <td className="px-5 py-3.5 text-center">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold transition-all">
                      Load Chart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
