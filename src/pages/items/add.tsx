'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@/lib/auth-client';
import { addCustomItem } from '@/utils/items';
import { FiPlusCircle, FiDollarSign, FiStar, FiImage } from 'react-icons/fi';

export default function AddItemPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Form states
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('5.0');
  const [category, setCategory] = useState('DeFi');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Protect route
  useEffect(() => {
    if (!isPending && !session) {
      router.push('/auth/login');
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c0c0e] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const parsedPrice = parseFloat(price);
    const parsedRating = parseFloat(rating);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Please enter a valid price greater than 0.');
      return;
    }
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      setError('Please enter a rating between 1.0 and 5.0.');
      return;
    }

    setSubmitting(true);

    try {
      // Use fallback image if none provided
      const finalImage = imageUrl.trim() || 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=600&auto=format&fit=crop';
      
      addCustomItem({
        title,
        shortDesc,
        fullDesc,
        price: parsedPrice,
        rating: parsedRating,
        category,
        image: finalImage
      });

      // Redirect to markets list
      router.push('/markets');
    } catch (err: any) {
      setError(err?.message || 'An error occurred while creating the asset.');
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0c0c0e] min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <FiPlusCircle className="w-12 h-12 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white mb-2">Create Custom Asset</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500">Add a new token, DeFi pool, or index to the listing explore platform.</p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl p-8 shadow-sm">
          {error && (
            <div className="bg-red-50 dark:bg-red-950/20 text-red-500 text-xs font-semibold p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Asset Name</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Uniswap Token"
                className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-white font-semibold placeholder-gray-400"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Short Description</label>
              <input
                type="text"
                required
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Brief summary of the asset (max 80 chars)"
                maxLength={80}
                className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-white font-semibold placeholder-gray-400"
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Detailed Description</label>
              <textarea
                required
                rows={5}
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                placeholder="Detailed background history, technical specs and governance mechanisms..."
                className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-white font-medium resize-none placeholder-gray-400"
              />
            </div>

            {/* Price & Rating Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Price */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Price (USD)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400 text-xs">
                    <FiDollarSign className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="number"
                    step="0.00000001"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-white font-semibold placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Popularity Rating</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400 text-xs">
                    <FiStar className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="5.0"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="5.0"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-white font-semibold placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-white font-semibold cursor-pointer"
                >
                  <option value="DeFi">DeFi</option>
                  <option value="L1">Layer 1 (L1)</option>
                  <option value="Layer 2">Layer 2 (L2)</option>
                  <option value="Oracle">Oracle</option>
                  <option value="Stablecoin">Stablecoin</option>
                  <option value="Meme">Meme Coin</option>
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Image / Logo URL (Optional)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400 text-xs">
                  <FiImage className="w-3.5 h-3.5" />
                </span>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-white font-semibold placeholder-gray-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full font-bold text-xs bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/20 mt-4 cursor-pointer transition-colors duration-200 border-none outline-none disabled:opacity-50 flex items-center justify-center"
            >
              {submitting ? 'Creating asset...' : 'Create Asset Listing'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
