"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPlay } from "react-icons/fi";
import { Button } from "@/components/button";

interface LearnEarnProps {
  limitTo3?: boolean;
}

const ARTICLES = [
  {
    id: 1,
    title: "Introduction to Liquidity Pools in DeFi",
    description: "Understand staking mechanisms, liquidity incentives, and pool dynamics.",
    image: "/assets/images/learn-earn-2.png",
    link: "/article/liquidity-pools",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021"
  },
  {
    id: 2,
    title: "Staking and Yield Farming Basics",
    description: "Learn how to yield interest by locking up your crypto assets safely.",
    image: "/assets/images/learn-earn-3.png",
    link: "/article/staking-basics",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021"
  },
  {
    id: 3,
    title: "Understanding Crypto Governance & DAOs",
    description: "Master governance tokens, voting power, and decentralized organizations.",
    image: "/assets/images/learn-earn-4.png",
    link: "/article/crypto-governance",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021"
  },
  {
    id: 4,
    title: "Security & Private Keys Best Practices",
    description: "Protect your ledger, cold storage backup, and prevent wallet drainage.",
    image: "/assets/images/learn-earn-5.png",
    link: "/article/crypto-security",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021"
  },
];

// Helper article representation for Markets 3-column view
const THREE_COL_ARTICLES = [
  {
    id: 1,
    title: "Learn about UI8 coin and earn an All-Access Pass",
    image: "/assets/images/learn-earn-1.png",
    link: "/article/ui8-coin",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021"
  },
  {
    id: 2,
    title: "Learn about UI8 coin and earn an All-Access Pass",
    image: "/assets/images/learn-earn-2.png",
    link: "/article/ui8-coin",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021"
  },
  {
    id: 3,
    title: "Learn about UI8 coin and earn an All-Access Pass",
    image: "/assets/images/learn-earn-3.png",
    link: "/article/ui8-coin",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021"
  }
];

export const LearnEarn = ({ limitTo3 = false }: LearnEarnProps) => {
  if (limitTo3) {
    // ─── Markets 3-Column Video Layout ──────────────────────────────────────────
    return (
      <section className="py-16 bg-white dark:bg-[#0c0c0e] border-t border-gray-100 dark:border-white/[0.04] transition-colors duration-300 select-none">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Section Header: Centered */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-gray-950 dark:text-white tracking-tight">
              Learn And Earn
            </h2>
            <p className="text-xs text-secondary dark:text-secondary2 font-medium max-w-md mx-auto leading-relaxed">
              Stacks is a production-ready library of stackable<br />
              content blocks built in React Native.
            </p>
          </div>

          {/* Cards Grid: 3 Columns side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {THREE_COL_ARTICLES.map((article) => (
              <div 
                key={article.id} 
                className="bg-white dark:bg-[#141416]/50 rounded-2xl overflow-hidden border border-transparent hover:border-gray-100 dark:hover:border-white/[0.04] hover:shadow-lg transition-all duration-300 p-4 space-y-4 flex flex-col group cursor-pointer"
              >
                {/* Video thumbnail with play button in center */}
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#b5b8c5] dark:bg-[#23262f] relative flex items-center justify-center shadow-sm shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                    unoptimized
                  />
                  {/* Backdrop */}
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
                  
                  {/* Play icon in center */}
                  <div className="w-10 h-10 rounded-full bg-white/95 dark:bg-white/80 shadow-md flex items-center justify-center text-primary group-hover:scale-105 transition-all duration-300 relative z-10">
                    <FiPlay className="w-4 h-4 fill-current ml-0.5 text-primary" />
                  </div>
                </div>

                {/* Info & Title */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="bg-primary text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs select-none w-fit block">
                      LEARN &amp; EARN
                    </span>
                    <h3 className="text-sm font-bold text-gray-950 dark:text-white group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                  </div>

                  {/* Card Footer: Author + Date */}
                  <div className="flex items-center justify-between text-[11px] font-semibold text-secondary dark:text-secondary2 border-t border-gray-50 dark:border-white/[0.03] pt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                      <span>{article.author}</span>
                    </div>
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Load More Button */}
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              className="rounded-full border border-gray-200 dark:border-white/[0.08] text-xs font-bold px-8 py-2.5 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer text-gray-950 dark:text-white"
            >
              Load more
            </Button>
          </div>

        </div>
      </section>
    );
  }

  // ─── Homepage Layout (Default) ────────────────────────────────────────────────
  return (
    <section className="py-24 bg-white dark:bg-[#0c0c0e] transition-colors duration-300 relative overflow-hidden border-t border-gray-100 dark:border-gray-900 select-none">
      <div className="w-[70%] mx-auto space-y-3">

        {/* Section Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2.5 text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-950 dark:text-white tracking-tight">
              Learn And Earn
            </h2>
            <p className="text-[13px] text-secondary dark:text-secondary2 font-medium max-w-[320px] leading-relaxed">
              Stacks is a production-ready library of stackable<br className="hidden md:inline" />
              content blocks built in React Native.
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="rounded-full border border-gray-200 dark:border-white/[0.08] text-xs font-bold px-6 py-2 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer text-gray-950 dark:text-white"
          >
            <Link href="/learn-earn">
              See all article
            </Link>
          </Button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

          {/* Left Column: Featured article */}
          <div className="lg:col-span-7 space-y-2 text-left flex flex-col justify-between">
            {/* Featured Image Thumbnail */}
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#b5b8c5] dark:bg-[#23262f] shadow-sm relative transition-colors duration-350">
              <Image
                src="/assets/images/learn-earn-1.png"
                alt="Learn about UI8 Coin"
                fill
                priority
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Featured Info block */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between items-center">
                <span className="bg-primary text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs select-none">
                  LEARN &amp; EARN
                </span>

                <Button
                  variant="outline"
                  asChild
                  className="rounded-full border border-gray-200 dark:border-white/[0.08] text-[10px] font-bold px-4 py-1 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer text-gray-950 dark:text-white"
                >
                  <Link href="/article/ui8-coin">
                    Learn more
                  </Link>
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-gray-950 dark:text-white leading-snug hover:text-primary transition-colors cursor-pointer">
                  Learn about UI8 coin and earn an All-Access Pass
                </h3>
                <p className="text-xs text-secondary dark:text-secondary2 font-medium leading-relaxed">
                  Master the fundamentals of decentralized finance, learn how utility tokens power ecosystems, and earn rewards as you complete interactive lessons.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 4 vertical rows with custom thumbnails */}
          <div className="lg:col-span-5 flex flex-col justify-start gap-2">
            {ARTICLES.map((article) => (
              <div
                key={article.id}
                className="flex items-center gap-2 p-1 rounded-2xl hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors group cursor-pointer"
              >
                {/* Small video box with custom generated thumbnail */}
                <div className="w-44 aspect-[16/9] rounded-2xl overflow-hidden bg-[#b5b8c5] dark:bg-[#23262f] shrink-0 flex items-center justify-center relative shadow-sm transition-colors duration-350">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                    unoptimized
                  />
                  {/* Glass Backdrop for Play Button */}
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />

                  {/* Play icon in center */}
                  <div className="w-8 h-8 rounded-full bg-white/95 dark:bg-white/80 shadow-md flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300 relative z-10">
                    <FiPlay className="w-3 h-3 fill-current ml-0.5 text-primary" />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-left flex-1">
                  <span className="bg-primary text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs select-none w-fit block">
                    LEARN &amp; EARN
                  </span>

                  <h4 className="text-base font-extrabold text-gray-950 dark:text-white group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-xs text-secondary dark:text-secondary2 font-medium leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default LearnEarn;
