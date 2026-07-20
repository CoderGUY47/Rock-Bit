import React from "react";
import { Candle } from "@/scheme/exchange";

/**
 * TradingChart Component
 * High-performance SVG candlestick & volume renderer with dynamic scale calculations.
 */
interface TradingChartProps {
  candles: Candle[];
  selectedTimeframe: string;
  currentPrice: number;
  hoveredCandle: Candle | null;
  setHoveredCandle: (c: Candle | null) => void;
  chartMousePos: { x: number; y: number } | null;
  setChartMousePos: (p: { x: number; y: number } | null) => void;
  chartSvgRef: React.RefObject<SVGSVGElement | null>;
}

export const TradingChart: React.FC<TradingChartProps> = ({
  candles,
  selectedTimeframe,
  currentPrice,
  hoveredCandle,
  setHoveredCandle,
  chartMousePos,
  setChartMousePos,
  chartSvgRef,
}) => {
  // Chart layout parameters
  const width = 800;
  const height = 410; // SVG canvas height (excluding bottom legends)
  const paddingLeft = 10;
  const paddingRight = 85;
  const paddingTop = 15;
  const chartW = width - paddingLeft - paddingRight;

  // Split height values for Candlestick and Volume sub-sections inside the SVG
  const mainH = 300; // height for candlestick panel
  const volumeH = 80; // height for volume panel
  const volumeBottom = paddingTop + mainH + volumeH; // bottom Y of volume (395)

  // Calculate price boundaries from candle data
  const priceLimits = React.useMemo(() => {
    if (candles.length === 0) return { yMax: 100, yMin: 0 };
    const prices = candles.flatMap((c) => [c.open, c.close, c.high, c.low]);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const priceRange = maxPrice - minPrice || 10;

    // Apply a 5% margin at the top and bottom
    const yMax = maxPrice + priceRange * 0.05;
    const yMin = minPrice - priceRange * 0.05;
    return { yMax, yMin };
  }, [candles]);

  const { yMax, yMin } = priceLimits;

  // Price Y scale mapping
  const scalePrice = React.useCallback(
    (p: number) => {
      const ratio = (p - yMin) / (yMax - yMin);
      return paddingTop + mainH * (1 - ratio);
    },
    [yMin, yMax, paddingTop, mainH],
  );

  // Volume Y scale mapping
  const maxVol = React.useMemo(() => {
    if (candles.length === 0) return 0;
    return Math.max(...candles.map((c) => c.volume));
  }, [candles]);

  const scaleVolume = React.useCallback(
    (v: number) => {
      const ratio = maxVol > 0 ? v / maxVol : 0;
      const volBarH = ratio * volumeH;
      return volumeBottom - volBarH;
    },
    [maxVol, volumeH, volumeBottom],
  );

  // Calculate Moving Averages (MA 7 & MA 25)
  const calculateMA = (period: number) => {
    return candles.map((_, idx) => {
      if (idx < period - 1) return null;
      const slice = candles.slice(idx - period + 1, idx + 1);
      const sum = slice.reduce((acc, curr) => acc + curr.close, 0);
      return sum / period;
    });
  };

  const ma7 = React.useMemo(() => calculateMA(7), [candles]);
  const ma25 = React.useMemo(() => calculateMA(25), [candles]);

  // SVG parameters for candles
  const numCandles = candles.length;
  const cW = numCandles > 0 ? chartW / numCandles : 0;
  const gap = cW * 0.18;
  const itemW = cW - gap;

  // Path generators for Moving Averages
  const ma7Path = React.useMemo(() => {
    let path = "";
    ma7.forEach((val, idx) => {
      if (val === null) return;
      const x = paddingLeft + idx * cW + itemW / 2;
      const y = scalePrice(val);
      if (path === "") {
        path = `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    return path;
  }, [ma7, cW, itemW, paddingLeft, scalePrice]);

  const ma25Path = React.useMemo(() => {
    let path = "";
    ma25.forEach((val, idx) => {
      if (val === null) return;
      const x = paddingLeft + idx * cW + itemW / 2;
      const y = scalePrice(val);
      if (path === "") {
        path = `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    return path;
  }, [ma25, cW, itemW, paddingLeft, scalePrice]);

  const handleChartMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (numCandles === 0 || !chartSvgRef.current) return;
    const rect = chartSvgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let idx = Math.floor((mouseX - paddingLeft) / cW);
    if (idx < 0) idx = 0;
    if (idx >= numCandles) idx = numCandles - 1;

    setHoveredCandle(candles[idx]);
    setChartMousePos({ x: mouseX, y: mouseY });
  };

  const handleChartMouseLeave = () => {
    setHoveredCandle(null);
    setChartMousePos(null);
  };

  const yCoordToPrice = (y: number) => {
    const pct = 1 - (y - paddingTop) / mainH;
    return yMin + pct * (yMax - yMin);
  };

  const currentMa7Val = ma7[ma7.length - 1];
  const currentMa25Val = ma25[ma25.length - 1];

  // Active stats candle (hovered, or fallback to latest)
  const activeStatsCandle =
    hoveredCandle || (candles.length > 0 ? candles[candles.length - 1] : null);

  return (
    <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-4 flex flex-col relative select-none animate-[fadeIn_0.2s_ease-out] h-[550px] justify-between">
      {/* Chart Top Header (Timeframes, Live Indicator, and Stats Legend aligned together) */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-200 dark:border-white/[0.04] pb-3 mb-2 shrink-0 gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 flex-1 min-w-0">
          <span className="text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wide shrink-0">
            CHART ({selectedTimeframe})
          </span>

          {/* Aligned Candle Details & MA indicators with high contrast theme colors */}
          {activeStatsCandle && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] text-gray-500 dark:text-gray-400 font-bold select-none">
              <span className="text-gray-400 dark:text-gray-500">{activeStatsCandle.time}</span>
              <span>O<span className="text-gray-300 dark:text-gray-600">:</span> <span className={activeStatsCandle.close >= activeStatsCandle.open ? 'text-[#58bd7d]' : 'text-[#d33535]'}>{activeStatsCandle.open.toFixed(2)}</span></span>
              <span>H<span className="text-gray-300 dark:text-gray-600">:</span> <span className="text-gray-900 dark:text-white">{activeStatsCandle.high.toFixed(2)}</span></span>
              <span>L<span className="text-gray-300 dark:text-gray-600">:</span> <span className="text-gray-900 dark:text-white">{activeStatsCandle.low.toFixed(2)}</span></span>
              <span>C<span className="text-gray-300 dark:text-gray-600">:</span> <span className={activeStatsCandle.close >= activeStatsCandle.open ? 'text-[#58bd7d]' : 'text-[#d33535]'}>{activeStatsCandle.close.toFixed(2)}</span></span>
              <span className="text-gray-300 dark:text-gray-700 font-normal">|</span>
              <span className="text-gray-500">MA(7,25)</span>
              <span className="text-[#e2c146]">MA7:{currentMa7Val ? currentMa7Val.toFixed(2) : '---'}</span>
              <span className="text-[#d15a9b]">MA25:{currentMa25Val ? currentMa25Val.toFixed(2) : '---'}</span>
            </div>
          )}
        </div>

        <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1.5 uppercase shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#58bd7d] animate-pulse"></span>
          Live Feed
        </div>
      </div>

      {/* Main Chart Area with SVG and Absolute HTML Overlays */}
      <div className="relative w-full h-[400px] flex-1 min-h-0">
        {/* Stretched SVG drawing area */}
        {numCandles > 0 && (
          <svg
            ref={chartSvgRef}
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            onMouseMove={handleChartMouseMove}
            onMouseLeave={handleChartMouseLeave}
            className="cursor-crosshair overflow-visible animate-[fadeIn_0.3s_ease-out] absolute inset-0 w-full h-full"
          >
            {/* 1. Candlestick Horizontal Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((p, idx) => {
              const y = paddingTop + p * mainH;
              return (
                <line
                  key={`main-grid-${idx}`}
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.035)"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* 2. Volume Section Horizontal Grid Lines & Separation */}
            <line
              x1={paddingLeft}
              y1={volumeBottom}
              x2={width - paddingRight}
              y2={volumeBottom}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth={1}
            />
            <line
              x1={paddingLeft}
              y1={volumeBottom - volumeH}
              x2={width - paddingRight}
              y2={volumeBottom - volumeH}
              stroke="rgba(255, 255, 255, 0.035)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />

            {/* 3. Vertical Grid Lines (crossing both panels) */}
            {candles.map((_, idx) => {
              if (idx % 6 !== 0) return null;
              const x = paddingLeft + idx * cW + itemW / 2;
              return (
                <line
                  key={`v-grid-${idx}`}
                  x1={x}
                  y1={paddingTop}
                  x2={x}
                  y2={volumeBottom}
                  stroke="rgba(255, 255, 255, 0.025)"
                  strokeWidth={1}
                />
              );
            })}

            {/* 4. Candlesticks */}
            {candles.map((candle, idx) => {
              const x = paddingLeft + idx * cW;
              const center = x + itemW / 2;

              const yOpen = scalePrice(candle.open);
              const yClose = scalePrice(candle.close);
              const yHigh = scalePrice(candle.high);
              const yLow = scalePrice(candle.low);

              const isGreen = candle.close >= candle.open;
              const candleColor = isGreen ? "#58bd7d" : "#d33535";

              return (
                <g key={`candle-${idx}`}>
                  {/* Wick line */}
                  <line
                    x1={center}
                    y1={yHigh}
                    x2={center}
                    y2={yLow}
                    stroke={candleColor}
                    strokeWidth={1.2}
                  />
                  {/* Candle Body rect */}
                  <rect
                    x={x}
                    y={Math.min(yOpen, yClose)}
                    width={itemW}
                    height={Math.max(Math.abs(yOpen - yClose), 1.2)}
                    fill={candleColor}
                    rx={1}
                  />
                </g>
              );
            })}

            {/* 5. Volume Bars (Rendered inside the lower panel) */}
            {candles.map((candle, idx) => {
              const x = paddingLeft + idx * cW;
              const yVol = scaleVolume(candle.volume);
              const volBarH = volumeBottom - yVol;
              const isGreen = candle.close >= candle.open;

              return (
                <rect
                  key={`vol-${idx}`}
                  x={x}
                  y={yVol}
                  width={itemW}
                  height={Math.max(volBarH, 1)}
                  fill={
                    isGreen
                      ? "rgba(88, 189, 125, 0.25)"
                      : "rgba(211, 53, 53, 0.25)"
                  }
                />
              );
            })}

            {/* 6. Moving Average Paths */}
            {ma7Path && (
              <path
                d={ma7Path}
                fill="none"
                stroke="#e2c146"
                strokeWidth={1.2}
              />
            )}
            {ma25Path && (
              <path
                d={ma25Path}
                fill="none"
                stroke="#d15a9b"
                strokeWidth={1.2}
              />
            )}

            {/* 7. Live Current Price Line overlay */}
            {currentPrice > 0 && (
              <line
                x1={paddingLeft}
                y1={scalePrice(currentPrice)}
                x2={width - paddingRight}
                y2={scalePrice(currentPrice)}
                stroke={
                  candles.length > 0 &&
                  currentPrice >= candles[candles.length - 1].open
                    ? "#58bd7d"
                    : "#d33535"
                }
                strokeWidth={1}
                strokeDasharray="2 2"
              />
            )}

            {/* 8. Interactive Crosshair Tracking lines */}
            {chartMousePos && (
              <g>
                {/* Vertical crosshair */}
                <line
                  x1={chartMousePos.x}
                  y1={paddingTop}
                  x2={chartMousePos.x}
                  y2={volumeBottom}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                />
                {/* Horizontal crosshair */}
                <line
                  x1={paddingLeft}
                  y1={chartMousePos.y}
                  x2={width - paddingRight}
                  y2={chartMousePos.y}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                />
              </g>
            )}
          </svg>
        )}

        {/* 9. HTML Price Axis Labels (Absolutely positioned to prevent font stretching) */}
        {[0, 0.25, 0.5, 0.75].map((p, idx) => {
          const priceVal = yMax - p * (yMax - yMin);
          const topPercent = ((paddingTop + p * mainH) / height) * 100;
          return (
            <span
              key={`price-label-${idx}`}
              className="absolute text-[10.5px] font-mono text-gray-400 select-none pointer-events-none text-right font-medium"
              style={{
                right: "4px",
                top: `${topPercent}%`,
                transform: "translateY(-50%)",
                width: "78px",
              }}
            >
              {priceVal.toFixed(2)}
            </span>
          );
        })}

        {/* 10. HTML Volume Axis Labels */}
        <span
          className="absolute text-[10.5px] font-mono text-gray-500 select-none pointer-events-none text-right font-medium"
          style={{
            right: "4px",
            top: `${((volumeBottom - volumeH) / height) * 100}%`,
            transform: "translateY(-50%)",
            width: "78px",
          }}
        >
          {maxVol.toFixed(4)}
        </span>
        <span
          className="absolute text-[10.5px] font-mono text-gray-500 select-none pointer-events-none text-right font-medium"
          style={{
            right: "4px",
            top: `${(volumeBottom / height) * 100}%`,
            transform: "translateY(-50%)",
            width: "78px",
          }}
        >
          0.0000
        </span>

        {/* 11. HTML Live Current Price Label Badge */}
        {currentPrice > 0 &&
          (() => {
            const yPrice = scalePrice(currentPrice);
            const topPercent = (yPrice / height) * 100;
            const isGreen =
              candles.length > 0 &&
              currentPrice >= candles[candles.length - 1].open;
            return (
              <span
                className={`absolute text-[10px] font-mono text-white px-1.5 py-0.5 rounded-sm select-none pointer-events-none font-semibold text-center z-25 ${
                  isGreen
                    ? "bg-[#58bd7d] shadow-sm shadow-[#58bd7d]/20"
                    : "bg-[#d33535] shadow-sm shadow-[#d33535]/20"
                }`}
                style={{
                  right: "4px",
                  top: `${topPercent}%`,
                  transform: "translateY(-50%)",
                  width: "75px",
                }}
              >
                {currentPrice.toFixed(2)}
              </span>
            );
          })()}

        {/* 12. HTML Interactive Crosshair Price Badge */}
        {chartMousePos &&
          chartMousePos.y >= paddingTop &&
          chartMousePos.y <= paddingTop + mainH &&
          (() => {
            const priceAtMouse = yCoordToPrice(chartMousePos.y);
            const topPercent = (chartMousePos.y / height) * 100;
            return (
              <span
                className="absolute text-[10px] font-mono text-white bg-indigo-600 px-1.5 py-0.5 rounded-sm select-none pointer-events-none font-semibold text-center z-20 shadow-md shadow-black/30"
                style={{
                  right: "4px",
                  top: `${topPercent}%`,
                  transform: "translateY(-50%)",
                  width: "75px",
                }}
              >
                {priceAtMouse.toFixed(2)}
              </span>
            );
          })()}
      </div>

      {/* 14. HTML X-Axis Timeline (Perfect un-stretched text) */}
      <div className="relative w-full h-[16px] shrink-0 mt-1">
        {candles.map((candle, idx) => {
          if (idx % 6 !== 0) return null;
          // Calculate percentage alignment exactly matching the SVG grid ticks
          const posPct = ((paddingLeft + idx * cW + itemW / 2) / width) * 100;
          return (
            <span
              key={`x-label-${idx}`}
              className="absolute text-center text-[10px] font-mono text-gray-500 font-medium"
              style={{
                left: `${posPct}%`,
                transform: "translateX(-50%)",
              }}
            >
              {candle.time}
            </span>
          );
        })}
      </div>
    </div>
  );
};
