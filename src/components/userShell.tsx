"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EarnBanner } from "@/components/earnBanner";
import { ChatAssistant } from "@/components/chatAssistant";


export const UserShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || "";

  // Admin pages (all /admin-* routes) are handled by DashboardShell
  const isAdminPage = pathname.startsWith("/admin-");
  // Auth pages and public home are bare/self-managed
  const isBare = pathname === "/" || pathname.startsWith("/auth");

  if (isAdminPage || isBare) {
    return <>{children}</>;
  }

  // All remaining user/customer routes get the public layout
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#0c0c0e] transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <EarnBanner />
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default UserShell;
