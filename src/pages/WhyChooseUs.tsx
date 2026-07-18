"use client";

import React from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import bitcoinAnimation from "../../public/assets/lottie/bitcoin-animation.json";

export const WhyChooseUs = () => {
  return (
    <section className="py-34 bg-white dark:bg-[#0c0c0e] transition-colors duration-300 overflow-hidden">
      <div className="w-[70%] py-20 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Info & Features List */}
          <div className="lg:col-span-5 space-y-10">
            {/* Heading Block */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-950 dark:text-white tracking-tight leading-tight">
                Why Choose Rock-Bit
              </h2>
              <p className="text-base text-secondary dark:text-secondary2 font-medium leading-relaxed max-w-md">
                Rock-Bit has a variety of features that make it the best place
                to start trading
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {/* Feature 1 (Highlighted / Active Card style) */}
              <div className="bg-white dark:bg-white/[0.04] dark:backdrop-blur-md p-6 rounded-2xl border border-gray-100 dark:border-white/[0.08] flex items-start gap-5 transition-all duration-300">
                <div className="w-16 h-16 flex items-center justify-center shrink-0 bg-[#f1f3f9] dark:bg-[#1e2330] rounded-full overflow-hidden">
                  <Image
                    src="/assets/icons/connect.gif"
                    alt="Manage portfolio"
                    width={48}
                    height={48}
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Manage your portfolio
                  </h3>
                  <p className="text-xs text-secondary dark:text-secondary2 font-semibold leading-relaxed uppercase tracking-wider">
                    Buy And Sell Popular Digital Currencies, Keep Track Of Them
                    In The One Place.
                  </p>
                </div>
              </div>

              {/* Feature 2 (Standard text list style) */}
              <div className="p-6 flex items-start gap-5 hover:bg-bold/5 dark:hover:bg-white/5 rounded-2xl transition-colors duration-250">
                <div className="w-16 h-16 flex items-center justify-center shrink-0 bg-[#f1f3f9] dark:bg-[#1e2330] rounded-full overflow-hidden">
                  <Image
                    src="/assets/icons/analytics.gif"
                    alt="Recurring buys"
                    width={48}
                    height={48}
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Recurring buys
                  </h3>
                  <p className="text-xs text-secondary dark:text-secondary2 font-semibold leading-relaxed uppercase tracking-wider">
                    Invest In Cryptocurrency Slowly Over Time By Scheduling Buys
                    Daily, Weekly, Or Monthly.
                  </p>
                </div>
              </div>

              {/* Feature 3 (Standard text list style) */}
              <div className="p-6 flex items-start gap-5 hover:bg-bold/5 dark:hover:bg-white/5 rounded-2xl transition-colors duration-250">
                <div className="w-16 h-16 flex items-center justify-center shrink-0 bg-[#f1f3f9] dark:bg-[#1e2330] rounded-full overflow-hidden">
                  <Image
                    src="/assets/icons/money.gif"
                    alt="Mobile apps"
                    width={48}
                    height={48}
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Mobile apps
                  </h3>
                  <p className="text-xs text-secondary dark:text-secondary2 font-semibold leading-relaxed uppercase tracking-wider">
                    Stay On Top Of The Markets With The Coinbase App For Android
                    Or iOS.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Beautiful Overlapping Interactive Illustration */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="relative w-[530px] h-[600px]">
              {/* Background solid decoration shape */}
              <div className="absolute right-8 bottom-12 w-[72%] h-[74%] rounded-2xl z-0 overflow-hidden">
                <Image
                  src="/assets/images/choose.png"
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>

              {/* Card 1: Experience Rating Card (Top Middle-Right) */}
              <div className="absolute top-4 -right-10 w-[320px] bg-white dark:bg-white/[0.04] dark:backdrop-blur-md p-5 rounded-2xl shadow-md shadow-gray-200/30 dark:shadow-black/40 border border-gray-100 dark:border-white/[0.08] z-20 space-y-4">
                <p className="text-xs font-semibold text-gray-850 dark:text-white text-center">
                  How was your experience?
                </p>
                <div className="flex justify-between items-center px-1">
                  {/* Emoji options */}
                  <span className="text-2xl grayscale hover:grayscale-0 cursor-pointer transform hover:scale-120 transition-all select-none">
                    🤬
                  </span>
                  <span className="text-2xl grayscale hover:grayscale-0 cursor-pointer transform hover:scale-120 transition-all select-none">
                    😢
                  </span>
                  <span className="text-2xl grayscale hover:grayscale-0 cursor-pointer transform hover:scale-120 transition-all select-none">
                    😐
                  </span>
                  <span className="text-2xl grayscale hover:grayscale-0 cursor-pointer transform hover:scale-120 transition-all select-none">
                    😊
                  </span>
                  <span className="text-2xl cursor-pointer transform hover:scale-120 transition-all filter drop-shadow-md select-none">
                    😍
                  </span>
                </div>
              </div>

              {/* Card 2: BTC Price Ticker Card (Left-Center) */}
              <div className="absolute left-18 top-[170px] w-[270px] bg-white dark:bg-white/[0.04] dark:backdrop-blur-md p-4 rounded-2xl shadow-md shadow-gray-200/30 dark:shadow-black/40 border border-gray-100 dark:border-white/[0.08] z-30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Rotating Bitcoin Lottie animation */}
                  <div className="w-10 h-10 shrink-0 overflow-hidden flex items-center justify-center">
                    <Lottie
                      animationData={bitcoinAnimation}
                      loop={true}
                      autoplay={true}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        BTC
                      </span>
                      <span className="text-[10px] font-bold text-success">
                        +1.46%
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      $56,623.54
                    </span>
                  </div>
                </div>
                {/* Tiny sparkline SVG */}
                <div className="w-16 h-8 shrink-0">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 100 30"
                  >
                    <path
                      d="M0,25 Q15,22 30,12 T60,20 T90,2 T100,5"
                      fill="none"
                      stroke="#58BD7D"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Curved Connector Arrow from BTC card to Rating card */}
              <div className="absolute left-[150px] top-[95px] w-20 h-20 z-10 pointer-events-none text-indigo-100 dark:text-indigo-400">
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M10,80 Q20,30 75,20"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M68,15 L78,20 L72,28"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Card 3: User Wallet & Portfolio Balance Card (Bottom Right) */}
              <div className="absolute right-0 bottom-0 w-[250px] bg-white dark:bg-white/[0.04] dark:backdrop-blur-md p-4 rounded-2xl shadow-md border border-gray-100 dark:border-white/[0.08] z-40 space-y-4">
                {/* User Header */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <Image
                      src="/assets/icons/profile.png"
                      alt="Esther Howard"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      Esther Howard
                    </h4>
                    <p className="text-[10px] text-secondary dark:text-secondary2 font-medium">
                      estherhoward01@gmail.com
                    </p>
                  </div>
                </div>

                {/* Balance Inner Card */}
                <div className="bg-linear-to-br from-indigo-700 to-purple-600 p-4 rounded-xl text-white space-y-0 relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold tracking-wider uppercase">
                      Portfolio
                    </span>
                    <div className="w-10 h-10 shrink-0 overflow-hidden flex items-center justify-center">
                      <Lottie
                        animationData={bitcoinAnimation}
                        loop={true}
                        autoplay={true}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider opacity-70 font-semibold">
                      Balance
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold">$2,509.75</span>
                      <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full font-bold">
                        +9.77%
                      </span>
                    </div>
                  </div>
                  {/* Action buttons inside card */}
                  <div className="flex gap-2 pt-1.5">
                    <button className="flex-1 py-1 px-2 border border-white/40 rounded-full text-[9px] font-bold hover:bg-white hover:text-primary transition-all cursor-pointer text-center">
                      Deposit
                    </button>
                    <button className="flex-1 py-1 px-2 border border-white/40 rounded-full text-[9px] font-bold hover:bg-white hover:text-primary transition-all cursor-pointer text-center">
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
