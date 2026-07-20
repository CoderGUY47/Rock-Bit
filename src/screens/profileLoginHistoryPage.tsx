'use client';

import React from 'react';
import { ProfileLayout } from '@/components/profileLayout';
import { LoginHistoryTab } from '@/components/loginHistoryTab';

export default function LoginHistoryPage() {
  return (
    <ProfileLayout>
      <LoginHistoryTab />
    </ProfileLayout>
  );
}
