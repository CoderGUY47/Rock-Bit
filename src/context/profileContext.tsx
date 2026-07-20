"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserInfo, FeatureStatus } from "@/components/profileTypes";
import { notifySuccess, notifyWarning, notifyError } from "@/components/toastProvider";

export const DEFAULT_AVATARS = Array.from({ length: 15 }, (_, i) => `/assets/avatars/avatar${i + 1}.svg`);

export interface ApiKeyItem {
  id: string;
  label: string;
  key: string;
  secret: string;
  created: string;
  permissions: { read: boolean; trade: boolean; withdraw: boolean };
  ipRestriction: string;
}

export interface LoginSessionItem {
  id: string;
  device: string;
  location: string;
  ip: string;
  time: string;
  isCurrent: boolean;
}

interface ProfileContextType {
  userInfo: UserInfo;
  avatarUrl: string;
  features: FeatureStatus;
  apiKeys: ApiKeyItem[];
  loginHistory: LoginSessionItem[];
  twoFactor: { app: boolean; sms: boolean; email: boolean };
  showAvatarModal: boolean;
  setShowAvatarModal: (show: boolean) => void;
  updateUserInfo: (info: Partial<UserInfo>) => void;
  setAvatarUrl: (url: string) => void;
  updateFeature: (key: keyof FeatureStatus, value: boolean) => void;
  addApiKey: (label: string, permissions: { read: boolean; trade: boolean; withdraw: boolean }) => void;
  deleteApiKey: (id: string) => void;
  updateApiKey: (id: string, permissions: { read: boolean; trade: boolean; withdraw: boolean }) => void;
  toggle2FA: (type: "app" | "sms" | "email") => void;
  changePassword: (currentPass: string, newPass: string) => boolean;
  revokeSession: (id: string) => void;
}

const DEFAULT_USER_INFO: UserInfo = {
  firstName: "Sarah",
  lastName: "Jenkins",
  email: "sarah.jenkins@rockbit.io",
  phone: "+1 (555) 382-9102",
  countryCode: "+1",
  nationality: "American",
  gender: "Female",
  dob: "14/08/1994",
};

const DEFAULT_AVATAR = "/assets/avatars/avatar1.svg";

const DEFAULT_FEATURES: FeatureStatus = {
  depositAssets: true,
  withdrawAssets: true,
  cardPurchases: true,
  bankDeposit: false,
  fiatSpotWallet: true,
  marginWallet: true,
};

const DEFAULT_API_KEYS: ApiKeyItem[] = [
  {
    id: "api-1",
    label: "Automated Trading Bot 01",
    key: "rb_live_9f81a7b32c4d9e01",
    secret: "••••••••••••••••••••••••••••••••",
    created: "2026-03-12",
    permissions: { read: true, trade: true, withdraw: false },
    ipRestriction: "192.168.1.100",
  },
  {
    id: "api-2",
    label: "Portfolio Tracker App",
    key: "rb_read_4a71c890bf23d8e9",
    secret: "••••••••••••••••••••••••••••••••",
    created: "2026-05-20",
    permissions: { read: true, trade: false, withdraw: false },
    ipRestriction: "Unrestricted",
  },
];

const DEFAULT_SESSIONS: LoginSessionItem[] = [
  {
    id: "sess-1",
    device: "MacBook Pro (Chrome 124)",
    location: "New York, USA",
    ip: "198.51.100.42",
    time: "Active Now",
    isCurrent: true,
  },
  {
    id: "sess-2",
    device: "iPhone 15 Pro (Rock-Bit App)",
    location: "New York, USA",
    ip: "172.56.21.89",
    time: "2 hours ago",
    isCurrent: false,
  },
  {
    id: "sess-3",
    device: "Windows Desktop (Firefox 125)",
    location: "Boston, USA",
    ip: "203.0.113.19",
    time: "Yesterday, 18:42",
    isCurrent: false,
  },
];

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfoState] = useState<UserInfo>(DEFAULT_USER_INFO);
  const [avatarUrl, setAvatarUrlState] = useState<string>(DEFAULT_AVATAR);
  const [features, setFeaturesState] = useState<FeatureStatus>(DEFAULT_FEATURES);
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(DEFAULT_API_KEYS);
  const [loginHistory, setLoginHistory] = useState<LoginSessionItem[]>(DEFAULT_SESSIONS);
  const [twoFactor, setTwoFactor] = useState({ app: true, sms: false, email: true });
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedUser = localStorage.getItem("rockbit_user_info");
        if (savedUser) setUserInfoState(JSON.parse(savedUser));

        const savedAvatar = localStorage.getItem("rockbit_avatar_url");
        if (savedAvatar) setAvatarUrlState(savedAvatar);

        const savedFeatures = localStorage.getItem("rockbit_features");
        if (savedFeatures) setFeaturesState(JSON.parse(savedFeatures));

        const savedApiKeys = localStorage.getItem("rockbit_api_keys");
        if (savedApiKeys) setApiKeys(JSON.parse(savedApiKeys));

        const saved2FA = localStorage.getItem("rockbit_2fa");
        if (saved2FA) setTwoFactor(JSON.parse(saved2FA));
      } catch (e) {
        console.error("Error loading profile context from localStorage", e);
      }
    }
  }, []);

  const updateUserInfo = (info: Partial<UserInfo>) => {
    const updated = { ...userInfo, ...info };
    setUserInfoState(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("rockbit_user_info", JSON.stringify(updated));
    }
    notifySuccess("Saved Successfully", "Your profile information has been updated successfully.");
  };

  const setAvatarUrl = (url: string) => {
    if (!url || !url.trim()) return;
    const cleanUrl = url.trim();
    setAvatarUrlState(cleanUrl);
    if (typeof window !== "undefined") {
      localStorage.setItem("rockbit_avatar_url", cleanUrl);
    }
    notifySuccess("Saved Successfully", "Your profile avatar has been updated successfully.");
  };

  const updateFeature = (key: keyof FeatureStatus, value: boolean) => {
    const updated = { ...features, [key]: value };
    setFeaturesState(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("rockbit_features", JSON.stringify(updated));
    }
    notifySuccess("Saved Successfully", `Account feature settings updated.`);
  };

  const addApiKey = (label: string, permissions: { read: boolean; trade: boolean; withdraw: boolean }) => {
    const newKey: ApiKeyItem = {
      id: `api-${Date.now()}`,
      label: label.trim() || "New API Key",
      key: `rb_live_${Math.random().toString(36).substring(2, 18)}`,
      secret: "••••••••••••••••••••••••••••••••",
      created: new Date().toISOString().split("T")[0],
      permissions,
      ipRestriction: "Unrestricted",
    };
    const updated = [newKey, ...apiKeys];
    setApiKeys(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("rockbit_api_keys", JSON.stringify(updated));
    }
    notifySuccess("Saved Successfully", `API Key "${newKey.label}" created successfully.`);
  };

  const deleteApiKey = (id: string) => {
    const keyToDelete = apiKeys.find((k) => k.id === id);
    const updated = apiKeys.filter((k) => k.id !== id);
    setApiKeys(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("rockbit_api_keys", JSON.stringify(updated));
    }
    notifyWarning("API Key Revoked", `API Key "${keyToDelete?.label || id}" deleted.`);
  };

  const updateApiKey = (id: string, permissions: { read: boolean; trade: boolean; withdraw: boolean }) => {
    const updated = apiKeys.map((k) => (k.id === id ? { ...k, permissions } : k));
    setApiKeys(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("rockbit_api_keys", JSON.stringify(updated));
    }
    notifySuccess("Saved Successfully", "API Key permissions updated.");
  };

  const toggle2FA = (type: "app" | "sms" | "email") => {
    const updated = { ...twoFactor, [type]: !twoFactor[type] };
    setTwoFactor(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("rockbit_2fa", JSON.stringify(updated));
    }
    notifySuccess("Saved Successfully", `2FA authentication setting updated.`);
  };

  const changePassword = (currentPass: string, newPass: string) => {
    if (!currentPass || !newPass) {
      notifyError("Action Required", "Please fill in all password fields.");
      return false;
    }
    if (newPass.length < 8) {
      notifyError("Action Required", "Password must be at least 8 characters long.");
      return false;
    }
    notifySuccess("Saved Successfully", "Your account password has been updated.");
    return true;
  };

  const revokeSession = (id: string) => {
    const updated = loginHistory.filter((s) => s.id !== id);
    setLoginHistory(updated);
    notifyWarning("Session Ended", "Active login session revoked successfully.");
  };

  return (
    <ProfileContext.Provider
      value={{
        userInfo,
        avatarUrl,
        features,
        apiKeys,
        loginHistory,
        twoFactor,
        showAvatarModal,
        setShowAvatarModal,
        updateUserInfo,
        setAvatarUrl,
        updateFeature,
        addApiKey,
        deleteApiKey,
        updateApiKey,
        toggle2FA,
        changePassword,
        revokeSession,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
