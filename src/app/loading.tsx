'use client';

import React from 'react';

/**
 * Global Loading state for Next.js App Router.
 * Automatically shown by Next.js during page routing transitions and lazy loading.
 */
export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white dark:bg-[#0c0c0e] transition-colors duration-200">
      {/* Glow background decorative blurs */}
      <div className="absolute top-[35%] left-[35%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[35%] right-[35%] w-[30%] h-[30%] rounded-full bg-[#6366f1]/10 blur-[100px] pointer-events-none" />

      {/* Loader Container */}
      <div className="relative flex flex-col items-center text-center px-4 max-w-xs z-10">
        
        {/* Animated Spin Circle */}
        <div className="relative w-16 h-16 mb-6">
          {/* Inner pulsating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
          
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin" />
          
          {/* Center glowing dot */}
          <div className="absolute inset-4 rounded-full bg-primary shadow-lg shadow-primary/50 animate-pulse" />
        </div>

        {/* Informative text */}
        <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-1.5 animate-pulse">
          Loading Terminal
        </h3>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          Securing node connection...
        </p>
      </div>
    </div>
  );
}
