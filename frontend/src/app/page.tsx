'use client';

import { Navbar } from '@/layout/Navbar';
import { Footer } from '@/layout/Footer';
import { Hero } from '@/pages/Hero';
import { MarketTicker } from '@/pages/MarketTicker';
import { WhyChooseUs } from '@/pages/WhyChooseUs';
import { EasyTrading } from '@/pages/EasyTrading';
import { Statistics } from '@/pages/Statistics';
import { Testimonials } from '@/pages/Testimonials';
import { LearnEarn } from '@/pages/LearnEarn';
import { Community } from '@/pages/Community';
import { EarnBanner } from '@/pages/EarnBanner';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0c0c0e] transition-colors duration-200">
      <Navbar />
      <main className="grow">
        <Hero />
        <MarketTicker />
        <WhyChooseUs />
        <EasyTrading />
        <Statistics />
        <LearnEarn />
        <Testimonials />
        <Community />
        <EarnBanner />
      </main>
      <Footer />
    </div>
  );
}
