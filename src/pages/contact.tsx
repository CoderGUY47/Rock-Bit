'use client';

import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0c0c0e] min-h-screen py-16 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mt-4 mb-3">Contact Support</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Have questions about your portfolio, trades, or custom token listings? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl p-6 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <FiMail className="text-primary w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email support</h3>
                <a href="mailto:Sinahosseini379@Gmail.Com" className="text-sm font-bold text-gray-900 dark:text-white hover:underline">
                  Sinahosseini379@Gmail.Com
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl p-6 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <FiPhone className="text-primary w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Line</h3>
                <a href="tel:+989023532926" className="text-sm font-bold text-gray-900 dark:text-white hover:underline">
                  +98 902 353 2926
                </a>
              </div>
            </div>

            <div className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl p-6 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <FiMapPin className="text-primary w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Office Location</h3>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Tehran, Iran
                </p>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl p-8 shadow-sm">
            {success ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-950/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <FiSend className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">Message Sent Successfully!</h3>
                <p className="text-xs text-gray-400">Our customer operations department will get back to you shortly.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 text-xs font-bold text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-lg font-black text-gray-900 dark:text-white mb-2">Send us a Message</h2>
                
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 dark:text-white font-semibold placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. user@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 dark:text-white font-semibold placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Message Description</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need help with..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 dark:text-white font-medium resize-none placeholder-gray-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full font-bold text-xs bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/20 mt-4 cursor-pointer transition-colors duration-200 border-none outline-none disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {loading ? 'Sending message...' : (
                    <>
                      <span>Send Message</span>
                      <FiSend className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
