"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import Link from "next/link";

export const EarnBanner = () => {
  return (
    <section className="w-full h-34 relative overflow-hidden bg-gradient-to-r from-[#2d52ec] to-[#6366f1] shadow-xl transition-colors duration-300 mb-14">

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
      <div className="w-[70%] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center h-full gap-6 py-6 md:py-0">

        {/* Left Side: Copywriting */}
        <div className="space-y-1 max-w-2xl text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
            Earn up to $25 worth of crypto
          </h3>
          <p className="text-xs md:text-sm font-medium text-white/85 tracking-wide leading-relaxed">
            Discover How Specific Cryptocurrencies Work — And Get A Bit Of Each Crypto To Try Out For Yourself.
          </p>
        </div>

        {/* Right Side: CTA Button */}
        <div className="shrink-0">
          <Button
            size="default"
            asChild
            className="bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-full px-8 py-3 text-xs shadow-md shadow-black/10"
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
