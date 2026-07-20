import React, { useState, useEffect } from "react";
import { FiPlus, FiMinus, FiInfo, FiEye, FiChevronDown } from "react-icons/fi";
import { Trade } from "@/scheme/exchange";

interface OrderFormProps {
  orderFormTab: "Limit" | "Market" | "Conditional";
  setOrderFormTab: (t: "Limit" | "Market" | "Conditional") => void;
  leverage: number;
  setLeverage: (l: number) => void;
  marginMode: "Cross" | "Isolated";
  setMarginMode: (m: "Cross" | "Isolated") => void;
  showLeverageModal: boolean;
  setShowLeverageModal: (b: boolean) => void;
  sliderPercentage: number;
  setSliderPercentage: (p: number) => void;
  limitPrice: string;
  setLimitPrice: (p: string) => void;
  quantityUsd: string;
  setQuantityUsd: (q: string) => void;
  triggerPrice: string;
  setTriggerPrice: (p: string) => void;
  triggerType: "Last" | "Index" | "Mark";
  setTriggerType: (t: "Last" | "Index" | "Mark") => void;
  condOrderType: "Market" | "Limit";
  setCondOrderType: (t: "Market" | "Limit") => void;
  buyLongTpSl: boolean;
  setBuyLongTpSl: (b: boolean) => void;
  sellShortTpSl: boolean;
  setSellShortTpSl: (b: boolean) => void;
  postOnly: boolean;
  setPostOnly: (b: boolean) => void;
  reduceOnly: boolean;
  setReduceOnly: (b: boolean) => void;
  closeOnTrigger: boolean;
  setCloseOnTrigger: (b: boolean) => void;
  priceAdjustmentScale: number;
  availableBalance: number;
  currentPrice: number;
  activeSymbol: string;
  recentTrades: Trade[];
  executeOrder: (side: "Buy" | "Sell") => void;
  btcPrice: number;
  isSpot?: boolean;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  orderFormTab,
  setOrderFormTab,
  leverage,
  setLeverage,
  marginMode,
  setMarginMode,
  showLeverageModal,
  setShowLeverageModal,
  sliderPercentage,
  setSliderPercentage,
  limitPrice,
  setLimitPrice,
  quantityUsd,
  setQuantityUsd,
  triggerPrice,
  setTriggerPrice,
  triggerType,
  setTriggerType,
  condOrderType,
  setCondOrderType,
  buyLongTpSl,
  setBuyLongTpSl,
  sellShortTpSl,
  setSellShortTpSl,
  postOnly,
  setPostOnly,
  reduceOnly,
  setReduceOnly,
  closeOnTrigger,
  setCloseOnTrigger,
  priceAdjustmentScale,
  availableBalance,
  currentPrice,
  activeSymbol,
  recentTrades,
  executeOrder,
  btcPrice,
  isSpot = false,
}) => {
  const [activeSide, setActiveSide] = useState<"Buy" | "Sell">("Buy");
  const [iceberg, setIceberg] = useState(false);
  const [amountCoin, setAmountCoin] = useState("");
  const [showPriceTypeDropdown, setShowPriceTypeDropdown] = useState(false);

  // Synchronize Amount (Coin) and Total (USD) inputs
  const priceVal = parseFloat(limitPrice) || currentPrice || 1;

  useEffect(() => {
    if (quantityUsd && priceVal) {
      const amt = (parseFloat(quantityUsd) / priceVal).toFixed(4);
      setAmountCoin(amt);
    } else {
      setAmountCoin("");
    }
  }, [quantityUsd, priceVal]);

  const handleAmountChange = (val: string) => {
    setAmountCoin(val);
    if (val && priceVal) {
      const usd = (parseFloat(val) * priceVal).toFixed(0);
      setQuantityUsd(usd);
    } else {
      setQuantityUsd("");
    }
  };

  const handleTotalChange = (val: string) => {
    setQuantityUsd(val);
    if (val && priceVal) {
      const amt = (parseFloat(val) / priceVal).toFixed(4);
      setAmountCoin(amt);
    } else {
      setAmountCoin("");
    }
  };

  const adjustPrice = (amount: number) => {
    const parsed = parseFloat(limitPrice) || currentPrice;
    const adjusted = parsed + amount;
    setLimitPrice(adjusted.toFixed(currentPrice > 100 ? 2 : 4));
  };

  const adjustTriggerPrice = (amount: number) => {
    const parsed = parseFloat(triggerPrice) || currentPrice;
    const adjusted = parsed + amount;
    setTriggerPrice(adjusted.toFixed(currentPrice > 100 ? 2 : 4));
  };

  const handleSliderClick = (percentage: number) => {
    setSliderPercentage(percentage);
    const balanceUsd = availableBalance * btcPrice * leverage;
    const calculatedQty = balanceUsd * (percentage / 100);
    setQuantityUsd(calculatedQty.toFixed(0));
  };

  // State for TIF (Time In Force)
  const [tif, setTif] = useState<"GTC" | "IOC" | "FOK">("GTC");
  const [showTifDropdown, setShowTifDropdown] = useState(false);

  // ─── Render Spot Page Console ───
  if (isSpot) {
    return (
      <div className="bg-white dark:bg-[#14161c] text-gray-900 dark:text-white rounded-md p-4 flex flex-col justify-between select-none border border-gray-200 dark:border-white/[0.04] h-full">
        <div>
          {/* Flat black title header */}
          <div className="text-xs font-bold uppercase tracking-wider pb-3 border-b border-gray-100 dark:border-white/[0.06] mb-4 text-gray-700 dark:text-gray-300">
            SPOT
          </div>

          {/* BUY/SELL puzzle angled tabs */}
          <div className="flex w-full h-10 mb-4 select-none">
            <button
              onClick={() => setActiveSide("Buy")}
              style={{ clipPath: "polygon(0 0, 92% 0, 100% 100%, 0 100%)" }}
              className={`flex-1 flex items-center justify-center text-xs font-bold tracking-widest transition-all cursor-pointer mr-[-6px] ${
                activeSide === "Buy"
                  ? "bg-[#0ecb81] text-white shadow-lg"
                  : "bg-gray-100 dark:bg-[#1c2030] text-gray-400 dark:text-gray-500 hover:bg-gray-250 dark:hover:bg-[#252a3d]"
              }`}
            >
              BUY
            </button>
            <button
              onClick={() => setActiveSide("Sell")}
              style={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%)" }}
              className={`flex-1 flex items-center justify-center text-xs font-bold tracking-widest transition-all cursor-pointer ${
                activeSide === "Sell"
                  ? "bg-[#f6465d] text-white shadow-lg"
                  : "bg-gray-100 dark:bg-[#1c2030] text-gray-400 dark:text-gray-500 hover:bg-gray-250 dark:hover:bg-[#252a3d]"
              }`}
            >
              SELL
            </button>
          </div>

          {/* Tabs: Limit / Market / Conditional */}
          <div className="flex gap-6 border-b border-gray-100 dark:border-white/[0.04] pb-2 mb-4">
            {(["Limit", "Market", "Conditional"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setOrderFormTab(tab)}
                className={`pb-1.5 text-xs font-bold transition-all relative cursor-pointer ${
                  orderFormTab === tab
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                {tab}
                {orderFormTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3563e9] dark:bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Available Balance Row */}
          <div className="flex justify-between items-center text-xs text-gray-550 dark:text-gray-400 mb-3 px-0.5">
            <div className="flex items-center gap-1.5">
              <span>Available Balance</span>
              <FiEye className="w-3.5 h-3.5 text-gray-405 dark:text-gray-550 hover:text-gray-700 dark:hover:text-white cursor-pointer" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              {activeSide === "Buy"
                ? `${(availableBalance * btcPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })} USDT`
                : `${availableBalance.toFixed(6)} ${activeSymbol}`}
            </span>
          </div>

          {/* Input Fields Stack */}
          <div className="space-y-3.5">
            {orderFormTab === "Conditional" && (
              <>
                {/* Conditional Trigger Price */}
                <div className="relative flex items-center bg-white dark:bg-[#1e2026] rounded-xl border border-gray-200 dark:border-white/[0.08] focus-within:border-[#3563e9] dark:focus-within:border-primary overflow-hidden px-3.5 py-2.5">
                  <input
                    type="text"
                    value={triggerPrice}
                    onChange={(e) => setTriggerPrice(e.target.value)}
                    className="w-full bg-transparent border-0 text-gray-900 dark:text-white text-xs font-semibold focus:outline-hidden"
                    placeholder="Trigger Price"
                  />
                  <span className="text-[10px] text-gray-400 font-bold shrink-0 ml-2">
                    USD
                  </span>
                </div>

                {/* Order Price / Dropdown Split */}
                <div className="flex gap-2">
                  <div className="flex-1 relative flex items-center bg-white dark:bg-[#1e2026] rounded-xl border border-gray-200 dark:border-white/[0.08] focus-within:border-[#3563e9] dark:focus-within:border-primary overflow-hidden px-3.5 py-2.5">
                    {condOrderType === "Market" ? (
                      <span className="w-full bg-transparent text-gray-400 dark:text-gray-500 text-xs font-semibold select-none">
                        Best Market price
                      </span>
                    ) : (
                      <input
                        type="text"
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(e.target.value)}
                        className="w-full bg-transparent border-0 text-gray-900 dark:text-white text-xs font-semibold focus:outline-hidden"
                        placeholder="Order Price"
                      />
                    )}
                    <span className="text-[10px] text-gray-400 font-bold shrink-0 ml-2">
                      USDT
                    </span>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowPriceTypeDropdown(!showPriceTypeDropdown)
                      }
                      className="flex items-center gap-2 bg-white dark:bg-[#1e2026] text-gray-900 dark:text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/[0.08] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-full"
                    >
                      <span>{condOrderType}</span>
                      <FiChevronDown className="w-3 h-3 text-gray-400" />
                    </button>
                    {showPriceTypeDropdown && (
                      <div className="absolute right-0 mt-1.5 w-24 bg-white dark:bg-[#1a1c22] border border-gray-200 dark:border-white/[0.08] rounded-xl shadow-xl z-50 py-1 text-xs">
                        {(["Limit", "Market"] as const).map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setCondOrderType(opt);
                              setShowPriceTypeDropdown(false);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-white/[0.04] text-gray-700 dark:text-gray-200 font-medium"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Amount Input */}
                <div className="relative flex items-center bg-white dark:bg-[#1e2026] rounded-xl border border-gray-200 dark:border-white/[0.08] focus-within:border-[#3563e9] dark:focus-within:border-primary overflow-hidden px-3.5 py-2.5">
                  <input
                    type="text"
                    value={amountCoin}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full bg-transparent border-0 text-gray-900 dark:text-white text-xs font-semibold focus:outline-hidden"
                    placeholder="Quantity"
                  />
                  <span className="text-[10px] text-gray-400 font-bold shrink-0 ml-2 uppercase">
                    {activeSymbol}
                  </span>
                </div>
              </>
            )}

            {orderFormTab === "Limit" && (
              <>
                {/* Order Price */}
                <div className="relative flex items-center bg-white dark:bg-[#1e2026] rounded-xl border border-gray-200 dark:border-white/[0.08] focus-within:border-[#3563e9] dark:focus-within:border-primary overflow-hidden px-3.5 py-2.5">
                  <input
                    type="text"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    className="w-full bg-transparent border-0 text-gray-900 dark:text-white text-xs font-semibold focus:outline-hidden"
                    placeholder="Order Price"
                  />
                  <span className="text-[10px] text-gray-400 font-bold shrink-0 ml-2">
                    USDT
                  </span>
                </div>

                {/* Amount Input */}
                <div className="relative flex items-center bg-white dark:bg-[#1e2026] rounded-xl border border-gray-200 dark:border-white/[0.08] focus-within:border-[#3563e9] dark:focus-within:border-primary overflow-hidden px-3.5 py-2.5">
                  <input
                    type="text"
                    value={amountCoin}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full bg-transparent border-0 text-gray-900 dark:text-white text-xs font-semibold focus:outline-hidden"
                    placeholder="Amount"
                  />
                  <div className="flex items-center shrink-0 ml-2">
                    <span className="text-gray-300 dark:text-white/10 mr-2">
                      |
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">
                      {activeSymbol}
                    </span>
                  </div>
                </div>
              </>
            )}

            {orderFormTab === "Market" && (
              <>
                {/* Order Price (mapped to total USD input) */}
                <div className="relative flex items-center bg-white dark:bg-[#1e2026] rounded-xl border border-gray-200 dark:border-white/[0.08] focus-within:border-[#3563e9] dark:focus-within:border-primary overflow-hidden px-3.5 py-2.5">
                  <input
                    type="text"
                    value={quantityUsd}
                    onChange={(e) => handleTotalChange(e.target.value)}
                    className="w-full bg-transparent border-0 text-gray-900 dark:text-white text-xs font-semibold focus:outline-hidden"
                    placeholder="Order Price"
                  />
                  <span className="text-[10px] text-gray-400 font-bold shrink-0 ml-2">
                    USD
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Custom diamond slider */}
          <div className="py-5 px-1 relative select-none">
            <div className="relative flex items-center w-full h-5">
              <input
                type="range"
                min="0"
                max="100"
                step="25"
                value={sliderPercentage}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setSliderPercentage(val);
                  const balanceUsd = availableBalance * btcPrice * leverage;
                  const calculatedQty = balanceUsd * (val / 100);
                  setQuantityUsd(calculatedQty.toFixed(0));
                }}
                className="w-full h-0.5 rounded-full appearance-none cursor-pointer focus:outline-hidden relative z-20 outline-hidden bg-gray-200 dark:bg-white/20 accent-[#3563e9] dark:accent-primary [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rotate-45 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#3563e9] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rotate-45 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#3563e9] [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-none"
              />

              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none w-full px-0.5">
                {[0, 25, 50, 75, 100].map((p) => {
                  const isCurrent = sliderPercentage === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleSliderClick(p)}
                      className={`pointer-events-auto w-2.5 h-2.5 rotate-45 border transition-all ${
                        isCurrent
                          ? "bg-transparent border-[#3563e9] border-2 scale-125"
                          : sliderPercentage >= p
                            ? "bg-[#3563e9] border-[#3563e9]"
                            : "bg-white dark:bg-[#1e2026] border-gray-300 dark:border-white/[0.08]"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {orderFormTab === "Limit" && (
            <>
              {/* Total Input (placed below the slider for Limit/Market tabs) */}
              <div className="relative flex items-center bg-gray-55 dark:bg-[#1e2026] rounded-xl border border-gray-200 dark:border-white/[0.08] focus-within:border-[#3563e9] dark:focus-within:border-primary overflow-hidden px-3.5 py-2.5 mb-4">
                <input
                  type="text"
                  value={quantityUsd}
                  onChange={(e) => handleTotalChange(e.target.value)}
                  className="w-full bg-transparent border-0 text-gray-905 dark:text-white text-xs font-semibold focus:outline-hidden"
                  placeholder="Total"
                />
                <span className="text-[10px] text-gray-400 font-bold shrink-0 ml-2">
                  USDT
                </span>
              </div>

              {/* Checkboxes Row (Post Only & Iceberg on the left, TIF on the right) */}
              <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase relative mb-4">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 dark:hover:text-white">
                    <input
                      type="checkbox"
                      checked={postOnly}
                      onChange={(e) => setPostOnly(e.target.checked)}
                      className="rounded-sm accent-[#3563e9] dark:accent-primary w-3.5 h-3.5"
                    />
                    <span>Post Only</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 dark:hover:text-white">
                    <input
                      type="checkbox"
                      checked={iceberg}
                      onChange={(e) => setIceberg(e.target.checked)}
                      className="rounded-sm accent-[#3563e9] dark:accent-primary w-3.5 h-3.5"
                    />
                    <span>Iceberg</span>
                  </label>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowTifDropdown(!showTifDropdown)}
                    className="flex items-center gap-1 text-gray-550 dark:text-gray-450 hover:text-gray-700 dark:hover:text-white cursor-pointer"
                  >
                    <span>
                      TIF{" "}
                      <span className="text-gray-900 dark:text-white">
                        {tif}
                      </span>
                    </span>
                    <FiChevronDown className="w-3 h-3 text-gray-400" />
                  </button>
                  {showTifDropdown && (
                    <div className="absolute right-0 bottom-full mb-1.5 w-24 bg-white dark:bg-[#1a1c22] border border-gray-255 dark:border-white/[0.08] rounded-md shadow-xl z-50 py-1 text-xs text-left normal-case">
                      {(["GTC", "IOC", "FOK"] as const).map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setTif(opt);
                            setShowTifDropdown(false);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-white/[0.04] text-gray-700 dark:text-gray-200 font-medium"
                        >
                          {opt === "GTC"
                            ? "GTC (GTC)"
                            : opt === "IOC"
                              ? "IOC (IOC)"
                              : "FOK (FOK)"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Spot Action Button */}
        <div className="mt-2 space-y-3">
          <button
            onClick={() => executeOrder(activeSide)}
            className={`w-full py-2.5 text-white font-bold text-sm rounded-md transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer ${
              activeSide === "Buy" ? "bg-[#0ecb81]" : "bg-[#f6465d]"
            }`}
          >
            {activeSide === "Buy"
              ? `Buy ${activeSymbol}`
              : `Sell ${activeSymbol}`}
          </button>

          <div className="flex justify-end">
            <a
              href="#"
              className="text-[10px] font-bold text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white transition-colors"
            >
              Spot trading Fees &gt;
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ─── Render Exchange Page Original Layout ───
  return (
    <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-4 flex flex-col justify-between select-none h-full">
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowLeverageModal(!showLeverageModal)}
              className="px-2 py-0.5 text-[10px] font-semibold bg-gray-100 dark:bg-[#1f2026] text-gray-700 dark:text-white rounded-md border border-gray-200 dark:border-white/[0.05] flex items-center gap-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-primary">{marginMode}</span>
              <span>{leverage}x</span>
            </button>
          </div>
          <div className="flex bg-gray-100 dark:bg-[#1f2026] p-0.5 rounded-md border border-gray-200 dark:border-white/[0.04]">
            {(["Limit", "Market", "Conditional"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setOrderFormTab(tab)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  orderFormTab === tab
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {showLeverageModal && (
          <div className="bg-gray-55 dark:bg-[#1a1c22] border border-gray-200 dark:border-white/[0.08] p-3 rounded-md mb-3 space-y-3 animate-[fadeIn_0.15s_ease-out]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-medium">Margin Mode</span>
              <div className="flex bg-gray-100 dark:bg-[#141416] p-0.5 rounded-md border border-gray-200 dark:border-white/5">
                <button
                  onClick={() => setMarginMode("Cross")}
                  className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${marginMode === "Cross" ? "bg-primary text-white" : "text-gray-450"}`}
                >
                  Cross
                </button>
                <button
                  onClick={() => setMarginMode("Isolated")}
                  className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${marginMode === "Isolated" ? "bg-primary text-white" : "text-gray-450"}`}
                >
                  Isolated
                </button>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Leverage</span>
                <span className="text-white font-bold">{leverage}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={leverage}
                onChange={(e) => setLeverage(parseInt(e.target.value))}
                className="w-full accent-primary h-1 rounded-md cursor-pointer"
              />
            </div>
          </div>
        )}

        <div className="space-y-3">
          {orderFormTab === "Conditional" && (
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-bold uppercase">
                Trigger Price
              </label>
              <div className="flex items-center bg-white dark:bg-[#1f2026] rounded-xl border border-gray-200 dark:border-white/[0.08] overflow-hidden px-4">
                <input
                  type="text"
                  value={triggerPrice}
                  onChange={(e) => setTriggerPrice(e.target.value)}
                  className="w-full bg-transparent border-0 text-gray-900 dark:text-white text-xs font-semibold focus:outline-hidden py-2"
                  placeholder="0.00"
                />
                <span className="text-[10px] text-gray-400 font-medium uppercase shrink-0 mr-2">
                  USDT
                </span>
                <div className="flex border-l border-gray-200 dark:border-white/[0.08] pl-1 gap-1 shrink-0">
                  <button
                    onClick={() => adjustTriggerPrice(-priceAdjustmentScale)}
                    className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <FiMinus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => adjustTriggerPrice(priceAdjustmentScale)}
                    className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <FiPlus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 bg-gray-100 dark:bg-[#141416] p-0.5 rounded-xl border border-gray-200 dark:border-white/[0.06] mt-1.5">
                {(["Last", "Index", "Mark"] as const).map((src) => (
                  <button
                    key={src}
                    onClick={() => setTriggerType(src)}
                    className={`py-1 text-[9px] font-medium rounded-lg ${
                      triggerType === src
                        ? "bg-primary text-white"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {src}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase">
              Order Price
            </label>
            {orderFormTab === "Market" ? (
              <div className="bg-gray-50 dark:bg-[#1f2026]/40 text-gray-500 text-xs font-medium px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/[0.08] flex justify-between select-none">
                <span>Best Market price</span>
                <span className="text-[10px] text-gray-400">USDT</span>
              </div>
            ) : (
              <div className="flex items-center bg-white dark:bg-[#1f2026] rounded-xl border border-gray-200 dark:border-white/[0.08] overflow-hidden px-4">
                <input
                  type="text"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  className="w-full bg-transparent border-0 text-gray-900 dark:text-white text-xs font-semibold focus:outline-hidden py-2"
                  placeholder="0.00"
                />
                <span className="text-[10px] text-gray-400 font-medium uppercase shrink-0 mr-2">
                  USDT
                </span>
                <div className="flex border-l border-gray-200 dark:border-white/[0.08] pl-1 gap-1 shrink-0">
                  <button
                    onClick={() => adjustPrice(-priceAdjustmentScale)}
                    className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <FiMinus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => adjustPrice(priceAdjustmentScale)}
                    className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <FiPlus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase">
              Amount
            </label>
            <div className="flex items-center bg-white dark:bg-[#1f2026] rounded-xl border border-gray-200 dark:border-white/[0.08] overflow-hidden px-4 py-2">
              <input
                type="text"
                value={amountCoin}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-full bg-transparent border-0 text-gray-900 dark:text-white text-xs font-semibold focus:outline-hidden"
                placeholder="0.0"
              />
              <span className="text-[10px] text-gray-400 font-medium uppercase shrink-0 mr-1.5">
                {activeSymbol}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 font-bold uppercase">
              Total
            </label>
            <div className="flex items-center bg-white dark:bg-[#1f2026] rounded-xl border border-gray-200 dark:border-white/[0.08] overflow-hidden px-4 py-2">
              <input
                type="text"
                value={quantityUsd}
                onChange={(e) => handleTotalChange(e.target.value)}
                className="w-full bg-transparent border-0 text-gray-900 dark:text-white text-xs font-semibold focus:outline-hidden"
                placeholder="0.0"
              />
              <span className="text-[10px] text-gray-400 font-medium uppercase shrink-0 mr-1.5">
                USDT
              </span>
            </div>
          </div>

          <div className="py-3 px-1 select-none relative">
            <div className="relative flex items-center w-full h-5">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPercentage}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setSliderPercentage(val);
                  const balanceUsd = availableBalance * btcPrice * leverage;
                  const calculatedQty = balanceUsd * (val / 100);
                  setQuantityUsd(calculatedQty.toFixed(0));
                }}
                className="w-full h-1 rounded-full appearance-none cursor-pointer focus:outline-hidden relative z-20 outline-hidden accent-primary [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:dark:border-[#141416] [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:dark:border-[#141416] [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-none"
                style={{
                  background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${sliderPercentage}%, var(--slider-track, #e5e7eb) ${sliderPercentage}%, var(--slider-track, #e5e7eb) 100%)`,
                }}
              />

              <div className="absolute left-0.5 right-0.5 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none px-0.5 w-full">
                {[0, 25, 50, 75, 100].map((p) => (
                  <div
                    key={p}
                    className={`w-2.5 h-2.5 rounded-full border transition-all ${
                      sliderPercentage >= p
                        ? "bg-primary border-primary"
                        : "bg-white dark:bg-[#141416] border-gray-300 dark:border-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between text-[9px] text-gray-555 font-bold mt-2.5 select-none px-0.5">
              {[0, 25, 50, 75, 100].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleSliderClick(p)}
                  className={`hover:text-primary transition-colors cursor-pointer ${
                    sliderPercentage === p
                      ? "text-primary font-bold scale-105"
                      : ""
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 py-1 text-xs select-none">
            <label className="flex items-center gap-2 cursor-pointer text-gray-405 hover:text-white">
              <input
                type="checkbox"
                checked={buyLongTpSl}
                onChange={(e) => setBuyLongTpSl(e.target.checked)}
                className="rounded-sm accent-primary w-3.5 h-3.5"
              />
              <span>Buy Long with TP/SL</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-gray-405 hover:text-white">
              <input
                type="checkbox"
                checked={sellShortTpSl}
                onChange={(e) => setSellShortTpSl(e.target.checked)}
                className="rounded-sm accent-primary w-3.5 h-3.5"
              />
              <span>Sell Short with TP/SL</span>
            </label>

            {orderFormTab === "Limit" && (
              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-gray-405 hover:text-white">
                  <input
                    type="checkbox"
                    checked={postOnly}
                    onChange={(e) => setPostOnly(e.target.checked)}
                    className="rounded-sm accent-primary w-3.5 h-3.5"
                  />
                  <span className="text-[10px]">Post Only</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-gray-405 hover:text-white">
                  <input
                    type="checkbox"
                    checked={reduceOnly}
                    onChange={(e) => setReduceOnly(e.target.checked)}
                    className="rounded-sm accent-primary w-3.5 h-3.5"
                  />
                  <span className="text-[10px]">Reduce-Only</span>
                </label>
              </div>
            )}

            {orderFormTab === "Conditional" && (
              <label className="flex items-center gap-2 cursor-pointer text-gray-455 hover:text-white pt-1">
                <input
                  type="checkbox"
                  checked={closeOnTrigger}
                  onChange={(e) => setCloseOnTrigger(e.target.checked)}
                  className="rounded-sm accent-primary w-3.5 h-3.5"
                />
                <span className="text-[10px]">Close On Trigger</span>
              </label>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] text-gray-550 font-medium pt-2 border-t border-white/[0.04] mt-3 select-none">
          <span>Available Balance</span>
          <span className="text-white font-medium">
            {availableBalance.toFixed(8)} BTC
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          onClick={() => executeOrder("Buy")}
          className="py-2.5 bg-[#58bd7d] hover:bg-[#4faf6f] text-white font-semibold text-xs rounded-md shadow-md shadow-[#58bd7d]/10 transition-all hover:scale-102 flex flex-col items-center justify-center cursor-pointer"
        >
          <span>Buy / Long</span>
          <span className="text-[9px] font-medium opacity-90">
            ({activeSymbol})
          </span>
        </button>
        <button
          onClick={() => executeOrder("Sell")}
          className="py-2.5 bg-[#d33535] hover:bg-[#be2f2f] text-white font-semibold text-xs rounded-md shadow-md shadow-[#d33535]/10 transition-all hover:scale-102 flex flex-col items-center justify-center cursor-pointer"
        >
          <span>Sell / Short</span>
          <span className="text-[9px] font-medium opacity-90">
            ({activeSymbol})
          </span>
        </button>
      </div>

      <div className="border-t border-white/[0.04] mt-5 pt-3 flex-1 flex flex-col justify-end">
        <div className="flex justify-between items-center text-[10px] text-gray-500 font-semibold uppercase mb-2 select-none">
          <span>Recent Trades</span>
          <span>Live Feed</span>
        </div>

        <div className="space-y-[3px] overflow-hidden max-h-[105px]">
          <div className="grid grid-cols-3 text-[9px] text-gray-500 font-medium select-none mb-1">
            <span>Price(USDT)</span>
            <span className="text-right">Qty({activeSymbol})</span>
            <span className="text-right">Time</span>
          </div>
          {recentTrades.slice(0, 5).map((t, idx) => (
            <div
              key={t.id}
              className={`grid grid-cols-3 text-xs py-0.5 select-none font-medium hover:bg-white/[0.02] transition-colors rounded-sm px-0.5 ${
                idx === 0 ? "animate-[pulse_0.4s_ease-in-out]" : ""
              }`}
            >
              <span
                className={
                  t.isBuy ? "text-[#58bd7d]" : "text-[#d33535] font-medium"
                }
              >
                {t.price.toLocaleString(undefined, {
                  minimumFractionDigits: currentPrice > 100 ? 2 : 4,
                })}
              </span>
              <span className="text-right text-gray-300 font-medium">
                {t.qty.toFixed(4)}
              </span>
              <span className="text-right text-gray-500 font-medium">
                {t.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
