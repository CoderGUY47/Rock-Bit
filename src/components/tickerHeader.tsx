import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiTrendingUp, FiTrendingDown, FiMaximize2, FiSearch, FiClock, FiArrowUp, FiArrowDown, FiBarChart2 } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { CryptoItem } from '@/utils/items';
import { SYMBOL_TO_ID_MAP } from '@/scheme/exchange';

const TIMEFRAMES = ['1m', '5m', '15m', '1h', '4h', '1d', '1w'];

interface TickerHeaderProps {
  activeSymbol: string;
  activeItem: CryptoItem;
  currentPrice: number;
  activeChange24h: number;
  activeVolume24h: string;
  selectedTimeframe: string;
  setSelectedTimeframe: (tf: string) => void;
  favorites: string[];
  toggleFavorite: (symbol: string, e: React.MouseEvent) => void;
  items: CryptoItem[];
  livePrices: Record<string, { price: number; change24h: number; volume24h: string }>;
  onSelectPair: (symbol: string) => void;
}

export const TickerHeader: React.FC<TickerHeaderProps> = ({
  activeSymbol,
  activeItem,
  currentPrice,
  activeChange24h,
  activeVolume24h,
  selectedTimeframe,
  setSelectedTimeframe,
  favorites,
  toggleFavorite,
  items,
  livePrices,
  onSelectPair
}) => {
  const isFaved = favorites.includes(activeSymbol);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filter list of pairs using SYMBOL_TO_ID_MAP
  const filteredCoins = items.filter(coin => {
    const coinSymbolObj = Object.entries(SYMBOL_TO_ID_MAP).find(([sym, id]) => id === coin.id);
    const symbol = coinSymbolObj ? coinSymbolObj[0] : coin.id.substring(0, 4).toUpperCase();
    const matchesSearch = symbol.includes(searchQuery.toUpperCase()) || coin.title.toUpperCase().includes(searchQuery.toUpperCase());
    return matchesSearch;
  });

  return (
    <header className="w-full bg-white dark:bg-[#141416] border-b border-gray-200 dark:border-white/[0.04] py-2.5 select-none relative z-50">
      <div className="w-[95%] mx-auto flex flex-wrap items-center justify-between gap-6 px-3">
        {/* Pair Name dropdown / accordion wrapper */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <div className="flex items-center gap-2.5">
            {/* Unified Accordion Selector Box */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100/80 dark:hover:bg-white/[0.06] bg-gray-50 dark:bg-white/[0.03] pl-2.5 pr-4 py-2 rounded-2xl border border-gray-200 dark:border-white/[0.06] transition-all group"
            >
              {/* Coin Icon inside the box */}
              <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shrink-0">
                <img
                  src={activeItem?.image || `/assets/coins/${activeSymbol.toLowerCase()}.svg`}
                  alt={activeSymbol}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/assets/coins/btc.svg'; }}
                  className="w-6 h-6 object-contain"
                />
              </div>

              {/* Coin Name & Title Info inside the box */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{activeSymbol}/USDT</span>
                  <FiChevronDown className={`text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{activeItem?.title || activeSymbol}</span>
              </div>
            </div>

            {/* Favorite button next to selector */}
            <button
              onClick={(e) => toggleFavorite(activeSymbol, e)}
              className="transition-colors cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5"
              title={isFaved ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              {isFaved ? (
                <FaStar className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
              ) : (
                <FaRegStar className="w-4 h-4 text-gray-400 hover:text-amber-400" />
              )}
            </button>
          </div>

          {/* Premium Accordion Dropdown Selector */}
          {isOpen && (
            <div className="absolute left-0 top-full mt-2 w-[320px] bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.08] shadow-2xl rounded-2xl p-3 animate-[fadeIn_0.15s_ease-out] z-50">
              {/* Search Box */}
              <div className="relative mb-3">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search pairs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#1f2026] text-gray-900 dark:text-white pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 dark:border-white/[0.04] focus:outline-hidden focus:border-primary transition-all placeholder-gray-400"
                  autoFocus
                />
              </div>

              {/* Coins list header */}
              <div className="grid grid-cols-4 text-[9px] text-gray-450 font-bold uppercase pb-1.5 border-b border-gray-100 dark:border-white/[0.02] mb-1 px-1">
                <span className="col-span-2">Pair</span>
                <span className="text-right">Price</span>
                <span className="text-right">24h%</span>
              </div>

              {/* Dropdown Scrollable List */}
              <div className="overflow-y-auto max-h-[260px] space-y-1 pr-1">
                {filteredCoins.length > 0 ? (
                  filteredCoins.map(coin => {
                    const coinSymbolObj = Object.entries(SYMBOL_TO_ID_MAP).find(([sym, id]) => id === coin.id);
                    const symbol = coinSymbolObj ? coinSymbolObj[0] : coin.id.substring(0, 4).toUpperCase();
                    const activeP = livePrices[coin.id]?.price || coin.price || 0;
                    const change = livePrices[coin.id]?.change24h ?? coin.change24h ?? 0;
                    const isCoinFaved = favorites.includes(symbol);

                    return (
                      <div
                        key={coin.id}
                        onClick={() => {
                          onSelectPair(symbol);
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                        className={`grid grid-cols-4 items-center text-xs py-2 px-1.5 rounded-xl cursor-pointer transition-all ${
                          activeSymbol === symbol
                            ? 'bg-primary/10 border border-primary/20'
                            : 'hover:bg-gray-50 dark:hover:bg-white/[0.02] border border-transparent'
                        }`}
                      >
                        {/* Star icon & Symbol info */}
                        <div className="col-span-2 flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(symbol, e);
                            }}
                            className="transition-colors cursor-pointer shrink-0 p-1"
                          >
                            {isCoinFaved ? (
                              <FaStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                            ) : (
                              <FaRegStar className="w-3.5 h-3.5 text-gray-400 hover:text-amber-400" />
                            )}
                          </button>
                          <div className="min-w-0 flex items-center gap-2">
                            {/* Small Coin Icon inside list */}
                            <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 shrink-0">
                              <img
                                src={coin.image || `/assets/coins/${symbol.toLowerCase()}.svg`}
                                alt={symbol}
                                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/coins/btc.svg'; }}
                                className="w-3.5 h-3.5 object-contain"
                              />
                            </div>
                            <div className="min-w-0">
                              <span className="font-semibold text-gray-900 dark:text-white tracking-tight block truncate">{symbol}/USDT</span>
                              <span className="block text-[8px] text-gray-400 uppercase tracking-wide font-medium truncate">{coin.title}</span>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <span className="text-right font-medium text-gray-700 dark:text-gray-200">
                          {activeP.toLocaleString(undefined, { maximumFractionDigits: activeP > 100 ? 2 : 4 })}
                        </span>

                        {/* Change */}
                        <span className={`text-right font-bold text-[10px] ${change >= 0 ? 'text-[#58bd7d]' : 'text-[#d33535]'}`}>
                          {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-xs text-gray-400">No matching pairs</div>
                )}
              </div>
            </div>
          )}

          <div className="border-l border-gray-200 dark:border-white/[0.06] h-8 hidden xl:block" />

          {/* Card 1: Last Price */}
          <div className="bg-black/2 dark:bg-white/[0.04] border border-black/10 dark:backdrop-blur-md px-3.5 py-2 rounded-md flex items-center gap-3 transition-all duration-300 w-[200px] shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activeChange24h >= 0 ? 'bg-[#58bd7d]/10 text-[#58bd7d]' : 'bg-[#d33535]/10 text-[#d33535]'}`}>
              {activeChange24h >= 0 ? <FiTrendingUp className="w-4.5 h-4.5" /> : <FiTrendingDown className="w-4.5 h-4.5" />}
            </div>
            <div>
              <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider leading-tight">Last Price</p>
              <div className="flex items-baseline gap-1.5 leading-none mt-0.5">
                <span className={`text-xs  font-bold ${activeChange24h >= 0 ? 'text-[#58bd7d]' : 'text-[#d33535]'}`}>
                  {currentPrice.toLocaleString(undefined, { minimumFractionDigits: currentPrice > 100 ? 2 : 4 })}
                </span>
                <span className="text-[9px]  text-gray-405 dark:text-gray-500 font-bold">
                  ${(currentPrice * 6.55).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: 24h Change */}
          <div className="bg-black/2 dark:bg-white/[0.04] border border-black/10 dark:backdrop-blur-md px-3.5 py-2 rounded-md flex items-center gap-3 transition-all duration-300 w-[195px] shrink-0">
            <div className="w-8 h-8 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center shrink-0">
              <FiClock className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider leading-tight">24H Change</p>
              <div className="flex items-center gap-1.5 leading-none mt-0.5">
                <span className={`text-xs  font-bold ${activeChange24h >= 0 ? 'text-[#58bd7d]' : 'text-[#d33535]'}`}>
                  {(currentPrice * Math.abs(activeChange24h) / 100).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </span>
                <span className={`text-[9px]  font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0 ${activeChange24h >= 0 ? 'bg-[#58bd7d]/10 text-[#58bd7d]' : 'bg-[#d33535]/10 text-[#d33535]'}`}>
                  {activeChange24h >= 0 ? '↑' : '↓'}{Math.abs(activeChange24h).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: 24H High */}
          <div className="bg-black/2 dark:bg-white/[0.04] border border-black/10 dark:backdrop-blur-md px-3.5 py-2 rounded-md flex items-center gap-3 transition-all duration-300 w-[150px] shrink-0">
            <div className="w-8 h-8 bg-[#58bd7d]/10 text-[#58bd7d] rounded-full flex items-center justify-center shrink-0">
              <FiArrowUp className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider leading-tight">24H High</p>
              <span className="text-xs  font-bold text-gray-900 dark:text-white block mt-0.5 leading-none">
                {(currentPrice * 1.012).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Card 4: 24H Low */}
          <div className="bg-black/2 dark:bg-white/[0.04] border border-black/10 dark:backdrop-blur-md px-3.5 py-2 rounded-md flex items-center gap-3 transition-all duration-300 w-[150px] shrink-0">
            <div className="w-8 h-8 bg-[#d33535]/10 text-[#d33535] rounded-full flex items-center justify-center shrink-0">
              <FiArrowDown className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider leading-tight">24H Low</p>
              <span className="text-xs  font-bold text-gray-900 dark:text-white block mt-0.5 leading-none">
                {(currentPrice * 0.988).toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Card 5: 24H Volume */}
          <div className="bg-black/2 dark:bg-white/[0.04] border border-black/10 dark:backdrop-blur-md px-3.5 py-2 rounded-md flex items-center gap-3 transition-all duration-300 w-[145px] shrink-0">
            <div className="w-8 h-8 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center shrink-0">
              <FiBarChart2 className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider leading-tight">24H Volume</p>
              <span className="text-xs  font-bold text-gray-900 dark:text-white block mt-0.5 leading-none text-nowrap">
                {activeVolume24h}
              </span>
            </div>
          </div>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/[0.04] rounded-xl px-2 py-1">
          {TIMEFRAMES.map(tf => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg transition-all cursor-pointer uppercase ${
                selectedTimeframe === tf
                  ? 'bg-white dark:bg-[#141416] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tf}
            </button>
          ))}
          <div className="border-l border-gray-200 dark:border-white/[0.06] h-4 mx-1" />
          <button className="text-gray-400 hover:text-gray-700 dark:hover:text-white p-1 rounded-lg transition-colors cursor-pointer">
            <FiMaximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </header>
  );
};
