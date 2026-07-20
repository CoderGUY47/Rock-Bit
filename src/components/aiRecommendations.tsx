"use client";

import React, { useState, useEffect } from "react";
import { getItems, CryptoItem } from "@/utils/items";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  FiCpu,
  FiTrendingUp,
  FiCheckCircle,
  FiChevronRight,
  FiAlertCircle,
} from "react-icons/fi";
import Link from "next/link";

interface Recommendation {
  id: string;
  reason: string;
}

export function AIRecommendations() {
  const [preference, setPreference] = useState("defi"); // defi, growth, scalability, oracle, custom
  const [customText, setCustomText] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [apiKey, setApiKey] = useState("");

  // Load API Key
  useEffect(() => {
    const key =
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      localStorage.getItem("gemini_api_key") ||
      "";
    setApiKey(key);
  }, []);

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    localStorage.setItem("gemini_api_key", val);
  };

  const getHeuristicRecommendations = (
    pref: string,
    text: string,
  ): Recommendation[] => {
    const query = (pref + " " + text).toLowerCase();

    if (
      query.includes("defi") ||
      query.includes("yield") ||
      query.includes("pool")
    ) {
      return [
        {
          id: "uniswap",
          reason: "High trade volume, robust automated liquidity protocol.",
        },
        {
          id: "aave",
          reason:
            "Decentralized lending leader, earn yield on collateral deposits.",
        },
      ];
    }
    if (
      query.includes("growth") ||
      query.includes("volatility") ||
      query.includes("l1") ||
      query.includes("gain")
    ) {
      return [
        {
          id: "solana",
          reason: "Extreme speed, cheap fees, and massive daily active users.",
        },
        {
          id: "bitcoin",
          reason: "Ultimate reserve asset, institutional adoption leader.",
        },
        {
          id: "ethereum",
          reason:
            "Industry-standard smart contract platform with gas burned on-chain.",
        },
      ];
    }
    if (
      query.includes("scalability") ||
      query.includes("layer 2") ||
      query.includes("l2")
    ) {
      return [
        {
          id: "arbitrum",
          reason: "Ethereum layer-2 optimisitc rollup scaling standard.",
        },
        {
          id: "optimism",
          reason: "Developer friendly Ethereum scaling framework.",
        },
      ];
    }
    if (
      query.includes("oracle") ||
      query.includes("real world") ||
      query.includes("data")
    ) {
      return [
        {
          id: "chainlink",
          reason:
            "Leading decentralized oracle protocol connecting code to API data feeds.",
        },
      ];
    }

    // Default
    return [
      {
        id: "bitcoin",
        reason: "Safe haven asset, high rating, gold standard.",
      },
      {
        id: "ethereum",
        reason: "Best platform for builders and smart contract developers.",
      },
    ];
  };

  const generateRecommendations = async () => {
    setLoading(true);
    setRecommendations([]);

    try {
      const items = getItems();
      const itemsContext = items
        .map(
          (i) =>
            `id: ${i.id}, title: ${i.title}, category: ${i.category}, price: ${i.price}, rating: ${i.rating}, desc: ${i.shortDesc}`,
        )
        .join("\n");

      // 1. Try secure backend API (OpenRouter/OpenAI with OPENAI_API_KEY)
      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preference, customText, itemsContext }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          const cleaned = data.reply
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
          const parsed: Recommendation[] = JSON.parse(cleaned);
          if (Array.isArray(parsed)) {
            setRecommendations(parsed);
            setLoading(false);
            return;
          }
        }
      }

      // 2. Client-side Gemini fallback
      if (apiKey) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are the AI Recommendation Engine for Rock-Bit Crypto Exchange.
Analyze the user's asset investment preference and recommend the top 2 matching tokens from the database.

User Preference:
${preference === "custom" ? customText : preference}

Available Assets:
${itemsContext}

Output MUST be a valid JSON array of objects with exactly this format:
[
  {"id": "asset-id-here", "reason": "Short reason explaining why this fits their profile"}
]
Do not include any markdown format blocks or extra text outside the JSON.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();

        // Strip markdown backticks if returned
        const cleaned = text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        const parsed: Recommendation[] = JSON.parse(cleaned);
        if (Array.isArray(parsed)) {
          setRecommendations(parsed);
          setLoading(false);
          return;
        }
      }

      // 3. Fallback to Heuristics
      setTimeout(() => {
        const results = getHeuristicRecommendations(preference, customText);
        setRecommendations(results);
        setLoading(false);
      }, 800);
    } catch (e) {
      console.error("AI recommendations failed, falling back to heuristics", e);
      const results = getHeuristicRecommendations(preference, customText);
      setRecommendations(results);
      setLoading(false);
    }
  };

  // Find matching items to render cards
  const allItems = getItems();
  const recommendedItems = recommendations
    .map((rec) => {
      const item = allItems.find((i) => i.id === rec.id);
      return item ? { ...item, reason: rec.reason } : null;
    })
    .filter(Boolean) as (CryptoItem & { reason: string })[];

  return (
    <div className="bg-white dark:bg-[#141416]/90 border border-gray-100 dark:border-white/[0.06] rounded-3xl p-6 shadow-sm mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
          <FiCpu className="text-primary w-4.5 h-4.5" />
        </div>
        <div>
          <h2 className="font-bold text-sm text-gray-900 dark:text-white">
            AI Portfolio Recommendation Engine
          </h2>
          <p className="text-[10px] text-gray-400">
            Gemini analyzes our listings to suggest the best matching crypto
            assets.
          </p>
        </div>
      </div>

      {/* Config Panel */}
      <div className="space-y-4">
        {/* API Key configuration */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-gray-50 dark:bg-on-surface rounded-xl border border-gray-100 dark:border-gray-800">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <FiAlertCircle className="w-3.5 h-3.5 text-primary" /> Optional: Set
            Gemini Key for real-time model reasoning
          </span>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => handleApiKeyChange(e.target.value)}
            placeholder="Paste Gemini API Key"
            className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-[10px] outline-none bg-white dark:bg-[#141416]"
          />
        </div>

        {/* Preference Chips */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPreference("defi")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${preference === "defi" ? "bg-primary text-white" : "bg-gray-50 dark:bg-on-surface text-gray-600 dark:text-gray-300 hover:bg-gray-100"}`}
          >
            DeFi & Yield Pools
          </button>
          <button
            onClick={() => setPreference("growth")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${preference === "growth" ? "bg-primary text-white" : "bg-gray-50 dark:bg-on-surface text-gray-600 dark:text-gray-300 hover:bg-gray-100"}`}
          >
            High Growth L1s
          </button>
          <button
            onClick={() => setPreference("scalability")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${preference === "scalability" ? "bg-primary text-white" : "bg-gray-50 dark:bg-on-surface text-gray-600 dark:text-gray-300 hover:bg-gray-100"}`}
          >
            Layer 2 Scalability
          </button>
          <button
            onClick={() => setPreference("oracle")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${preference === "oracle" ? "bg-primary text-white" : "bg-gray-50 dark:bg-on-surface text-gray-600 dark:text-gray-300 hover:bg-gray-100"}`}
          >
            Data Oracles
          </button>
          <button
            onClick={() => setPreference("custom")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${preference === "custom" ? "bg-primary text-white" : "bg-gray-50 dark:bg-on-surface text-gray-600 dark:text-gray-300 hover:bg-gray-100"}`}
          >
            Custom Investment Style
          </button>
        </div>

        {preference === "custom" && (
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="e.g. Find me a low-price utility coin with high popularity rating..."
            className="w-full px-4 py-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#1d1d22] text-xs font-semibold outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-white"
          />
        )}

        <button
          onClick={generateRecommendations}
          disabled={loading || (preference === "custom" && !customText.trim())}
          className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-full shadow-lg shadow-primary/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
        >
          {loading ? (
            "Analyzing portfolio data..."
          ) : (
            <>
              <FiTrendingUp className="w-4 h-4" />
              <span>Get AI Suggestions</span>
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {recommendedItems.length > 0 && (
        <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Recommended Assets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1d1d22]/30 flex flex-col justify-between h-[160px]"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">
                      {item.category} ? ${item.price}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                      {item.reason}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Link
                    href={`/markets/${item.id}`}
                    className="text-xs text-primary font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>Trade details</span>
                    <FiChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
