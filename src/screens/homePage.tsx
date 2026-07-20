"use client";

import React from "react";
import {
  Banner,
  MarketTicker,
  WhyChooseUs,
  EasyTrading,
  Statistics,
  LearnEarn,
  Testimonials,
  Community,
} from "@/components/home";
import { Navbar } from "@/components/navbar";
import { EarnBanner } from "@/components/earnBanner";
import { Footer } from "@/components/footer";
import { ChatAssistant } from "@/components/chatAssistant";

export default function HomePage() {
  return (
    <div className="min-h-full flex flex-col font-sans bg-white dark:bg-[#0c0c0e] transition-colors duration-200">
      <Navbar />
      <main className="grow">
        <Banner />
        <MarketTicker />
        <WhyChooseUs />
        <EasyTrading />
        <Statistics />
        <LearnEarn />
        <Testimonials />
        <Community />
      </main>
      <EarnBanner />
      <Footer />
      <ChatAssistant />
    </div>
  );
}
