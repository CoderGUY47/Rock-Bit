"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WORLD_COUNTRY_CODES, CountryCodeItem } from "@/utils/countryCodes";
import { notifySuccess, notifyError } from "@/components/toastProvider";
import { EarnBanner } from "@/components/earnBanner";
import { signIn } from "@/lib/auth-client";
import {
  FiEye,
  FiEyeOff,
  FiChevronDown,
  FiLock,
  FiShield,
  FiSearch,
} from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();

  // Mode: "email" | "mobile" | "admin"
  const [loginMode, setLoginMode] = useState<"email" | "mobile" | "admin">(
    "email",
  );

  const [emailOrPhone, setEmailOrPhone] = useState("user@gmail.com");
  const [password, setPassword] = useState("user123");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeItem>(
    WORLD_COUNTRY_CODES.find((c) => c.code === "US") || WORLD_COUNTRY_CODES[0],
  );
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  // Filter countries by search
  const filteredCountries = WORLD_COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  // Switch modes & set default credentials
  const handleModeSwitch = (mode: "email" | "mobile" | "admin") => {
    setLoginMode(mode);
    if (mode === "admin") {
      setEmailOrPhone("admin@gmail.com");
      setPassword("admin123");
    } else {
      setEmailOrPhone("user@gmail.com");
      setPassword("user123");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrPhone.trim() || !password) {
      notifyError("Action Required", "Please enter your credentials.");
      return;
    }

    if (loginMode === "admin") {
      if (
        emailOrPhone.trim().toLowerCase() === "admin@gmail.com" &&
        password === "admin123"
      ) {
        if (typeof window !== "undefined") {
          localStorage.setItem("rockbit_user_role", "admin");
          localStorage.setItem("auth_logged_in", "true");
          localStorage.setItem(
            "rockbit_user_info",
            JSON.stringify({
              firstName: "System",
              lastName: "Administrator",
              email: "admin@gmail.com",
              phone: "+1 (800) 999-0000",
              countryCode: "+1",
              nationality: "American",
              gender: "Female",
              dob: "01/01/1990",
            }),
          );
        }
        notifySuccess(
          "Admin Access Granted",
          "Welcome Admin! Full system & CRUD permissions active.",
        );
        router.push("/admin-home");
      } else {
        notifyError(
          "Access Denied",
          "Invalid Admin credentials. Use admin@gmail.com / admin123.",
        );
      }
      return;
    }

    // User Login (Email / Mobile) via Better Auth
    try {
      if (loginMode === "email") {
        const { data, error } = await signIn.email({
          email: emailOrPhone,
          password: password,
        });
        if (error) {
          notifyError(
            "Authentication Failed",
            error.message || "Invalid email or password.",
          );
          return;
        }
      } else {
        const { data, error } = await signIn.phoneNumber({
          phoneNumber: selectedCountry.dialCode + emailOrPhone,
          password: password,
        });
        if (error) {
          notifyError(
            "Authentication Failed",
            error.message || "Invalid phone number or password.",
          );
          return;
        }
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("rockbit_user_role", "user");
        localStorage.setItem("auth_logged_in", "true");
      }

      notifySuccess("Welcome Back", "Logged into Rock-Bit successfully!");
      router.push("/");
    } catch (err: any) {
      notifyError(
        "Authentication Error",
        err.message || "An unexpected authentication error occurred.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c0c0e] text-gray-900 dark:text-white font-sans flex flex-col justify-between relative overflow-hidden">
      {/* ── Blended Background Image ────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/assets/images/login-signup-bg.png"
          alt="Auth background pattern"
          fill
          className="object-cover object-center opacity-30 dark:opacity-25 mix-blend-multiply dark:mix-blend-overlay"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa]/80 via-transparent to-[#f8f9fa]/90 dark:from-[#0c0c0e]/80 dark:via-transparent dark:to-[#0c0c0e]/95" />
      </div>

      {/* ── Top Header Breadcrumb ────────────────────────────────────────── */}
      <div className="border-b border-gray-200 dark:border-white/[0.04] bg-white/80 dark:bg-[#141416]/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-gray-400 font-bold select-none">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="text-gray-700 dark:text-gray-300">Login</span>
          </nav>
        </div>
      </div>

      {/* ── Main Container ───────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto w-full px-4 py-12 flex-1 flex flex-col justify-center relative z-10">
        <div className="bg-white/95 dark:bg-[#141416]/90 backdrop-blur-xl border border-gray-200 dark:border-white/[0.06] rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
          {/* Header Title */}
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Login To Rock-Bit
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              Welcome back! Log In now to start trading
            </p>
          </div>

          {/* Email / Mobile / Admin Toggle Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex p-1 rounded-full bg-gray-100 dark:bg-[#1d1d22] border border-gray-200 dark:border-white/[0.06]">
              <button
                type="button"
                onClick={() => handleModeSwitch("email")}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  loginMode === "email"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch("mobile")}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  loginMode === "mobile"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                Mobile
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch("admin")}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  loginMode === "admin"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                    : "text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/20"
                }`}
              >
                <FiShield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Default Credentials Hint Note */}
          <div className="p-3.5 rounded-md bg-gray-50 dark:bg-[#1c1d24] border border-gray-200 dark:border-white/[0.06] text-center text-xs font-semibold text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">
              Default Credentials:
            </span>
            {loginMode === "admin" ? (
              <span>
                admin@gmail.com / admin123{" "}
                <strong className="text-purple-600 dark:text-purple-400">
                  (Admin Mode - Full CRUD Access)
                </strong>
              </span>
            ) : (
              <span>user@gmail.com / user123</span>
            )}
          </div>

          {/* Two-Column Form & QR Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            {/* Left Column: Form (7 cols) */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
              {/* Email / Mobile Field */}
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">
                  {loginMode === "email"
                    ? "Email / ID"
                    : loginMode === "admin"
                      ? "Admin Email"
                      : "Mobile Phone"}
                </label>
                <div className="flex gap-2">
                  {loginMode === "mobile" && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setCountryDropdownOpen(!countryDropdownOpen)
                        }
                        className="h-full px-3 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white flex items-center gap-2 cursor-pointer"
                      >
                        <img
                          src={selectedCountry.flagUrl}
                          alt={selectedCountry.name}
                          className="w-5 h-3.5 object-cover rounded-xs shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                        <span className="font-bold">
                          {selectedCountry.code}
                        </span>
                        <span className="text-gray-400">
                          {selectedCountry.dialCode}
                        </span>
                        <FiChevronDown className="w-3.5 h-3.5 text-gray-400" />
                      </button>

                      {/* Full World Country List Dropdown with Search */}
                      {countryDropdownOpen && (
                        <div className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-[#1f2026] border border-gray-200 dark:border-white/10 rounded-md shadow-2xl z-50 p-2.5 max-h-60 overflow-y-auto animate-[fadeIn_0.15s_ease-out]">
                          <div className="relative mb-2">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                            <input
                              type="text"
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              placeholder="Search country or dial code..."
                              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#141416] text-gray-900 dark:text-white outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            {filteredCountries.map((c) => (
                              <button
                                key={`${c.code}-${c.dialCode}`}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(c);
                                  setCountryDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-bold flex items-center justify-between rounded-md cursor-pointer transition-colors ${
                                  c.code === selectedCountry.code
                                    ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                              >
                                <span className="flex items-center gap-2.5">
                                  <img
                                    src={c.flagUrl}
                                    alt={c.name}
                                    className="w-5 h-3.5 object-cover rounded-xs shrink-0 shadow-xs"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display =
                                        "none";
                                    }}
                                  />
                                  <span className="font-bold w-6">
                                    {c.code}
                                  </span>
                                  <span>{c.name}</span>
                                </span>
                                <span className="text-gray-400 font-medium text-[11px]">
                                  {c.dialCode}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <input
                    type={loginMode === "mobile" ? "tel" : "email"}
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder={
                      loginMode === "email"
                        ? "user@gmail.com"
                        : loginMode === "admin"
                          ? "admin@gmail.com"
                          : "Your Phone Number"
                    }
                    className="w-full px-4 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-4 pr-10 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-4 h-4" />
                    ) : (
                      <FiEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 font-semibold text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  <span>Remember Me</span>
                </label>

                <a
                  href="#"
                  className="text-red-500 hover:underline font-bold text-[11px]"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-4 rounded-md font-bold text-sm text-white shadow-lg cursor-pointer transition-all active:scale-98 mt-2 ${
                  loginMode === "admin"
                    ? "bg-purple-600 hover:bg-purple-700 shadow-purple-600/25"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25"
                }`}
              >
                {loginMode === "admin" ? "Login As Administrator" : "Login"}
              </button>

              <div className="flex items-center gap-3 my-3">
                <div className="h-[1px] grow bg-gray-200 dark:bg-white/10" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Or
                </span>
                <div className="h-[1px] grow bg-gray-200 dark:bg-white/10" />
              </div>

              {/* Google Social Sign-In */}
              <button
                type="button"
                onClick={async () => {
                  try {
                    await signIn.social({
                      provider: "google",
                      callbackURL: "/profile",
                    });
                  } catch (err: any) {
                    notifyError(
                      "Google OAuth Failed",
                      err.message || "Failed to login with Google.",
                    );
                  }
                }}
                className="w-full py-3 rounded-md border border-gray-200 dark:border-white/[0.08] hover:bg-gray-50 dark:hover:bg-white/[0.04] text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="text-center text-xs font-semibold text-gray-400 pt-2">
                Not A Member?{" "}
                <Link
                  href="/auth/register"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                >
                  Register
                </Link>
              </div>
            </form>

            {/* Right Column: QR Code Login Card (5 cols) */}
            <div className="lg:col-span-5 bg-gray-50 dark:bg-[#1c1d24] border border-gray-200 dark:border-white/[0.04] rounded-md p-8 flex flex-col items-center justify-center text-center space-y-4 h-full">
              <div className="w-40 h-40 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-white/10 rounded-md p-2 flex items-center justify-center shadow-md overflow-hidden">
                <Image
                  src="/assets/images/qr-code.png"
                  alt="Login QR Code"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain rounded-md"
                  unoptimized
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                  Login With QR Code
                </h3>
                <p className="text-[11px] text-gray-400 font-medium mt-1 leading-relaxed">
                  Scan this code with the{" "}
                  <strong className="text-indigo-600 dark:text-indigo-400">
                    Rock-Bit mobile app
                  </strong>{" "}
                  to log in instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
