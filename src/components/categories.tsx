"use client";

import Link from "next/link";

interface Category {
  title: string;
  icon: string;
  desc: string;
}

const CRYPTO_CATEGORIES: Category[] = [
  {
    title: "DeFi",
    icon: "🏦",
    desc: "Decentralized lending, borrowing, and yield assets.",
  },
  {
    title: "Layer 1s",
    icon: "⛓️",
    desc: "Base layer protocols like Bitcoin, Ethereum, and Solana.",
  },
  {
    title: "Layer 2s",
    icon: "⚡",
    desc: "Scaling solutions improving throughput and fees.",
  },
  {
    title: "Meme Coins",
    icon: "🐕",
    desc: "Community-driven tokens with high viral growth.",
  },
  {
    title: "Stablecoins",
    icon: "💵",
    desc: "Fiat-pegged assets maintaining stable valuations.",
  },
  {
    title: "Web3 & NFTs",
    icon: "🌐",
    desc: "Metaverse, gaming, and digital collectable ecosystems.",
  },
];

export const Categories = () => {
  return (
    <section
      id="categories"
      className="py-20 bg-gray-50 dark:bg-[#1f2128] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Explore Asset Classes
          </h2>
          <p className="mt-4 text-base text-[#777e90] dark:text-[#b1b5c3] max-w-2xl mx-auto">
            Discover a wide variety of tokens organized by category to suit your
            investment strategy.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CRYPTO_CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              href="/markets"
              className="bg-white dark:bg-[#23262f] p-8 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="text-4xl mb-6 bg-gray-50 dark:bg-[#141416] w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {cat.title}
              </h3>
              <p className="text-xs text-[#777e90] dark:text-[#b1b5c3] leading-relaxed">
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
