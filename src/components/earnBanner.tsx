"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import Link from "next/link";

export const EarnBanner = () => {
  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-500 transition-colors duration-300 py-4 md:py-6">

      {/* Background Watermark Image with White Geometric Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/assets/images/earn-bg.png"
          alt="Geometric lines background"
          fill
          className="object-cover object-center"
          unoptimized
        />
      </div>

      {/* Main Content Container - Centered Vertically & Spaced horizontally on desktop */}
      <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left Side: Copywriting */}
        <div className="space-y-1.5 max-w-2xl text-center md:text-left">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
            Earn up to $25 worth of crypto
          </h3>
          <p className="text-xs sm:text-sm font-medium text-white/90 tracking-wide leading-relaxed">
            Discover How Specific Cryptocurrencies Work — And Get A Bit Of Each Crypto To Try Out For Yourself.
          </p>
        </div>

        {/* Right Side: CTA Button */}
        <div className="shrink-0">
          <Button
            size="default"
            asChild
            className="bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-full px-8 py-3 text-xs shadow-lg shadow-black/10 transition-all hover:scale-105"
          >
            <Link href="/auth/register">
              Create Account
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default EarnBanner;
