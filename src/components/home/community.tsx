"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/button";
import Image from "next/image";
import { ThreeGlobe } from "./threeGlobe";

export const Community = () => {
  return (
    <section className="py-24 bg-[#f8f9fa] dark:bg-[#0c0c0e] transition-colors duration-300 relative overflow-hidden border-t border-gray-100 dark:border-gray-900">
      {/* Background Watermark Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-[0.25] dark:opacity-[0.08]">
        <Image
          src="/assets/images/statistics.png"
          alt="Statistics background grid"
          fill
          className="object-cover object-center"
          unoptimized
        />
      </div>

      <div className="w-[70%] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Interactive 3D Stand Globe with Floating Crypto Badges */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-12 select-none">
            {/* Container */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Interactive Three.js 3D Stand Globe */}
              <div className="w-72 h-72 relative z-20 cursor-grab active:cursor-grabbing">
                <ThreeGlobe />
              </div>

              {/* Curved Arrow */}
              <div className="absolute top-9 left-4 pointer-events-none select-none transform -rotate-45 animate-pulse z-30">
                <svg
                  className="w-20 h-20 text-indigo-400/80 dark:text-indigo-500/80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 100 100"
                >
                  <path d="M75,10 C50,15 25,35 25,65" strokeDasharray="3 3" />
                  <path
                    d="M18,55 L25,66 L34,58"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Top-Left Orbiting Coin: Bitcoin */}
              <div className="absolute -top-2 left-6 w-11 h-11 flex items-center justify-center animate-float pointer-events-none z-30">
                <Image
                  src="https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/btc.svg"
                  alt="BTC"
                  width={44}
                  height={44}
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Far-Left Orbiting Coin: Solana */}
              <div className="absolute left-[-20px] top-[48%] w-9 h-9 flex items-center justify-center animate-bounce-slow pointer-events-none z-30">
                <Image
                  src="https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/sol.svg"
                  alt="SOL"
                  width={36}
                  height={36}
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Bottom-Left Bell Icon Wrapper */}
              <div className="absolute bottom-4 left-16 w-10 h-11 bg-white dark:bg-[#1f2026] border border-gray-100 dark:border-white/[0.08] shadow-lg rounded-xl flex items-center justify-center text-primary dark:text-indigo-400 pointer-events-none z-30">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>

              {/* Top-Right Orbiting Coin: Ethereum */}
              <div className="absolute top-10 right-10 w-11 h-11 flex items-center justify-center animate-bounce-slow pointer-events-none z-30">
                <Image
                  src="https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/eth.svg"
                  alt="ETH"
                  width={44}
                  height={44}
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Bottom-Right Orbiting Coin: Cardano */}
              <div className="absolute bottom-6 right-8 w-9 h-9 flex items-center justify-center animate-float pointer-events-none z-30">
                <Image
                  src="https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/ada.svg"
                  alt="ADA"
                  width={36}
                  height={36}
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Right-Center Chat Bubble Wrapper */}
              <div className="absolute right-[-16px] top-[40%] w-11 h-11 bg-white dark:bg-[#1f2026] border border-gray-100 dark:border-white/[0.08] shadow-lg rounded-xl flex items-center justify-center text-indigo-500 dark:text-indigo-400 pointer-events-none z-30">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column: Title Block & CTA Button */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-950 dark:text-white tracking-tight leading-tight">
                Join Our Trading <br />
                Global Community
              </h2>
              <p className="text-sm text-secondary dark:text-secondary2 font-medium leading-relaxed max-w-md">
                Connect with millions of traders worldwide, share real-time
                market insights, and grow your digital asset portfolio alongside
                global blockchain experts.
              </p>
            </div>

            <div>
              <Button
                size="default"
                asChild
                className="bg-primary hover:bg-interactive text-white font-bold rounded-xl px-8 py-3 text-xs shadow-md shadow-primary/20"
              >
                <Link href="/community">Join now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
