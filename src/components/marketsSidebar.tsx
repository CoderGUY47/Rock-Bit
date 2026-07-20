import React from "react";
import Link from "next/link";
import { FiSearch, FiStar, FiCpu } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { CryptoItem } from "@/utils/items";
import { SYMBOL_TO_ID_MAP } from "@/scheme/exchange";

interface MarketsSidebarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  marketListTab: string;
  setMarketListTab: (t: string) => void;
  filteredPairs: CryptoItem[];
  livePrices: Record<
    string,
    { price: number; change24h: number; volume24h: string }
  >;
  favorites: string[];
  toggleFavorite: (symbol: string, e: React.MouseEvent) => void;
  handlePairSelect: (symbol: string) => void;
  activeSymbol: string;
  equity: number;
  availableBalance: number;
  triggerNotification: (
    msg: string,
    type?: "success" | "error" | "info",
  ) => void;
}

export const MarketsSidebar: React.FC<MarketsSidebarProps> = ({
  searchQuery,
  setSearchQuery,
  marketListTab,
  setMarketListTab,
  filteredPairs,
  livePrices,
  favorites,
  toggleFavorite,
  handlePairSelect,
  activeSymbol,
  equity,
  availableBalance,
  triggerNotification,
}) => {
  return (
    <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-4 flex flex-col justify-between select-none h-full">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Search bar */}
        <div className="relative mb-3.5">
          <FiSearch className="absolute left-3.5 top-3 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search pair..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-[#1f2026] text-gray-900 dark:text-white pl-10 pr-4 py-2.5 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.04] focus:outline-hidden focus:border-primary transition-all placeholder-gray-400"
          />
        </div>

        {/* Markets Filtering tabs */}
        <div className="flex flex-wrap border-b border-gray-200 dark:border-white/[0.04] pb-1.5 mb-2.5 gap-x-3.5 gap-y-1.5 text-[10px] font-medium uppercase">
          {["★ FAVORITE", "USDT", "BUSD", "BNB", "BTC"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMarketListTab(tab)}
              className={`pb-1 cursor-pointer transition-colors ${
                marketListTab === tab
                  ? "text-primary border-b border-primary font-semibold"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Coins List */}
        <div className="overflow-y-auto flex-1 space-y-[1px] pr-1 min-h-[180px] max-h-[380px]">
          <div className="grid grid-cols-4 text-[9px] text-gray-400 font-semibold uppercase pb-1 border-b border-gray-200 dark:border-white/[0.02] mb-1.5">
            <span className="col-span-2">Pair</span>
            <span className="text-right">Price</span>
            <span className="text-right">24h%</span>
          </div>

          {filteredPairs.length > 0 ? (
            filteredPairs.map((coin) => {
              const coinSymbolObj = Object.entries(SYMBOL_TO_ID_MAP).find(
                ([sym, id]) => id === coin.id,
              );
              const symbol = coinSymbolObj
                ? coinSymbolObj[0]
                : coin.id.substring(0, 4).toUpperCase();
              const activeP = livePrices[coin.id]?.price || coin.price;

              const change = livePrices[coin.id]?.change24h ?? coin.change24h;
              const isFaved = favorites.includes(symbol);

              return (
                <div
                  key={coin.id}
                  onClick={() => handlePairSelect(symbol)}
                  className={`grid grid-cols-4 items-center text-xs py-2 px-1.5 rounded-md cursor-pointer transition-all ${
                    activeSymbol === symbol
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-gray-50 dark:hover:bg-white/[0.02] border border-transparent"
                  }`}
                >
                  {/* Fav Star & Symbol */}
                  <div className="col-span-2 flex items-center gap-2">
                    <button
                      onClick={(e) => toggleFavorite(symbol, e)}
                      className="transition-colors cursor-pointer p-0.5"
                    >
                      {isFaved ? (
                        <FaStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                      ) : (
                        <FaRegStar className="w-3.5 h-3.5 text-gray-400 hover:text-amber-400" />
                      )}
                    </button>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white tracking-tight">
                        {symbol}/USDT
                      </span>
                      <span className="block text-[8px] text-gray-400 uppercase tracking-wide font-medium">
                        {coin.title}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <span className="text-right font-medium text-gray-700 dark:text-gray-200">
                    {activeP.toLocaleString(undefined, {
                      maximumFractionDigits: activeP > 100 ? 2 : 4,
                    })}
                  </span>

                  {/* 24h Change */}
                  <span
                    className={`text-right font-semibold text-[10px] ${change >= 0 ? "text-[#58bd7d]" : "text-[#d33535]"}`}
                  >
                    {change >= 0 ? "+" : ""}
                    {change.toFixed(2)}%
                  </span>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-gray-500 text-xs font-semibold">
              No matching pairs found
            </div>
          )}
        </div>
      </div>

      {/* AI Trading Signals Panel */}
      <div className="border-t border-gray-200 dark:border-white/[0.04] mt-4 pt-3.5 flex-1 flex flex-col justify-center min-h-[160px]">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary dark:text-[#a5b4fc] uppercase tracking-wider mb-2.5">
          <FiCpu className="w-3.5 h-3.5 animate-pulse text-indigo-500" />
          <span>AI Trading Signals</span>
          <span className="ml-auto text-[8px] bg-indigo-500/10 text-indigo-500 px-1.5 py-0.5 rounded-full lowercase font-medium">
            live
          </span>
        </div>

        {/* Sentiment Gauge */}
        <div className="bg-gray-50 dark:bg-white/[0.01] p-3 rounded-md border border-gray-200 dark:border-white/[0.02] mb-3">
          <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase mb-1.5">
            <span>Market Sentiment</span>
            <span className="text-emerald-500 font-bold">
              78% Greed (Bullish)
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: "78%" }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs bg-gray-50 dark:bg-white/[0.01] p-2 rounded-md border border-gray-200 dark:border-white/[0.02]">
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 dark:text-white">
                BTC/USDT
              </span>
              <span className="text-[9px] text-gray-400 font-medium">
                Momentum breakout
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-sm">
              Strong Buy
            </span>
          </div>
          <div className="flex items-center justify-between text-xs bg-gray-50 dark:bg-white/[0.01] p-2 rounded-md border border-gray-200 dark:border-white/[0.02]">
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 dark:text-white">
                ETH/USDT
              </span>
              <span className="text-[9px] text-gray-400 font-medium">
                EMA support holding
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-sm">
              Buy
            </span>
          </div>
          <div className="flex items-center justify-between text-xs bg-gray-50 dark:bg-white/[0.01] p-2 rounded-md border border-gray-200 dark:border-white/[0.02]">
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 dark:text-white">
                SOL/USDT
              </span>
              <span className="text-[9px] text-gray-400 font-medium">
                RSI Overbought zone
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-sm">
              Hold
            </span>
          </div>
          <div className="flex items-center justify-between text-xs bg-gray-50 dark:bg-white/[0.01] p-2 rounded-md border border-gray-200 dark:border-white/[0.02]">
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 dark:text-white">
                BNB/USDT
              </span>
              <span className="text-[9px] text-gray-400 font-medium">
                Support holding at $580
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-sm">
              Buy
            </span>
          </div>
          <div className="flex items-center justify-between text-xs bg-gray-50 dark:bg-white/[0.01] p-2 rounded-md border border-gray-200 dark:border-white/[0.02]">
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 dark:text-white">
                ADA/USDT
              </span>
              <span className="text-[9px] text-gray-400 font-medium">
                Overextended rally
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded-sm">
              Sell
            </span>
          </div>
        </div>
      </div>

      {/* Quick Assets overview container */}
      <div className="border-t border-gray-200 dark:border-white/[0.04] mt-4 pt-3.5">
        <div className="flex justify-between items-center text-[10px] text-gray-500 font-semibold uppercase mb-2">
          <span>Account Assets</span>
          <Link
            href="/checkout"
            className="text-primary hover:underline text-[9px] font-semibold"
          >
            Transfer Assets
          </Link>
        </div>

        <div className="bg-gray-55 dark:bg-[#1f2026]/50 rounded-md p-3 border border-gray-200 dark:border-white/[0.03] space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400 font-medium">Equity Valuation</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {equity.toFixed(8)} BTC
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400 font-medium">Available Balance</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {availableBalance.toFixed(8)} BTC
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 mt-3">
          <Link
            href="/checkout"
            className="py-2 bg-primary hover:bg-[#6366f1] text-white text-center font-semibold text-[10px] rounded-md transition-colors cursor-pointer"
          >
            Deposit
          </Link>
          <button
            onClick={() =>
              triggerNotification("Exchange window opened.", "info")
            }
            className="py-2 bg-gray-100 dark:bg-[#1f2026] hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-center font-semibold text-[10px] rounded-md transition-colors cursor-pointer border border-gray-200 dark:border-white/[0.04]"
          >
            Exchange
          </button>
          <Link
            href="/checkout"
            className="py-2 bg-gray-100 dark:bg-[#1f2026] hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-center font-semibold text-[10px] rounded-md transition-colors cursor-pointer border border-gray-200 dark:border-white/[0.04]"
          >
            Buy Crypto
          </Link>
        </div>
      </div>
    </div>
  );
};
