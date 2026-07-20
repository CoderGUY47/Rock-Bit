"use client";

/**
 * DashboardShell Component
 * Layout container that selectively wraps `/admin-*` paths with Admin Sidebar & Header.
 */
import React from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboardSidebar";
import { DashboardHeader } from "@/components/dashboardHeader";
import { ChatAssistant } from "@/components/chatAssistant";

export const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || "";
  
  // All admin routes are prefixed with /admin-
  // e.g. /admin-home, /admin-markets, /admin-exchange, /admin-byfi/*, etc.
  const isAdminPage = pathname.startsWith("/admin-");

  // Only render admin shell for admin routes
  if (!isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-[#0c0c0e] transition-colors duration-300">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0c0c0e] transition-colors duration-300">
          {children}
        </main>
      </div>
      <ChatAssistant />
    </div>
  );
};

export default DashboardShell;
