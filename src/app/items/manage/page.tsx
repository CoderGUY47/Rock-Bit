'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { getItems, deleteCustomItem, CryptoItem } from '@/utils/items';
import Link from 'next/link';
import { FiTrash2, FiEye, FiSettings, FiPlus } from 'react-icons/fi';

export default function ManageItemsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [items, setItems] = useState<CryptoItem[]>([]);

  // Refetch list of assets
  const fetchItems = () => {
    const all = getItems();
    // Filter to only custom items added by the user
    setItems(all.filter((i) => i.isCustom));
  };

  // Protect route
  useEffect(() => {
    if (!isPending && !session) {
      router.push('/auth/login');
    } else if (session) {
      fetchItems();
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c0c0e] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this custom asset?')) {
      deleteCustomItem(id);
      fetchItems();
    }
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0c0c0e] min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2 justify-center sm:justify-start">
              <FiSettings className="text-primary w-6 h-6" />
              Manage Custom Assets
            </h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Manage, view, and delete custom listings created in your session.</p>
          </div>
          <Link
            href="/items/add"
            className="flex items-center gap-1.5 px-6 py-3 rounded-full bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
          >
            <FiPlus className="w-4.5 h-4.5" />
            Add New Asset
          </Link>
        </div>

        {/* Table list */}
        <div className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl overflow-hidden shadow-sm">
          {items.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400 dark:text-gray-500 font-medium mb-4">You have not created any custom assets yet.</p>
              <Link href="/items/add" className="text-xs text-primary font-bold hover:underline">
                Create your first asset now
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                    <th className="px-6 py-4">Asset</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/40 text-xs font-semibold">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1d1d22]/30 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <span className="font-extrabold text-gray-900 dark:text-white block">{item.title}</span>
                          <span className="text-[10px] text-gray-400 font-medium block truncate max-w-[200px]">{item.shortDesc}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 font-bold text-yellow-500">
                        {item.rating}/5.0
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Link
                          href={`/markets/${item.id}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all cursor-pointer"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-all cursor-pointer"
                          title="Delete Asset"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
