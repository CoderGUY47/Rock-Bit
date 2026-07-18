'use client';

import React from 'react';
import Hero from '@/pages/Hero';
import MarketTicker from '@/pages/MarketTicker';
import WhyChooseUs from '@/pages/WhyChooseUs';
import EasyTrading from '@/pages/EasyTrading';
import Statistics from '@/pages/Statistics';
import Testimonials from '@/pages/Testimonials';
import LearnEarn from '@/pages/LearnEarn';
import Community from '@/pages/Community';
import EarnBanner from '@/pages/EarnBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <MarketTicker />
      <WhyChooseUs />
      <EasyTrading />
      <Statistics />
      <LearnEarn />
      <Testimonials />
      <Community />
      <EarnBanner />
    </>
  );
}
