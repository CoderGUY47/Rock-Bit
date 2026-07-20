"use client";

import { useState, useEffect } from "react";
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

interface CoinInfo {
  rank: number;
  name: string;
  symbol: string;
  defaultPrice: number;
  defaultChange: number;
  defaultVolume: number;
  marketCap: string;
  bg: string;
  letter: string;
  sparklinePath: string;
  topCategories: string[];
  bottomCategories: string[];
}

const MASTER_COINS: CoinInfo[] = [
  {
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    defaultPrice: 64749.99,
    defaultChange: -0.02,
    defaultVolume: 36641.2,
    marketCap: "$1,212,423,640,582",
    bg: "#F7931A",
    letter: "₿",
    sparklinePath: "M0 30 Q15 15 30 25 T60 15 T90 22 T120 8",
    topCategories: ["Crypto"],
    bottomCategories: ["Energy", "Metaverse"],
  },
  {
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    defaultPrice: 1876.44,
    defaultChange: 0.41,
    defaultVolume: 36641.2,
    marketCap: "$420,154,612,185",
    bg: "#627EEA",
    letter: "Ξ",
    sparklinePath: "M0 15 Q15 30 30 20 T60 28 T90 18 T120 32",
    topCategories: ["Crypto", "DeFi", "NFT"],
    bottomCategories: ["NFT", "Metaverse"],
  },
  {
    rank: 3,
    name: "Binance Coin",
    symbol: "BNB",
    defaultPrice: 568.99,
    defaultChange: -0.0,
    defaultVolume: 36641.2,
    marketCap: "$88,423,640,582",
    bg: "#F3BA2F",
    letter: "B",
    sparklinePath: "M0 18 Q15 32 30 22 T60 30 T90 16 T120 31",
    topCategories: ["Crypto", "BSC"],
    bottomCategories: ["Gaming"],
  },
  {
    rank: 4,
    name: "Tether",
    symbol: "USDT",
    defaultPrice: 1.0,
    defaultChange: 0.02,
    defaultVolume: 36641.2,
    marketCap: "$110,423,640,582",
    bg: "#26A17B",
    letter: "₮",
    sparklinePath: "M0 20 L120 20",
    topCategories: ["Crypto"],
    bottomCategories: [],
  },
  {
    rank: 5,
    name: "Solana",
    symbol: "SOL",
    defaultPrice: 76.85,
    defaultChange: 1.09,
    defaultVolume: 14500.2,
    marketCap: "$65,842,109,471",
    bg: "#663399",
    letter: "S",
    sparklinePath: "M0 30 Q15 15 30 25 T60 15 T90 22 T120 8",
    topCategories: ["Crypto", "Solana", "NFT"],
    bottomCategories: ["Metaverse", "NFT"],
  },
  {
    rank: 6,
    name: "XRP",
    symbol: "XRP",
    defaultPrice: 1.1,
    defaultChange: 0.16,
    defaultVolume: 9200.0,
    marketCap: "$32,840,119,458",
    bg: "#23292F",
    letter: "X",
    sparklinePath: "M0 15 Q15 30 30 20 T60 28 T90 18 T120 32",
    topCategories: ["Crypto"],
    bottomCategories: ["Music"],
  },
  {
    rank: 7,
    name: "Cardano",
    symbol: "ADA",
    defaultPrice: 0.36,
    defaultChange: -1.26,
    defaultVolume: 4200.0,
    marketCap: "$12,880,423,640",
    bg: "#0033AD",
    letter: "A",
    sparklinePath: "M0 28 Q15 18 30 26 T60 16 T90 23 T120 10",
    topCategories: ["Crypto"],
    bottomCategories: ["Energy"],
  },
  {
    rank: 8,
    name: "Avalanche",
    symbol: "AVAX",
    defaultPrice: 6.58,
    defaultChange: 0.01,
    defaultVolume: 5100.0,
    marketCap: "$9,842,640,582",
    bg: "#E84142",
    letter: "A",
    sparklinePath: "M0 30 Q15 15 30 25 T60 15 T90 22 T120 8",
    topCategories: ["Crypto", "DeFi"],
    bottomCategories: ["Energy"],
  },
  {
    rank: 9,
    name: "Polkadot",
    symbol: "DOT",
    defaultPrice: 6.42,
    defaultChange: -0.45,
    defaultVolume: 3200.0,
    marketCap: "$8,842,109,231",
    bg: "#E6007A",
    letter: "P",
    sparklinePath: "M0 22 Q15 12 30 20 T60 10 T90 18 T120 5",
    topCategories: ["Crypto", "Polkadot"],
    bottomCategories: ["Metaverse"],
  },
  {
    rank: 10,
    name: "Dogecoin",
    symbol: "DOGE",
    defaultPrice: 0.12,
    defaultChange: 4.56,
    defaultVolume: 12500.0,
    marketCap: "$17,842,109,231",
    bg: "#C2A633",
    letter: "D",
    sparklinePath: "M0 30 Q15 15 30 25 T60 15 T90 22 T120 8",
    topCategories: ["Crypto"],
    bottomCategories: ["Entertainment"],
  },
  {
    rank: 11,
    name: "Shiba Inu",
    symbol: "SHIB",
    defaultPrice: 0.000017,
    defaultChange: 2.12,
    defaultVolume: 8200.0,
    marketCap: "$10,442,109,231",
    bg: "#FFA500",
    letter: "S",
    sparklinePath: "M0 15 Q15 30 30 20 T60 28 T90 18 T120 32",
    topCategories: ["Crypto"],
    bottomCategories: ["Entertainment"],
  },
  {
    rank: 12,
    name: "Chainlink",
    symbol: "LINK",
    defaultPrice: 14.22,
    defaultChange: -1.05,
    defaultVolume: 6200.0,
    marketCap: "$8,542,109,231",
    bg: "#375BD2",
    letter: "L",
    sparklinePath: "M0 18 Q15 32 30 22 T60 30 T90 16 T120 31",
    topCategories: ["Crypto", "DeFi"],
    bottomCategories: ["Music"],
  },
  {
    rank: 13,
    name: "Uniswap",
    symbol: "UNI",
    defaultPrice: 7.42,
    defaultChange: -2.34,
    defaultVolume: 4300.0,
    marketCap: "$4,542,109,231",
    bg: "#FF007A",
    letter: "U",
    sparklinePath: "M0 22 Q15 12 30 20 T60 10 T90 18 T120 5",
    topCategories: ["Crypto", "DeFi", "Opensea"],
    bottomCategories: ["NFT"],
  },
  {
    rank: 14,
    name: "Aave",
    symbol: "AAVE",
    defaultPrice: 88.42,
    defaultChange: 3.12,
    defaultVolume: 2100.0,
    marketCap: "$1,342,109,231",
    bg: "#B6509E",
    letter: "A",
    sparklinePath: "M0 30 Q15 15 30 25 T60 15 T90 22 T120 8",
    topCategories: ["Crypto", "DeFi"],
    bottomCategories: ["Gaming"],
  },
  {
    rank: 15,
    name: "Near Protocol",
    symbol: "NEAR",
    defaultPrice: 5.42,
    defaultChange: 0.12,
    defaultVolume: 4100.0,
    marketCap: "$5,842,109,231",
    bg: "#000000",
    letter: "N",
    sparklinePath: "M0 28 Q15 18 30 26 T60 16 T90 23 T120 10",
    topCategories: ["Crypto"],
    bottomCategories: ["Metaverse"],
  },
  {
    rank: 16,
    name: "Cosmos",
    symbol: "ATOM",
    defaultPrice: 8.12,
    defaultChange: -1.24,
    defaultVolume: 2200.0,
    marketCap: "$3,142,109,231",
    bg: "#2E3148",
    letter: "A",
    sparklinePath: "M0 18 Q15 32 30 22 T60 30 T90 16 T120 31",
    topCategories: ["Crypto", "DeFi"],
    bottomCategories: ["Energy"],
  },
  {
    rank: 17,
    name: "Litecoin",
    symbol: "LTC",
    defaultPrice: 72.34,
    defaultChange: 0.88,
    defaultVolume: 5800.0,
    marketCap: "$5,442,109,231",
    bg: "#345D9D",
    letter: "L",
    sparklinePath: "M0 30 Q15 15 30 25 T60 15 T90 22 T120 8",
    topCategories: ["Crypto"],
    bottomCategories: ["Music"],
  },
  {
    rank: 18,
    name: "Arbitrum",
    symbol: "ARB",
    defaultPrice: 0.95,
    defaultChange: -1.12,
    defaultVolume: 7400.0,
    marketCap: "$2,742,109,231",
    bg: "#28A0F0",
    letter: "A",
    sparklinePath: "M0 15 Q15 30 30 20 T60 28 T90 18 T120 32",
    topCategories: ["Crypto", "DeFi"],
    bottomCategories: ["Gaming"],
  },
  {
    rank: 19,
    name: "Optimism",
    symbol: "OP",
    defaultPrice: 1.82,
    defaultChange: 0.45,
    defaultVolume: 4500.0,
    marketCap: "$2,142,109,231",
    bg: "#FF0420",
    letter: "O",
    sparklinePath: "M0 28 Q15 18 30 26 T60 16 T90 23 T120 10",
    topCategories: ["Crypto", "DeFi"],
    bottomCategories: ["Gaming"],
  },
];

const SYMBOL_TO_ID: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
  BNB: "bnb",
  SOL: "solana",
  XRP: "xrp",
  ADA: "cardano",
  AVAX: "avalanche",
  DOT: "polkadot",
  DOGE: "dogecoin",
  SHIB: "shiba-inu",
  LINK: "chainlink",
  UNI: "uniswap",
  AAVE: "aave",
  NEAR: "near",
  ATOM: "cosmos",
  LTC: "litecoin",
  ARB: "arbitrum",
  OP: "optimism",
};

const LOCAL_ICON_MAP: Record<string, string> = {
  BTC: "/assets/coins/btc.svg",
  ETH: "/assets/coins/eth.svg",
  BNB: "/assets/coins/bnb.svg",
  USDT: "/assets/coins/usdt.svg",
  SOL: "/assets/coins/sol.svg",
  XRP: "/assets/coins/xrp.svg",
  ADA: "/assets/coins/ada.svg",
  AVAX: "/assets/coins/avax.svg",
  DOT: "/assets/coins/dot.svg",
  DOGE: "/assets/coins/doge.svg",
  SHIB: "/assets/coins/shib.png",
  LINK: "/assets/coins/link.svg",
  UNI: "/assets/coins/uni.svg",
  AAVE: "/assets/coins/aave.svg",
  NEAR: "/assets/coins/near.png",
  ATOM: "/assets/coins/atom.svg",
  LTC: "/assets/coins/ltc.svg",
  ARB: "/assets/coins/arb.png",
  OP: "/assets/coins/op.png",
};

// ── CoinIcon helper with error boundary/fallback ───────────────────────────
function CoinIcon({
  symbol,
  name,
  size = 28,
}: {
  symbol: string;
  name: string;
  size?: number;
}) {
  const [errored, setErrored] = useState(false);
  const localSrc = LOCAL_ICON_MAP[symbol.toUpperCase()];

  if (errored || !localSrc) {
    return (
      <span
        style={{ width: size, height: size }}
        className="rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 select-none shrink-0"
        title={name}
      >
        <span style={{ fontSize: size * 0.35 }}>
          {symbol.slice(0, 2).toUpperCase()}
        </span>
      </span>
    );
  }

  return (
    <img
      src={localSrc}
      alt={name}
      style={{ width: size, height: size }}
      className="rounded-full object-contain bg-white dark:bg-[#1d1d22] border border-gray-100 dark:border-white/[0.06] p-0.5 shrink-0"
      onError={() => setErrored(true)}
    />
  );
}

function formatPrice(price: number) {
  if (price === 0) return "—";
  return price.toLocaleString("en-US", {
    minimumFractionDigits: price < 1 ? 4 : 2,
    maximumFractionDigits: price < 1 ? 6 : 2,
  });
}

function formatVolume(vol: number) {
  return vol.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export const MarketTicker = () => {
  const [activeTab, setActiveTab] = useState("Crypto");
  const [activeTableTab, setActiveTableTab] = useState("View All");
  const [searchQuery, setSearchQuery] = useState("");
  const [livePrices, setLivePrices] = useState<
    Record<string, { price: number; change24h: number; volume24h: string }>
  >({});
  const [stars, setStars] = useState<Record<string, boolean>>({ ETH: true });

  useEffect(() => {
    const fetchLivePrices = async () => {
      try {
        const res = await fetch("/api/crypto/prices");
        if (res.ok) {
          const data = await res.json();
          if (data.prices) {
            setLivePrices(data.prices);
          }
        }
      } catch (e) {
        console.error("Failed to fetch live prices in MarketTicker", e);
      }
    };

    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 12000);
    return () => clearInterval(interval);
  }, []);

  const toggleStar = (symbol: string) => {
    setStars((prev) => ({ ...prev, [symbol]: !prev[symbol] }));
  };

  // ── Top Ticker Grid Selection ──────────────────────────────────────────
  const selectedTopCoins = MASTER_COINS.filter((coin) =>
    coin.topCategories.includes(activeTab),
  );

  // Fill top grid to exactly 4 coins
  const displayTopCoins = [...selectedTopCoins];
  if (displayTopCoins.length < 4) {
    const fallbacks = MASTER_COINS.filter(
      (c) => !displayTopCoins.find((d) => d.symbol === c.symbol),
    );
    displayTopCoins.push(...fallbacks.slice(0, 4 - displayTopCoins.length));
  }
  const top4Coins = displayTopCoins.slice(0, 4);

  // ── Bottom Market Table Selection ───────────────────────────────────────
  const filteredMarketCoins = MASTER_COINS.filter((coin) => {
    const matchesSearch =
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeTableTab === "View All" ||
      coin.bottomCategories.includes(activeTableTab);

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative w-full bg-gray-55 dark:bg-[#0c0c0e] py-2 transition-colors duration-200 space-y-6 -mt-24 z-10">
      {/* Top Section: Ticker Grid */}
      <div className="w-[75%] mx-auto">
        <div className="bg-white dark:bg-[#141416] rounded-2xl shadow-md border border-gray-100 dark:border-white/[0.05] overflow-hidden">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-white/[0.05]">
            {top4Coins.map((coin) => {
              const live = livePrices[SYMBOL_TO_ID[coin.symbol]];
              const price = live ? live.price : coin.defaultPrice;
              const change = live ? live.change24h : coin.defaultChange;
              const volumeStr = live
                ? live.volume24h
                : `${formatVolume(coin.defaultVolume)} BTC`;

              return (
                <div
                  key={coin.symbol}
                  className="px-6 py-5 flex flex-col gap-2 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <CoinIcon symbol={coin.symbol} name={coin.name} size={32} />
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                        {coin.name}
                      </p>
                      <p className="text-xs text-secondary dark:text-secondary2 font-medium">
                        {coin.symbol}/USDT
                      </p>
                    </div>
                  </div>

                  <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                    USD {formatPrice(price)}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary dark:text-secondary2 font-medium">
                      {volumeStr}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        change >= 0
                          ? "bg-success/10 text-success"
                          : "bg-critical/10 text-critical"
                      }`}
                    >
                      {change >= 0 ? "+" : ""}
                      {change.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: Market Update Table */}
      <div className="w-[75%] mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <h2 className="text-3xl font-bold text-gray-950 dark:text-white tracking-tight">
            Market Update
          </h2>
          <Link
            href="/markets"
            className="text-xs font-bold text-secondary hover:text-primary dark:text-secondary2 dark:hover:text-primary transition-colors flex items-center gap-0.5"
          >
            <span>See All Coins</span>
            <FiChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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

        <div className="bg-white dark:bg-[#141416] border border-gray-100 dark:border-white/[0.05] rounded-2xl shadow-xl shadow-gray-200/20 dark:shadow-black/40 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead className="min-w-[150px]">Name</TableHead>
                <TableHead className="text-right">Last Price</TableHead>
                <TableHead className="text-right">24h %</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
                <TableHead className="text-center w-[140px]">
                  Last 7 Days
                </TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMarketCoins.map((coin) => {
                const live = livePrices[SYMBOL_TO_ID[coin.symbol]];
                const change = live ? live.change24h : coin.defaultChange;
                const isPositive = change >= 0;

                const formattedPrice = live
                  ? "$" +
                    live.price.toLocaleString("en-US", {
                      minimumFractionDigits: live.price < 1 ? 4 : 2,
                      maximumFractionDigits: live.price < 1 ? 5 : 2,
                    })
                  : "$" + formatPrice(coin.defaultPrice);

                return (
                  <TableRow
                    key={coin.symbol}
                    className="transition-colors hover:bg-gray-50/50 dark:hover:bg-white/[0.01]"
                  >
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2 select-none">
                        <button
                          onClick={() => toggleStar(coin.symbol)}
                          className="text-gray-300 dark:text-gray-600 hover:text-yellow-400 transition-colors cursor-pointer"
                        >
                          {stars[coin.symbol] ? (
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

                    <TableCell>
                      <div className="flex items-center gap-3 select-none">
                        <CoinIcon
                          symbol={coin.symbol}
                          name={coin.name}
                          size={28}
                        />
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-gray-900 dark:text-white">
                            {coin.name}
                          </span>
                          <span className="text-[10px] text-secondary dark:text-secondary2 font-bold uppercase">
                            {coin.symbol}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-right font-bold text-xs text-gray-900 dark:text-white">
                      {formattedPrice}
                    </TableCell>

                    <TableCell
                      className={`text-right font-bold text-xs ${
                        isPositive ? "text-success" : "text-critical"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {change.toFixed(2)}%
                    </TableCell>

                    <TableCell className="text-right font-bold text-xs text-gray-900 dark:text-white">
                      {coin.marketCap}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-center">
                        <svg
                          className="w-[120px] h-[36px] overflow-visible"
                          viewBox="0 0 120 40"
                        >
                          <defs>
                            <linearGradient
                              id={`grad-${coin.symbol}`}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={isPositive ? "#58BD7D" : "#D33535"}
                                stopOpacity="0.15"
                              />
                              <stop
                                offset="100%"
                                stopColor={isPositive ? "#58BD7D" : "#D33535"}
                                stopOpacity="0.0"
                              />
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

                    <TableCell className="text-center">
                      <Link href="/exchange">
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-bold rounded-full px-5 py-1 text-[10px] cursor-pointer border border-gray-200 dark:border-white/[0.08] hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                        >
                          Trade
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredMarketCoins.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-gray-400 font-semibold py-8 select-none"
                  >
                    No coins match your filters or search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default MarketTicker;
