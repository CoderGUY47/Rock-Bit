"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiCheck, FiCopy, FiChevronRight } from "react-icons/fi";
import { notifySuccess } from "@/components/toastProvider";

type Step = 1 | 2 | 3;
type Mode = "buy" | "sell";

function StepBar({ step, mode }: { step: Step; mode: Mode }) {
  const steps = [
    "Select currency",
    mode === "buy" ? "Confirm Payment" : "Confirm Sale",
    mode === "buy" ? "Payment Details" : "Sale Details",
  ];
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => {
        const idx = (i + 1) as Step;
        const done = step > idx;
        const active = step === idx;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                ${done ? "bg-green-500 border-green-500" : active ? "border-primary bg-white dark:bg-on-surface" : "border-gray-300 bg-white dark:bg-on-surface"}`}
              >
                {done && (
                  <FiCheck className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                )}
                {active && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>
              <span
                className={`text-xs font-semibold whitespace-nowrap
                ${done ? "text-green-500" : active ? "text-gray-900 dark:text-white" : "text-gray-400"}`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 ${done ? "bg-green-400" : "bg-gray-200 dark:bg-gray-700"}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function SelectCurrency({ onNext, mode }: { onNext: () => void; mode: Mode }) {
  const [amount, setAmount] = useState(mode === "buy" ? "3,000,000" : "0.002");
  const [fiatCurrency, setFiatCurrency] = useState("VND");

  const calculatedValue =
    mode === "buy"
      ? (parseFloat(amount.replace(/,/g, "")) / 1450000000).toFixed(8)
      : (parseFloat(amount) * 1450000000).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        });

  return (
    <div className="bg-white dark:bg-on-surface border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
        {mode === "buy" ? "Select Currency to Buy" : "Select Currency to Sell"}
      </h2>
      <p className="text-xs text-gray-400 mb-6">
        Reference Price: 1,450,939,280.43 VND/BTC
      </p>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <p className="text-xs text-gray-500 mb-2 font-medium">
            {mode === "buy" ? "Pay" : "Sell"}
          </p>
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-[#1d1d22]">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 px-4 py-3 text-sm font-semibold bg-transparent text-gray-900 dark:text-white outline-none"
            />
            <div className="flex items-center gap-1.5 px-3 border-l border-gray-200 dark:border-gray-700">
              {mode === "buy" ? (
                <>
                  <span className="text-indigo-500 font-bold text-xs">VND</span>
                  <select
                    value={fiatCurrency}
                    onChange={(e) => setFiatCurrency(e.target.value)}
                    className="text-xs font-bold bg-transparent text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
                  >
                    <option>VND</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </>
              ) : (
                <>
                  <img
                    src="/assets/coins/btc.svg"
                    alt="BTC"
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                    BTC
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
          <svg
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M8 3L4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4" />
          </svg>
        </div>

        <div className="flex-1 w-full">
          <p className="text-xs text-gray-500 mb-2 font-medium">
            {mode === "buy" ? "Receive" : "Receive Estimated"}
          </p>
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-[#1d1d22]">
            <input
              readOnly
              value={calculatedValue}
              className="flex-1 px-4 py-3 text-sm font-semibold bg-transparent text-gray-900 dark:text-white outline-none"
            />
            <div className="flex items-center gap-1.5 px-3 border-l border-gray-200 dark:border-gray-700">
              {mode === "buy" ? (
                <>
                  <img
                    src="/assets/coins/btc.svg"
                    alt="BTC"
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                    BTC
                  </span>
                </>
              ) : (
                <>
                  <span className="text-indigo-500 font-bold text-xs">VND</span>
                  <select
                    value={fiatCurrency}
                    onChange={(e) => setFiatCurrency(e.target.value)}
                    className="text-xs font-bold bg-transparent text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
                  >
                    <option>VND</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onNext}
          className="bg-primary hover:bg-primary/90 text-white font-bold text-sm px-8 py-3 rounded-full transition-colors cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function ConfirmPayment({
  onNext,
  onBack,
  mode,
}: {
  onNext: () => void;
  onBack: () => void;
  mode: Mode;
}) {
  const details =
    mode === "buy"
      ? [
          { label: "Account name", value: "Veum Cecilia" },
          { label: "Account number", value: "548422222221" },
          { label: "Address", value: "079 Dariana Knoll, CA" },
          { label: "SWIFT Code", value: "UI8" },
          { label: "Bank Address", value: "55416 Powlowski Spring, CA" },
        ]
      : [
          { label: "Recipient Name", value: "Rock-Bit" },
          { label: "Payout Currency", value: "VND" },
          { label: "Bank Account / IBAN", value: "VN-8942-1111-2222" },
          { label: "Reference Number", value: "REF-SALE-991A" },
        ];

  return (
    <div className="space-y-5">
      <div className="bg-white dark:bg-on-surface border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
          {mode === "buy" ? "Confirm Information" : "Confirm Sale Order"}
        </h2>
        <p className="text-xs text-gray-400 mb-5">
          {mode === "buy"
            ? "You Are About To Receive 1.356 BTC on Rock-Bit"
            : "You Are About To Sell 0.002 BTC for Local Bank Payout"}
        </p>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              {mode === "buy" ? (
                <span className="text-indigo-500 font-bold text-xs">VND</span>
              ) : (
                <img
                  src="/assets/coins/btc.svg"
                  alt="BTC"
                  className="w-6 h-6 object-contain"
                />
              )}
            </div>
            <span className="text-[10px] text-gray-400">
              {mode === "buy" ? "Pay" : "Sell"}
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {mode === "buy" ? "3,000,000 VND" : "0.002 BTC"}
            </span>
          </div>

          <FiChevronRight className="text-gray-400 w-5 h-5" />

          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              {mode === "buy" ? (
                <img
                  src="/assets/coins/btc.svg"
                  alt="BTC"
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <span className="text-green-500 font-bold text-xs">VND</span>
              )}
            </div>
            <span className="text-[10px] text-gray-400">Get</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {mode === "buy" ? "0.00207026 BTC" : "2,900,000 VND"}
            </span>
          </div>

          <FiChevronRight className="text-gray-400 w-5 h-5" />

          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <span className="text-purple-500 text-lg">👤</span>
            </div>
            <span className="text-[10px] text-gray-400">For</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Rock-Bit
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-on-surface border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
          {mode === "buy" ? "Payment Details" : "Payout Details"}
        </h3>
        <div className="space-y-3">
          {details.map(({ label, value }) => (
            <div key={label}>
              <label className="text-xs text-gray-400 mb-1 block">
                {label}
              </label>
              <input
                readOnly
                value={value}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1d1d22] text-gray-900 dark:text-white font-medium outline-none"
              />
            </div>
          ))}
        </div>

        {mode === "buy" && (
          <div className="mt-4">
            <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
              Reference code
            </p>
            <p className="text-xs text-gray-400 mb-2">
              You MUST include the Reference Code in your deposit in order to
              credit your account!
            </p>
            <p className="text-xs text-gray-400 mb-2">Reference Code:</p>
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-center font-bold text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-[#1d1d22]">
              BLUTUKHY34PB
            </div>
          </div>
        )}

        <div className="mt-5 flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onNext}
            className="flex-1 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-sm transition-colors cursor-pointer"
          >
            {mode === "buy" ? "Let's move on!" : "Confirm Sale"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentComplete({
  onReset,
  mode,
}: {
  onReset: () => void;
  mode: Mode;
}) {
  const details =
    mode === "buy"
      ? [
          { label: "Account name", value: "Veum Cecilia" },
          { label: "Account number", value: "548422222221" },
          { label: "Address", value: "079 Dariana Knoll, CA" },
          { label: "SWIFT Code", value: "UI8" },
          { label: "Bank Address", value: "55416 Powlowski Spring, CA" },
        ]
      : [
          { label: "Recipient Name", value: "Rock-Bit" },
          { label: "Bank Payout Account", value: "VN-8942-1111-2222" },
          { label: "Sale Status", value: "Completed" },
          { label: "Reference Number", value: "REF-SALE-991A" },
        ];

  return (
    <div className="space-y-5">
      <div className="bg-white dark:bg-on-surface border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm text-center">
        <h2 className="text-2xl font-bold text-green-500 flex items-center justify-center gap-2 mb-2">
          Success
          <span className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
            <FiCheck className="w-4 h-4 text-white" strokeWidth={3} />
          </span>
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {mode === "buy"
            ? "You successfully bought 1.356 BTC on Rock-Bit!"
            : "You successfully sold 0.002 BTC on Rock-Bit!"}
        </p>

        <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <span className="text-sm text-gray-500">Status</span>
            <span className="text-sm font-bold text-green-500">Completed</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-sm text-gray-500">Transaction ID</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              0msx836930...87r398 ID
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-on-surface border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
          {mode === "buy" ? "Payment Details" : "Payout Details"}
        </h3>

        <div className="space-y-3">
          {details.map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-center py-2 border-b border-gray-55 dark:border-gray-800/50"
            >
              <span className="text-sm text-gray-500">{label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {value}
                </span>
                <button className="text-gray-400 hover:text-primary transition-colors cursor-pointer">
                  <FiCopy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {mode === "buy" && (
          <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-center font-bold text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-[#1d1d22]">
            BLUTUKHY34PB
          </div>
        )}

        <div className="mt-5 flex gap-3">
          <button
            onClick={onReset}
            className="flex-1 py-3 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors cursor-pointer"
          >
            Trade!
          </button>
          <Link
            href="/"
            className="flex-1 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-sm text-center transition-colors cursor-pointer"
          >
            Wallet
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>(1);
  const [activeTab, setActiveTab] = useState<Mode>("buy");

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0c0c0e] min-h-screen">
      <div className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-on-surface">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {activeTab === "buy" ? "Buy Crypto" : "Sell Crypto"}
          </h1>
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              {activeTab === "buy" ? "Buy Crypto" : "Sell Crypto"}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className="w-full lg:w-56 shrink-0 flex lg:flex-col gap-1.5">
            <div className="hidden lg:block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">
              Overview
            </div>
            <button
              onClick={() => {
                setActiveTab("buy");
                setStep(1);
              }}
              className={`flex-1 lg:flex-none text-center lg:text-left px-5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer
                ${activeTab === "buy" ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              Buy Crypto
            </button>
            <button
              onClick={() => {
                setActiveTab("sell");
                setStep(1);
              }}
              className={`flex-1 lg:flex-none text-center lg:text-left px-5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer
                ${activeTab === "sell" ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              Sell Crypto
            </button>
          </aside>

          <div className="flex-1 w-full min-w-0">
            <StepBar step={step} mode={activeTab} />

            {step === 1 && (
              <SelectCurrency onNext={() => setStep(2)} mode={activeTab} />
            )}
            {step === 2 && (
              <ConfirmPayment
                onNext={() => {
                  notifySuccess(
                    "Saved Successfully",
                    `Transaction processed. ${activeTab === "buy" ? "Crypto purchase" : "Crypto sale"} completed!`,
                  );
                  setStep(3);
                }}
                onBack={() => setStep(1)}
                mode={activeTab}
              />
            )}
            {step === 3 && (
              <PaymentComplete onReset={() => setStep(1)} mode={activeTab} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
