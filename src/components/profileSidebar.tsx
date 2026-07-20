"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfile } from "@/context/profileContext";
import {
  FiUser,
  FiShare2,
  FiCode,
  FiClock,
  FiShield,
  FiLock,
  FiCamera,
} from "react-icons/fi";

export function ProfileSidebar() {
  const pathname = usePathname();
  const { userInfo, avatarUrl, setShowAvatarModal } = useProfile();

  const menuItems = [
    { href: "/profile", label: "User Profile", icon: FiUser },
    { href: "/profile/referral", label: "Referrals", icon: FiShare2 },
    { href: "/profile/api-keys", label: "API keys", icon: FiCode },
    { href: "/profile/login-history", label: "Login history", icon: FiClock },
    { href: "/profile/2fa", label: "2FA", icon: FiShield },
    {
      href: "/profile/change-password",
      label: "Change password",
      icon: FiLock,
    },
  ] as const;

  return (
    <div className="w-full lg:w-64 shrink-0 flex flex-col items-center bg-white dark:bg-[#141416] p-6 border border-gray-200 dark:border-white/[0.04] rounded-2xl select-none shadow-xs">
      {/* Avatar Container */}
      <div className="relative group mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-gray-800 relative shadow-sm">
          <img
            src={avatarUrl}
            alt={`${userInfo.firstName} ${userInfo.lastName}`}
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={() => setShowAvatarModal(true)}
          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white border-2 border-white dark:border-[#141416] shadow-md hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
          title="Change avatar or set Image URL"
        >
          <FiCamera className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* User Name & Email (Lady profile) */}
      <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-1.5">
        <span>
          {userInfo.firstName} {userInfo.lastName}
        </span>
        {typeof window !== "undefined" &&
          localStorage.getItem("rockbit_user_role") === "admin" && (
            <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 text-[9px] font-black uppercase tracking-wider">
              Admin
            </span>
          )}
      </h3>
      <p className="text-[11px] text-gray-400 font-semibold mt-0.5 mb-4 truncate max-w-full">
        {userInfo.email}
      </p>

      {typeof window !== "undefined" &&
        localStorage.getItem("rockbit_user_role") === "admin" && (
          <div className="w-full mb-5 px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/30 text-[10px] font-bold text-purple-700 dark:text-purple-300 text-center">
            🛡️ Admin Mode (Full Access)
          </div>
        )}

      {/* Navigation Links */}
      <nav className="w-full space-y-1">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                active
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04]"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-gray-400"}`}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
