"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/components/themeProvider";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/button";

// React Icons
import {
  FiSun,
  FiMoon,
  FiBell,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { BsDropletFill } from "react-icons/bs";

export const Navbar = () => {
  const { data: session } = useSession();
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"assets" | "orders" | "settings" | null>(null);
  const [lang, setLang] = useState("EN");
  const [fiat, setFiat] = useState("USD");

  const handleLogout = async () => {
    try {
      await signOut();
      setMobileMenuOpen(false);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 dark:bg-[#0c0c0e]/70 backdrop-blur-md border-0 text-on-surface dark:text-white transition-colors duration-200">
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center h-14">
          {/* Left Side: Logo & Navigation row */}
          <div className="flex items-center h-full gap-4 lg:gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-2xl tracking-tighter shrink-0 text-[#23262f] dark:text-white animate-[fadeIn_0.5s_ease-out]"
            >
              <div className="w-11 h-11 shrink-0 overflow-hidden flex items-center justify-center relative">
                <Image
                  src="/assets/images/3d-logo.png"
                  alt="Rock-Bit Logo"
                  fill
                  className="object-contain transition-all duration-300 dark:brightness-125 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.45)]"
                  unoptimized
                />
              </div>
              <span>Rock-Bit</span>
            </Link>

            {/* Desktop Navigation Links with active path indicator */}
            <div className="hidden xl:flex items-center h-full">
              {/* Standard text links */}
              <div className="flex items-center h-full">
                <Link
                  href="/checkout"
                  className={pathname === "/checkout" ? "h-full px-5 flex items-center text-sm font-semibold bg-primary text-white transition-colors" : "h-full px-5 flex items-center text-sm font-semibold text-secondary hover:bg-primary hover:text-white dark:text-secondary2 dark:hover:text-white transition-colors"}
                >
                  Buy Crypto
                </Link>
                <Link
                  href="/markets"
                  className={pathname === "/markets" ? "h-full px-5 flex items-center text-sm font-semibold bg-primary text-white transition-colors" : "h-full px-5 flex items-center text-sm font-semibold text-secondary hover:bg-primary hover:text-white dark:text-secondary2 dark:hover:text-white transition-colors"}
                >
                  Markets
                </Link>
                <Link
                  href="/exchange"
                  className={pathname === "/exchange" ? "h-full px-5 flex items-center text-sm font-semibold bg-primary text-white transition-colors" : "h-full px-5 flex items-center text-sm font-semibold text-secondary hover:bg-primary hover:text-white dark:text-secondary2 dark:hover:text-white transition-colors"}
                >
                  Exchange
                </Link>
                <Link
                  href="/spot"
                  className={pathname === "/spot" ? "h-full px-5 flex items-center text-sm font-semibold bg-primary text-white transition-colors" : "h-full px-5 flex items-center text-sm font-semibold text-secondary hover:bg-primary hover:text-white dark:text-secondary2 dark:hover:text-white transition-colors"}
                >
                  Spot
                </Link>
                <Link
                  href="/"
                  className="h-full px-5 flex items-center gap-1.5 text-sm font-semibold text-secondary hover:bg-primary hover:text-white dark:text-secondary2 dark:hover:text-white transition-colors group"
                >
                  <span>BITUSDT</span>
                  <BsDropletFill className="text-primary group-hover:text-white w-2.5 h-2.5 transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Selectors, Vertical Separator, Actions */}
          <div className="hidden md:flex items-center h-full gap-2">
            {/* Dropdown selectors — full-height active, same as left nav */}
            <div className="flex items-center h-full text-sm font-semibold text-secondary dark:text-secondary2 gap-1">
              {/* Assets Dropdown Accordion */}
              <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setOpenDropdown("assets")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href="/assets"
                  className={pathname === "/assets" ? "h-full px-5 flex items-center bg-primary text-white transition-colors" : "h-full px-5 flex items-center hover:bg-primary hover:text-white dark:text-secondary2 dark:hover:text-white transition-colors"}
                >
                  Assets
                </Link>
                
                {openDropdown === "assets" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-56 bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.08] shadow-xl rounded-xl p-3 animate-[fadeIn_0.15s_ease-out] z-50">
                    <div className="space-y-1.5 text-left">
                      <Link href="/assets" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors text-gray-900 dark:text-white">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">Wallet Balances</span>
                          <span className="text-[10px] text-gray-400 font-semibold">View and manage portfolio</span>
                        </div>
                      </Link>
                      <Link href="/assets" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors text-gray-900 dark:text-white">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">Quick Deposit</span>
                          <span className="text-[10px] text-gray-400 font-semibold">Add funds instantly</span>
                        </div>
                      </Link>
                      <Link href="/assets" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors text-gray-900 dark:text-white">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">Withdraw Funds</span>
                          <span className="text-[10px] text-gray-400 font-semibold">Transfer crypto out</span>
                        </div>
                      </Link>
                      <Link href="/assets" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors text-gray-900 dark:text-white">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">Convert Crypto</span>
                          <span className="text-[10px] text-gray-400 font-semibold">Swap zero fees</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Orders Dropdown Accordion */}
              <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setOpenDropdown("orders")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href="/orders"
                  className={pathname === "/orders" ? "h-full px-5 flex items-center bg-primary text-white transition-colors" : "h-full px-5 flex items-center hover:bg-primary hover:text-white dark:text-secondary2 dark:hover:text-white transition-colors"}
                >
                  Orders & Trades
                </Link>
                
                {openDropdown === "orders" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-56 bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.08] shadow-xl rounded-xl p-3 animate-[fadeIn_0.15s_ease-out] z-50">
                    <div className="space-y-1.5 text-left">
                      <Link href="/orders" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors text-gray-900 dark:text-white">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">Active Orders</span>
                          <span className="text-[10px] text-gray-400 font-semibold">View and cancel limits</span>
                        </div>
                      </Link>
                      <Link href="/orders" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors text-gray-900 dark:text-white">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">Trade History</span>
                          <span className="text-[10px] text-gray-400 font-semibold">Past filled positions</span>
                        </div>
                      </Link>
                      <Link href="/fees" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors text-gray-900 dark:text-white">
                        <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">Trading Fees</span>
                          <span className="text-[10px] text-gray-400 font-semibold">VIP tier structure</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* EN/USD Dropdown Accordion */}
              <div 
                className="relative h-full flex items-center"
                onMouseEnter={() => setOpenDropdown("settings")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="h-full px-5 flex items-center gap-1 hover:bg-primary hover:text-white text-gray-400 dark:text-gray-550 dark:hover:text-white transition-colors cursor-pointer outline-none select-none">
                  <span>{lang}/{fiat}</span>
                </button>
                
                {openDropdown === "settings" && (
                  <div className="absolute right-0 top-full w-64 bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.08] shadow-xl rounded-xl p-4 animate-[fadeIn_0.15s_ease-out] z-50 space-y-4">
                    {/* Language Selector */}
                    <div className="space-y-2 text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Language</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { key: "EN", name: "English" },
                          { key: "ES", name: "Español" },
                          { key: "DE", name: "Deutsch" },
                          { key: "FR", name: "Français" },
                          { key: "BD", name: "বাংলা" },
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setLang(item.key)}
                            className={`px-2 py-1.5 rounded-md text-[10px] font-bold text-left transition-colors cursor-pointer ${
                              lang === item.key
                                ? "bg-indigo-600 text-white"
                                : "hover:bg-gray-100 dark:hover:bg-white/[0.04] text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-white/[0.04]" />

                    {/* Fiat Currency Selector */}
                    <div className="space-y-2 text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Currency</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { key: "USD", name: "USD ($)" },
                          { key: "EUR", name: "EUR (€)" },
                          { key: "GBP", name: "GBP (£)" },
                          { key: "JPY", name: "JPY (¥)" },
                          { key: "BDT", name: "BDT (৳)" },
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setFiat(item.key)}
                            className={`px-2 py-1.5 rounded-md text-[10px] font-bold text-left transition-colors cursor-pointer ${
                              fiat === item.key
                                ? "bg-indigo-600 text-white"
                                : "hover:bg-gray-100 dark:hover:bg-white/[0.04] text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Vertical separator line */}
            <div className="border-l border-gray-200 dark:border-gray-850 h-5" />

            {/* Actions: Theme Toggle, Notifications, Wallet */}
            <div className="flex items-center gap-4">
              {/* Light/Dark Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle dark/light theme"
              >
                {resolvedTheme === "dark" ? (
                  <FiSun className="w-4.5 h-4.5" />
                ) : (
                  <FiMoon className="w-4.5 h-4.5" />
                )}
              </Button>

              {session ? (
                <>
                  {/* Notifications Bell */}
                  <Button variant="ghost" size="icon" className="relative">
                    <FiBell className="w-4.5 h-4.5" />
                    <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  </Button>

                  {/* Wallet Button */}
                  <Link href="/wallet">
                    <Button variant="outline" size="default" className="rounded-full">
                      Wallet
                    </Button>
                  </Link>

                  {/* Profile Avatar Container */}
                  <Link href="/profile" className="w-8 h-8 rounded-full overflow-hidden shrink-0 border-2 border-black/15 dark:border-indigo-400 relative hover:opacity-85 transition-opacity">
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

                  {/* Logout Button */}
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="font-bold text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-sm font-bold text-gray-900 dark:text-white hover:text-primary transition-colors py-2 px-4 cursor-pointer">
                    Login
                  </Link>
                  <Link href="/auth/register" className="bg-primary hover:bg-primary/95 text-white font-bold text-sm rounded-full px-6 py-2.5 shadow-md shadow-primary/10 transition-all hover:scale-102 cursor-pointer">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {resolvedTheme === "dark" ? (
                <FiSun className="w-4.5 h-4.5" />
              ) : (
                <FiMoon className="w-4.5 h-4.5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#141416] border-t border-gray-100 dark:border-on-surface shadow-lg py-4 px-6 space-y-4">
          <div className="space-y-3 text-gray-700 dark:text-gray-200">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block text-base font-semibold hover:text-primary"
            >
              Homepage
            </Link>
            <Link
              href="/checkout"
              onClick={closeMobileMenu}
              className="block text-base font-semibold hover:text-primary"
            >
              Buy Crypto
            </Link>
            <Link
              href="/markets"
              onClick={closeMobileMenu}
              className="block text-base font-semibold hover:text-primary"
            >
              Markets
            </Link>
            <Link
              href="/dashboard"
              onClick={closeMobileMenu}
              className="block text-base font-semibold hover:text-primary"
            >
              Exchange
            </Link>
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="block text-base font-semibold hover:text-primary"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="block text-base font-semibold hover:text-primary"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              onClick={closeMobileMenu}
              className="block text-base font-semibold hover:text-primary"
            >
              Blog
            </Link>
            <Link
              href="/faq"
              onClick={closeMobileMenu}
              className="block text-base font-semibold hover:text-primary"
            >
              FAQ
            </Link>
            {session && (
              <Link
                href="/items/manage"
                onClick={closeMobileMenu}
                className="block text-base font-semibold hover:text-primary"
              >
                Manage Items
              </Link>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-on-surface flex flex-col gap-3">
            {session ? (
              <>
                <Link href="/wallet" onClick={closeMobileMenu} className="w-full">
                  <Button variant="outline" className="w-full justify-center rounded-full">
                    Wallet
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="w-full justify-center rounded-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild className="w-full justify-center rounded-full">
                  <Link href="/auth/login" onClick={closeMobileMenu}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="w-full justify-center rounded-full">
                  <Link href="/auth/register" onClick={closeMobileMenu}>
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
