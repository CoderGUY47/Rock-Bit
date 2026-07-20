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
    description:
      "Understand staking mechanisms, liquidity incentives, and pool dynamics.",
    image: "/assets/images/learn-earn-2.png",
    link: "/article/liquidity-pools",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021",
  },
  {
    id: 2,
    title: "Staking and Yield Farming Basics",
    description:
      "Learn how to yield interest by locking up your crypto assets safely.",
    image: "/assets/images/learn-earn-3.png",
    link: "/article/staking-basics",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021",
  },
  {
    id: 3,
    title: "Understanding Crypto Governance & DAOs",
    description:
      "Master governance tokens, voting power, and decentralized organizations.",
    image: "/assets/images/learn-earn-4.png",
    link: "/article/crypto-governance",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021",
  },
  {
    id: 4,
    title: "Security & Private Keys Best Practices",
    description:
      "Protect your ledger, cold storage backup, and prevent wallet drainage.",
    image: "/assets/images/learn-earn-5.png",
    link: "/article/crypto-security",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021",
  },
];

const THREE_COL_ARTICLES = [
  {
    id: 1,
    title: "Learn about UI8 coin and earn an All-Access Pass",
    image: "/assets/images/learn-earn-1.png",
    link: "/article/ui8-coin",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021",
  },
  {
    id: 2,
    title: "Understanding Liquidity Pools in Decentralized Exchanges",
    image: "/assets/images/learn-earn-2.png",
    link: "/article/liquidity-pools",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021",
  },
  {
    id: 3,
    title: "Best Practices for Securing Your Hardware Crypto Wallet",
    image: "/assets/images/learn-earn-3.png",
    link: "/article/hardware-wallet",
    author: "Floyd Bainbridge",
    date: "Feb 03, 2021",
  },
];

export const LearnEarn: React.FC<LearnEarnProps> = ({ limitTo3 = false }) => {
  if (limitTo3) {
    return (
      <section className="py-16 bg-white dark:bg-[#0c0c0e] transition-colors duration-300">
        <div className="w-[75%] mx-auto space-y-10">
          <div className="space-y-3 text-left">
            <h2 className="text-3xl font-bold text-gray-950 dark:text-white tracking-tight">
              Learn &amp; Earn
            </h2>
            <p className="text-sm text-secondary dark:text-secondary2 font-medium leading-relaxed max-w-lg">
              Discover how specific cryptocurrencies work — and get a bit of
              each crypto to try out for yourself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {THREE_COL_ARTICLES.map((article) => (
              <div
                key={article.id}
                className="group bg-white dark:bg-[#141416] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/[0.05] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100 dark:bg-white/5">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <FiPlay className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between grow space-y-4">
                  <h3 className="text-base font-bold text-gray-950 dark:text-white leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/[0.05] text-xs font-bold text-secondary dark:text-secondary2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>{article.author}</span>
                    </div>
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#f8f9fa] dark:bg-[#0c0c0e] transition-colors duration-300 border-t border-gray-100 dark:border-gray-900 select-none">
      <div className="w-[75%] mx-auto space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-950 dark:text-white tracking-tight leading-tight">
              Learn &amp; Earn Crypto
            </h2>
            <p className="text-xs text-secondary dark:text-secondary2 font-medium leading-relaxed">
              Expand your blockchain knowledge, complete quick interactive
              modules, and receive free crypto rewards directly into your wallet
              balance.
            </p>
          </div>

          <Button
            size="default"
            asChild
            className="bg-primary hover:bg-interactive text-white font-bold rounded-md px-6 py-2.5 text-xs shadow-md shadow-primary/20 shrink-0"
          >
            <Link href="/blog">Browse All Tutorials</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Featured Card */}
          <div className="lg:col-span-6 group bg-white dark:bg-[#141416] rounded-md overflow-hidden border border-gray-100 dark:border-white/[0.05] shadow-xs flex flex-col justify-between">
            {/* Image covers top edge-to-edge */}
            <div className="relative aspect-16/9 w-full bg-gray-100 dark:bg-white/5">
              <Image
                src="/assets/images/learn-earn-1.png"
                alt="Learn about UI8 coin"
                fill
                className="object-cover group-hover:scale-103 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 text-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-108 transition-transform">
                  <FiPlay className="w-5 h-5 fill-current translate-x-0.5" />
                </div>
              </div>
            </div>

            {/* Bottom info section with padding */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                  FEATURED COURSE
                </span>
                <h3 className="text-xl font-bold text-gray-950 dark:text-white leading-tight">
                  Learn about UI8 coin and earn an All-Access Pass
                </h3>
                <p className="text-xs text-secondary dark:text-secondary2 font-medium leading-relaxed">
                  Discover the fundamentals of governance tokens, liquidity
                  staking, and web3 ecosystem integration in this complete
                  introductory guide.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/[0.05] text-[11px] font-bold text-secondary dark:text-secondary2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Floyd Bainbridge</span>
                </div>
                <span>Feb 03, 2021</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 vertical items */}
          <div className="lg:col-span-6 flex flex-col justify-start gap-3">
            {ARTICLES.map((art) => (
              <div
                key={art.id}
                className="group bg-white dark:bg-[#141416] p-3 rounded-md border border-gray-100 dark:border-white/[0.05] hover:border-indigo-500/30 shadow-xs hover:shadow-sm transition-all duration-300 flex items-center gap-4 cursor-pointer"
              >
                {/* Thumbnail image */}
                <div className="w-48 h-30 shrink-0 relative rounded-md overflow-hidden bg-gray-100 dark:bg-white/5">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-fill group-hover:scale-103 transition-transform duration-300"
                    unoptimized
                  />
                  {/* Backdrop for play button */}
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-white/95 shadow-md flex items-center justify-center text-indigo-600">
                      <FiPlay className="w-2.5 h-2.5 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>

                <div className="grow space-y-1">
                  <h4 className="text-base font-bold text-gray-950 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-1">
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-secondary dark:text-secondary2 font-medium line-clamp-1 leading-normal">
                    {art.description}
                  </p>
                  <div className="flex items-center gap-3 pt-0.5 text-[10px] font-bold text-secondary dark:text-secondary2">
                    <span>{art.author}</span>
                    <span>•</span>
                    <span>{art.date}</span>
                  </div>
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
