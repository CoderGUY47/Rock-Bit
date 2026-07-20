"use client";

/**
 * DashboardSidebar Component
 * Admin navigation sidebar featuring 3D logo, collapsible dropdowns, and route highlighting.
 */
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLogout = () => {
    router.push("/auth/login");
  };

  const isActive = (path: string) => {
    if (path === "/admin-home") {
      return pathname === "/admin-home";
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 bg-white dark:bg-[#0c0d12]/95 border-r border-gray-200 dark:border-white/10 flex flex-col justify-between select-none z-30 font-sans transition-colors duration-300">
      {/* Upper Section */}
      <div className="flex flex-col grow overflow-y-auto scrollbar-none">
        {/* Logo block */}
        <div className="px-6 py-5 flex items-center gap-3 border-b border-gray-100 dark:border-white/5 shrink-0">
          <div className="w-9 h-9 shrink-0 overflow-hidden flex items-center justify-center relative">
            <Image
              src="/assets/images/3d-logo.png"
              alt="Rock-Bit Logo"
              width={36}
              height={36}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-gray-950 dark:text-white">
              Rock-Bit
            </span>
          </div>
        </div>

        {/* Navigation Section 1 */}
        <div className="px-4 py-6 space-y-1">
          {/* Home Link */}
          <Link
            href="/admin-home"
            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              isActive("/admin-home")
                ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:bg-blue-750"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Home
          </Link>

          {/* Checkout Link */}
          <Link
            href="/admin-checkout"
            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              pathname === "/admin-checkout"
                ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            Checkout
          </Link>

          {/* Market Link */}
          <Link
            href="/admin-markets"
            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              isActive("/admin-markets")
                ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
            Market
          </Link>

          {/* Exchange Link */}
          <Link
            href="/admin-exchange"
            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              pathname === "/admin-exchange"
                ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L17.5 12M21 7.5H7.5" />
            </svg>
            Exchange
          </Link>

          {/* Spot Link */}
          <Link
            href="/admin-spot"
            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              isActive("/admin-spot")
                ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Spot
          </Link>

          {/* ByFi Center Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("byfi")}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                </svg>
                ByFi Center
              </div>
              <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "byfi" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {openDropdown === "byfi" && (
              <div className="pl-12 pr-4 py-2 space-y-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                <Link href="/admin-byfi/dual-asset" className="block py-1.5 hover:text-blue-600 transition-colors cursor-pointer">Dual Asset</Link>
                <Link href="/admin-byfi/defi-mining" className="block py-1.5 hover:text-blue-600 transition-colors cursor-pointer">Defi Staking</Link>
                <Link href="/admin-byfi/liquid-mining" className="block py-1.5 hover:text-blue-600 transition-colors cursor-pointer">Liquid Mining</Link>
              </div>
            )}
          </div>

          {/* More Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("more")}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                More
              </div>
              <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "more" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {openDropdown === "more" && (
              <div className="pl-12 pr-4 py-2 space-y-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                <Link href="/blog" className="block py-1.5 hover:text-blue-600 transition-colors">Blog</Link>
                <Link href="/faq" className="block py-1.5 hover:text-blue-600 transition-colors">FAQs</Link>
                <Link href="/about" className="block py-1.5 hover:text-blue-600 transition-colors">About Us</Link>
                <Link href="/contact" className="block py-1.5 hover:text-blue-600 transition-colors">Contact</Link>
              </div>
            )}
          </div>
        </div>

        {/* Separator */}
        <hr className="border-gray-100 dark:border-white/5 my-2 mx-4" />

        {/* Navigation Section 2 */}
        <div className="px-4 py-2 space-y-1">
          {/* Asset Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("asset")}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
                </svg>
                Asset
              </div>
              <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "asset" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {openDropdown === "asset" && (
              <div className="pl-12 pr-4 py-2 space-y-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                <Link href="/admin-assets/overview" className="block py-1.5 hover:text-blue-600 transition-colors">Overview</Link>
                <Link href="/admin-assets/transfer" className="block py-1.5 hover:text-blue-600 transition-colors">Transfer</Link>
                <Link href="/admin-assets/history" className="block py-1.5 hover:text-blue-600 transition-colors">History</Link>
              </div>
            )}
          </div>

          {/* Orders & Trades Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("orders")}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Order & Trades
              </div>
              <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === "orders" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {openDropdown === "orders" && (
              <div className="pl-12 pr-4 py-2 space-y-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                <Link href="/admin-orders" className="block py-1.5 hover:text-blue-600 transition-colors">Active Orders</Link>
                <Link href="/admin-orders" className="block py-1.5 hover:text-blue-600 transition-colors">Trade History</Link>
              </div>
            )}
          </div>

          {/* Wallet Link */}
          <Link
            href="/admin-wallet"
            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              isActive("/admin-wallet")
                ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18-2.25A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75m18 0V9M3 6.75V9" />
            </svg>
            Wallet
          </Link>

          {/* Profile Link */}
          <Link
            href="/admin-profile"
            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              isActive("/admin-profile")
                ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Profile
          </Link>
        </div>
      </div>

      {/* Logout button at bottom */}
      <div className="p-4 border-t border-gray-100 dark:border-white/5 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 transition-colors duration-200 cursor-pointer text-left"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M19.5 12l-3-3m3 3l-3 3m3-3H9" />
          </svg>
          Log out
        </button>
      </div>
    </aside>
  );
};
export default DashboardSidebar;
