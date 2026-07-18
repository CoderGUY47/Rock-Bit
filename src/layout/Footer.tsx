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
      <div className="w-full px-6 lg:px-12 py-16">
        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-black text-2xl tracking-tighter text-on-surface dark:text-white"
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

            <div className="space-y-2 mt-4 text-base">
              <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                Let's talk! 👆
              </p>
              <p className="text-secondary dark:text-secondary2 font-medium">
                +98 902 353 2926
              </p>
              <a
                href="mailto:Sinahosseini379@Gmail.Com"
                className="text-secondary dark:text-secondary2 block hover:text-primary transition-colors font-medium"
              >
                Sinahosseini379@Gmail.Com
              </a>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-6 leading-relaxed">
                <span className="block dark:hidden">
                  Copyright © 2022 Free For World People
                </span>
                <span className="hidden dark:block font-medium">
                  Free For All The World People
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: PRODUCTS */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-6">
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/markets"
                  className="text-base font-semibold text-secondary dark:text-secondary2 hover:text-primary transition-colors"
                >
                  Spot
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="text-base font-semibold text-secondary dark:text-secondary2 hover:text-primary transition-colors"
                >
                  Inverse Perpetual
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="text-base font-semibold text-secondary dark:text-secondary2 hover:text-primary transition-colors"
                >
                  USDT Perpetual
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-base font-semibold text-secondary dark:text-secondary2 hover:text-primary transition-colors"
                >
                  Exchange
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="text-base font-semibold text-secondary dark:text-secondary2 hover:text-primary transition-colors"
                >
                  Launchpad
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="text-base font-semibold text-secondary dark:text-secondary2 hover:text-primary transition-colors"
                >
                  Binance Pay
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: SERVICES */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/checkout"
                  className="text-base font-semibold text-secondary dark:text-secondary2 hover:text-primary transition-colors"
                >
                  Buy Crypto
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="text-base font-semibold text-secondary dark:text-secondary2 hover:text-primary transition-colors"
                >
                  Markets
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="text-base font-semibold text-secondary dark:text-secondary2 hover:text-primary transition-colors"
                >
                  Tranding Fee
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-base font-semibold text-secondary dark:text-secondary2 hover:text-primary transition-colors"
                >
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-base font-semibold text-secondary dark:text-secondary2 hover:text-primary transition-colors"
                >
                  Referral Program
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-base font-semibold text-secondary dark:text-secondary2 hover:text-primary transition-colors"
                >
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-black text-gray-900 dark:text-white mb-4">
                Newletters
              </h3>
              <p className="text-base text-secondary dark:text-secondary2 leading-relaxed mb-4">
                Subscribe Our Newsletter To Get More Free Design Course And
                Resource.
              </p>

              {/* Form Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for subscribing to our newsletter!");
                }}
                className="flex items-center bg-gray-50 dark:bg-on-surface p-1.5 rounded-full border border-gray-150 dark:border-gray-800 w-full"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="grow px-4 text-base bg-transparent outline-none text-gray-850 dark:text-white"
                  required
                />
                <Button
                  type="submit"
                  variant="default"
                  className="px-6 py-2.5 shadow-none shrink-0"
                >
                  Submit
                </Button>
              </form>
            </div>

            {/* Social Icons using react-icons/fa6 */}
            <div>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-50 dark:bg-on-surface text-gray-400 hover:text-primary transition-colors"
                >
                  <FaFacebookF className="w-4.5 h-4.5" />
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-50 dark:bg-on-surface text-gray-400 hover:text-[#e1306c] transition-colors"
                >
                  <FaInstagram className="w-4.5 h-4.5" />
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-50 dark:bg-on-surface text-gray-400 hover:text-[#ff0000] transition-colors"
                >
                  <FaYoutube className="w-4.5 h-4.5" />
                </a>
                {/* Twitter / X */}
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

        {/* Bottom Line */}
        <div className="border-t border-gray-150 dark:border-on-surface pt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          <p className="block dark:hidden">
            ©2022 Copyright © 2022 Free For World People
          </p>
          <p className="hidden dark:block">
            ©2022 Free For All The World People
          </p>
        </div>
      </div>
    </footer>
  );
};
