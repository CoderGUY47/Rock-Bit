"use client";

import React, { useState } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import bitcoinAnimation from "../../../public/assets/lottie/bitcoin-animation.json";

export const EasyTrading = () => {
  const [activeTab, setActiveTab] = useState("1m");

  return (
    <section className="py-24 bg-white dark:bg-[#0c0c0e] transition-colors duration-300 overflow-hidden border-t border-gray-100 dark:border-gray-900 select-none">
      <div className="w-[75%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Overlapping Chart & Illustrations */}
          <div className="lg:col-span-7 relative flex justify-center items-center py-10">
            {/* The Main Chart Card - rounded-md as per user request */}
            <div className="relative w-full max-w-[560px] bg-white dark:bg-white/[0.04] dark:backdrop-blur-md border border-gray-100 dark:border-white/[0.08] rounded-md p-6 shadow-xl shadow-gray-200/40 dark:shadow-black/40 z-10 transition-all duration-300">
              {/* Card Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  {/* Rotating Bitcoin Icon */}
                  <div className="w-9 h-9 shrink-0 overflow-hidden flex items-center justify-center bg-amber-500/10 rounded-full">
                    <Lottie
                      animationData={bitcoinAnimation}
                      loop={true}
                      autoplay={true}
                      className="w-7 h-7"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-950 dark:text-white tracking-tight">
                      BTCUSDT
                    </h4>
                  </div>
                </div>

                {/* Timeframe tabs */}
                <div className="flex gap-2">
                  {["1m", "1h", "1d"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer ${
                        activeTab === tab
                          ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-indigo-400"
                          : "text-secondary hover:text-primary dark:text-secondary2 dark:hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Plot Area */}
              <div className="relative w-full h-[220px] flex">
                {/* Y-Axis Labels */}
                <div className="flex flex-col justify-between text-[10px] font-bold text-secondary dark:text-secondary2/60 pr-4 text-right select-none h-[180px]">
                  <span>61,300</span>
                  <span>61,200</span>
                  <span>61,100</span>
                  <span>61,000</span>
                  <span>60,900</span>
                </div>

                {/* SVG Graph Grid & Line */}
                <div className="relative grow h-[180px]">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 320 180"
                  >
                    <defs>
                      <linearGradient
                        id="chart-grad-easy"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#58BD7D"
                          stopOpacity="0.25"
                        />
                        <stop
                          offset="100%"
                          stopColor="#58BD7D"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    {[0, 45, 90, 135, 180].map((y, idx) => (
                      <line
                        key={idx}
                        x1="0"
                        y1={y}
                        x2="320"
                        y2={y}
                        stroke="currentColor"
                        strokeDasharray="4 4"
                        className="text-gray-100 dark:text-gray-800/60"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Area path */}
                    <path
                      d="M 0 160 Q 20 145 40 135 T 80 140 T 120 110 T 160 120 T 200 80 T 240 70 T 280 40 T 320 50 L 320 180 L 0 180 Z"
                      fill="url(#chart-grad-easy)"
                    />

                    {/* Green Stroke line */}
                    <path
                      d="M 0 160 Q 20 145 40 135 T 80 140 T 120 110 T 160 120 T 200 80 T 240 70 T 280 40 T 320 50"
                      fill="none"
                      stroke="#58BD7D"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Glowing endpoint */}
                    <circle
                      cx="320"
                      cy="50"
                      r="5"
                      fill="#58BD7D"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>

              {/* X-Axis Labels */}
              <div className="flex justify-between text-[10px] font-bold text-secondary dark:text-secondary2/60 pl-14 pt-2 select-none">
                <span>15:00</span>
                <span>15:10</span>
                <span>15:20</span>
                <span>15:30</span>
                <span>15:40</span>
                <span>15:50</span>
              </div>
            </div>

            {/* FLOATING ELEMENT 1: Security Image (Top Left) */}
            <div className="absolute -top-15 left-0 w-[180px] h-[180px] z-20 pointer-events-none select-none animate-float">
              <Image
                src="/assets/images/security.png"
                alt="Security Verified"
                width={180}
                height={180}
                className="object-contain filter drop-shadow-lg"
                unoptimized
              />
            </div>

            {/* FLOATING ELEMENT 2: User Transactions (+12 BTC Esther Howard) */}
            <div className="absolute -right-6 top-[90px] w-[210px] bg-white dark:bg-white/[0.04] dark:backdrop-blur-md p-3 rounded-md shadow-xl shadow-gray-200/40 dark:shadow-black/40 border border-gray-100 dark:border-white/[0.08] z-20 flex items-center gap-3 transition-transform duration-300 hover:scale-105 select-none">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-amber-500/10 flex items-center justify-center p-1.5 relative">
                <Image
                  src="/assets/coins/btc.svg"
                  alt="BTC"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-1 text-[11px] font-bold text-gray-900 dark:text-white">
                  <span>+12 BTC</span>
                </div>
                <div className="text-[9px] text-secondary dark:text-secondary2 font-medium">
                  Esther Howard
                </div>
              </div>
            </div>

            {/* FLOATING ELEMENT 3: User Transactions (+30 BTC Jenny Wilson) */}
            <div className="absolute -right-2 bottom-[90px] w-[210px] bg-white dark:bg-white/[0.04] dark:backdrop-blur-md p-3 rounded-md shadow-xl shadow-gray-200/40 dark:shadow-black/40 border border-gray-100 dark:border-white/[0.08] z-20 flex items-center gap-3 transition-transform duration-300 hover:scale-105 select-none">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-amber-500/10 flex items-center justify-center p-1.5 relative">
                <Image
                  src="/assets/coins/btc.svg"
                  alt="BTC"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-1 text-[11px] font-bold text-gray-900 dark:text-white">
                  <span>+30 BTC</span>
                </div>
                <div className="text-[9px] text-secondary dark:text-secondary2 font-medium">
                  Jenny Wilson
                </div>
              </div>
            </div>

            {/* FLOATING ELEMENT 4: Beautiful 3D Abstract shapes (Bottom Left) */}
            <div className="absolute -bottom-26 -left-12 w-[360px] h-[360px] z-20 pointer-events-none select-none animate-float">
              <Image
                src="/assets/images/float.png"
                alt="3D Abstract shape"
                width={400}
                height={400}
                className="object-contain filter drop-shadow-lg"
                unoptimized
              />
            </div>
          </div>

          {/* Right Column: Title & Steps List */}
          <div className="lg:col-span-5 space-y-4 text-left">
            {/* Title Block */}
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-950 dark:text-white tracking-tight leading-tight">
                3 Steps Easy Trading
              </h2>
              <p className="text-xs text-secondary dark:text-secondary2 font-medium leading-relaxed max-w-md">
                Rock-Bit has a variety of features that make it the best place to start trading
              </p>
            </div>

            {/* Steps List */}
            <div className="space-y-4">
              {/* Step 1: Download */}
              <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.03] rounded-md p-3.5 group hover:border-primary/20 transition-all duration-300">
                <div className="w-16 h-16 shrink-0 relative overflow-hidden flex items-center justify-center">
                  <Image
                    src="/assets/images/step-1.png"
                    alt="Download"
                    width={64}
                    height={64}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-primary dark:text-indigo-400 font-bold uppercase tracking-wider">
                    Step 1
                  </span>
                  <h3 className="text-sm font-bold text-gray-950 dark:text-white">
                    Download
                  </h3>
                  <p className="text-xs text-secondary dark:text-secondary2 font-medium leading-relaxed">
                    Stacks Is A Production-Ready Library Of Stackable Content Blocks Built In React Native.
                  </p>
                </div>
              </div>

              {/* Step 2: Connect Wallet */}
              <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.03] rounded-md p-3.5 group hover:border-primary/20 transition-all duration-300">
                <div className="w-16 h-16 shrink-0 relative overflow-hidden flex items-center justify-center">
                  <Image
                    src="/assets/images/step-2.png"
                    alt="Connect Wallet"
                    width={64}
                    height={64}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-primary dark:text-indigo-400 font-bold uppercase tracking-wider">
                    Step 2
                  </span>
                  <h3 className="text-sm font-bold text-gray-950 dark:text-white">
                    Connect Wallet
                  </h3>
                  <p className="text-xs text-secondary dark:text-secondary2 font-medium leading-relaxed">
                    Stacks Is A Production-Ready Library Of Stackable Content Blocks Built In React Native.
                  </p>
                </div>
              </div>

              {/* Step 3: Start Trading */}
              <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.03] rounded-md p-3.5 group hover:border-primary/20 transition-all duration-300">
                <div className="w-16 h-16 shrink-0 relative overflow-hidden flex items-center justify-center">
                  <Image
                    src="/assets/images/step-3.png"
                    alt="Start Trading"
                    width={64}
                    height={64}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-primary dark:text-indigo-400 font-bold uppercase tracking-wider">
                    Step 3
                  </span>
                  <h3 className="text-sm font-bold text-gray-950 dark:text-white">
                    Start Trading
                  </h3>
                  <p className="text-xs text-secondary dark:text-secondary2 font-medium leading-relaxed">
                    Stacks Is A Production-Ready Library Of Stackable Content Blocks Built In React Native.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EasyTrading;
