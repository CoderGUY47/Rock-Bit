'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Asset Name / Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Rock-Bit Coin"
                className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 dark:text-white font-semibold placeholder-gray-400"
              />
            </div>

            {/* Category & Price & Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 dark:text-white font-semibold cursor-pointer"
                >
                  <option value="DeFi">DeFi</option>
                  <option value="L1">Layer 1</option>
                  <option value="Layer 2">Layer 2</option>
                  <option value="Oracle">Oracle</option>
                  <option value="Gaming">Gaming</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1 flex items-center gap-0.5">
                  <FiDollarSign className="w-3.5 h-3.5" /> Price (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 1.25"
                  className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 dark:text-white font-semibold placeholder-gray-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1 flex items-center gap-0.5">
                  <FiStar className="w-3.5 h-3.5 text-yellow-500" /> Initial Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="e.g. 4.8"
                  className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 dark:text-white font-semibold placeholder-gray-400"
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Short Summary / Catchphrase</label>
              <input
                type="text"
                required
                maxLength={100}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="e.g. Next-generation liquid staking index."
                className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 dark:text-white font-medium placeholder-gray-400"
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Full Overview Description</label>
              <textarea
                required
                rows={5}
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                placeholder="Describe this project in detail (governance structure, tokenomics, technical specs, utility...)"
                className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 dark:text-white font-medium resize-none placeholder-gray-400"
              ></textarea>
            </div>

            {/* Optional Image URL */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1 flex items-center gap-1">
                <FiImage className="w-3.5 h-3.5" /> Optional Cover Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Leave blank for a default crypto graphics cover image"
                className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 dark:text-white font-medium placeholder-gray-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full font-bold text-xs bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/20 mt-4 cursor-pointer transition-colors duration-200 border-none outline-none disabled:opacity-50"
            >
              {submitting ? 'Creating asset...' : 'Submit Asset'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
