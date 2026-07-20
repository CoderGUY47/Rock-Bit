"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useTheme } from "@/components/themeProvider";

export const DashboardHeader = () => {
  const { data: session } = useSession();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState("EN/USDT");
  const langRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    if (isLangOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isLangOpen]);

  return (
    <header className="h-16 sticky top-0 bg-white/80 dark:bg-[#0c0d12]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6 z-20 transition-colors duration-300">
      {/* Search Input block */}
      <div className="w-[300px] relative">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search Anything..."
          className="w-full pl-10 pr-10 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs font-semibold outline-none bg-gray-50/50 dark:bg-white/5 focus:bg-white dark:focus:bg-black text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-sm leading-none">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Header controls (Right side) */}
      <div className="flex items-center gap-4">
        {/* Currency Selector Accordion */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer transition-colors"
          >
            <span>{selectedLang}</span>
            <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {isLangOpen && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-[#14151b] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl p-1 z-35 animate-[fadeIn_0.15s_ease-out]">
              {["EN/USDT", "EN/USD", "ES/USDT", "DE/EUR"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedLang(option);
                    setIsLangOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    selectedLang === option
                      ? "bg-blue-600 text-white"
                      : "text-gray-750 dark:text-gray-350 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-950 dark:hover:text-white cursor-pointer transition-colors"
          aria-label="Toggle dark/light theme"
        >
          {resolvedTheme === "dark" ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        {/* Notifications Icon */}
        <button className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-950 dark:hover:text-white cursor-pointer relative transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0c0d12] animate-pulse"></span>
        </button>

        {/* Profile Avatar Container */}
        <Link href="/admin-profile" className="w-8 h-8 rounded-full overflow-hidden shrink-0 border-2 border-gray-200 dark:border-indigo-400 relative hover:opacity-85 transition-opacity cursor-pointer">
          <Image
            src={
              session?.user.image ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
            }
            alt="User profile"
            width={32}
            height={32}
            className="w-full h-full object-cover"
            unoptimized
          />
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;
