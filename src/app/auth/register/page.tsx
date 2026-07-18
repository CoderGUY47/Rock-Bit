"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("Rock-Bit User");
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await signUp.email({
        email,
        password,
        name,
      });

      if (response?.error) {
        setError(response.error.message || "Something went wrong during register.");
      } else {
        // Redirect to homepage after successful simulated signup
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] dark:bg-[#0c0c0e] relative overflow-hidden px-4 py-12 transition-colors duration-300">
      
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#6366f1]/10 blur-[120px] pointer-events-none" />

      {/* Standalone Authentication Card */}
      <div className="w-full max-w-md relative z-10 bg-white dark:bg-[#141416]/80 backdrop-blur-xl border border-gray-100 dark:border-white/[0.06] rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/5 dark:shadow-black/25">
        
        {/* Brand Logo & Back to Home */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter text-[#23262f] dark:text-white mb-3">
            <div className="w-10 h-10 shrink-0 overflow-hidden flex items-center justify-center relative">
              <Image
                src="/assets/images/3d-logo.png"
                alt="Rock-Bit Logo"
                fill
                className="object-contain dark:brightness-125"
                unoptimized
              />
            </div>
            <span>Rock-Bit</span>
          </Link>
          <h2 className="text-xl font-bold text-gray-950 dark:text-white mt-2">
            Create an account
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Sign up now and start managing your portfolio instantly
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name input field */}
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl border border-gray-150 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email input field */}
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl border border-gray-150 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              placeholder="user@gmail.com"
              required
            />
          </div>

          {/* Password input field */}
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl border border-gray-150 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full font-bold text-xs bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/20 mt-4 cursor-pointer transition-colors duration-200 border-none outline-none disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs font-medium text-gray-400 dark:text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-bold">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}
