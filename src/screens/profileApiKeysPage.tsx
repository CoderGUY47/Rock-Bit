'use client';

import React from 'react';
import { ProfileLayout } from '@/components/profileLayout';
import { ApiKeysTab } from '@/components/apiKeysTab';

export default function ApiKeysPage() {
  return (
    <ProfileLayout>
      <ApiKeysTab />
    </ProfileLayout>
  );
}
