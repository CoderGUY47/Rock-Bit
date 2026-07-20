'use client';

import React from 'react';
import { ProfileLayout } from '@/components/profileLayout';
import { TwoFactorTab } from '@/components/twoFactorTab';

export default function TwoFactorPage() {
  return (
    <ProfileLayout>
      <TwoFactorTab />
    </ProfileLayout>
  );
}
