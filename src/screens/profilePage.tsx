'use client';

import React from 'react';
import { ProfileLayout } from '@/components/profileLayout';
import { UserProfileTab } from '@/components/userProfileTab';

export default function UserProfilePage() {
  return (
    <ProfileLayout>
      <UserProfileTab />
    </ProfileLayout>
  );
}
