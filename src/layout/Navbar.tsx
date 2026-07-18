"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

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
    setPagesDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 dark:bg-[#0c0c0e]/70 backdrop-blur-md border-0 text-on-surface dark:text-white transition-colors duration-200">
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center h-14">
          {/* Left Side: Logo & Navigation row */}
          <div className="flex items-center h-full gap-8 lg:gap-12">
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

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center h-full">
              {/* Standard text links */}
              <div className="flex items-center h-full">
                <Link
                  href="/checkout"
                  className="h-full px-5 flex items-center text-sm font-semibold text-secondary hover:bg-primary hover:text-white dark:text-secondary2 dark:hover:text-white transition-colors"
                >
                  Buy Crypto
                </Link>
                <Link
                  href="/markets"
                  className="h-full px-5 flex items-center text-sm font-semibold text-secondary hover:bg-primary hover:text-white dark:text-secondary2 dark:hover:text-white transition-colors"
                >
                  Markets
                </Link>
                <Link
                  href="/exchange"
                  className="h-full px-5 flex items-center text-sm font-semibold text-secondary hover:bg-primary hover:text-white dark:text-secondary2 dark:hover:text-white transition-colors"
                >
                  Exchange
                </Link>
                <Link
                  href="/spot"
                  className="h-full px-5 flex items-center text-sm font-semibold text-secondary hover:bg-primary hover:text-white dark:text-secondary2 dark:hover:text-white transition-colors"
                >
                  Spot
                </Link>

                {/* Pages Dropdown */}
                <div className="relative h-full flex items-center">
                  <button
                    onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                    className="h-full px-5 flex items-center gap-1.5 text-sm font-semibold text-secondary hover:bg-primary hover:text-white dark:text-secondary2 dark:hover:text-white transition-colors outline-none cursor-pointer"
                  >
                    <span>Pages</span>
                    <FiChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {pagesDropdownOpen && (
                    <div className="absolute top-[56px] left-0 w-48 bg-white dark:bg-on-surface rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 space-y-1 text-gray-700 dark:text-gray-200 z-50">
                      <Link
                        href="/about"
                        onClick={() => setPagesDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm font-semibold hover:bg-gray-55 dark:hover:bg-gray-800 rounded-xl"
                      >
                        About Page
                      </Link>
                      <Link
                        href="/contact"
                        onClick={() => setPagesDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm font-semibold hover:bg-gray-55 dark:hover:bg-gray-800 rounded-xl"
                      >
                        Contact Page
                      </Link>
                      {session && (
                        <Link
                          href="/items/manage"
                          onClick={() => setPagesDropdownOpen(false)}
                          className="block px-4 py-2.5 text-sm font-semibold hover:bg-gray-55 dark:hover:bg-gray-800 rounded-xl"
                        >
                          Manage Items
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Selectors, Vertical Separator, Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Dropdown selectors */}
            <div className="flex items-center gap-4 text-sm font-semibold text-secondary dark:text-secondary2">
              <button className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                <span>Assets</span>
                <FiChevronDown className="w-3.5 h-3.5" />
              </button>
              <button className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                <span>Orders & Trades</span>
                <FiChevronDown className="w-3.5 h-3.5" />
              </button>
              <button className="flex items-center gap-1 hover:text-primary transition-colors text-gray-400 dark:text-gray-500 cursor-pointer">
                <span>EN/USD</span>
                <FiChevronDown className="w-3.5 h-3.5" />
              </button>
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
                  <Button variant="outline" size="default" className="rounded-full">
                    Wallet
                  </Button>

                  {/* Profile Avatar Container */}
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-150 dark:border-gray-800 relative">
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
                  </div>

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
              Contact Us
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
                <Button variant="outline" className="w-full justify-center rounded-full">
                  Wallet
                </Button>
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
