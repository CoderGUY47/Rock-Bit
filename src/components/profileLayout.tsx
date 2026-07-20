'use client';

import React from 'react';
import { ProfileSidebar } from './profileSidebar';
import { ProfileProvider } from '@/context/profileContext';
import { AvatarPickerModal } from './avatarPickerModal';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <ProfileProvider>
      <div className="bg-[#f8f9fa] dark:bg-[#0c0c0e] min-h-screen text-gray-900 dark:text-white font-sans">
        <AvatarPickerModal />

        {/* Header with Breadcrumbs */}
        <div className="border-b border-gray-200 dark:border-white/[0.04] bg-white dark:bg-[#141416]">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              User Profile
            </h1>
            <nav className="flex items-center gap-2 text-xs text-gray-400 font-bold select-none">
              <span>Home</span>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <span className="text-gray-700 dark:text-gray-300">User</span>
            </nav>
          </div>
        </div>

        {/* Main Layout Container */}
        <div className="max-w-7xl mx-auto w-full px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar */}
            <ProfileSidebar />

            {/* Active Tab Content Panel */}
            <div className="flex-1 w-full min-w-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
}
