"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiStar, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/table";

const CATEGORIES = [
  "Crypto",
  "DeFi",
  "BSC",
  "NFT",
  "Metaverse",
  "Polkadot",
  "Solana",
  "Opensea",
  "Makersplace",
];

const TABLE_CATEGORIES = [
  "View All",
  "Metaverse",
  "Entertainment",
  "Energy",
  "NFT",
  "Gaming",
  "Music",
];

interface Coin {
  name: string;
  symbol: string;
  pair: string;
  price: number;
  volume: number;
  change: number;
  bg: string;
  letter: string;
}

const COINS: Coin[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    pair: "USD",
    price: 46168.95,
    volume: 36641.2,
    change: -0.79,
    bg: "#F7931A",
    letter: "₿",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    pair: "USD",
    price: 3480.04,
    volume: 36641.2,
    change: 10.59,
    bg: "#627EEA",
    letter: "Ξ",
  },
  {
    name: "Tether",
    symbol: "USDT",
    pair: "USD",
    price: 1.0,
    volume: 36641.2,
    change: -0.01,
    bg: "#26A17B",
    letter: "₮",
  },
  {
    name: "BNB",
    symbol: "BNB",
    pair: "USD",
    price: 443.56,
    volume: 36641.2,
    change: -1.24,
    bg: "#F3BA2F",
    letter: "B",
  },
];

interface MarketCoin {
  rank: number;
  name: string;
  symbol: string;
  price: string;
  change: number;
  marketCap: string;
  iconBg: string;
  letter: string;
  isStarred?: boolean;
  isActive?: boolean;
  sparklinePath: string;
}

const MARKET_COINS: MarketCoin[] = [
  {
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: "$56,623.54",
    change: 1.45,
    marketCap: "$880,423,640,582",
    iconBg: "#F7931A",
    letter: "₿",
    sparklinePath: "M0 30 Q15 15 30 25 T60 15 T90 22 T120 8",
  },
  {
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: "$56,623.54",
    change: -5.12,
    marketCap: "$880,423,640,582",
    iconBg: "#627EEA",
    letter: "Ξ",
    isStarred: true,
    isActive: true,
    sparklinePath: "M0 15 Q15 30 30 20 T60 28 T90 18 T120 32",
  },
  {
    rank: 3,
    name: "Binance",
    symbol: "BNB",
    price: "$56,623.54",
    change: -3.75,
    marketCap: "$880,423,640,582",
    iconBg: "#F3BA2F",
    letter: "B",
    sparklinePath: "M0 18 Q15 32 30 22 T60 30 T90 16 T120 31",
  },
  {
    rank: 4,
    name: "Tether",
    symbol: "USDT",
    price: "$56,623.54",
    change: 1.45,
    marketCap: "$880,423,640,582",
    iconBg: "#26A17B",
    letter: "₮",
    sparklinePath: "M0 30 Q15 15 30 25 T60 15 T90 22 T120 8",
  },
  {
    rank: 5,
    name: "Solana",
    symbol: "SOL",
    price: "$56,623.54",
    change: 1.45,
    marketCap: "$880,423,640,582",
    iconBg: "#663399",
    letter: "S",
    sparklinePath: "M0 30 Q15 15 30 25 T60 15 T90 22 T120 8",
  },
  {
    rank: 6,
    name: "XRP",
    symbol: "XRP",
    price: "$56,623.54",
    change: -2.22,
    marketCap: "$880,423,640,582",
    iconBg: "#23292F",
    letter: "X",
    sparklinePath: "M0 15 Q15 30 30 20 T60 28 T90 18 T120 32",
  },
  {
    rank: 7,
    name: "Cardano",
    symbol: "ADA",
    price: "$56,623.54",
    change: 0.8,
    marketCap: "$880,423,640,582",
    iconBg: "#0033AD",
    letter: "A",
    sparklinePath: "M0 28 Q15 18 30 26 T60 16 T90 23 T120 10",
  },
  {
    rank: 8,
    name: "Avalanche",
    symbol: "AVAX",
    price: "$56,623.54",
    change: 1.41,
    marketCap: "$880,423,640,582",
    iconBg: "#E84142",
    letter: "A",
    sparklinePath: "M0 30 Q15 15 30 25 T60 15 T90 22 T120 8",
  },
];

function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatVolume(vol: number) {
  return vol.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const MarketTicker = () => {
  const [activeTab, setActiveTab] = useState("Crypto");
  const [activeTableTab, setActiveTableTab] = useState("View All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMarketCoins = MARKET_COINS.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full bg-gray-55 dark:bg-[#0c0c0e] py-16 transition-colors duration-200 space-y-16">
      
      {/* Top Section: Ticker Grid */}
      <div className="w-[75%] mx-auto">
        {/* Card wrapper */}
        <div className="bg-white dark:bg-[#141416] rounded-2xl shadow-md border border-gray-100 dark:border-white/[0.05] overflow-hidden">
          {/* Category tabs */}
          <div className="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-white/[0.05]">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === cat
                      ? "bg-primary text-white shadow-sm shadow-primary/20"
                      : "text-secondary dark:text-secondary2 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Coin cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-white/[0.05]">
            {COINS.map((coin) => (
              <div
                key={coin.symbol}
                className="px-6 py-5 flex flex-col gap-2 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                {/* Icon + Name + Pair */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 shrink-0 relative overflow-hidden flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 p-0.5">
                    <Image
                      src={`https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/${coin.symbol.toLowerCase()}.svg`}
                      alt={coin.name}
                      width={32}
                      height={32}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                      {coin.name}
                    </p>
                    <p className="text-xs text-secondary dark:text-secondary2 font-medium">
                      {coin.symbol}/{coin.pair}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  USD {formatPrice(coin.price)}
                </p>

                {/* Volume + Change badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary dark:text-secondary2 font-medium">
                    {formatVolume(coin.volume)}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      coin.change >= 0
                        ? "bg-success/10 text-success"
                        : "bg-critical/10 text-critical"
                    }`}
                  >
                    {coin.change >= 0 ? "+" : ""}
                    {coin.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Market Update Table */}
      <div className="w-[75%] mx-auto space-y-8">
        
        {/* Title Block */}
        <div className="flex justify-between items-end">
          <h2 className="text-3xl font-extrabold text-gray-950 dark:text-white tracking-tight">
            Market Update
          </h2>
          <Link
            href="/markets"
            className="text-xs font-black text-secondary hover:text-primary dark:text-secondary2 dark:hover:text-primary transition-colors flex items-center gap-0.5"
          >
            <span>See All Coins</span>
            <FiChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter Toolbar row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Left: Table categories tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide w-full sm:w-auto">
            {TABLE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTableTab(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTableTab === cat
                    ? "bg-primary text-white shadow-sm shadow-primary/20"
                    : "text-secondary dark:text-secondary2 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-white/[0.04]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right: Search Input */}
          <div className="relative w-full sm:w-[220px] shrink-0">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-secondary dark:text-secondary2">
              <FiSearch className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search Coin"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.12] focus:border-primary dark:focus:border-primary rounded-full py-1.5 pl-9 pr-4 text-xs font-bold text-gray-950 dark:text-white placeholder-secondary dark:placeholder-secondary2/60 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Table list container */}
        <div className="bg-white dark:bg-[#141416] border border-gray-100 dark:border-white/[0.05] rounded-2xl shadow-xl shadow-gray-200/20 dark:shadow-black/40 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead className="min-w-[150px]">Name</TableHead>
                <TableHead className="text-right">Last Price</TableHead>
                <TableHead className="text-right">24h %</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
                <TableHead className="text-center w-[140px]">Last 7 Days</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMarketCoins.map((coin) => {
                const isPositive = coin.change >= 0;
                return (
                  <TableRow
                    key={coin.symbol}
                    className={`transition-colors ${
                      coin.isActive
                        ? "bg-indigo-50/20 dark:bg-white/[0.02]"
                        : ""
                    }`}
                  >
                    {/* Star & Rank */}
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2 select-none">
                        <button className="text-gray-300 dark:text-gray-600 hover:text-yellow-400 transition-colors cursor-pointer">
                          {coin.isStarred ? (
                            <FaStar className="w-3.5 h-3.5 text-yellow-400" />
                          ) : (
                            <FiStar className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span className="text-xs font-bold text-secondary dark:text-secondary2">
                          {coin.rank}
                        </span>
                      </div>
                    </TableCell>

                    {/* Name + Logo */}
                    <TableCell>
                      <div className="flex items-center gap-3 select-none">
                        <div className="w-7 h-7 shrink-0 relative overflow-hidden flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 p-0.5">
                          <Image
                            src={`https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/${coin.symbol.toLowerCase()}.svg`}
                            alt={coin.name}
                            width={28}
                            height={28}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-extrabold text-gray-900 dark:text-white">
                            {coin.name}
                          </span>
                          <span className="text-[10px] text-secondary dark:text-secondary2 font-bold uppercase">
                            {coin.symbol}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Last Price */}
                    <TableCell className="text-right font-extrabold text-xs text-gray-900 dark:text-white">
                      {coin.price}
                    </TableCell>

                    {/* 24h Change */}
                    <TableCell
                      className={`text-right font-extrabold text-xs ${
                        isPositive ? "text-success" : "text-critical"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {coin.change.toFixed(2)}%
                    </TableCell>

                    {/* Market Cap */}
                    <TableCell className="text-right font-extrabold text-xs text-gray-900 dark:text-white">
                      {coin.marketCap}
                    </TableCell>

                    {/* Sparkline (Last 7 Days) */}
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <svg className="w-[120px] h-[36px] overflow-visible" viewBox="0 0 120 40">
                          {/* Sparkline gradient fill */}
                          <defs>
                            <linearGradient id={`grad-${coin.symbol}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={isPositive ? "#58BD7D" : "#D33535"} stopOpacity="0.15" />
                              <stop offset="100%" stopColor={isPositive ? "#58BD7D" : "#D33535"} stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d={`${coin.sparklinePath} L120 40 L0 40 Z`}
                            fill={`url(#grad-${coin.symbol})`}
                          />
                          <path
                            d={coin.sparklinePath}
                            fill="none"
                            stroke={isPositive ? "#58BD7D" : "#D33535"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </TableCell>

                    {/* Action Trade Button */}
                    <TableCell className="text-center">
                      <Button
                        variant={coin.isActive ? "default" : "outline"}
                        size="sm"
                        className={`font-extrabold rounded-full px-5 py-1 text-[10px] cursor-pointer ${
                          coin.isActive
                            ? "bg-primary text-white hover:bg-interactive shadow-md shadow-primary/20"
                            : "border border-gray-200 dark:border-white/[0.08] hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                        }`}
                      >
                        Trade
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

      </div>

    </section>
  );
};

export default MarketTicker;
