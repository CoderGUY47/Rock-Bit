'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Head from 'next/head';
import { getItems, CryptoItem } from '@/utils/items';
import { notifySuccess, notifyWarning, notifyError } from '@/components/toastProvider';

// Schema types & helpers
import {
  Candle,
  Trade,
  OrderBookLevel,
  UserOrder,
  SYMBOL_TO_ID_MAP,
  generateInitialCandles,
  generateInitialRecentTrades,
  generateMockOpenOrders,
  getTimeframeMs,
  formatCandleTime
} from '@/scheme/exchange';

// Modular components
import { TickerHeader } from '@/components/tickerHeader';
import { TradingChart } from '@/components/tradingChart';
import { OrderBook } from '@/components/orderBook';
import { OrderForm } from '@/components/orderForm';
import { OrdersTable } from '@/components/ordersTable';
import { MarketsSidebar } from '@/components/marketsSidebar';
import { ContractDetails } from '@/components/contractDetails';
import { FiInfo } from 'react-icons/fi';

export default function ExchangePage() {
  // Main Data States
  const [items, setItems] = useState<CryptoItem[]>([]);
  const [livePrices, setLivePrices] = useState<Record<string, { price: number; change24h: number; volume24h: string }>>({});
  const [activeSymbol, setActiveSymbol] = useState<string>('BTC');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Layout & UI Tabs
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('1h');
  const [orderFormTab, setOrderFormTab] = useState<'Limit' | 'Market' | 'Conditional'>('Limit');
  const [orderBookTab, setOrderBookTab] = useState<'general' | 'cumulative' | 'details'>('general');
  const [bottomTableTab, setBottomTableTab] = useState<'open' | 'history' | 'trades' | 'funds'>('open');
  const [marketListTab, setMarketListTab] = useState<string>('USDT');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Trading Panel States
  const [leverage, setLeverage] = useState<number>(10);
  const [marginMode, setMarginMode] = useState<'Cross' | 'Isolated'>('Cross');
  const [showLeverageModal, setShowLeverageModal] = useState<boolean>(false);
  const [sliderPercentage, setSliderPercentage] = useState<number>(0);
  const [limitPrice, setLimitPrice] = useState<string>('');
  const [quantityUsd, setQuantityUsd] = useState<string>('');
  const [triggerPrice, setTriggerPrice] = useState<string>('');
  const [triggerType, setTriggerType] = useState<'Last' | 'Index' | 'Mark'>('Last');
  const [condOrderType, setCondOrderType] = useState<'Market' | 'Limit'>('Limit');
  const [buyLongTpSl, setBuyLongTpSl] = useState<boolean>(false);
  const [sellShortTpSl, setSellShortTpSl] = useState<boolean>(false);
  const [postOnly, setPostOnly] = useState<boolean>(false);
  const [reduceOnly, setReduceOnly] = useState<boolean>(false);
  const [closeOnTrigger, setCloseOnTrigger] = useState<boolean>(false);
  const [priceAdjustmentScale] = useState<number>(0.5);

  // User Balances & Orders
  const [equity, setEquity] = useState<number>(0.05200000);
  const [availableBalance, setAvailableBalance] = useState<number>(0.02400000);
  const [openOrders, setOpenOrders] = useState<UserOrder[]>([]);
  const [tradeHistory, setTradeHistory] = useState<UserOrder[]>([]);
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  // Simulation States (Real-time feeds)
  const [candles, setCandles] = useState<Candle[]>([]);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);
  const [chartMousePos, setChartMousePos] = useState<{ x: number; y: number } | null>(null);

  const chartSvgRef = useRef<SVGSVGElement | null>(null);
  const lastInitSymbolRef = useRef<string>('');
  const lastInitTimeframeRef = useRef<string>('');
  const lastInitPriceRef = useRef<number>(0);


  // Get currently active item details
  const activeItem = useMemo(() => {
    const id = SYMBOL_TO_ID_MAP[activeSymbol] || 'bitcoin';
    return items.find(item => item.id === id) || items[0];
  }, [items, activeSymbol]);

  // Current Price based on live API + simulated ticks
  const currentPrice = useMemo(() => {
    if (!activeItem) return 0;
    return livePrices[activeItem.id]?.price || activeItem.price;
  }, [activeItem, livePrices]);

  const activeChange24h = useMemo(() => {
    if (!activeItem) return 0;
    return livePrices[activeItem.id]?.change24h ?? activeItem.change24h;
  }, [activeItem, livePrices]);

  const activeVolume24h = useMemo(() => {
    if (!activeItem) return '0.00';
    return livePrices[activeItem.id]?.volume24h || activeItem.volume24h;
  }, [activeItem, livePrices]);

  const btcPrice = useMemo(() => {
    return items.find(c => c.id === 'bitcoin')?.price || 61000;
  }, [items]);

  // Toast Notification handler
  const triggerNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (type === 'success') {
      notifySuccess("Action Completed", message);
    } else if (type === 'error') {
      notifyError("Error Occurred", message);
    } else {
      notifyWarning("Notice", message);
    }
  };

  // Load Favorites from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('exchange_favorites');
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // Sync Favorites to LocalStorage
  const toggleFavorite = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    let updated: string[];
    if (favorites.includes(symbol)) {
      updated = favorites.filter(s => s !== symbol);
      notifyWarning("Removed from Favorites", `${symbol}/USDT has been removed from your watchlist.`);
    } else {
      updated = [...favorites, symbol];
      notifySuccess("Saved Successfully", `${symbol}/USDT has been added to your favorites watchlist.`);
    }
    setFavorites(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('exchange_favorites', JSON.stringify(updated));
    }
  };

  // Prepopulate Order Price when current price changes
  useEffect(() => {
    if (currentPrice > 0 && !limitPrice) {
      setLimitPrice(currentPrice.toFixed(2));
      setTriggerPrice((currentPrice * 0.98).toFixed(2));
    }
  }, [currentPrice]);

  // Load default items and hook up live polling
  useEffect(() => {
    setLoading(true);
    const loadedItems = getItems();
    setItems(loadedItems);
    setLoading(false);

    const fetchLivePrices = async () => {
      try {
        const res = await fetch('/api/crypto/prices');
        if (res.ok) {
          const data = await res.json();
          if (data.prices) {
            setLivePrices(prev => ({ ...prev, ...data.prices }));
          }
        }
      } catch (e) {
        console.error('Failed to fetch live prices in exchange', e);
      }
    };

    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 12000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Mock Trades & Candle data when active asset changes or timeframe changes
  useEffect(() => {
    if (!activeItem) return;
    
    const baseVal = livePrices[activeItem.id]?.price || activeItem.price;

    const symbolChanged = lastInitSymbolRef.current !== activeSymbol;
    const timeframeChanged = lastInitTimeframeRef.current !== selectedTimeframe;
    const priceJumped = lastInitPriceRef.current > 0 && Math.abs(lastInitPriceRef.current - baseVal) / baseVal > 0.05;
    const notInitialized = lastInitPriceRef.current === 0;

    if (symbolChanged || timeframeChanged || priceJumped || notInitialized) {
      lastInitSymbolRef.current = activeSymbol;
      lastInitTimeframeRef.current = selectedTimeframe;
      lastInitPriceRef.current = baseVal;

      setLimitPrice(baseVal.toFixed(baseVal > 100 ? 2 : 4));
      setTriggerPrice((baseVal * 0.98).toFixed(baseVal > 100 ? 2 : 4));
      setQuantityUsd('');
      setSliderPercentage(0);

      setCandles(generateInitialCandles(baseVal, selectedTimeframe));
      setRecentTrades(generateInitialRecentTrades(baseVal));
      setOpenOrders(generateMockOpenOrders(activeSymbol, baseVal));
    }
  }, [activeSymbol, activeItem, selectedTimeframe, livePrices[activeItem?.id || '']?.price]);


  // Simulated Tick Feeder: Runs every 1200ms to simulate micro price movements
  useEffect(() => {
    if (!activeItem) return;

    const tickInterval = setInterval(() => {
      // 1. Generate micro price fluctuation (+/- 0.08%)
      const basePrice = livePrices[activeItem.id]?.price || activeItem.price;
      const percentChange = (Math.random() * 0.16 - 0.08) / 100;
      const tickPrice = basePrice * (1 + percentChange);

      setLivePrices(prev => ({
        ...prev,
        [activeItem.id]: {
          price: tickPrice,
          change24h: (prev[activeItem.id]?.change24h || activeItem.change24h) + percentChange * 10,
          volume24h: prev[activeItem.id]?.volume24h || activeItem.volume24h
        }
      }));

      // 2. Add dynamic trade log item
      const newTradeQty = Math.random() * 0.8 + 0.002;
      const isBuy = Math.random() > 0.49;
      const now = new Date();
      const newTrade: Trade = {
        id: Math.random().toString(36).substring(2, 9),
        price: tickPrice,
        qty: newTradeQty,
        time: now.toLocaleTimeString('en-US', { hour12: false }),
        isBuy
      };
      setRecentTrades(prev => [newTrade, ...prev.slice(0, 39)]);

      // 3. Update the last candle in the chart
      setCandles(prev => {
        if (prev.length === 0) return [];
        const lastCandle = { ...prev[prev.length - 1] };
        
        lastCandle.close = tickPrice;
        if (tickPrice > lastCandle.high) lastCandle.high = tickPrice;
        if (tickPrice < lastCandle.low) lastCandle.low = tickPrice;
        lastCandle.volume += newTradeQty;

        // If we want a new candle, check timeframe (we simulate candle rollover occasionally)
        const rollChance = Math.random();
        if (rollChance > 0.95) { // 5% chance to create a new candle node on tick
          const stepMs = getTimeframeMs(selectedTimeframe);
          const lastCandleDate = lastCandle.date || new Date();
          const nextCandleDate = new Date(lastCandleDate.getTime() + stepMs);
          const nextTimeStr = formatCandleTime(nextCandleDate, selectedTimeframe);

          return [...prev.slice(1), {
            time: nextTimeStr,
            open: tickPrice,
            high: tickPrice,
            low: tickPrice,
            close: tickPrice,
            volume: newTradeQty,
            date: nextCandleDate
          }];
        }

        return [...prev.slice(0, prev.length - 1), lastCandle];
      });
    }, 1200);

    return () => clearInterval(tickInterval);
  }, [activeItem, livePrices, selectedTimeframe]);

  // Order Book calculation based on current ticks
  const orderBookData = useMemo(() => {
    if (currentPrice <= 0) return { asks: [], bids: [] };
    const step = currentPrice * 0.0004; // Spread width step
    const listAsks: OrderBookLevel[] = [];
    const listBids: OrderBookLevel[] = [];

    let totalAskVol = 0;
    let totalBidVol = 0;

    // Generate 12 levels of asks (sell)
    for (let i = 1; i <= 12; i++) {
      const p = currentPrice + (i * step);
      const q = Math.sin(i) * 0.8 + 0.95; // pseudo random quantity
      totalAskVol += q;
      listAsks.push({
        price: p,
        qty: q,
        total: totalAskVol,
        percentage: 0
      });
    }

    // Generate 12 levels of bids (buy)
    for (let i = 1; i <= 12; i++) {
      const p = currentPrice - (i * step);
      const q = Math.cos(i) * 0.8 + 0.95;
      totalBidVol += q;
      listBids.push({
        price: p,
        qty: q,
        total: totalBidVol,
        percentage: 0
      });
    }

    const maxTotalAsk = listAsks[listAsks.length - 1].total;
    const maxTotalBid = listBids[listBids.length - 1].total;
    const maxBar = Math.max(maxTotalAsk, maxTotalBid);

    // Calculate width percentages for depths
    listAsks.forEach(lvl => lvl.percentage = (lvl.total / maxBar) * 100);
    listBids.forEach(lvl => lvl.percentage = (lvl.total / maxBar) * 100);

    // Asks display top-down
    return {
      asks: listAsks.reverse(),
      bids: listBids
    };
  }, [currentPrice]);

  // Pairs filtering for Market Panel
  const filteredPairs = useMemo(() => {
    const list = items;
    return list.filter(coin => {
      // 1. Tab filtering
      const symbol = coin.id.toUpperCase();
      // Find standard symbol from mapping
      const coinSymbolObj = Object.entries(SYMBOL_TO_ID_MAP).find(([sym, id]) => id === coin.id);
      const coinSymbol = coinSymbolObj ? coinSymbolObj[0] : coin.id.substring(0, 4).toUpperCase();
      
      if (marketListTab === '★ FAVORITE') {
        if (!favorites.includes(coinSymbol)) return false;
      } else if (marketListTab === 'USDT') {
        // Show all
      } else if (marketListTab === 'BTC') {
        if (coinSymbol === 'BTC') return false; // cannot trade BTC/BTC
      }

      // 2. Search query filter
      return coinSymbol.includes(searchQuery.toUpperCase()) || coin.title.toUpperCase().includes(searchQuery.toUpperCase());
    });
  }, [items, marketListTab, searchQuery, favorites]);

  // Cancel order handler
  const cancelOrder = (orderId: string) => {
    const orderToCancel = openOrders.find(o => o.id === orderId);
    if (!orderToCancel) return;

    // Restore balance (unlock order total USD / BTC price)
    const totalUsd = parseFloat(orderToCancel.total);
    const restoredBtc = totalUsd / (btcPrice * leverage);

    setAvailableBalance(prev => prev + restoredBtc);
    setOpenOrders(prev => prev.filter(o => o.id !== orderId));
    triggerNotification(`Order ${orderId} cancelled. Funds unlocked.`, 'info');
  };

  // Placed order execution handler
  const executeOrder = (side: 'Buy' | 'Sell') => {
    const priceVal = orderFormTab === 'Market' ? currentPrice : parseFloat(limitPrice);
    const qtyVal = parseFloat(quantityUsd);

    if (isNaN(qtyVal) || qtyVal <= 0) {
      triggerNotification('Please specify a valid quantity', 'error');
      return;
    }
    if (orderFormTab !== 'Market' && (isNaN(priceVal) || priceVal <= 0)) {
      triggerNotification('Please specify a valid price', 'error');
      return;
    }
    if (orderFormTab === 'Conditional' && (!triggerPrice || parseFloat(triggerPrice) <= 0)) {
      triggerNotification('Please specify a valid trigger price', 'error');
      return;
    }

    // Cost calculation
    const orderCostUsd = qtyVal;
    const orderCostBtc = orderCostUsd / (btcPrice * leverage);

    if (orderCostBtc > availableBalance) {
      triggerNotification('Insufficient Available Balance for this leverage!', 'error');
      return;
    }

    // Deduct available balance
    setAvailableBalance(prev => parseFloat((prev - orderCostBtc).toFixed(8)));

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }) + ' ' + now.toLocaleTimeString('en-US', { hour12: false });
    
    const newOrder: UserOrder = {
      id: 'o-' + Math.random().toString(36).substring(2, 6),
      date: dateStr,
      pair: `${activeSymbol}/USDT`,
      type: orderFormTab,
      side,
      price: priceVal,
      amount: parseFloat((qtyVal / priceVal).toFixed(4)),
      filled: orderFormTab === 'Market' ? '100.00%' : '0.00%',
      total: qtyVal.toFixed(2) + ' USD',
      triggerConditions: orderFormTab === 'Conditional' ? `${triggerType} <= ${triggerPrice}` : '-'
    };

    if (orderFormTab === 'Market') {
      setTradeHistory(prev => [newOrder, ...prev]);
      setEquity(prev => parseFloat((prev - (orderCostBtc * 0.001)).toFixed(8)));
      triggerNotification(`Market Order executed! Opened ${side} position of ${quantityUsd} USD.`, 'success');
    } else {
      setOpenOrders(prev => [newOrder, ...prev]);
      triggerNotification(`Order submitted successfully: Limit ${side} at ${priceVal}`, 'success');
    }

    // Reset inputs
    setQuantityUsd('');
    setSliderPercentage(0);
  };

  // Switch Active Trading pair
  const handlePairSelect = (symbol: string) => {
    setActiveSymbol(symbol);
    setLimitPrice(''); // Reset price field so it will pull the next active coin's price
  };

  return (
    <div className="bg-gray-50 dark:bg-[#0c0c0e] min-h-screen text-gray-800 dark:text-gray-200 antialiased font-sans">
      <Head>
        <title>{activeSymbol}/USDT | Rock-Bit Exchange</title>
        <meta name="description" content="Trade cryptocurrency perpetual contracts with high leverage and low spreads on Rock-Bit." />
      </Head>

      {/* ─── Toast Notifications ─── */}
      <div className="fixed top-20 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {notifications.map(n => (
          <div 
            key={n.id} 
            className={`p-4 rounded-md shadow-2xl flex items-center gap-3 border text-sm pointer-events-auto animate-[fadeIn_0.2s_ease-out] ${
              n.type === 'success' ? 'bg-green-950/80 border-green-500 text-green-200' :
              n.type === 'error' ? 'bg-red-950/80 border-red-500 text-red-200' :
              'bg-[#1a1c22] border-gray-700 text-gray-200'
            }`}
          >
            <FiInfo className="shrink-0 text-base" />
            <p className="font-semibold">{n.message}</p>
          </div>
        ))}
      </div>

      {/* ─── 1. Exchange Header / Ticker Bar ─── */}
      {activeItem && (
        <TickerHeader
          activeSymbol={activeSymbol}
          activeItem={activeItem}
          currentPrice={currentPrice}
          activeChange24h={activeChange24h}
          activeVolume24h={activeVolume24h}
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          items={items}
          livePrices={livePrices}
          onSelectPair={handlePairSelect}
        />
      )}

      {/* ─── Width-constrained content wrapper ─── */}
      <div className="w-[95%] mx-auto">

        {/* ─── 2. Multi-column Dashboard Grid Layout ─── */}
        <div className="p-3 grid grid-cols-1 xl:grid-cols-4 gap-3 items-stretch">

        {/* ─── Left Section (Main Terminal Components: Chart, Orderbook & Form, Orders Table) ─── */}
        <div className="xl:col-span-3 flex flex-col gap-3 min-h-full">

          {/* Candlestick Chart Panel */}
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

          {/* Order Book & Order Execution Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">

            {/* Left: Order Book Panel (spans 2 columns) */}
            <div className="lg:col-span-2">
              <OrderBook
                orderBookTab={orderBookTab}
                setOrderBookTab={setOrderBookTab}
                orderBookData={orderBookData}
                activeSymbol={activeSymbol}
                currentPrice={currentPrice}
                activeChange24h={activeChange24h}
                setLimitPrice={setLimitPrice}
                isSpot={true}
                showDisclaimer={true}
              />
            </div>

            {/* Right: Order Entry Form & Recent Trades */}
            <div className="lg:col-span-1">
              <OrderForm
                orderFormTab={orderFormTab}
                setOrderFormTab={setOrderFormTab}
                leverage={leverage}
                setLeverage={setLeverage}
                marginMode={marginMode}
                setMarginMode={setMarginMode}
                showLeverageModal={showLeverageModal}
                setShowLeverageModal={setShowLeverageModal}
                sliderPercentage={sliderPercentage}
                setSliderPercentage={setSliderPercentage}
                limitPrice={limitPrice}
                setLimitPrice={setLimitPrice}
                quantityUsd={quantityUsd}
                setQuantityUsd={setQuantityUsd}
                triggerPrice={triggerPrice}
                setTriggerPrice={setTriggerPrice}
                triggerType={triggerType}
                setTriggerType={setTriggerType}
                condOrderType={condOrderType}
                setCondOrderType={setCondOrderType}
                buyLongTpSl={buyLongTpSl}
                setBuyLongTpSl={setBuyLongTpSl}
                sellShortTpSl={sellShortTpSl}
                setSellShortTpSl={setSellShortTpSl}
                postOnly={postOnly}
                setPostOnly={setPostOnly}
                reduceOnly={reduceOnly}
                setReduceOnly={setReduceOnly}
                closeOnTrigger={closeOnTrigger}
                setCloseOnTrigger={setCloseOnTrigger}
                priceAdjustmentScale={priceAdjustmentScale}
                availableBalance={availableBalance}
                currentPrice={currentPrice}
                activeSymbol={activeSymbol}
                recentTrades={recentTrades}
                executeOrder={executeOrder}
                btcPrice={btcPrice}
                isSpot={false}
              />
            </div>

          </div>

          {/* Bottom Row: Positions, Orders & Funds Table */}
          <div className="h-[350px] flex flex-col">
            <OrdersTable
              bottomTableTab={bottomTableTab}
              setBottomTableTab={setBottomTableTab}
              openOrders={openOrders}
              tradeHistory={tradeHistory}
              availableBalance={availableBalance}
              equity={equity}
              activeSymbol={activeSymbol}
              btcPrice={btcPrice}
              cancelOrder={cancelOrder}
              triggerNotification={triggerNotification}
            />
          </div>

        </div>

        {/* ─── Right Section (Sidebar: Markets Search, Assets summary, Contract Details) ─── */}
        <div className="flex flex-col gap-3 min-h-full xl:col-span-1">

          {/* Market Selection Sidebar */}
          <div className="flex-1 flex flex-col min-h-0">
            <MarketsSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              marketListTab={marketListTab}
              setMarketListTab={setMarketListTab}
              filteredPairs={filteredPairs}
              livePrices={livePrices}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              handlePairSelect={handlePairSelect}
              activeSymbol={activeSymbol}
              equity={equity}
              availableBalance={availableBalance}
              triggerNotification={triggerNotification}
            />
          </div>

          {/* Contract Details Panel */}
          <div className="h-[350px] flex flex-col">
            <ContractDetails
              activeSymbol={activeSymbol}
              currentPrice={currentPrice}
              activeVolume24h={activeVolume24h}
            />
          </div>

        </div>

      </div>
    </div>
  </div>
  );
}
