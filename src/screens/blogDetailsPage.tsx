"use client";

import React from "react";
import Link from "next/link";
import {
  FiPlay,
  FiChevronRight,
  FiGlobe,
  FiMessageSquare,
  FiClock,
  FiHeart,
  FiShare2,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function BlogDetailsPage() {
  const popularTags = [
    "Crypto",
    "Virtual Land",
    "Metaverse",
    "NFT Marketplace",
    "Token",
    "NFTs",
    "Bitcoin",
    "Arts",
    "Wallet",
  ];

  const recentPosts = [
    {
      img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=150&h=150&q=80",
      category: "LEARN & EARN",
      title: "Learn About UI8 Coin And Earn An All-Access Pass",
      date: "Feb 15, 2026",
    },
    {
      img: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=150&h=150&q=80",
      category: "MARKET TRENDS",
      title: "Understanding Liquidity Pools in Decentralized Exchanges",
      date: "Jan 28, 2026",
    },
    {
      img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=150&h=150&q=80",
      category: "SECURITY",
      title: "Best Practices for Securing Your Hardware Crypto Wallet",
      date: "Jan 10, 2026",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0c0c0e] min-h-screen transition-colors duration-200">
      {/* ── Breadcrumb sub-header ────────────────────────────────────────── */}
      <div className="border-b border-gray-100 dark:border-white/[0.03] bg-gray-50/50 dark:bg-[#141416]/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Blog Details
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <FiChevronRight className="w-3 h-3" />
            <Link
              href="/blog"
              className="hover:text-indigo-600 transition-colors"
            >
              Blog
            </Link>
            <FiChevronRight className="w-3 h-3" />
            <span className="text-gray-800 dark:text-gray-200">
              Blog Details
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Section ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ── Left Column: Blog Post content ────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">
            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500 dark:text-gray-400">
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-md uppercase tracking-wider text-[10px] shadow-sm shadow-indigo-500/10">
                Learn & Earn
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-gray-955 dark:text-white">
                  Floyd Bainbridge
                </span>
              </div>
              <span className="text-gray-300 dark:text-white/[0.08]">|</span>
              <div className="flex items-center gap-1">
                <FiClock className="w-3.5 h-3.5" />
                <span>Feb 03, 2021</span>
              </div>
            </div>

            {/* Post Title */}
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-955 dark:text-white leading-tight">
              Virtual Land In The Metaverse Is Selling For Millions Of Dollars
            </h2>

            {/* Section 1: Introduction */}
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                What is the Metaverse?
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere
                sed nec, vestibulum odio diam amet. In massa auctor integer est.
                Morbi viverra neque sagittis varius. Ornare in nibh dui ornare
                mattis vel. Volutpat aenean enim sit cras egestas diam volutpat
                integer est. Ornare in odio lorem pharetra tempor, neque sit.
                Lacus fermentum urna tellus vulputate aliquet nullam amet,
                posuere. Magna ligula et ut sagittis interdum duis. Ut sed
                tristique tempor nibh bibendum accumsan, fringilla. Eget rhoncus
                in hendrerit nascetur odio consectetur enim tristique. In
                porttitor.
              </p>
            </div>

            {/* Video Player image placeholder with rich hover effects */}
            <div className="group relative rounded-md overflow-hidden bg-gray-100 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.04] aspect-video shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=1200&h=675&q=80"
                alt="Metaverse Virtual City Video Preview"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <button
                  className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer ring-4 ring-indigo-600/10 group-hover:ring-indigo-600/30"
                  aria-label="Play video overview"
                >
                  <FiPlay className="w-6 h-6 fill-current translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Section 2: What is Virtual Land */}
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                What is Virtual Land?
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus
                quis diam integer ridiculus facilisis. Laoreet diam, lorem
                congue augue vel aenean mus. At felis, quis massa elementum
                tortor dignissim erat. Pharetra eleifend facilisis sit nisi,
                pharetra urna volutpat. Amet lacus sed lorem euismod at diam
                neque, mi. Eget congue id phasellus pulvinar id at enim feugiat
                cursus. Aliquam egestas vulputate semper ac cursus quam. Augue
                egestas morbi, amet, mauris molestie nibh. Aliquam viverra nec,
                ornare vitae. Eu etiam donec morbi purus quis quis nibh.
                Venenatis cras magna.
              </p>
            </div>

            {/* Dual Grid image section with zoom animations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="group rounded-md overflow-hidden bg-gray-100 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.04] aspect-4/3 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=600&h=450&q=80"
                  alt="Neon Metaverse City Overlay"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="group rounded-md overflow-hidden bg-gray-100 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.04] aspect-4/3 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&h=450&q=80"
                  alt="Futuristic VR Headset user"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>

            {/* Section 3: Frontier of New Economy */}
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                The Frontier of a New Economy
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
                aenean turpis nec pharetra. Eu massa egestas dolor a facilisi.
                Sed amet, ultrices at venenatis vitae ipsum ante. Cras viverra
                dui augue nulla nulla phasellus magna. Quam congue ut nibh ut
                magna non. Et elementum cursus curabitur aliquet senectus. Donec
                velit ac sed vitae vulputate lorem. Amet, amet feugiat dui
                cursus integer lectus. Malesuada eu sodales et arcu varius ac
                porta. Eu tincidunt et, tellus enim. Quisque in augue ac donec
                tellus. Libero vel magna leo nunc erat adipiscing pretium diam.
                Nibh sagittis consequat shadow-sm.
                <br />
                <br />
                Tellus interdum elit velit tincidunt egestas nunc, eu. Sit enim
                vitae neque at nulla. Libero et facilisis scelerisque velit
                gravida pellentesque amet, amet. Massa ac viverra vitae, nec
                turpis nisi. A suspendisse feugiat ac faucibus.
              </p>
            </div>

            {/* Third Single Large Image */}
            <div className="group rounded-md overflow-hidden bg-gray-100 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.04] aspect-[16/7] shadow-md">
              <img
                src="https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?auto=format&fit=crop&w=1200&h=500&q=80"
                alt="Metaverse Portal Horizon"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
            </div>

            {/* Section 4: Value Creation Machine */}
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                The Value Creation Machine
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                iaculis laoreet morbi malesuada. Ligula semper faucibus eu
                posuere enim diam. Pharetra amet velit lacus, montes, justo.
                Tortor, lorem vivamus ut in mi ipsum sit sollicitudin dolor.
                Nunc justo cras sed sollicitudin in. Lacus euismod hendrerit
                duis pellentesque urna pulvinar lacinia. Platea tempor tellus,
                amet odio mauris cursus pharetra. Massa nec, pretium scelerisque
                nulla. Quam vitae vulputate et nunc nibh vestibulum consectetur.
                Viverra non scelerisque quem rhoncus id diam. Proin.
              </p>
            </div>

            {/* Footer tags and share icons row */}
            <div className="pt-8 border-t border-gray-100 dark:border-white/[0.03] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-1">
                  Tags:
                </span>
                <span className="px-3.5 py-1.5 border border-gray-200 dark:border-white/[0.06] hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 rounded-md text-xs font-bold text-gray-700 dark:text-gray-300 transition-colors cursor-pointer">
                  Metaverse
                </span>
                <span className="px-3.5 py-1.5 border border-gray-200 dark:border-white/[0.06] hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 rounded-md text-xs font-bold text-gray-700 dark:text-gray-300 transition-colors cursor-pointer">
                  NFT Marketplace
                </span>
                <span className="px-3.5 py-1.5 border border-gray-200 dark:border-white/[0.06] hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 rounded-md text-xs font-bold text-gray-700 dark:text-gray-300 transition-colors cursor-pointer">
                  Virtual Land
                </span>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-1">
                  Share:
                </span>
                <div className="flex gap-2.5">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/[0.05] hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/10 transition-all"
                  >
                    <FaFacebookF className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/[0.05] hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/10 transition-all"
                  >
                    <FaInstagram className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/[0.05] hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/10 transition-all"
                  >
                    <FaYoutube className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/[0.05] hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/10 transition-all"
                  >
                    <FaXTwitter className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Sidebar ──────────────────────────────────────── */}
          <div className="space-y-10">
            {/* Recent Posts widget */}
            <div className="bg-white dark:bg-[#141416]/50 border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs space-y-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider pb-2.5 border-b border-gray-100 dark:border-white/[0.03]">
                Recent Post
              </h3>

              <div className="space-y-6">
                {recentPosts.map((post, idx) => (
                  <div key={idx} className="flex gap-4 group cursor-pointer">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-50 dark:bg-white/[0.02] shrink-0 border border-gray-100 dark:border-white/[0.03]">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-1.5 grow min-w-0">
                      <span className="text-[9px] text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-bold block">
                        {post.category}
                      </span>
                      <h4 className="text-xs font-bold text-gray-950 dark:text-white leading-snug hover:text-indigo-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags widget */}
            <div className="bg-white dark:bg-[#141416]/50 border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs space-y-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider pb-2.5 border-b border-gray-100 dark:border-white/[0.03]">
                Popular tags
              </h3>

              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 border border-gray-200 dark:border-white/[0.06] hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 rounded-md text-[11px] font-bold text-gray-700 dark:text-gray-300 transition-all cursor-pointer hover:bg-indigo-50/50 dark:hover:bg-indigo-950/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
