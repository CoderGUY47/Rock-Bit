'use client';

import React from 'react';
import { ProfileLayout } from '@/components/profileLayout';
import { ReferralsTab } from '@/components/referralsTab';

export default function ReferralPage() {
  return (
    <ProfileLayout>
      <ReferralsTab />
    </ProfileLayout>
  );
}
