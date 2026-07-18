'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getItems, CryptoItem } from '@/utils/items';
import { FiSearch, FiSliders, FiTrendingUp, FiTrendingDown, FiStar } from 'react-icons/fi';
import { AIRecommendations } from '@/components/AIRecommendations';
import { LearnEarn } from '@/pages/LearnEarn';

const CARDS_PER_PAGE = 8;

export default function MarketsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<CryptoItem[]>([]);
  const [livePrices, setLivePrices] = useState<Record<string, { price: number; change24h: number; volume24h: string }>>({});
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('rank'); // rank (rating), name, price_asc, price_desc, change
  const [currentPage, setCurrentPage] = useState(1);

  // Load items with a simulated skeleton loading delay
  useEffect(() => {
    setLoading(true);
    const initialItems = getItems();
    setItems(initialItems);
    setLoading(false);

    // Fetch live prices immediately and then poll every 15 seconds
    const fetchLivePrices = async () => {
      try {
        const res = await fetch('/api/crypto/prices');
        if (res.ok) {
          const data = await res.json();
          if (data.prices) {
            setLivePrices(data.prices);
            
            // Merge into items to update filters properly
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
        console.error("Failed to fetch live prices", e);
      }
    };

    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 15000);
    return () => clearInterval(interval);
  }, []);

  // Get list of unique categories
  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  // Filtering
  const filteredItems = items.filter((item) => {
    // 1. Search filter
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(search.toLowerCase());

    // 2. Category filter
    const matchesCategory = category === 'All' || item.category === category;

    // 3. Price range filter
    let matchesPrice = true;
    if (priceRange === 'under-10') {
      matchesPrice = item.price < 10;
    } else if (priceRange === '10-500') {
      matchesPrice = item.price >= 10 && item.price <= 500;
    } else if (priceRange === 'over-500') {
      matchesPrice = item.price > 500;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sorting
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'price_asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price_desc') {
      return b.price - a.price;
    }
    if (sortBy === 'change') {
      return b.change24h - a.change24h;
    }
    // Default or rank (rating)
    return b.rating - a.rating;
  });

  // Pagination calculations
  const totalItems = sortedItems.length;
  const totalPages = Math.ceil(totalItems / CARDS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const paginatedItems = sortedItems.slice(startIndex, startIndex + CARDS_PER_PAGE);

  // Handle page changes
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, priceRange, sortBy]);

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0c0c0e] min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-2">Explore Markets</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Search, filter, and discover the best performing digital assets on the blockchain.</p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl p-6 mb-8 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search coins, DeFi assets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400"
              />
            </div>

            {/* Filter and Sort options */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Category selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:inline">Category</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs font-semibold text-gray-700 dark:text-gray-200 cursor-pointer focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Price range selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:inline">Price</span>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs font-semibold text-gray-700 dark:text-gray-200 cursor-pointer focus:outline-none"
                >
                  <option value="All">All Prices</option>
                  <option value="under-10">Under $10</option>
                  <option value="10-500">$10 - $500</option>
                  <option value="over-500">Over $500</option>
                </select>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:inline">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs font-semibold text-gray-700 dark:text-gray-200 cursor-pointer focus:outline-none"
                >
                  <option value="rank">Popularity / Rating</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="price_asc">Price (Low to High)</option>
                  <option value="price_desc">Price (High to Low)</option>
                  <option value="change">24h Gainers</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <AIRecommendations />

        {/* Listing Grid */}
        {loading ? (
          /* Skeleton Loader (8 items matching row layout) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl overflow-hidden shadow-sm flex flex-col h-[420px] animate-pulse">
                <div className="h-44 bg-gray-200 dark:bg-gray-800 w-full" />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
                    <div className="space-y-1.5 pt-1">
                      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                    </div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-full w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedItems.length === 0 ? (
          <div className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl p-12 text-center shadow-sm">
            <p className="text-gray-400 dark:text-gray-500 font-medium mb-2">No assets found matching the criteria</p>
            <button
              onClick={() => { setSearch(''); setCategory('All'); setPriceRange('All'); }}
              className="text-xs text-primary font-bold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl overflow-hidden shadow-sm flex flex-col h-[420px] group"
              >
                {/* Image */}
                <div className="h-44 relative bg-gray-50 dark:bg-[#1d1d22] overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider">
                    {item.category}
                  </span>
                  {item.isCustom && (
                    <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider">
                      User Added
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="font-extrabold text-gray-900 dark:text-white text-base tracking-tight truncate">{item.title}</h3>
                      <div className="flex items-center gap-1 shrink-0 text-yellow-500 text-xs font-bold">
                        <FiStar className="fill-current w-3.5 h-3.5" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2 leading-relaxed">
                      {item.shortDesc}
                    </p>
                  </div>

                  {/* Metadata and View Details */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="text-gray-400 block text-[10px] font-medium uppercase tracking-wider">Price</span>
                        <span className="font-black text-gray-900 dark:text-white">
                          ${item.price >= 1000 ? item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : item.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 block text-[10px] font-medium uppercase tracking-wider">24h Change</span>
                        <span className={`font-extrabold flex items-center gap-0.5 justify-end ${item.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {item.change24h >= 0 ? <FiTrendingUp className="w-3.5 h-3.5" /> : <FiTrendingDown className="w-3.5 h-3.5" />}
                          {item.change24h >= 0 ? '+' : ''}{item.change24h}%
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/markets/${item.id}`}
                      className="block w-full py-2.5 rounded-full bg-primary hover:bg-primary/95 text-white font-bold text-center text-xs shadow-md shadow-primary/10 transition-colors cursor-pointer"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-on-surface text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
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
                      : 'border border-gray-200 dark:border-gray-800 bg-white dark:bg-on-surface text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-on-surface text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        )}

      </div>
      <LearnEarn limitTo3 />
    </div>
  );
}
