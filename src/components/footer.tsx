"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/button";

// React Icons
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#141416] border-none text-gray-900 dark:text-white transition-colors duration-200">
      <div className="w-full px-10 lg:px-16 pt-14 pb-4">
        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-3xl tracking-tighter text-on-surface dark:text-white"
            >
              <div className="w-10 h-10 shrink-0 overflow-hidden flex items-center justify-center relative">
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

            <div className="space-y-2 mt-4">
              <p className="font-bold text-2xl text-gray-900 dark:text-white flex items-center gap-1.5">
                Let's talk! 👆
              </p>
              <p className="text-base text-secondary dark:text-secondary2 font-medium">
                +880-1882652756
              </p>
              <a
                href="mailto:info.rockbitltd01@gmail.com"
                className="text-secondary dark:text-secondary2 block hover:text-primary transition-colors font-medium text-base"
              >
                info.rockbitltd01@gmail.com
              </a>
            </div>
          </div>

          {/* Column 2: PRODUCTS */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/spot"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  Spot
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  Inverse Perpetual
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  USDT Perpetual
                </Link>
              </li>
              <li>
                <Link
                  href="/exchange"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  Exchange
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  Launchpad
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: ABOUT US */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              About Us
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: SERVICES */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/checkout"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  Buy Crypto
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  Markets
                </Link>
              </li>
              <li>
                <Link
                  href="/fees"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  Trading Fee
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate"
                  className="text-base font-medium text-gray-500 dark:text-white/70 hover:text-primary transition-colors"
                >
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: NEWSLETTER */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Newsletter
              </h3>
              <p className="text-base text-gray-500 dark:text-white/70 font-medium leading-relaxed mb-4">
                Subscribe to our newsletter for market updates.
              </p>

              {/* Form Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for subscribing to our newsletter!");
                }}
                className="flex items-center bg-white dark:bg-on-surface p-1 rounded-full border border-gray-200 dark:border-gray-700 w-full"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="grow px-4 text-sm bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
                  required
                />
                <Button
                  type="submit"
                  variant="default"
                  className="px-5 py-2 text-sm shadow-none shrink-0"
                >
                  Submit
                </Button>
              </form>
            </div>

            {/* Social Icons */}
            <div>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-50 dark:bg-on-surface text-gray-400 hover:text-primary transition-colors"
                >
                  <FaFacebookF className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-50 dark:bg-on-surface text-gray-400 hover:text-[#e1306c] transition-colors"
                >
                  <FaInstagram className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-50 dark:bg-on-surface text-gray-400 hover:text-[#ff0000] transition-colors"
                >
                  <FaYoutube className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-50 dark:bg-on-surface text-gray-400 hover:text-[#1da1f2] dark:hover:text-white transition-colors"
                >
                  <FaXTwitter className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Line */}
      <div className="py-4 border-t border-black/5 dark:border-on-surface text-center text-sm tracking-wide text-gray-400 dark:text-gray-500">
        <p>All Rights Reserved ©2026 | Rock-Bit Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
