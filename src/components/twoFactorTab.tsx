"use client";

import React, { useState } from "react";
import {
  FiShield,
  FiPhone,
  FiMail,
  FiCpu,
  FiCheckCircle,
  FiAlertTriangle,
  FiArrowRight,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { notifySuccess, notifyWarning } from "@/components/toastProvider";

// ── Switch component ─────────────────────────────────────────────────────────
function Switch({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function TwoFactorTab() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [setupStep, setSetupStep] = useState(1);

  // Inputs
  const [password, setPassword] = useState("");
  const [twoFaCode, setTwoFaCode] = useState("");

  // Other Methods
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [yubikeyEnabled, setYubikeyEnabled] = useState(false);

  const [copied, setCopied] = useState(false);
  const backupKey = "ABCD EFGH IJKL MNOP";

  function handleDisable(e: React.FormEvent) {
    e.preventDefault();
    if (!password || !twoFaCode) return;
    setIsEnabled(false);
    setSetupStep(1);
    setPassword("");
    setTwoFaCode("");
    notifyWarning(
      "2FA Security Disabled",
      "Two-factor authentication disabled.",
    );
  }

  function handleEnable(e: React.FormEvent) {
    e.preventDefault();
    if (!twoFaCode) return;
    setIsEnabled(true);
    setPassword("");
    setTwoFaCode("");
    notifySuccess(
      "Saved Successfully",
      "Two-factor authentication enabled successfully!",
    );
  }

  function copyBackupKey() {
    navigator.clipboard.writeText(backupKey);
    setCopied(true);
    notifySuccess("Saved Successfully", "Backup key copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  }

  const inputCls =
    "w-full px-4 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors";
  const labelCls =
    "text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5 block";

  return (
    <div className="space-y-6 select-none animate-[fadeIn_0.2s_ease-out]">
      {/* ── Status Header & Security Rating ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Text */}
        <div className="lg:col-span-2 bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-24 -top-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              Account Safety Verification
            </h2>
            <h3
              className={`text-2xl font-bold mt-1 flex items-center gap-2 ${isEnabled ? "text-[#58bd7d]" : "text-red-500"}`}
            >
              2FA {isEnabled ? "Enabled" : "Disabled"}
              {isEnabled && (
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              )}
            </h3>
            <p className="text-xs text-gray-450 dark:text-gray-400 font-medium mt-3.5 max-w-xl leading-relaxed">
              Two-factor authentication adds an extra layer of protection. In
              order to trade or withdraw, you must enter verification codes.
            </p>
          </div>
        </div>

        {/* Security Score Widget */}
        <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Security Health
            </span>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span
                className={`text-3xl font-bold ${isEnabled ? "text-[#58bd7d]" : "text-amber-500"}`}
              >
                {isEnabled ? "80/100" : "40/100"}
              </span>
              <span className="text-[10px] text-gray-400 font-bold">Score</span>
            </div>
          </div>
          <div className="border-t border-gray-105 dark:border-white/[0.03] pt-3.5 mt-4 text-[10px] font-bold text-gray-400">
            {isEnabled ? (
              <span className="text-emerald-500 flex items-center gap-1">
                <FiCheckCircle className="w-3.5 h-3.5" /> Google Authenticator
                Active
              </span>
            ) : (
              <span className="text-amber-500 flex items-center gap-1">
                <FiAlertTriangle className="w-3.5 h-3.5 animate-bounce" /> Setup
                2FA to reach 80/100
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Active Config Options ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Authenticator Wizard Card */}
        <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs flex flex-col justify-between">
          {isEnabled ? (
            /* DISABLE 2FA FORM */
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiShield className="text-indigo-500" /> Google Authenticator
              </h3>
              <p className="text-xs text-gray-400 font-semibold">
                Verify Password and 6-digit code to turn off authenticator app
                access
              </p>

              <form onSubmit={handleDisable} className="space-y-4 pt-2">
                <div>
                  <label className={labelCls}>Your Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputCls}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div>
                  <label className={labelCls}>2FA Verification Code</label>
                  <input
                    type="text"
                    value={twoFaCode}
                    onChange={(e) => setTwoFaCode(e.target.value)}
                    className={inputCls}
                    placeholder="6-digit code"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-md bg-red-500 hover:bg-red-655 text-white font-bold text-xs shadow-md shadow-red-500/10 transition-all cursor-pointer"
                >
                  Disable 2FA Verification
                </button>
              </form>
            </div>
          ) : (
            /* STEP-BY-STEP ENABLE WIZARD */
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiShield className="text-indigo-500 animate-pulse" /> Google
                Authenticator Setup
              </h3>

              {setupStep === 1 && (
                <div className="space-y-4 animate-[fadeIn_0.15s_ease-out]">
                  <p className="text-xs text-gray-400 font-semibold">
                    Step 1: Download Google Authenticator or Authy app on your
                    mobile device.
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="#"
                      className="flex-1 text-center py-2.5 border border-gray-200 dark:border-white/[0.06] rounded-md text-[10px] font-bold hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                    >
                      App Store
                    </a>
                    <a
                      href="#"
                      className="flex-1 text-center py-2.5 border border-gray-200 dark:border-white/[0.06] rounded-md text-[10px] font-bold hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                    >
                      Google Play
                    </a>
                  </div>
                  <button
                    onClick={() => setSetupStep(2)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-md flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Next Step <FiArrowRight />
                  </button>
                </div>
              )}

              {setupStep === 2 && (
                <div className="space-y-4 animate-[fadeIn_0.15s_ease-out]">
                  <p className="text-xs text-gray-400 font-semibold">
                    Step 2: Scan the QR code or manually enter the key below.
                  </p>

                  {/* Mock QR Code */}
                  <div className="flex justify-center bg-white p-3.5 rounded-md border border-gray-100 max-w-[140px] mx-auto">
                    <svg
                      className="w-28 h-28 text-black"
                      viewBox="0 0 100 100"
                      fill="currentColor"
                    >
                      <rect x="10" y="10" width="20" height="20" />
                      <rect x="70" y="10" width="20" height="20" />
                      <rect x="10" y="70" width="20" height="20" />
                      <rect x="40" y="40" width="20" height="20" />
                      <rect x="50" y="70" width="10" height="20" />
                      <rect x="70" y="50" width="20" height="10" />
                    </svg>
                  </div>

                  <div className="border border-gray-200 dark:border-white/[0.06] rounded-md p-3 flex justify-between items-center bg-gray-50 dark:bg-[#1d1d22]">
                    <span className="text-[10px] text-gray-808 dark:text-gray-200 font-bold">
                      {backupKey}
                    </span>
                    <button
                      onClick={copyBackupKey}
                      className="text-gray-400 hover:text-indigo-500 cursor-pointer"
                    >
                      {copied ? (
                        <FiCheck className="text-emerald-500 w-4 h-4" />
                      ) : (
                        <FiCopy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSetupStep(1)}
                      className="flex-1 py-3 border border-gray-200 dark:border-white/[0.06] rounded-md text-xs font-bold hover:bg-gray-50 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setSetupStep(3)}
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-md cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {setupStep === 3 && (
                <div className="space-y-4 animate-[fadeIn_0.15s_ease-out]">
                  <p className="text-xs text-gray-400 font-semibold">
                    Step 3: Enter the 6-digit code from the authenticator app to
                    enable.
                  </p>

                  <form onSubmit={handleEnable} className="space-y-4">
                    <div>
                      <label className={labelCls}>Verification Code</label>
                      <input
                        type="text"
                        value={twoFaCode}
                        onChange={(e) => setTwoFaCode(e.target.value)}
                        className={inputCls}
                        placeholder="6-digit code"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSetupStep(2)}
                        className="flex-1 py-3 border border-gray-200 dark:border-white/[0.06] rounded-md text-xs font-bold hover:bg-gray-50 cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-md cursor-pointer"
                      >
                        Verify & Enable
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Secondary Verification Panel */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* SMS Card */}
          <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-5 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-indigo-50 dark:bg-indigo-900/10 text-indigo-500 flex items-center justify-center shrink-0">
                <FiPhone className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                  SMS Authentication
                </h4>
                <p className="text-[10px] text-gray-450 dark:text-gray-400 font-semibold mt-0.5">
                  +1 (***) ***-9281
                </p>
              </div>
            </div>
            <Switch checked={smsEnabled} onChange={setSmsEnabled} />
          </div>

          {/* Email Card */}
          <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-5 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-purple-50 dark:bg-purple-900/10 text-purple-500 flex items-center justify-center shrink-0">
                <FiMail className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                  Email Authentication
                </h4>
                <p className="text-[10px] text-gray-450 dark:text-gray-400 font-semibold mt-0.5">
                  peter***@demo.com
                </p>
              </div>
            </div>
            <Switch checked={emailEnabled} onChange={setEmailEnabled} />
          </div>

          {/* Yubikey Hardware Key Card */}
          <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-5 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-amber-50 dark:bg-amber-900/10 text-amber-500 flex items-center justify-center shrink-0">
                <FiCpu className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                  Security Key (YubiKey)
                </h4>
                <p className="text-[10px] text-gray-450 dark:text-gray-400 font-semibold mt-0.5">
                  Physical hardware protection
                </p>
              </div>
            </div>
            <Switch checked={yubikeyEnabled} onChange={setYubikeyEnabled} />
          </div>
        </div>
      </div>
    </div>
  );
}
