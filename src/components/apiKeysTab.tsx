"use client";

import React, { useState } from "react";
import {
  FiMail,
  FiKey,
  FiTrash2,
  FiPlus,
  FiLock,
  FiGlobe,
  FiTerminal,
  FiCheck,
  FiCpu,
  FiClock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { notifySuccess, notifyWarning } from "@/components/toastProvider";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  secret: string;
  permissions: ("Read" | "Write" | "Withdraw")[];
  ipWhitelist: string;
  created: string;
  expires: string;
}

export function ApiKeysTab() {
  const [isEnabled, setIsEnabled] = useState(true); // default to true to show the rich manager UI first
  const [password, setPassword] = useState("");
  const [twoFaCode, setTwoFaCode] = useState("");

  // Active Keys List
  const [keys, setKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Trading Bot API",
      key: "rb_key_839185712f831",
      secret: "rb_sec_9482759182375812937512938571293",
      permissions: ["Read", "Write"],
      ipWhitelist: "103.82.12.98",
      created: "2026-06-12",
      expires: "Never",
    },
    {
      id: "2",
      name: "Tax Reporting Extension",
      key: "rb_key_920194812a19",
      secret: "rb_sec_1048293847192837491028374910283",
      permissions: ["Read"],
      ipWhitelist: "Any IP",
      created: "2026-07-01",
      expires: "2026-10-01",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [ipWhitelist, setIpWhitelist] = useState("");
  const [write, setWrite] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [revealedSecret, setRevealedSecret] = useState<string | null>(null);

  // Custom modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    description: string | React.ReactNode;
    confirmText: string;
    isDestructive?: boolean;
    onConfirm: () => void;
  } | null>(null);

  function openConfirm(
    title: string,
    description: string | React.ReactNode,
    onConfirm: () => void,
    isDestructive = false,
  ) {
    setModalConfig({
      title,
      description,
      confirmText: isDestructive ? "Delete" : "Confirm",
      isDestructive,
      onConfirm: () => {
        onConfirm();
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  }

  // Mock API Logs
  const apiLogs = [
    {
      time: "18:55:10",
      endpoint: "GET /api/v1/wallet/balance",
      key: "Trading Bot API",
      ip: "103.82.12.98",
      status: "200 OK",
    },
    {
      time: "18:52:04",
      endpoint: "POST /api/v1/order/create",
      key: "Trading Bot API",
      ip: "103.82.12.98",
      status: "201 Created",
    },
    {
      time: "18:30:12",
      endpoint: "GET /api/v1/market/prices",
      key: "Tax Reporting Extension",
      ip: "82.102.3.45",
      status: "200 OK",
    },
    {
      time: "17:15:45",
      endpoint: "POST /api/v1/wallet/withdraw",
      key: "Trading Bot API",
      ip: "103.82.12.98",
      status: "403 Forbidden",
    },
  ];

  function handleEnable(e: React.FormEvent) {
    e.preventDefault();
    if (!password || !twoFaCode) return;
    setIsEnabled(true);
    setPassword("");
    setTwoFaCode("");
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;

    const perms: ("Read" | "Write" | "Withdraw")[] = ["Read"];
    if (write) perms.push("Write");
    if (withdraw) perms.push("Withdraw");

    const newKey: ApiKey = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      key: `rb_key_${Math.random().toString(36).substr(2, 10)}`,
      secret: `rb_sec_${Math.random().toString(36).substr(2, 12)}${Math.random().toString(36).substr(2, 12)}`,
      permissions: perms,
      ipWhitelist: ipWhitelist.trim() || "Any IP",
      created: new Date().toISOString().split("T")[0],
      expires: "Never",
    };

    setKeys([newKey, ...keys]);
    notifySuccess(
      "Saved Successfully",
      `API Key "${newName}" created successfully.`,
    );
    setNewName("");
    setIpWhitelist("");
    setWrite(false);
    setWithdraw(false);
  }

  function handleDelete(id: string) {
    const keyItem = keys.find((k) => k.id === id);
    if (!keyItem) return;

    openConfirm(
      "Delete API Key",
      <span>
        Are you sure you want to delete the API Key{" "}
        <strong>{keyItem.name}</strong>? This action cannot be undone.
      </span>,
      () => {
        setKeys(keys.filter((k) => k.id !== id));
        if (revealedSecret === id) setRevealedSecret(null);
        notifyWarning("API Key Revoked", `API Key "${keyItem.name}" deleted.`);
      },
      true,
    );
  }

  const inputCls =
    "w-full px-4 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors";
  const labelCls =
    "text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5 block";

  return (
    <div className="space-y-6 select-none animate-[fadeIn_0.2s_ease-out]">
      {/* ── Status Header & Stats (Developer Portal Style) ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Status Block */}
        <div className="lg:col-span-2 bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-24 -top-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                  API Access Credentials
                </h2>
                <h3
                  className={`text-2xl font-bold mt-1 flex items-center gap-2 ${isEnabled ? "text-[#58bd7d]" : "text-red-500"}`}
                >
                  API Access is {isEnabled ? "Enabled" : "Disabled"}
                  {isEnabled && (
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  )}
                </h3>
              </div>
              <p className="text-xs text-gray-450 dark:text-gray-400 font-semibold flex items-center gap-1.5 bg-gray-55 dark:bg-white/[0.03] px-3 py-1.5 rounded-md border border-gray-100 dark:border-white/[0.03]">
                <FiMail className="w-3.5 h-3.5" /> Petersonkenn@Demo.Com
              </p>
            </div>
            <p className="text-xs text-gray-455 dark:text-gray-400 font-medium mt-4">
              Use API keys to connect automated trading terminals, portfolio
              trackers, or tax tools.
            </p>
          </div>
        </div>

        {/* Live Performance Panel */}
        <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              API Usage (24h)
            </p>
            <div className="flex items-baseline gap-1 mt-1.5">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                14,802
              </span>
              <span className="text-[10px] text-gray-400 font-bold">Calls</span>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-white/[0.03] pt-3.5 mt-4 grid grid-cols-2 gap-2 text-[10px] font-bold">
            <div>
              <span className="text-gray-400 block font-semibold">
                Success Rate
              </span>
              <span className="text-emerald-500 mt-0.5 block">99.98%</span>
            </div>
            <div>
              <span className="text-gray-400 block font-semibold">
                Avg Latency
              </span>
              <span className="text-indigo-500 mt-0.5 block">45ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Conditional Render ───────────────────────────────────────────── */}
      {!isEnabled ? (
        /* Disabled: Form to enable */
        <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs max-w-2xl">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">
            Enable API keys
          </h3>
          <p className="text-xs text-gray-400 font-semibold mb-6">
            Enter Your Password And 2FA Code To Enable The API Keys
          </p>

          <form onSubmit={handleEnable} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Your Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <label className={labelCls}>2FA Code</label>
                <input
                  type="text"
                  value={twoFaCode}
                  onChange={(e) => setTwoFaCode(e.target.value)}
                  className={inputCls}
                  placeholder="2FA code"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-8 py-3 rounded-full transition-all cursor-pointer shadow-md shadow-indigo-500/10 active:scale-98"
              >
                Enable API keys
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Enabled: Main Developer panel */
        <div className="space-y-6">
          {/* Create Key */}
          <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5">
              Generate API Key
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>API Key Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Trading Bot Terminal"
                    required
                  />
                </div>
                {/* IP Whitelisting */}
                <div>
                  <label className={labelCls}>
                    IP Access Restriction (Whitelisting)
                  </label>
                  <input
                    type="text"
                    value={ipWhitelist}
                    onChange={(e) => setIpWhitelist(e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 103.82.12.98 (Leave empty for any IP)"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2.5 block">
                  Permissions & Scopes
                </span>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700 dark:text-gray-200">
                    <input
                      type="checkbox"
                      checked
                      disabled
                      className="accent-indigo-600 rounded"
                    />
                    <span>Read (Details & Balance)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700 dark:text-gray-200">
                    <input
                      type="checkbox"
                      checked={write}
                      onChange={(e) => setWrite(e.target.checked)}
                      className="accent-indigo-600 rounded"
                    />
                    <span>Write (Execute Trades)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700 dark:text-gray-200 text-red-500">
                    <input
                      type="checkbox"
                      checked={withdraw}
                      onChange={(e) => setWithdraw(e.target.checked)}
                      className="accent-red-500 rounded"
                    />
                    <span className="flex items-center gap-1">
                      <FiLock className="w-3 h-3" /> Withdraw (Allow Transfers)
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-500/10"
                >
                  <FiPlus className="w-4 h-4" /> Create Key
                </button>
                <button
                  type="button"
                  onClick={() => setIsEnabled(false)}
                  className="border border-red-500 text-red-500 hover:bg-red-500/5 font-bold text-xs px-6 py-2.5 rounded-full transition-all cursor-pointer"
                >
                  Disable API Access
                </button>
              </div>
            </form>
          </div>

          {/* Active Keys List (Insiders Border Color Matched exactly to parent border) */}
          <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              Active API Credentials
            </h3>

            <div className="space-y-5">
              {keys.map((k) => (
                <div
                  key={k.id}
                  className="border border-gray-200 dark:border-white/[0.04] rounded-md p-5 bg-gray-50 dark:bg-[#1c1d24]"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-950 dark:text-white flex items-center gap-2">
                        <FiKey className="w-4 h-4 text-indigo-500" /> {k.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-semibold mt-1">
                        Created: {k.created} | Expiry: {k.expires}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 justify-end">
                      <div className="flex gap-1">
                        {k.permissions.map((p) => (
                          <span
                            key={p}
                            className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                              p === "Withdraw"
                                ? "bg-red-50 dark:bg-red-950/20 text-red-600"
                                : p === "Write"
                                  ? "bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600"
                                  : "bg-gray-100 dark:bg-white/[0.04] text-gray-500"
                            }`}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleDelete(k.id)}
                        className="text-gray-400 hover:text-red-500 cursor-pointer p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors"
                      >
                        <FiTrash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-gray-200 dark:border-white/[0.04] pt-4">
                    {/* API Key */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-semibold">
                        API Key:
                      </span>
                      <span className="font-mono bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] px-3 py-1 rounded-md text-gray-900 dark:text-white select-all">
                        {k.key}
                      </span>
                    </div>

                    {/* Secret Key with Reveal Toggle */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-semibold">
                        API Secret:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] px-3 py-1 rounded-md text-gray-900 dark:text-white select-all">
                          {revealedSecret === k.id
                            ? k.secret
                            : "••••••••••••••••••••••••••••••••"}
                        </span>
                        <button
                          onClick={() =>
                            setRevealedSecret(
                              revealedSecret === k.id ? null : k.id,
                            )
                          }
                          className="text-gray-400 hover:text-indigo-500 p-1 cursor-pointer"
                        >
                          {revealedSecret === k.id ? (
                            <FiEyeOff className="w-4 h-4" />
                          ) : (
                            <FiEye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* IP Restrictions */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-semibold">
                        IP Whitelist:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <FiGlobe className="w-3.5 h-3.5 text-gray-400" />{" "}
                        {k.ipWhitelist}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Logs Terminal */}
          <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5 flex items-center gap-2">
              <FiTerminal className="w-4.5 h-4.5 text-indigo-500" /> API Stream
              Logs
            </h3>
            <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-wider">
              Live stream of developer integration calls
            </p>

            <div className="bg-black/90 rounded-md p-4 font-mono text-[11px] leading-relaxed text-gray-300 max-h-60 overflow-y-auto border border-white/[0.08]">
              <div className="flex justify-between text-gray-550 border-b border-white/[0.08] pb-1.5 mb-2 font-bold">
                <span>TIME</span>
                <span>KEY NAME</span>
                <span>METHOD / ENDPOINT</span>
                <span className="text-right">STATUS</span>
              </div>
              <div className="space-y-1.5">
                {apiLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between hover:bg-white/[0.02] py-0.5 rounded-md transition-colors"
                  >
                    <span className="text-gray-500">{log.time}</span>
                    <span className="text-gray-400 font-bold truncate max-w-[120px]">
                      {log.key}
                    </span>
                    <span className="text-indigo-400 font-semibold">
                      {log.endpoint}
                    </span>
                    <span
                      className={
                        log.status.startsWith("2")
                          ? "text-[#58bd7d]"
                          : "text-red-500"
                      }
                    >
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Shadcn-like Dialogue Modal (New Custom Prompt UI) ───────────── */}
      {modalOpen && modalConfig && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 animate-[fadeIn_0.15s_ease-out]">
          <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 max-w-sm w-full mx-4 shadow-xl select-none animate-[scaleUp_0.15s_ease-out]">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
              {modalConfig.title}
            </h3>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-6 leading-relaxed">
              {modalConfig.description}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-gray-200 dark:border-white/[0.06] rounded-md text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/[0.02] text-gray-700 dark:text-gray-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={modalConfig.onConfirm}
                className={`px-4 py-2 text-white font-bold text-xs rounded-md cursor-pointer ${
                  modalConfig.isDestructive
                    ? "bg-red-500 hover:bg-red-650"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {modalConfig.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
