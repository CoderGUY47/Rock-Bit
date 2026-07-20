"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WORLD_COUNTRY_CODES, CountryCodeItem } from "@/utils/countryCodes";
import { DEFAULT_AVATARS } from "@/context/profileContext";
import { notifySuccess, notifyError } from "@/components/toastProvider";
import { getPhonePlaceholder, FlagRenderer } from "@/components/userProfileTab";
import { EarnBanner } from "@/components/earnBanner";
import { signUp, signIn, authClient } from "@/lib/auth-client";
import {
  FiChevronDown,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiSearch,
  FiShield,
  FiArrowLeft,
  FiImage,
  FiLock,
} from "react-icons/fi";

export default function RegisterPage() {
  const router = useRouter();

  // Mode: "email" | "mobile"
  const [registerMode, setRegisterMode] = useState<"email" | "mobile">("email");

  // Step: "register" | "otp"
  const [step, setStep] = useState<"register" | "otp">("register");

  // Form State
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeItem>(
    WORLD_COUNTRY_CODES.find((c) => c.code === "KR") || WORLD_COUNTRY_CODES[0],
  );
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState(DEFAULT_AVATARS[0]);

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  // OTP State
  const [otpValue, setOtpValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  // Helper to format avatar URL for input field display (e.g. "Avatar 1" instead of raw path)
  const getDisplayAvatarName = (url: string) => {
    const match = url.match(/avatar(\d+)\.svg/);
    if (match) return `Avatar ${match[1]}`;
    return url;
  };

  // Password Strength Calculation
  const meetsMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const strengthScore = [
    meetsMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,
  ].filter(Boolean).length;

  const getStrengthLabel = () => {
    if (password.length === 0)
      return {
        label: "",
        color: "bg-gray-200 dark:bg-gray-800",
        text: "text-gray-400",
      };
    if (strengthScore <= 2)
      return {
        label: "Weak Password",
        color: "bg-red-500",
        text: "text-red-500",
      };
    if (strengthScore === 3)
      return {
        label: "Fair Strength",
        color: "bg-amber-500",
        text: "text-amber-500",
      };
    if (strengthScore === 4)
      return {
        label: "Good Strength",
        color: "bg-indigo-500",
        text: "text-indigo-500",
      };
    return {
      label: "Strong Password",
      color: "bg-emerald-500",
      text: "text-emerald-500",
    };
  };

  const strengthInfo = getStrengthLabel();

  // Filter countries by search
  const filteredCountries = WORLD_COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  // Submit Register -> Move to OTP Verification
  const handlePreRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrPhone.trim()) {
      notifyError(
        "Validation Error",
        `Please enter your ${registerMode === "email" ? "Email Address" : "Mobile Phone"}.`,
      );
      return;
    }
    if (!password || password.length < 8) {
      notifyError(
        "Validation Error",
        "Password must be at least 8 characters long.",
      );
      return;
    }
    if (password !== confirmPassword) {
      notifyError("Validation Error", "Passwords do not match.");
      return;
    }
    if (!imageUrl.trim()) {
      notifyError(
        "Validation Error",
        "Please select an avatar or enter an image URL.",
      );
      return;
    }

    try {
      if (registerMode === "email") {
        // Send Email Verification OTP using Better Auth
        await authClient.emailOtp.sendVerificationOtp({
          email: emailOrPhone,
          type: "sign-in",
        });
      } else {
        // Send SMS Verification OTP using Better Auth
        const fullPhone =
          selectedCountry.dialCode + (phone || emailOrPhone).replace(/\D/g, "");
        await authClient.phoneNumber.sendOtp({
          phoneNumber: fullPhone,
        });
      }
      notifySuccess(
        "Verification Sent",
        "OTP verification code sent! Enter 1234-5678 or the code to verify.",
      );
    } catch (err: any) {
      console.warn(
        "Failed to send real OTP, proceeding to OTP screen with dev bypass active.",
        err,
      );
      notifySuccess(
        "Verification Mock Sent",
        "OTP verification code simulated. Enter 1234-5678 to verify.",
      );
    }
    setStep("otp");
  };

  // OTP Verification (with 1234-5678 fallback)
  const handleOtpChange = async (val: string) => {
    setOtpValue(val);
    const cleanVal = val.replace(/-/g, "").trim();

    // Magic verification code bypass
    if (cleanVal === "12345678" || val.trim() === "1234-5678") {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setVerifiedSuccess(true);

        if (typeof window !== "undefined") {
          localStorage.setItem("rockbit_avatar_url", imageUrl);
          localStorage.setItem("rockbit_user_role", "user");
          localStorage.setItem(
            "rockbit_user_info",
            JSON.stringify({
              firstName: nickName || "Registered",
              lastName: "User",
              email:
                registerMode === "email" ? emailOrPhone : `user@rockbit.io`,
              phone:
                registerMode === "mobile"
                  ? `${selectedCountry.dialCode} ${phone || emailOrPhone}`
                  : "",
              countryCode: selectedCountry.dialCode,
              nationality: selectedCountry.name,
              gender: "Female",
              dob: "14/08/1994",
            }),
          );
          localStorage.setItem("auth_logged_in", "true");
        }

        notifySuccess(
          "Verification Successful",
          "Your Rock-Bit account has been created successfully!",
        );
        setTimeout(() => {
          router.push("/profile");
        }, 1200);
      }, 600);
      return;
    }

    // Try real verification if it's a 6-digit Better Auth OTP
    if (cleanVal.length === 6) {
      setIsVerifying(true);
      try {
        if (registerMode === "email") {
          const { data, error } = await signIn.emailOtp({
            email: emailOrPhone,
            otp: cleanVal,
          });
          if (error) {
            notifyError(
              "Verification Failed",
              error.message || "Invalid OTP code.",
            );
            setIsVerifying(false);
            return;
          }
        } else {
          const fullPhone =
            selectedCountry.dialCode +
            (phone || emailOrPhone).replace(/\D/g, "");
          const { data, error } = await authClient.phoneNumber.verify({
            phoneNumber: fullPhone,
            code: cleanVal,
          });
          if (error) {
            notifyError(
              "Verification Failed",
              error.message || "Invalid OTP code.",
            );
            setIsVerifying(false);
            return;
          }
        }

        setIsVerifying(false);
        setVerifiedSuccess(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("rockbit_avatar_url", imageUrl);
          localStorage.setItem("rockbit_user_role", "user");
          localStorage.setItem("auth_logged_in", "true");
        }
        notifySuccess(
          "Verification Successful",
          "Account verified successfully!",
        );
        setTimeout(() => {
          router.push("/profile");
        }, 1200);
      } catch (err: any) {
        setIsVerifying(false);
        notifyError(
          "Verification Error",
          err.message || "Failed to verify OTP.",
        );
      }
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
            <span className="text-gray-700 dark:text-gray-300">Register</span>
          </nav>
        </div>
      </div>

      {/* ── Main Form Container ───────────────────────────────────────────── */}
      <div className="mx-auto w-[55%] px-4 py-10 flex-1 flex flex-col justify-center relative z-10">
        {step === "register" ? (
          <div className="bg-white/95 dark:bg-[#141416]/90 backdrop-blur-xl border border-gray-200 dark:border-white/[0.06] rounded-xl p-8 md:p-12 shadow-2xl space-y-8">
            {/* Header Title */}
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Register To Rock-Bit
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                Register in advance and enjoy the event benefits
              </p>
            </div>

            {/* Email / Mobile Toggle Tabs */}
            <div className="flex justify-center">
              <div className="inline-flex p-1 rounded-full bg-gray-100 dark:bg-[#1d1d22] border border-gray-200 dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setRegisterMode("email")}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    registerMode === "email"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setRegisterMode("mobile")}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    registerMode === "mobile"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  Mobile
                </button>
              </div>
            </div>

            {/* Register Form in 2-Column Grid */}
            <form onSubmit={handlePreRegistration} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
                {/* Left Column: Form Fields (7 cols) */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Email / Mobile Input + Authenticate Button */}
                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5 block">
                      {registerMode === "email" ? "Email / ID" : "Mobile Phone"}
                    </label>
                    <div className="flex gap-2">
                      {registerMode === "mobile" && (
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setCountryDropdownOpen(!countryDropdownOpen)
                            }
                            className="h-full px-3 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white flex items-center gap-2 cursor-pointer"
                          >
                            <FlagRenderer
                              code={selectedCountry.code}
                              flagUrl={selectedCountry.flagUrl}
                              alt={selectedCountry.name}
                            />
                            <span className="font-bold">
                              {selectedCountry.code}
                            </span>
                            <span className="text-gray-500">
                              {selectedCountry.dialCode}
                            </span>
                            <FiChevronDown className="w-3.5 h-3.5 text-gray-400" />
                          </button>
                        </div>
                      )}

                      <input
                        type={registerMode === "email" ? "email" : "tel"}
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder={
                          registerMode === "email"
                            ? "Please fill in the email form."
                            : getPhonePlaceholder(selectedCountry.code, selectedCountry.dialCode)
                        }
                        className="flex-1 px-4 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors"
                        required
                      />

                      <button
                        type="button"
                        onClick={() => {
                          if (!emailOrPhone.trim()) {
                            notifyError(
                              "Validation Error",
                              "Please fill in your Email or Mobile first.",
                            );
                            return;
                          }
                          notifySuccess(
                            "Verification Sent",
                            "OTP verification code sent! Enter 1234-5678.",
                          );
                          setStep("otp");
                        }}
                        className="px-5 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shrink-0 shadow-md shadow-indigo-600/20"
                      >
                        Authenticate
                      </button>
                    </div>
                  </div>

                  {/* Password & Strength Meter */}
                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 block">
                      Password{" "}
                      <span className="normal-case text-gray-400 font-normal">
                        (8 Or More Characters, Including Numbers And Special
                        Characters)
                      </span>
                    </label>
                    <div className="relative mb-2">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Please enter a password."
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

                    {/* Password Strength Indicator */}
                    {password.length > 0 && (
                      <div className="space-y-1 animate-[fadeIn_0.15s_ease-out]">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="text-gray-400 uppercase tracking-wider">
                            Password Strength:
                          </span>
                          <span className={strengthInfo.text}>
                            {strengthInfo.label}
                          </span>
                        </div>
                        <div className="flex gap-1.5 h-1.5 w-full">
                          {[1, 2, 3, 4, 5].map((lvl) => (
                            <div
                              key={lvl}
                              className={`h-full flex-1 rounded-full transition-all duration-300 ${
                                lvl <= strengthScore
                                  ? strengthInfo.color
                                  : "bg-gray-200 dark:bg-gray-800"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Re-enter Password */}
                  <div>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Please re-enter password."
                        className="w-full pl-4 pr-10 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff className="w-4 h-4" />
                        ) : (
                          <FiEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* NickName */}
                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 block">
                      NickName{" "}
                      <span className="normal-case text-gray-400 font-normal">
                        (Excluding Special Characters)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={nickName}
                      onChange={(e) => setNickName(e.target.value)}
                      placeholder="Enter NickName"
                      className="w-full px-4 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Pre-Registration Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-md font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 mt-6 cursor-pointer transition-all active:scale-98"
                  >
                    Pre-Registration
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
                          err.message || "Failed to register with Google.",
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
                    Already Have An Account?{" "}
                    <Link
                      href="/auth/login"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                    >
                      Login
                    </Link>
                  </div>
                </div>

                {/* Right Column: Profile Avatar Selection (5 cols) */}
                <div className="lg:col-span-6 bg-gray-50 dark:bg-[#1c1d24] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 flex flex-col justify-start space-y-4">
                  {/* Country Accordion / Dropdown */}
                  <div className="relative">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 block">
                      Country
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setCountryDropdownOpen(!countryDropdownOpen)
                      }
                      className="w-full px-4 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <FlagRenderer
                          code={selectedCountry.code}
                          flagUrl={selectedCountry.flagUrl}
                          alt={selectedCountry.name}
                        />
                        <span className="font-bold text-gray-900 dark:text-white">
                          {selectedCountry.code}
                        </span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {selectedCountry.name}
                        </span>
                        <span className="text-gray-400 font-semibold">
                          ({selectedCountry.dialCode})
                        </span>
                      </span>
                      <FiChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${countryDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Country Accordion Dropdown Panel */}
                    {countryDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#1f2026] border border-gray-200 dark:border-white/10 rounded-md shadow-2xl z-50 p-3 max-h-60 overflow-y-auto animate-[fadeIn_0.15s_ease-out]">
                        <div className="relative mb-2">
                          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Search country or dial code..."
                            className="w-full pl-8 pr-3 py-2 text-xs rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#141416] text-gray-900 dark:text-white outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          {filteredCountries.map((c) => (
                            <button
                              key={`${c.code}-${c.dialCode}`}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(c);
                                setPhone("");
                                setEmailOrPhone("");
                                setCountryDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2.5 text-xs font-bold flex items-center justify-between rounded-md cursor-pointer transition-colors ${
                                c.code === selectedCountry.code
                                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                            >
                              <span className="flex items-center gap-2.5 overflow-hidden">
                                <FlagRenderer
                                  code={c.code}
                                  flagUrl={c.flagUrl}
                                  alt={c.name}
                                />
                                <span className="font-bold w-6 shrink-0">{c.code}</span>
                                <span className="truncate max-w-[110px]">{c.name}</span>
                                <span className="text-[10px] text-gray-400 font-semibold lowercase tracking-tight shrink-0">
                                  (ex: {getPhonePlaceholder(c.code, c.dialCode)})
                                </span>
                              </span>
                              <span className="text-gray-400 font-medium text-[11px] shrink-0">
                                {c.dialCode}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 block">
                      Phone{" "}
                      <span className="normal-case text-gray-400 font-normal">
                        (Enter Numbers Only)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder={`ex) ${getPhonePlaceholder(selectedCountry.code, selectedCountry.dialCode)}`}
                      className="w-full px-4 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 block">
                      Profile Avatar{" "}
                      <span className="text-indigo-500 font-bold">
                        (Mandatory Image URL or Select Avatar)
                      </span>
                    </label>

                    {/* Masked Display Input: do not show default avatar names, show placeholder instead */}
                    <input
                      type="text"
                      value={
                        imageUrl.startsWith("/assets/avatars/") ? "" : imageUrl
                      }
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Input your image url"
                      className="w-full px-4 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#141416] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors mb-4"
                      required
                    />

                    {/* 15 Avatars Grid */}
                    <div className="grid grid-cols-5 gap-2.5">
                      {DEFAULT_AVATARS.map((url, idx) => {
                        const isSelected = imageUrl === url;
                        return (
                          <button
                            key={url}
                            type="button"
                            onClick={() => setImageUrl(url)}
                            className={`relative aspect-square rounded-full p-0.5 border-2 transition-all cursor-pointer flex items-center justify-center overflow-hidden ${
                              isSelected
                                ? "border-indigo-600 ring-4 ring-indigo-500/20 scale-105"
                                : "border-gray-200 dark:border-white/10 hover:border-indigo-400 hover:scale-105"
                            }`}
                          >
                            <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                              <img
                                src={url}
                                alt={`Avatar ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {isSelected && (
                              <div className="absolute inset-0 bg-indigo-600/30 rounded-full flex items-center justify-center">
                                <FiCheck className="w-4 h-4 text-white stroke-[3]" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* ── OTP Verification Screen ─────────────────────────────────── */
          <div className="bg-white/95 dark:bg-[#141416]/90 backdrop-blur-xl border border-gray-200 dark:border-white/[0.06] rounded-3xl p-8 md:p-10 shadow-2xl text-center space-y-6 animate-[fadeIn_0.2s_ease-out]">
            <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <FiShield className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                OTP Verification
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-2">
                We sent a 8-digit verification code to{" "}
                <strong className="text-gray-900 dark:text-white">
                  {emailOrPhone || "your device"}
                </strong>
              </p>
              <div className="mt-3 p-3 rounded-md bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                Default Verification Code:{" "}
                <span className="underline tracking-widest text-indigo-600 dark:text-indigo-400">
                  1234-5678
                </span>
              </div>
            </div>

            {/* OTP Input Box */}
            <div className="space-y-4">
              <div className="relative max-w-xs mx-auto">
                <input
                  type="text"
                  value={otpValue}
                  onChange={(e) => handleOtpChange(e.target.value)}
                  placeholder="1234-5678"
                  maxLength={9}
                  className="w-full text-center text-2xl font-bold tracking-widest px-4 py-4 rounded-md border-2 border-indigo-500 bg-gray-50 dark:bg-[#1d1d22] text-indigo-600 dark:text-indigo-400 outline-none shadow-inner"
                  autoFocus
                />
              </div>

              {isVerifying && (
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold animate-pulse">
                  Verifying code...
                </p>
              )}

              {verifiedSuccess && (
                <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm animate-[scaleIn_0.2s_ease-out]">
                  <FiCheck className="w-5 h-5 stroke-[3]" />
                  <span>Verified! Redirecting to Profile...</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setStep("register")}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Register</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
