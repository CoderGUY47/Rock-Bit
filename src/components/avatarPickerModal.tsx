"use client";

import React, { useState } from "react";
import { useProfile, DEFAULT_AVATARS } from "@/context/profileContext";
import { FiX, FiLink, FiCheck, FiImage } from "react-icons/fi";

export const AvatarPickerModal: React.FC = () => {
  const { avatarUrl, setAvatarUrl, showAvatarModal, setShowAvatarModal } =
    useProfile();
  const [customUrl, setCustomUrl] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatarUrl);

  if (!showAvatarModal) return null;

  const handleSelectDefault = (url: string) => {
    setSelectedAvatar(url);
    setAvatarUrl(url);
    setShowAvatarModal(false);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      setSelectedAvatar(customUrl.trim());
      setAvatarUrl(customUrl.trim());
      setShowAvatarModal(false);
      setCustomUrl("");
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-[fadeIn_0.15s_ease-out]">
      <div className="w-full max-w-xl bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FiImage className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                Select Profile Avatar
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                Choose from 15 default avatars or paste your custom image URL
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAvatarModal(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-2 rounded-xl transition-colors cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Custom Image URL Form */}
          <div>
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 block">
              Option 1: Add Image via Image URL
            </label>
            <form onSubmit={handleApplyCustomUrl} className="flex gap-2">
              <div className="relative flex-1">
                <FiLink className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://example.com/your-photo.jpg"
                  className="w-full pl-10 pr-4 py-2.5 text-xs font-semibold rounded-xl border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#1f2026] text-gray-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={!customUrl.trim()}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold transition-all cursor-pointer shrink-0"
              >
                Apply URL
              </button>
            </form>
          </div>

          <div className="border-t border-gray-100 dark:border-white/[0.06] pt-5">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3 block">
              Option 2: Choose from 15 Default Avatars
            </label>

            {/* 15 Avatars Grid */}
            <div className="grid grid-cols-5 gap-4">
              {DEFAULT_AVATARS.map((url, idx) => {
                const isSelected = selectedAvatar === url;
                return (
                  <button
                    key={url}
                    type="button"
                    onClick={() => handleSelectDefault(url)}
                    className={`group relative aspect-square rounded-full p-1 border-2 transition-all cursor-pointer flex items-center justify-center overflow-hidden ${
                      isSelected
                        ? "border-indigo-600 ring-4 ring-indigo-500/20 scale-105"
                        : "border-gray-200 dark:border-white/10 hover:border-indigo-400 hover:scale-105"
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={url}
                        alt={`Avatar ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 bg-indigo-600/30 rounded-full flex items-center justify-center">
                        <FiCheck className="w-5 h-5 text-white stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-[#1a1c22] flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-200">
              <img
                src={selectedAvatar}
                alt="Current"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-500 dark:text-gray-400 font-medium">
              Selected Avatar
            </span>
          </div>

          <button
            onClick={() => setShowAvatarModal(false)}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
