"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiChevronUp, FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { Button } from "@/components/button";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  learnMoreUrl?: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "what-is-rockie",
    question: "What is Rock-Bit",
    answer:
      "Rock-Bit is a next-generation cryptocurrency exchange and portfolio management platform. It allows users to trade digital assets, track multi-chain portfolios in real-time, and leverage AI-powered investment insights with low latency and enterprise-grade security.",
    category: "General",
    learnMoreUrl: "/about",
  },
  {
    id: "how-to-start",
    question: "How to start with Rock-Bit",
    answer:
      "Getting started is fast and simple: 1) Create your free Rock-Bit account in under 2 minutes. 2) Secure your profile with 2-Factor Authentication (2FA). 3) Deposit fiat or crypto using credit card, bank transfer, or Web3 wallet. 4) Start trading spot markets instantly.",
    category: "Getting Started",
    learnMoreUrl: "/auth/register",
  },
  {
    id: "what-cryptocurrencies",
    question: "What Cryptocurrencies can I use to purchase",
    answer:
      "Rock-Bit supports over 100+ top cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB, Solana (SOL), Cardano (ADA), XRP, Avalanche (AVAX), Arbitrum (ARB), Optimism (OP), and major DeFi and NFT tokens.",
    category: "Trading",
    learnMoreUrl: "/markets",
  },
  {
    id: "how-to-buy-sell",
    question: "How to buy & sell in Rock-Bit",
    answer:
      "To buy or sell assets, navigate to the Buy Crypto page for instant one-click fiat purchases, or use our Spot & Exchange terminal for advanced limit, market, and stop-loss orders with live order book depth.",
    category: "Trading",
    learnMoreUrl: "/spot",
  },
  {
    id: "security-measures",
    question: "How does Rock-Bit secure user funds",
    answer:
      "User security is our highest priority. 98% of all digital assets are held in offline cold storage vaults protected by multi-signature keys and geographical dispersal. All user data is encrypted in transit and at rest.",
    category: "Security",
    learnMoreUrl: "/about",
  },
  {
    id: "withdrawal-fees",
    question: "What are the deposit & withdrawal fees",
    answer:
      "Crypto deposits are 100% free on Rock-Bit. Withdrawal fees are dynamic based on live network gas rates to ensure swift on-chain confirmation times without artificial markups.",
    category: "Fees",
    learnMoreUrl: "/checkout",
  },
];

export const FAQ = ({
  showBreadcrumbs = true,
}: {
  showBreadcrumbs?: boolean;
}) => {
  const [openId, setOpenId] = useState<string>("what-is-rockie");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "General",
    "Getting Started",
    "Trading",
    "Security",
    "Fees",
  ];

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  const filteredFaqs =
    selectedCategory === "All"
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-white dark:bg-[#0c0c0e] min-h-screen transition-colors duration-200">
      {/* ── Optional Sub-Header Breadcrumb Bar ────────────────────────────── */}
      {showBreadcrumbs && (
        <div className="border-b border-gray-100 dark:border-white/[0.03] bg-gray-50/50 dark:bg-[#141416]/20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              FAQ
            </h1>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500">
              <Link
                href="/"
                className="hover:text-indigo-600 transition-colors"
              >
                Home
              </Link>
              <span className="text-gray-300 dark:text-gray-600">/</span>
              <span className="text-gray-800 dark:text-gray-200">FAQ</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Section Container ─────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title & Subtitle */}
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base font-medium text-gray-500 dark:text-gray-400">
            Learn how to get started
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-gray-100 dark:bg-white/[0.04] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List matching the Reference UI */}
        <div className="space-y-4">
          {filteredFaqs.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="border-b border-gray-100 dark:border-white/[0.04] pb-6 pt-2 transition-colors"
              >
                {/* Accordion Header Row */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.question}
                  </span>
                  <div className="text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors p-1">
                    {isOpen ? (
                      <FiChevronUp className="w-5 h-5" />
                    ) : (
                      <FiChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Accordion Content Body */}
                {isOpen && (
                  <div className="mt-4 space-y-5 animate-[fadeIn_0.3s_ease-out]">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                      {item.answer}
                    </p>

                    {item.learnMoreUrl && (
                      <div>
                        <Button
                          size="sm"
                          asChild
                          className="bg-gray-100 hover:bg-gray-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-gray-900 dark:text-white font-bold rounded-full px-5 py-1.5 text-xs border border-gray-200 dark:border-white/[0.08] shadow-xs cursor-pointer"
                        >
                          <Link href={item.learnMoreUrl}>Learn more</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support Banner */}
        <div className="mt-16 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-500/20 rounded-3xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-600/20">
            <FiHelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Still have questions?
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Can't find the answer you're looking for? Please chat with our
              friendly AI support team.
            </p>
          </div>
          <Button
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full px-6 py-2.5 text-xs shadow-md shadow-indigo-600/20"
          >
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
