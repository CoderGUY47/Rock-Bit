'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getItems, CryptoItem } from '@/utils/items';
import { FiSearch, FiStar, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { AIRecommendations } from '@/components/AIRecommendations';
import { LearnEarn } from '@/pages/LearnEarn';
import { Button } from '@/components/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/table';

const CARDS_PER_PAGE = 8;

const MAIN_TABS = ['Favorites', 'Derivatives', 'Spot'];
const SUB_TABS = ['All', 'Inverse Perpetual', 'USDT Perpetual', 'Inverse Futures'];
const FILTER_TAGS = ['Hot', 'New', 'DeFi', 'NFT'];

// Top 4 Ticker Coins
const TICKER_COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', color: '#F7931A' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', color: '#627EEA' },
  { id: 'tether', symbol: 'USDT', name: 'Tether', color: '#26A17B' },
  { id: 'bnb', symbol: 'BNB', name: 'Binance', color: '#F3BA2F' }
];

export default function MarketsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<CryptoItem[]>([]);
  const [livePrices, setLivePrices] = useState<Record<string, { price: number; change24h: number; volume24h: string }>>({});
  
  // Navigation & Filter states
  const [activeMainTab, setActiveMainTab] = useState('Favorites');
  const [activeSubTab, setActiveSubTab] = useState('All');
  const [activeFilterTag, setActiveFilterTag] = useState('Hot');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);

  // Load items with live prices polling
  useEffect(() => {
    setLoading(true);
    const initialItems = getItems();
    setItems(initialItems);
    setLoading(false);

    const fetchLivePrices = async () => {
      try {
        const res = await fetch('/api/crypto/prices');
        if (res.ok) {
          const data = await res.json();
          if (data.prices) {
            setLivePrices(data.prices);
            
            // Merge live prices into main items
            setItems(prev => prev.map(item => {
              const live = data.prices[item.id];
              if (live) {
                return {
                  ...item,
                  price: live.price,
                  change24h: live.change24h,
                  volume24h: live.volume24h
                };
              }
              return item;
            }));
          }
        }
      } catch (e) {
        console.error("Failed to fetch live prices in Markets", e);
      }
    };

    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 15000);
    return () => clearInterval(interval);
  }, []);

  // Filter based on Search and active tab category mappings
  const filteredItems = items.filter(item => {
    // 1. Search Query
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // 2. Active Main Tab Mapping
    if (activeMainTab === 'Derivatives') {
      // Derivatives matches L1 & L2 assets
      return item.category === 'L1' || item.category === 'Layer 2';
    }
    if (activeMainTab === 'Spot') {
      // Spot matches DeFi, Oracles & Stablecoins
      return item.category === 'DeFi' || item.category === 'Oracle' || item.category === 'Stablecoin';
    }

    // Default 'Favorites' (or 'All') shows everything
    return true;
  });

  // Pagination calculations
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / CARDS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + CARDS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeMainTab, activeSubTab, activeFilterTag]);

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0c0c0e] min-h-screen transition-colors duration-200">
      
      {/* ─── 1. Top Banner Section ─── */}
      <section className="relative w-full bg-slate-50 dark:bg-[#141416]/50 py-12 overflow-hidden select-none border-b border-gray-100 dark:border-white/[0.03]">
        {/* Background Handshake Illustration */}
        <div className="absolute top-0 right-0 bottom-0 w-[45%] z-0 pointer-events-none select-none overflow-hidden opacity-10 dark:opacity-30">
          <Image
            src="/assets/images/support.png"
            alt="Handshake illustration"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col justify-center text-left">
          <h1 className="text-4xl font-extrabold text-gray-950 dark:text-white leading-tight tracking-tight mb-2">
            Today's Cryptocurrency prices
          </h1>
          <p className="text-sm font-semibold text-secondary dark:text-gray-400">
            The global crypto market cap is <span className="text-primary font-bold">$1.86T</span>
          </p>
        </div>
      </section>

      {/* ─── 2. Top Ticker Cards ─── */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TICKER_COINS.map(coin => {
            const live = livePrices[coin.id];
            const price = live ? live.price : 0;
            const change = live ? live.change24h : 0;
            const isPositive = change >= 0;

            return (
              <div 
                key={coin.id}
                className="bg-white dark:bg-[#141416] border border-gray-100 dark:border-white/[0.05] rounded-2xl p-5 shadow-md flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${coin.color}15` }}>
                    <img 
                      src={`/assets/coins/${coin.symbol.toLowerCase()}.svg`} 
                      alt={coin.name} 
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{coin.name}</h3>
                    <p className="text-base font-extrabold text-gray-900 dark:text-white tracking-tight mt-0.5">
                      USD {price > 0 ? price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Loading...'}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {isPositive ? '+' : ''}{change.toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 3. Explore & Filter Section ─── */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
        
        <AIRecommendations />

        {/* Filters and Navigation bar */}
        <div className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.05] rounded-3xl p-6 shadow-sm space-y-5">
          
          {/* Main category tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-white/[0.05] pb-4">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
              {MAIN_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveMainTab(tab)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeMainTab === tab
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-secondary dark:text-secondary2 hover:bg-gray-50 dark:hover:bg-white/[0.03]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search inputs */}
            <div className="relative w-full sm:w-64 shrink-0">
              <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                <FiSearch className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search asset or symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#1d1d22] border border-gray-100 dark:border-transparent focus:border-primary dark:focus:border-primary rounded-full py-2 pl-10 pr-4 text-xs font-semibold text-gray-950 dark:text-white placeholder-gray-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* Sub timeframe tabs and tags */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {SUB_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeSubTab === tab
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-indigo-400'
                      : 'text-gray-500 hover:text-primary dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              {FILTER_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveFilterTag(tag)}
                  className={`px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilterTag === tag
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-sm'
                      : 'border border-gray-200 dark:border-white/[0.08] text-gray-500 hover:border-gray-300 dark:hover:border-white/[0.15]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* ─── 4. Main Market Listings Table ─── */}
          <div className="border border-gray-100 dark:border-white/[0.05] rounded-2xl overflow-hidden bg-white dark:bg-[#141416]/50">
            {loading ? (
              <div className="py-20 text-center text-xs font-semibold text-gray-400 animate-pulse">
                Fetching live asset prices...
              </div>
            ) : paginatedItems.length === 0 ? (
              <div className="py-16 text-center text-xs font-semibold text-gray-400">
                No matching assets found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead className="min-w-[160px]">Trading Pairs</TableHead>
                    <TableHead className="text-right">Last Price</TableHead>
                    <TableHead className="text-right">24H Change%</TableHead>
                    <TableHead className="text-right">24H High</TableHead>
                    <TableHead className="text-right">24H Low</TableHead>
                    <TableHead className="text-right">24H Turnover</TableHead>
                    <TableHead className="text-center w-[120px]">Chart</TableHead>
                    <TableHead className="w-20"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedItems.map((item, idx) => {
                    const price = item.price;
                    const change = item.change24h;
                    const isPositive = change >= 0;
                    
                    // Simple simulated high/low/turnover mapping
                    const high = price * 1.023;
                    const low = price * 0.978;
                    const volumeStr = item.volume24h;

                    // Sparkline path
                    const sparkline = isPositive 
                      ? "M0 30 Q15 15 30 25 T60 15 T90 22 T120 8"
                      : "M0 15 Q15 30 30 20 T60 28 T90 18 T120 32";

                    return (
                      <TableRow key={item.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.01]">
                        {/* Index + Star */}
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2 select-none">
                            <FiStar className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 hover:text-yellow-400 cursor-pointer" />
                            <span className="text-xs font-bold text-gray-500">
                              {startIndex + idx + 1}
                            </span>
                          </div>
                        </TableCell>

                        {/* Trading Pair (Logo + Name + Symbol) */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/5 p-0.5 flex items-center justify-center overflow-hidden shrink-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-extrabold text-gray-950 dark:text-white leading-tight">
                                {item.title}
                              </span>
                              <span className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                                {item.id.toUpperCase()}/USDT
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        {/* Last Price */}
                        <TableCell className="text-right font-extrabold text-xs text-gray-950 dark:text-white">
                          ${price >= 1000 ? price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : price.toFixed(2)}
                        </TableCell>

                        {/* 24h Change */}
                        <TableCell className={`text-right font-extrabold text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                          {isPositive ? '+' : ''}{change.toFixed(2)}%
                        </TableCell>

                        {/* High */}
                        <TableCell className="text-right font-semibold text-xs text-gray-600 dark:text-gray-300">
                          ${high >= 1000 ? high.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : high.toFixed(2)}
                        </TableCell>

                        {/* Low */}
                        <TableCell className="text-right font-semibold text-xs text-gray-600 dark:text-gray-300">
                          ${low >= 1000 ? low.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : low.toFixed(2)}
                        </TableCell>

                        {/* Turnover */}
                        <TableCell className="text-right font-semibold text-xs text-gray-600 dark:text-gray-300">
                          {volumeStr}
                        </TableCell>

                        {/* Sparkline Chart */}
                        <TableCell>
                          <div className="flex items-center justify-center">
                            <svg className="w-[100px] h-[28px] overflow-visible" viewBox="0 0 120 40">
                              <path
                                d={sparkline}
                                fill="none"
                                stroke={isPositive ? "#58BD7D" : "#D33535"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </TableCell>

                        {/* Trade Action Link */}
                        <TableCell className="text-center">
                          <Button
                            asChild
                            variant={idx === 1 ? 'default' : 'outline'}
                            size="sm"
                            className={`font-extrabold rounded-full px-5 py-1 text-[10px] cursor-pointer ${
                              idx === 1
                                ? 'bg-primary text-white hover:bg-interactive shadow-md shadow-primary/20'
                                : 'border border-gray-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/5 text-gray-950 dark:text-white'
                            }`}
                          >
                            <Link href="/checkout">
                              Trade
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-1.5 pt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl border border-gray-250 dark:border-gray-800 bg-white dark:bg-on-surface text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                        : 'border border-gray-250 dark:border-gray-800 bg-white dark:bg-on-surface text-gray-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl border border-gray-250 dark:border-gray-800 bg-white dark:bg-on-surface text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          )}

        </div>
      </div>

      <LearnEarn limitTo3 />
    </div>
  );
}
