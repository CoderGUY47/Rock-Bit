'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getItemById, getItems, CryptoItem } from '@/utils/items';
import { FiChevronLeft, FiStar, FiTrendingUp, FiTrendingDown, FiMessageSquare } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Review {
  id: string;
  user: string;
  rating: number;
  text: string;
  date: string;
}

export default function ItemDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [item, setItem] = useState<CryptoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  
  // Custom review form state
  const [newUserName, setNewUserName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');

  // Gallery main image state
  const [selectedImage, setSelectedImage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate dynamic chart points based on current asset price
  const chartData = item ? [
    { name: 'Mon', Price: item.price * 0.96 },
    { name: 'Tue', Price: item.price * 0.98 },
    { name: 'Wed', Price: item.price * 0.95 },
    { name: 'Thu', Price: item.price * 1.01 },
    { name: 'Fri', Price: item.price * 0.99 },
    { name: 'Sat', Price: item.price * 1.03 },
    { name: 'Sun', Price: item.price }
  ] : [];

  useEffect(() => {
    if (!id || typeof id !== 'string') return;
    const foundItem = getItemById(id);
    if (!foundItem) {
      // If not found, redirect to markets page
      router.push('/markets');
      return;
    }
    setItem(foundItem);
    setSelectedImage(foundItem.image);
    setLoading(false);

    // Initial dummy reviews
    setReviews([
      {
        id: '1',
        user: 'Alex Rivera',
        rating: 5,
        text: `Absolutely incredible asset. The utility of ${foundItem.title} in the current blockchain ecosystem is unmatched. A cornerstone of my portfolio.`,
        date: '2026-07-15'
      },
      {
        id: '2',
        user: 'Sarah Chen',
        rating: 4,
        text: `Very solid performance, but price fluctuations are high. Highly recommend getting in during the dips.`,
        date: '2026-07-10'
      }
    ]);
  }, [id, router]);

  if (loading || !item) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c0c0e] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Get related items (exclude current item, match category or L1/DeFi)
  const allItems = getItems();
  const relatedItems = allItems
    .filter((i) => i.id !== item.id && (i.category === item.category || i.category === 'L1'))
    .slice(0, 3);

  // Gallery images
  const gallery = [
    item.image,
    "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop"
  ];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newReviewText.trim()) return;

    const newReview: Review = {
      id: Math.random().toString(36).substring(2, 9),
      user: newUserName,
      rating: newRating,
      text: newReviewText,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    
    // Reset form
    setNewUserName('');
    setNewRating(5);
    setNewReviewText('');
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0c0c0e] min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back Link */}
        <Link href="/markets" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-8 cursor-pointer">
          <FiChevronLeft className="w-4.5 h-4.5" />
          <span>Back to Markets</span>
        </Link>

        {/* Core Product Information Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column: Media Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[16/10] w-full rounded-3xl overflow-hidden bg-white dark:bg-on-surface border border-gray-100 dark:border-gray-800 shadow-sm relative">
              <img
                src={selectedImage}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="flex gap-4">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-1 aspect-[16/10] rounded-xl overflow-hidden bg-white dark:bg-on-surface border-2 transition-all cursor-pointer ${selectedImage === img ? 'border-primary shadow-lg shadow-primary/10' : 'border-transparent opacity-75 hover:opacity-100'}`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Key Details Sidebar */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl p-8 shadow-sm">
            <div>
              {/* Category and Title */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                  <FiStar className="fill-current w-4 h-4" />
                  <span>{item.rating}</span>
                </div>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-2">{item.title}</h1>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">{item.shortDesc}</p>

              {/* Specs & Performance */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Asset Price</span>
                  <span className="text-lg font-black text-gray-900 dark:text-white">
                    ${item.price >= 1000 ? item.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : item.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">24h Change</span>
                  <span className={`text-sm font-black flex items-center gap-0.5 ${item.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change24h >= 0 ? '+' : ''}{item.change24h}%
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">24h Volume</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{item.volume24h}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Launch Date</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{item.dateAdded}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <Link
                href="/checkout"
                className="flex-1 py-3.5 bg-primary hover:bg-primary/95 text-white font-bold text-center text-sm rounded-full shadow-lg shadow-primary/20 transition-all cursor-pointer"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>

        {/* Tabbed Section: Overview, Specs, Reviews */}
        <div className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl p-8 mb-12 shadow-sm">
          {/* Tabs header */}
          <div className="flex gap-6 border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
            {(['overview', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-bold uppercase tracking-wider pb-1 transition-all cursor-pointer border-b-2 ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Project Overview</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {item.fullDesc}
                </p>
              </div>

              {/* Recharts Area Chart */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">7-Day Price Trend (USD)</h3>
                  <span className="text-[10px] bg-green-500/10 text-green-500 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest">Live Chart</span>
                </div>
                <div className="w-full h-[260px] bg-gray-50 dark:bg-[#141416]/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" strokeOpacity={0.1} />
                        <XAxis dataKey="name" stroke="#888888" strokeOpacity={0.5} fontSize={10} tickLine={false} />
                        <YAxis 
                          stroke="#888888" 
                          strokeOpacity={0.5} 
                          fontSize={10} 
                          tickLine={false} 
                          domain={['auto', 'auto']}
                          tickFormatter={(val) => '$' + (val >= 1000 ? val.toLocaleString(undefined, { maximumFractionDigits: 0 }) : val.toFixed(1))}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#141416',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '12px',
                            color: '#fff',
                            fontSize: '11px',
                            fontWeight: 'bold'
                          }}
                          formatter={(value: any) => ['$' + parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 'Price']}
                        />
                        <Area type="monotone" dataKey="Price" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPrice)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-semibold">Loading chart metrics...</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Technical Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-55 dark:border-gray-800">
                    <span className="text-xs font-semibold text-gray-500">Asset Symbol</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white uppercase">{item.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-55 dark:border-gray-800">
                    <span className="text-xs font-semibold text-gray-500">Consensus Mechanism</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{item.category === 'L1' ? 'Proof of Stake' : 'Smart Contract Protocol'}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-xs font-semibold text-gray-500">Asset Type</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{item.isCustom ? 'User Created' : 'Verified Native'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Market Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-55 dark:border-gray-800">
                    <span className="text-xs font-semibold text-gray-500">Volume (24h)</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{item.volume24h}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-55 dark:border-gray-800">
                    <span className="text-xs font-semibold text-gray-500">Popularity Rating</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{item.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-xs font-semibold text-gray-500">Date Logged</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{item.dateAdded}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FiMessageSquare className="w-5 h-5 text-primary" />
                  User Reviews ({reviews.length})
                </h3>
                
                {reviews.map((review) => (
                  <div key={review.id} className="p-5 rounded-2xl bg-gray-50 dark:bg-[#1d1d22] border border-gray-100 dark:border-gray-800/40">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{review.user}</span>
                        <div className="flex items-center gap-0.5 text-yellow-500 text-[10px]">
                          {[...Array(review.rating)].map((_, i) => (
                            <FiStar key={i} className="fill-current w-3 h-3" />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddReview} className="border-t border-gray-100 dark:border-gray-800 pt-6">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Write a Review</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="Enter name"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Rating</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-white font-semibold cursor-pointer"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                      <option value={2}>2 Stars (Poor)</option>
                      <option value={1}>1 Star (Awful)</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Review</label>
                  <textarea
                    required
                    rows={4}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Share your thoughts on this asset..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-white font-medium resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/95 text-white font-bold text-xs px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Related Items Section */}
        {relatedItems.length > 0 && (
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">Related Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((relItem) => (
                <div key={relItem.id} className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[380px]">
                  <div className="h-40 bg-gray-50 overflow-hidden relative shrink-0">
                    <img src={relItem.image} alt={relItem.title} className="w-full h-full object-cover" />
                    <span className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                      {relItem.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-sm truncate mb-1">{relItem.title}</h4>
                      <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{relItem.shortDesc}</p>
                    </div>
                    <div className="pt-3 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center gap-2">
                      <span className="font-extrabold text-sm text-gray-900 dark:text-white">${relItem.price}</span>
                      <Link href={`/markets/${relItem.id}`} className="text-xs text-primary font-bold hover:underline">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
