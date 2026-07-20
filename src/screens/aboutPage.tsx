"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiShield,
  FiCpu,
  FiZap,
  FiGlobe,
  FiChevronRight,
  FiAward,
  FiCheckCircle,
  FiLock,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "security">(
    "mission",
  );

  const stats = [
    { label: "Quarterly Volume", value: "$45B+", change: "+124% YoY" },
    {
      label: "Registered Traders",
      value: "2.5M+",
      change: "Across 150+ Countries",
    },
    { label: "Order Match Latency", value: "< 1ms", change: "500k TPS Engine" },
    {
      label: "Vault Security",
      value: "99.9%",
      change: "Cold Storage Dispersal",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Inception & Architecture",
      desc: "Founded with a vision to build a zero-compromise cryptographic exchange platform combining high-frequency trading speed with institutional security.",
    },
    {
      year: "2024",
      title: "AI Ecosystem Launch",
      desc: "Introduced real-time AI recommendation engines and automated portfolio tracking tools for retail and institutional traders.",
    },
    {
      year: "2025",
      title: "Multi-Chain Liquidity",
      desc: "Expanded across 15+ blockchain networks including Solana, Arbitrum, and Polygon with zero-gas routing capabilities.",
    },
    {
      year: "2026",
      title: "Rock-Bit 2.0 Ecosystem",
      desc: "Launched next-generation web interface, high-speed spot trading terminal, and instant fiat checkout integrations.",
    },
  ];

  const team = [
    {
      name: "Alex Rivera",
      role: "Founder & Chief Executive Officer",
      bio: "Former Head of Cryptographic Systems at leading fintech firms with 12+ years of distributed systems experience.",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      initials: "AR",
    },
    {
      name: "Elena Rostova",
      role: "Chief Technology Officer",
      bio: "Pioneer in artificial intelligence and high-frequency order matching engines. Ph.D. in Computer Science.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      initials: "ER",
    },
    {
      name: "David Chen",
      role: "Head of Quantitative Research",
      bio: "Specializes in algorithmic liquidity management, automated market making, and multi-chain smart contracts.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      initials: "DC",
    },
    {
      name: "Sarah Jenkins",
      role: "VP of Product & Security",
      bio: "Oversees cold-storage vault infrastructure, multisig governance protocols, and global regulatory compliance.",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      initials: "SJ",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0c0c0e] min-h-screen transition-colors duration-200">
      {/* ── Breadcrumb Sub-Header Bar ──────────────────────────────────────── */}
      <div className="border-b border-gray-100 dark:border-white/[0.03] bg-gray-50/50 dark:bg-[#141416]/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <FiChevronRight className="w-3 h-3" />
            <span className="text-gray-800 dark:text-gray-200">About</span>
          </div>
        </div>
      </div>

      {/* ── Hero Banner Section ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-gray-100 dark:border-white/[0.04]">
        {/* Soft Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-950 dark:text-white leading-[1.1] tracking-tight">
                Redefining The Future Of <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
                  Digital Asset Exchange
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-2xl">
                Rock-Bit was engineered to bridge institutional-grade
                cryptographic security with an intuitive, ultra-fast trading
                interface powered by artificial intelligence.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/auth/register"
                  className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full text-xs shadow-lg shadow-indigo-600/25 transition-all hover:scale-105"
                >
                  Join Rock-Bit Today
                </Link>
                <Link
                  href="/markets"
                  className="px-8 py-3.5 bg-gray-100 dark:bg-white/[0.05] hover:bg-gray-200 dark:hover:bg-white/[0.1] text-gray-900 dark:text-white font-bold rounded-full text-xs border border-gray-200 dark:border-white/[0.08] transition-all"
                >
                  Explore Markets
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual Graphic */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-gray-200/80 dark:border-white/[0.08] p-8 shadow-2xl backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/[0.06] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-600/30">
                      R
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                        Rock-Bit Platform
                      </h4>
                      <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Operational • 99.99% Uptime
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-md uppercase">
                    Verified
                  </span>
                </div>

                {/* Micro Stat Cards */}
                <div className="space-y-3">
                  <div className="bg-white/80 dark:bg-[#141416]/80 p-4 rounded-2xl border border-gray-100 dark:border-white/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FiZap className="w-5 h-5 text-indigo-500" />
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                        Matching Speed
                      </span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      0.8ms
                    </span>
                  </div>

                  <div className="bg-white/80 dark:bg-[#141416]/80 p-4 rounded-2xl border border-gray-100 dark:border-white/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FiShield className="w-5 h-5 text-emerald-500" />
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                        Cold Vault Security
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-500">
                      Multisig 3/5
                    </span>
                  </div>

                  <div className="bg-white/80 dark:bg-[#141416]/80 p-4 rounded-2xl border border-gray-100 dark:border-white/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FiCpu className="w-5 h-5 text-purple-500" />
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                        AI Intelligence
                      </span>
                    </div>
                    <span className="text-xs font-bold text-purple-500">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Metrics Section ───────────────────────────────────────────── */}
      <section className="py-12 bg-gray-50/60 dark:bg-[#141416]/30 border-b border-gray-100 dark:border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#141416] p-6 rounded-2xl border border-gray-100 dark:border-white/[0.04] shadow-xs space-y-1 text-center sm:text-left"
              >
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                  {s.label}
                </span>
                <span className="text-3xl sm:text-4xl font-bold text-gray-950 dark:text-white tracking-tight block">
                  {s.value}
                </span>
                <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 block">
                  {s.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission, Vision & Security Tabs Section ───────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              OUR FOUNDATIONAL PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 dark:text-white tracking-tight">
              Driven By Innovation &amp; Integrity
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              We combine enterprise security with cutting-edge artificial
              intelligence to deliver an unparalleled trading experience.
            </p>
          </div>

          {/* Interactive Core Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white dark:bg-[#141416] p-8 rounded-3xl border border-gray-200/80 dark:border-white/[0.05] hover:border-indigo-500/40 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiShield className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Institutional Security
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                  98% of all digital assets remain in offline cold storage
                  vaults protected by multi-signature keys and geographical
                  dispersal.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
                  <span>Multisig Key Governance</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
                  <span>AES-256 Encryption at Rest</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="group bg-white dark:bg-[#141416] p-8 rounded-3xl border border-gray-200/80 dark:border-white/[0.05] hover:border-purple-500/40 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiCpu className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  AI Intelligence Engine
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                  Our embedded conversational AI and automated recommendation
                  model help users discover market trends and optimize holdings.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
                  <span>Personalized Asset Matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
                  <span>24/7 Automated Assistant</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="group bg-white dark:bg-[#141416] p-8 rounded-3xl border border-gray-200/80 dark:border-white/[0.05] hover:border-blue-500/40 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiZap className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  500k TPS Engine
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                  High-frequency order matching engine capable of executing
                  500,000 transactions per second with sub-millisecond latency.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
                  <span>Zero-Slippage Spot Execution</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
                  <span>Realtime WebSocket Feeds</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visual Milestones Timeline ────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-gray-50/50 dark:bg-[#141416]/20 border-y border-gray-100 dark:border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 dark:text-white tracking-tight">
              Platform Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#141416] p-6 rounded-2xl border border-gray-200/70 dark:border-white/[0.05] shadow-xs space-y-3 relative group hover:border-indigo-500/40 transition-colors"
              >
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 block">
                  {m.year}
                </span>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  {m.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Team Section ────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 dark:text-white tracking-tight">
              Meet The Founders
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Backed by seasoned blockchain engineers, security researchers, and
              financial quantitative analysts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((t, idx) => (
              <div
                key={idx}
                className="group bg-white dark:bg-[#141416] rounded-3xl overflow-hidden border border-gray-200/80 dark:border-white/[0.05] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-white/5">
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-3 text-white text-base">
                      <a
                        href="#"
                        className="hover:text-indigo-400 transition-colors"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href="#"
                        className="hover:text-indigo-400 transition-colors"
                      >
                        <FaXTwitter />
                      </a>
                      <a
                        href="#"
                        className="hover:text-indigo-400 transition-colors"
                      >
                        <FaGithub />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-2 grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-950 dark:text-white">
                      {t.name}
                    </h3>
                    <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {t.role}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium pt-2 leading-relaxed">
                      {t.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
