import React from "react";
import { FiInfo } from "react-icons/fi";
import { OrderBookLevel } from "@/scheme/exchange";

interface OrderBookProps {
  orderBookTab: "general" | "cumulative" | "details";
  setOrderBookTab: (t: "general" | "cumulative" | "details") => void;
  orderBookData: { asks: OrderBookLevel[]; bids: OrderBookLevel[] };
  activeSymbol: string;
  currentPrice: number;
  activeChange24h: number;
  setLimitPrice: (p: string) => void;
  isSpot?: boolean;
  showDisclaimer?: boolean;
}

export const OrderBook: React.FC<OrderBookProps> = ({
  orderBookTab,
  setOrderBookTab,
  orderBookData,
  activeSymbol,
  currentPrice,
  activeChange24h,
  setLimitPrice,
  isSpot = false,
  showDisclaimer = false,
}) => {
  // ─── Render Spot Page 3-Column Layout ───
  if (isSpot) {
    return (
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-4 flex flex-col justify-between select-none animate-[fadeIn_0.2s_ease-out] h-full">
        {/* 3-Column Header Title */}
        <div className="grid grid-cols-3 border-b border-gray-100 dark:border-white/[0.04] pb-2 mb-3 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b-2 border-primary pb-2 -mb-2.5">
            General Quote
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-455 dark:text-gray-400 text-center">
            Cumulative Quote
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-455 dark:text-gray-400 text-right">
            Quote Order
          </span>
        </div>

        {/* 3-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-1.5 flex-1">
          {/* COLUMN 1: GENERAL QUOTE */}
          <div className="flex flex-col">
            <div className="grid grid-cols-2 text-[9px] text-gray-400 font-bold uppercase mb-1.5 px-0.5">
              <span>Price(USDT)</span>
              <span className="text-right">Qty({activeSymbol})</span>
            </div>

            {/* Ask levels */}
            <div className="space-y-[3px]">
              {orderBookData.asks.slice(-10).map((lvl, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 text-xs relative py-[2px] hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer rounded-sm px-0.5"
                  onClick={() =>
                    setLimitPrice(lvl.price.toFixed(currentPrice > 100 ? 2 : 4))
                  }
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-[#d33535]/[0.07] transition-all duration-300 rounded-sm"
                    style={{ width: `${lvl.percentage}%` }}
                  />
                  <span className="font-semibold text-[#d33535] relative z-10">
                    {lvl.price.toLocaleString(undefined, {
                      minimumFractionDigits: currentPrice > 100 ? 2 : 4,
                    })}
                  </span>
                  <span className="text-right text-gray-600 dark:text-gray-300 relative z-10 font-medium">
                    {lvl.qty.toFixed(4)}
                  </span>
                </div>
              ))}
            </div>

            {/* Mid Spread */}
            <div className="border-y border-gray-100 dark:border-white/[0.03] bg-gray-50 dark:bg-[#1a1c22]/20 py-2.5 my-2.5 px-1.5 flex justify-between items-center shrink-0">
              <span
                className={`text-sm font-semibold ${activeChange24h >= 0 ? "text-[#58bd7d]" : "text-[#d33535]"}`}
              >
                {currentPrice.toLocaleString(undefined, {
                  minimumFractionDigits: currentPrice > 100 ? 2 : 4,
                })}
              </span>
              <span className="text-[9px] text-[#58bd7d] bg-[#58bd7d]/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                +93.03% Bidder
              </span>
            </div>

            {/* Bid levels */}
            <div className="space-y-[3px]">
              {orderBookData.bids.slice(0, 10).map((lvl, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 text-xs relative py-[2px] hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer rounded-sm px-0.5"
                  onClick={() =>
                    setLimitPrice(lvl.price.toFixed(currentPrice > 100 ? 2 : 4))
                  }
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-[#58bd7d]/[0.07] transition-all duration-300 rounded-sm"
                    style={{ width: `${lvl.percentage}%` }}
                  />
                  <span className="font-semibold text-[#58bd7d] relative z-10">
                    {lvl.price.toLocaleString(undefined, {
                      minimumFractionDigits: currentPrice > 100 ? 2 : 4,
                    })}
                  </span>
                  <span className="text-right text-gray-600 dark:text-gray-300 relative z-10 font-medium">
                    {lvl.qty.toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: CUMULATIVE QUOTE */}
          <div className="flex flex-col border-x border-gray-100 dark:border-white/[0.03] px-3">
            <div className="grid grid-cols-2 text-[9px] text-gray-400 font-bold uppercase mb-1.5 px-0.5">
              <span>Price(USDT)</span>
              <span className="text-right">Change%</span>
            </div>

            {/* Ask levels */}
            <div className="space-y-[3px]">
              {orderBookData.asks.slice(-10).map((lvl, i) => {
                const diffPercent =
                  ((lvl.price - currentPrice) / currentPrice) * 100;
                return (
                  <div
                    key={i}
                    className="grid grid-cols-2 text-xs relative py-[2px] hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer rounded-sm px-0.5"
                    onClick={() =>
                      setLimitPrice(
                        lvl.price.toFixed(currentPrice > 100 ? 2 : 4),
                      )
                    }
                  >
                    <span className="font-semibold text-gray-700 dark:text-gray-255">
                      {lvl.price.toLocaleString(undefined, {
                        minimumFractionDigits: currentPrice > 100 ? 2 : 4,
                      })}
                    </span>
                    <span className="text-right text-[#58bd7d] font-bold">
                      +{diffPercent.toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Spacer to match Mid Spread */}
            <div className="py-2.5 my-2.5 px-1.5 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase shrink-0">
              <span>Contract Amount</span>
              <span>Quantity (BTC)</span>
            </div>

            {/* Bid levels */}
            <div className="space-y-[3px]">
              {orderBookData.bids.slice(0, 10).map((lvl, i) => {
                const diffPercent =
                  ((lvl.price - currentPrice) / currentPrice) * 100;
                return (
                  <div
                    key={i}
                    className="grid grid-cols-2 text-xs relative py-[2px] hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer rounded-sm px-0.5"
                    onClick={() =>
                      setLimitPrice(
                        lvl.price.toFixed(currentPrice > 100 ? 2 : 4),
                      )
                    }
                  >
                    <span className="font-semibold text-gray-700 dark:text-gray-255">
                      {lvl.price.toLocaleString(undefined, {
                        minimumFractionDigits: currentPrice > 100 ? 2 : 4,
                      })}
                    </span>
                    <span className="text-right text-[#d33535] font-bold">
                      {diffPercent.toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUMN 3: QUOTE ORDER (DETAILS) */}
          <div className="flex flex-col justify-between py-1 text-xs">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-gray-450 dark:text-gray-400 font-medium">
                  Trading Volume
                </span>
                <span className="text-right font-bold text-gray-900 dark:text-white">
                  7,841 BTC
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-450 dark:text-gray-400 font-medium leading-tight">
                  Transaction Amount
                  <br />
                  <span className="text-[10px] text-gray-400 font-semibold">
                    (Last 24 hours)
                  </span>
                </span>
                <span className="text-right font-bold text-gray-900 dark:text-white">
                  564,464
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-450 dark:text-gray-400 font-medium">
                  52 weeks High
                </span>
                <div className="text-right">
                  <span className="font-bold text-[#58bd7d] block">
                    82.7 million
                  </span>
                  <span className="text-[10px] text-gray-450 font-bold tracking-tight">
                    ( 2021.11.09 )
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-450 dark:text-gray-400 font-medium">
                  52 weeks Low
                </span>
                <div className="text-right">
                  <span className="font-bold text-[#d33535] block">
                    18,500,000
                  </span>
                  <span className="text-[10px] text-gray-450 font-bold tracking-tight">
                    ( 2020.11.27 )
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-start border-t border-gray-100 dark:border-white/[0.04] pt-3">
                <span className="text-gray-450 dark:text-gray-400 font-medium">
                  Previous Close
                </span>
                <span className="text-right font-bold text-gray-700 dark:text-gray-300">
                  {(currentPrice * 0.992).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-gray-450 dark:text-gray-400 font-medium">
                  Same-Day Price
                </span>
                <span className="text-right font-bold text-[#58bd7d]">
                  {currentPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {showDisclaimer && (
              <div className="bg-gray-50 dark:bg-[#1a1c22]/40 p-2.5 rounded-md border border-gray-200 dark:border-white/[0.04] mt-4 flex items-start gap-2">
                <FiInfo className="text-primary mt-0.5 shrink-0" />
                <p className="text-[9px] text-gray-455 leading-normal font-medium">
                  Derivative quote values are computed live based on global
                  indexing and spot settlements.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── Render Exchange Page Original Tabbed Layout ───
  return (
    <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-4 flex flex-col justify-between select-none animate-[fadeIn_0.2s_ease-out] h-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-white/[0.04] pb-2 mb-3 shrink-0">
        {(["general", "cumulative", "details"] as const).map((tab) => {
          const labels = {
            general: "General Quote",
            cumulative: "Cumulative Quote",
            details: "Quote Order",
          };
          return (
            <button
              key={tab}
              onClick={() => setOrderBookTab(tab)}
              className={`pb-2 text-xs font-semibold uppercase tracking-wider relative cursor-pointer mr-6 ${
                orderBookTab === tab
                  ? "text-gray-900 dark:text-white font-semibold"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              {labels[tab]}
              {orderBookTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {orderBookTab !== "details" ? (
        <div className="flex-1 flex flex-col justify-center my-auto">
          {/* Headers */}
          <div className="grid grid-cols-3 text-[10px] text-gray-400 font-semibold uppercase mb-2">
            <span>Price(USDT)</span>
            <span className="text-right">Quantity({activeSymbol})</span>
            <span className="text-right">
              {orderBookTab === "general"
                ? "Amount(USDT)"
                : `Total(${activeSymbol})`}
            </span>
          </div>

          {/* Asks */}
          <div className="space-y-[2px] flex flex-col justify-end">
            {orderBookData.asks.slice(-12).map((lvl, i) => (
              <div
                key={i}
                className="grid grid-cols-3 text-xs relative py-[2px] hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer rounded-sm"
                onClick={() =>
                  setLimitPrice(lvl.price.toFixed(currentPrice > 100 ? 2 : 4))
                }
              >
                <div
                  className="absolute right-0 top-0 bottom-0 bg-[#d33535]/[0.07] transition-all duration-300 rounded-sm"
                  style={{ width: `${lvl.percentage}%` }}
                />
                <span className="font-semibold text-[#d33535] relative z-10">
                  {lvl.price.toLocaleString(undefined, {
                    minimumFractionDigits: currentPrice > 100 ? 2 : 4,
                  })}
                </span>
                <span className="text-right text-gray-600 dark:text-gray-300 relative z-10 font-medium">
                  {lvl.qty.toFixed(4)}
                </span>
                <span className="text-right text-gray-500 dark:text-gray-400 relative z-10 font-medium">
                  {orderBookTab === "general"
                    ? (lvl.price * lvl.qty).toFixed(2)
                    : lvl.total.toFixed(3)}
                </span>
              </div>
            ))}
          </div>

          {/* Spread */}
          <div className="border-y border-gray-200 dark:border-white/[0.04] bg-gray-50 dark:bg-[#1a1c22]/30 py-2 my-2 px-1 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold ${activeChange24h >= 0 ? "text-[#58bd7d]" : "text-[#d33535]"}`}
              >
                {currentPrice.toLocaleString(undefined, {
                  minimumFractionDigits: currentPrice > 100 ? 2 : 4,
                })}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                Spread{" "}
                {(currentPrice * 0.0004).toFixed(currentPrice > 100 ? 2 : 4)}
              </span>
            </div>
            <span className="text-[9px] text-[#58bd7d] bg-[#58bd7d]/10 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
              +93.03% Bidder
            </span>
          </div>

          {/* Bids */}
          <div className="space-y-[2px]">
            {orderBookData.bids.slice(0, 12).map((lvl, i) => (
              <div
                key={i}
                className="grid grid-cols-3 text-xs relative py-[2px] hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer rounded-sm"
                onClick={() =>
                  setLimitPrice(lvl.price.toFixed(currentPrice > 100 ? 2 : 4))
                }
              >
                <div
                  className="absolute right-0 top-0 bottom-0 bg-[#58bd7d]/[0.07] transition-all duration-300 rounded-sm"
                  style={{ width: `${lvl.percentage}%` }}
                />
                <span className="font-semibold text-[#58bd7d] relative z-10">
                  {lvl.price.toLocaleString(undefined, {
                    minimumFractionDigits: currentPrice > 100 ? 2 : 4,
                  })}
                </span>
                <span className="text-right text-gray-600 dark:text-gray-300 relative z-10 font-medium">
                  {lvl.qty.toFixed(4)}
                </span>
                <span className="text-right text-gray-500 dark:text-gray-400 relative z-10 font-medium">
                  {orderBookTab === "general"
                    ? (lvl.price * lvl.qty).toFixed(2)
                    : lvl.total.toFixed(3)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-4 py-2">
          <div className="grid grid-cols-2 gap-y-3.5 text-xs">
            {[
              { label: "Trading Volume", val: "7,841 BTC" },
              { label: "Transaction Amount (24h)", val: "$584,484,120" },
            ].map(({ label, val }) => (
              <React.Fragment key={label}>
                <div className="text-gray-400 font-medium">{label}</div>
                <div className="text-right font-semibold text-gray-900 dark:text-white">
                  {val}
                </div>
              </React.Fragment>
            ))}
            <div className="text-gray-400 font-medium">52 Weeks High</div>
            <div className="text-right font-semibold text-[#58bd7d]">
              {(currentPrice * 1.35).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              <span className="text-[10px] text-gray-400 font-medium">
                (2021.11.09)
              </span>
            </div>
            <div className="text-gray-400 font-medium">52 Weeks Low</div>
            <div className="text-right font-semibold text-[#d33535]">
              {(currentPrice * 0.45).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              <span className="text-[10px] text-gray-400 font-medium">
                (2020.11.27)
              </span>
            </div>
            <div className="text-gray-400 font-medium">
              Prev Day&apos;s Close
            </div>
            <div className="text-right font-semibold text-gray-700 dark:text-gray-300">
              {(currentPrice * 0.992).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
            <div className="text-gray-400 font-medium">Same-Day Price</div>
            <div className="text-right font-semibold text-gray-700 dark:text-gray-300">
              {(currentPrice * 1.008).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-[#1f2026] p-3 rounded-md border border-gray-200 dark:border-white/[0.04] mt-4 flex items-start gap-2.5">
            <FiInfo className="text-primary mt-0.5 shrink-0" />
            <p className="text-[10px] text-gray-500 leading-normal">
              Derivative quote properties are updated live based on global order
              index valuations and contract settlements.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
