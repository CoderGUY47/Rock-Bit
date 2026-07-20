'use client';

import React from 'react';
import { ProfileLayout } from '@/components/profileLayout';
import { ChangePasswordTab } from '@/components/changePasswordTab';

export default function ChangePasswordPage() {
  return (
    <ProfileLayout>
      <ChangePasswordTab />
    </ProfileLayout>
  );
}
