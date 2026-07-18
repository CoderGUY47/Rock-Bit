"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/button";

export const Hero = () => {
  return (
    <section className="relative w-full bg-white dark:bg-[#0c0c0e] py-14 lg:py-20 overflow-hidden select-none border-b border-gray-100 dark:border-white/[0.03]">
            {/* Background Image Decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
              <Image
                src="/assets/images/statistics.png"
                alt=""
                fill
                className="object-contain opacity-[0.2] dark:opacity-[0.15]"
                unoptimized
              />
            </div>
      <div className="w-[75%] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Text Content & Partners */}
          <div className="lg:col-span-6 space-y-2 text-left">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-950 dark:text-white leading-tight tracking-tight">
                Buy &amp; Sell Digital <br />
                Assets In The Rocket
              </h1>
              <p className="text-sm md:text-base text-secondary dark:text-gray-400 font-medium max-w-lg leading-relaxed">
                Coin rocket is the easiest, safest, and fastest way to buy &amp; sell
                crypto asset exchange.
              </p>
            </div>

            {/* Action Button */}
            <div>
              <Button
                size="sm"
                asChild
                className="mt-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full px-8 py-2 text-sm flex items-center gap-2 w-fit cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                <Link href="/auth/register">
                  Get started now
                </Link>
              </Button>
            </div>

            {/* Our Partners */}
            <div className="mt-10 mb-4">
              <span className="text-base uppercase font-black tracking-widest text-gray-400">
                Our Partners
              </span>
              <div className="flex flex-wrap items-center opacity-50 dark:opacity-40">
                <Image
                  src="/assets/images/support.png"
                  alt="support"
                  width={600}
                  height={400}
                  className="dark:invert-0 invert"
                  unoptimized
                />
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Soft background glow */}
            <div className="absolute w-[90%] h-[90%] bg-indigo-50/20 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="relative w-full max-w-[650px] aspect-square z-10 transition-transform duration-500 hover:scale-[1.02] animate-float">
              <Image
                src="/assets/images/float-banner.png"
                alt="Coin Rocket Illustration"
                fill
                className="object-contain pointer-events-none"
                priority
                unoptimized
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
