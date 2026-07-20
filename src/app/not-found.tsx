"use client";

import React from "react";
import Link from "next/link";
import { FiHome, FiCompass, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0c0c0e] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md w-full bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] rounded-md p-8 shadow-xl space-y-6">
        {/* 404 Badge */}
        <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto text-3xl font-bold font-mono">
          404
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
            The page you are looking for doesn&apos;t exist or has been moved to a new route.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiHome className="w-4 h-4" /> Return to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full py-2.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 font-bold rounded-md text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
