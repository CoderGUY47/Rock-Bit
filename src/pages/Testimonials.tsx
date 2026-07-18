"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Testimonial {
  body: string;
  name: string;
  role: string;
  avatarInitials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    body: "“Great course I really enjoyed it and the course was way easy to learn with very good explanations of the code, I could easily understand and develop applications with the knowledge gathered during the course.”",
    name: "Johnny Andro",
    role: "Director, Company",
    avatarInitials: "JA",
  },
  {
    body: "“Trading crypto has never been so easy. Stacking blocks and managing portfolios feels incredibly smooth. Rock-Bit's simple 3-step download, wallet connection, and start trading flow is robust.”",
    name: "Marvin McKinney",
    role: "CEO of Startup",
    avatarInitials: "MM",
  },
  {
    body: "“Best institutional spreads in the market. I process large scale transactions daily and the spreads are always tight. The customer support answered my integration questions in minutes.”",
    name: "Esther Howard",
    role: "Portfolio Manager",
    avatarInitials: "EH",
  },
  {
    body: "“Real-time analytics is a complete game changer. The trading dashboard is extremely detailed yet easy to navigate. I can keep track of all my multi-chain assets and portfolio trends directly in one page.”",
    name: "Sophia Chen",
    role: "Crypto Analyst",
    avatarInitials: "SC",
  },
  {
    body: "“Multisig storage keeps my peace of mind. As a blockchain dev, I'm very strict about custody and security. Rock-Bit's offline cold storage vault systems and multisig verification processes give me complete peace of mind.”",
    name: "Jenny Wilson",
    role: "DeFi Developer",
    avatarInitials: "JW",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Default to Johnny Andro 1/5

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="relative w-full bg-white dark:bg-[#0c0c0e] py-24 overflow-hidden border-0 select-none">

      {/* Background Watermark Image (testimonial.png) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-[0.25] dark:opacity-[0.08]">
        <Image
          src="/assets/images/testimonial.png"
          alt="World Map Grid"
          fill
          className="object-contain object-center"
          unoptimized
        />
      </div>

      <div className="w-[70%] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Title Block & Review Summary & Slider Controls */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-950 dark:text-white tracking-tight leading-tight">
                Our Customers Love <br />
                What We Do
              </h2>

              <p className="text-sm font-extrabold text-indigo-650 dark:text-indigo-400 uppercase tracking-wider">
                Transform Your Idea Into Reality With Finsweet
              </p>

              <p className="text-sm text-secondary dark:text-secondary2 font-medium leading-relaxed max-w-md">
                It Is A Long Established Fact That A Reader Will Be Distracted By
                The Readable Content Of A Page When Looking At Its Layout.
              </p>
            </div>

            {/* Overlapping Avatars & reviews summary */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-[#0c0c0e] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="User 1"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-[#0c0c0e] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="User 2"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-[#0c0c0e] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                    alt="User 3"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
              </div>
              <span className="text-xs font-extrabold text-gray-950 dark:text-white">
                30+ Customer Reviews
              </span>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-gray-250 dark:border-gray-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-secondary dark:text-secondary2 hover:text-gray-950 dark:hover:text-white cursor-pointer"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-sm font-bold text-gray-950 dark:text-white select-none">
                {currentIndex + 1}/{TESTIMONIALS.length}
              </span>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-gray-250 dark:border-gray-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-secondary dark:text-secondary2 hover:text-gray-950 dark:hover:text-white cursor-pointer"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: High Fidelity Testimonial Showcase Card */}
          <div className="lg:col-span-6 flex justify-center items-center">

            <div className="relative w-full max-w-[520px] bg-white dark:bg-[#141416]/90 dark:backdrop-blur-md border border-gray-100 dark:border-white/[0.08] border-l-[5px] border-l-primary dark:border-l-primary rounded-3xl p-8 shadow-xl shadow-gray-200/40 dark:shadow-black/40 min-h-[300px] flex flex-col justify-between transition-all duration-300">

              {/* Quote Mark SVG Icon (Top Right) */}
              <div className="absolute top-6 right-8 text-primary/10 dark:text-primary/20 pointer-events-none">
                <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 17h3l2-4V7h-6v6h3M4 17h3l2-4V7H3v6h3" />
                </svg>
              </div>

              {/* Card Body */}
              <div className="space-y-4 pr-6 pt-4">
                <p className="text-base text-gray-905 dark:text-white font-medium leading-relaxed">
                  {current.body}
                </p>
              </div>

              {/* Card Footer: User info & Brand Logo */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-100 dark:border-white/[0.08]">
                <div className="flex items-center gap-4">
                  {/* Avatar Bubble */}
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-indigo-400 flex items-center justify-center font-extrabold text-sm shrink-0">
                    {current.avatarInitials}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-900 dark:text-white">
                      {current.name}
                    </h5>
                    <p className="text-xs text-secondary dark:text-secondary2 font-medium">
                      {current.role}
                    </p>
                  </div>
                </div>

                {/* logoipsum Logo mark */}
                <div className="flex items-center gap-1.5 opacity-60 dark:opacity-40 text-gray-900 dark:text-white select-none">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span className="text-xs font-black tracking-tight">logoipsum</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
