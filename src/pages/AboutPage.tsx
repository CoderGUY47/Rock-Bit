'use client';

import React from 'react';
import { FiUsers, FiCpu, FiTrendingUp, FiShield } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0c0c0e] min-h-screen py-16 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
            Our Story
          </span>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mt-4 mb-3">About Rock-Bit</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Rock-Bit is a next-generation crypto exchange built with modern web technologies, designed to simplify asset tracking and exchange.
          </p>
        </div>

        {/* Brand Mission & Values */}
        <div className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl p-8 md:p-10 shadow-sm mb-12">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">Our Vision</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-8">
            Our mission is to build the most secure, reliable, and user-friendly cryptocurrency portfolio tracking and trading ecosystem. By leveraging serverless infrastructure and generative artificial intelligence tools, we help our users make better investment decisions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <FiShield className="text-primary w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">State of the Art Security</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Built with enterprise-grade encryption and secure authentication powered by Supabase.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <FiCpu className="text-primary w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">AI Recommendation Engines</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Personalized asset optimization recommendations powered by Generative AI models.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <FiTrendingUp className="text-primary w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Realtime Market Indexes</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">Up-to-the-second market tickers and spot charts for maximum performance tracking.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <FiUsers className="text-primary w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Global Community Support</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">24/7 client support channels with automated conversational advisors.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Info */}
        <div className="text-center bg-gray-50 dark:bg-on-surface/30 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
          <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-3">Our Core Tech Stack</h3>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-gray-600 dark:text-secondary2">
            <span>Next.js 16</span>
            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <span>TypeScript</span>
            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <span>Tailwind CSS</span>
            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <span>Supabase</span>
            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <span>Google Gemini AI</span>
          </div>
        </div>

      </div>
    </div>
  );
}
