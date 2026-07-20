"use client";

import { useState } from "react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-primary/5 dark:bg-[#1f2128]/40 border-t border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
          Never Miss a Market Move
        </h2>
        <p className="text-sm text-secondary dark:text-secondary2 max-w-xl mx-auto mb-8 leading-relaxed">
          Subscribe to the Rock-Bit Newsletter to receive weekly market
          sentiment reports, technical analysis briefs, and updates on hot
          coins.
        </p>

        {/* Form */}
        {submitted ? (
          <div className="bg-success/10 text-success p-6 rounded-3xl max-w-md mx-auto border border-success/20 animate-[fadeInUp_0.4s_ease-out]">
            <p className="font-bold text-sm">🎉 You are subscribed!</p>
            <p className="text-xs mt-1">
              Check your inbox for our latest market analysis briefings.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto bg-white dark:bg-on-surface p-2 rounded-3xl sm:rounded-full border border-gray-100 dark:border-gray-850 shadow-md"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="grow px-4 py-3 bg-transparent text-xs text-gray-850 dark:text-white outline-none w-full"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary hover:bg-interactive text-white text-xs font-bold rounded-2xl sm:rounded-full transition-all shrink-0 cursor-pointer shadow-lg shadow-primary/10"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
