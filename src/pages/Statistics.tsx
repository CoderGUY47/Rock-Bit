import React from "react";
import Image from "next/image";
import { FiRefreshCw, FiBox, FiUsers } from "react-icons/fi";

export const Statistics = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#0c0c0e] transition-colors duration-300 relative overflow-hidden border-0">

      {/* Background Image Decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/assets/images/statistics.png"
          alt=""
          fill
          className="object-contain opacity-[0.5] dark:opacity-[0.8]"
          unoptimized
        />
      </div>

      <div className="w-[70%] mx-auto relative z-10 space-y-12 text-center">

        {/* Title Block */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-950 dark:text-white tracking-tight leading-tight">
            The Numbers Don’t Lie
          </h2>
          <p className="text-sm text-secondary dark:text-secondary2 font-medium leading-relaxed">
            We power the global digital asset ecosystem with industry-leading performance,
            trusted security protocols, and institutional-grade liquidity pools.
          </p>
        </div>

        {/* Central Stat Card */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-white/[0.04] dark:backdrop-blur-md border border-gray-100 dark:border-white/[0.08] rounded-3xl p-8 shadow-xl shadow-gray-200/40 dark:shadow-black/40">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-white/[0.08]">

            {/* Stat 1: Trades per day */}
            <div className="py-6 md:py-0 flex flex-col items-center justify-center space-y-3">
              <div className="flex items-center gap-2 text-secondary dark:text-secondary2 font-semibold">
                <FiRefreshCw className="w-4 h-4 animate-spin-slow text-indigo-500 dark:text-indigo-450" />
                <span className="text-xs uppercase tracking-wider">Trades per day</span>
              </div>
              <span className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight">
                20m+
              </span>
            </div>

            {/* Stat 2: Digital assests */}
            <div className="py-6 md:py-0 flex flex-col items-center justify-center space-y-3">
              <div className="flex items-center gap-2 text-secondary dark:text-secondary2 font-semibold">
                <FiBox className="w-4 h-4 text-indigo-500 dark:text-indigo-450" />
                {/* Note: spell "assests" exactly as user requested in screenshot */}
                <span className="text-xs uppercase tracking-wider">Digital assests</span>
              </div>
              <span className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight">
                100m+
              </span>
            </div>

            {/* Stat 3: Happy users */}
            <div className="py-6 md:py-0 flex flex-col items-center justify-center space-y-3">
              <div className="flex items-center gap-2 text-secondary dark:text-secondary2 font-semibold">
                <FiUsers className="w-4 h-4 text-indigo-500 dark:text-indigo-450" />
                <span className="text-xs uppercase tracking-wider">Happy users</span>
              </div>
              <span className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight">
                10m+
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Statistics;
