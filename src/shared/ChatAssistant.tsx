"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const SUGGESTED_PROMPTS = [
  "What is Bitcoin's price?",
  "Recommend a DeFi coin",
  "Explain cryptocurrency staking",
  "Take me to the Trade terminal",
];

export const ChatAssistant = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I am your Rock-Bit AI Assistant. How can I help you today? Ask me about coin prices, blockchain concepts, or ask me to navigate the platform.",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load API Key from environment or local storage
  useEffect(() => {
    const key =
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      localStorage.getItem("gemini_api_key") ||
      "";
    setApiKey(key);
  }, []);

  // Save API key changes to local storage
  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    localStorage.setItem("gemini_api_key", val);
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Execute navigation based on AI response keywords
  const handleAssistantAction = (text: string) => {
    const lowercase = text.toLowerCase();

    if (
      lowercase.includes("navigating to checkout") ||
      lowercase.includes("going to checkout") ||
      lowercase.includes("navigating to trade")
    ) {
      setTimeout(() => router.push("/checkout"), 1500);
    } else if (
      lowercase.includes("navigating to dashboard") ||
      lowercase.includes("going to dashboard") ||
      lowercase.includes("navigating to exchange")
    ) {
      setTimeout(() => router.push("/dashboard"), 1500);
    } else if (
      lowercase.includes("navigating to markets") ||
      lowercase.includes("going to markets") ||
      lowercase.includes("navigating to spot")
    ) {
      setTimeout(() => router.push("/markets"), 1500);
    } else if (
      lowercase.includes("navigating to contact") ||
      lowercase.includes("going to contact")
    ) {
      setTimeout(() => router.push("/contact"), 1500);
    } else if (
      lowercase.includes("navigating to about") ||
      lowercase.includes("going to about")
    ) {
      setTimeout(() => router.push("/about"), 1500);
    } else if (
      lowercase.includes("navigating to manage") ||
      lowercase.includes("going to manage")
    ) {
      setTimeout(() => router.push("/items/manage"), 1500);
    } else if (
      lowercase.includes("navigating to add") ||
      lowercase.includes("going to add")
    ) {
      setTimeout(() => router.push("/items/add"), 1500);
    }
  };

  // Simulated AI response generator (fallback)
  const generateSimulatedResponse = async (
    userText: string,
  ): Promise<string> => {
    const query = userText.toLowerCase();

    if (
      query.includes("contact") ||
      query.includes("support") ||
      query.includes("phone") ||
      query.includes("email")
    ) {
      return "You can contact our support team at Sinahosseini379@Gmail.Com, or call +98 902 353 2926. Would you like me to take you to our Contact Page?";
    }

    if (
      query.includes("about") ||
      query.includes("mission") ||
      query.includes("tech stack")
    ) {
      return "Rock-Bit is a next-generation crypto exchange built with Next.js, Tailwind CSS, Better Auth, and Supabase. I can navigate you to the About Page to read our full story.";
    }

    if (
      query.includes("checkout") ||
      query.includes("buy") ||
      query.includes("trade") ||
      query.includes("pay")
    ) {
      return "Understood. Navigating to the Buy Crypto / Trade Terminal page...";
    }
    if (
      query.includes("dashboard") ||
      query.includes("portfolio") ||
      query.includes("balance") ||
      query.includes("exchange")
    ) {
      return "Certainly! Navigating to your Portfolio Dashboard...";
    }
    if (query.includes("add") || query.includes("custom token")) {
      return "Opening the Add Custom Asset/Token form. Navigating to Add Token page...";
    }
    if (query.includes("manage") || query.includes("assets list")) {
      return "Opening your asset holdings manager. Navigating to Manage Portfolio page...";
    }
    if (query.includes("bitcoin") || query.includes("btc")) {
      return "Bitcoin (BTC) is currently trading at simulated rate of $92,500.00 (+2.4% over 24h). Would you like to go to the Markets page to view more assets?";
    }
    if (
      query.includes("defi") ||
      query.includes("solana") ||
      query.includes("ethereum")
    ) {
      return "Solana (SOL) and Ethereum (ETH) are key layer-1 assets that power DeFi. ETH is trading at $3,450.00 (+1.8%) and SOL at $210.00 (+4.5%). You can view and manage them on your dashboard!";
    }
    if (query.includes("stake") || query.includes("staking")) {
      return "Staking is locking your crypto assets to secure a blockchain network in exchange for rewards. Rock-Bit will soon offer up to 8.5% APY on Ethereum staking.";
    }

    return "I am the Rock-Bit Conversational AI. Try asking me: 'What is Bitcoin's price?', 'Recommend a DeFi coin', 'Explain staking', or 'Take me to trade'!";
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputText("");
    setIsTyping(true);

    try {
      // 1. Try secure backend API (OpenRouter/OpenAI with OPENAI_API_KEY)
      const formattedHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: formattedHistory })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            { sender: "ai", text: data.reply.trim() },
          ]);
          handleAssistantAction(data.reply);
          setIsTyping(false);
          return;
        }
      }

      // 2. Client-side Gemini key fallback
      if (apiKey) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemContext = `You are the Conversational AI Assistant for "Rock-Bit", a premium cryptocurrency exchange and portfolio tracker platform.
Current Page Route: "${pathname}"

Navigation rules:
- If the user wants to trade, checkout, or buy crypto, include the exact phrase "Navigating to Checkout" in your reply.
- If the user wants to check dashboard, portfolio, exchange, or wallet balances, include the exact phrase "Navigating to Dashboard" in your reply.
- If the user wants to see markets, coin listings, or prices, include the exact phrase "Navigating to Markets" in your reply.
- If the user wants to read about us, include the exact phrase "Navigating to About" in your reply.
- If the user wants to contact support or send message, include the exact phrase "Navigating to Contact" in your reply.
- If the user wants to add custom token, include the exact phrase "Navigating to Add Item" in your reply.
- If the user wants to manage asset holdings, include the exact phrase "Navigating to Manage Items" in your reply.

Explain crypto topics (DeFi, staking, blockchain) clearly and keep replies under 75 words.`;

        const chat = model.startChat({
          history: [
            { role: "user", parts: [{ text: systemContext }] },
            {
              role: "model",
              parts: [
                {
                  text: "Understood. I will act as the Rock-Bit Crypto AI Assistant and guide users with prices, concepts, or navigation.",
                },
              ],
            },
          ],
        });

        const result = await chat.sendMessage(text);
        const responseText = result.response.text();
        if (responseText) {
          setMessages((prev) => [
            ...prev,
            { sender: "ai", text: responseText.trim() },
          ]);
          handleAssistantAction(responseText);
          setIsTyping(false);
          return;
        }
      }

      // 3. Heuristics fallback
      setTimeout(async () => {
        const reply = await generateSimulatedResponse(text);
        setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
        handleAssistantAction(reply);
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      console.error("AI chat failed, using fallback", error);
      setTimeout(async () => {
        const reply = await generateSimulatedResponse(text);
        setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
        handleAssistantAction(reply);
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Panel */}
      {isOpen && (
        <div className="bg-white dark:bg-[#1f2128] text-gray-800 dark:text-white rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden mb-4 animate-[fadeInUp_0.3s_ease-out] relative">
          {/* Header */}
          <div className="bg-gray-900 dark:bg-[#141416] text-white p-4 flex justify-between items-center shrink-0 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse"></div>
              <div>
                <h4 className="font-bold text-sm">Rock-Bit AI Advisor</h4>
                <p className="text-[10px] text-secondary">Online & ready</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-secondary hover:text-white transition-colors cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Optional Gemini API Key input */}
          <div className="bg-gray-50 dark:bg-on-surface/60 border-b border-gray-100 dark:border-gray-800 p-2 shrink-0 flex items-center justify-between gap-2">
            <span className="text-[9px] font-semibold text-secondary uppercase tracking-wider">
              Gemini API Key
            </span>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              placeholder="Optional: Paste Gemini Key"
              className="px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-[10px] outline-none w-36 bg-white dark:bg-[#141416]"
            />
          </div>

          {/* Messages */}
          <div className="grow p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-[#141416]/20">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-white dark:bg-on-surface text-gray-800 dark:text-white border border-gray-100 dark:border-gray-800 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-on-surface border border-gray-100 dark:border-gray-800 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chips */}
          <div className="px-4 py-2 bg-white dark:bg-[#1f2128] border-t border-gray-100 dark:border-gray-800 flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap bg-gray-50 dark:bg-on-surface hover:bg-gray-100 dark:hover:bg-[#141416] border border-gray-100 dark:border-gray-800 rounded-full px-3 py-1 text-[10px] font-medium text-gray-600 dark:text-secondary2 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Form input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 bg-white dark:bg-[#1f2128] border-t border-gray-100 dark:border-gray-800 flex gap-2 items-center shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything or navigate..."
              className="grow px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs outline-none focus:ring-1 focus:ring-primary transition-all bg-gray-50 dark:bg-[#141416] focus:bg-white dark:focus:bg-[#141416] text-gray-800 dark:text-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 bg-gray-900 dark:bg-primary hover:bg-gray-800 dark:hover:bg-interactive text-white rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
            >
              <svg
                className="w-4 h-4 transform rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gray-900 dark:bg-primary hover:bg-gray-800 dark:hover:bg-interactive text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Open advisor chat"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
