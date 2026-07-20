'use client';

import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiCheck, FiX, FiClock, FiSettings } from 'react-icons/fi';
import { notifySuccess, notifyError } from '@/components/toastProvider';

export function ChangePasswordTab() {
  const [oldPassword, setOldPassword] = useState('123456789');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFaCode, setTwoFaCode] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showTwoFa, setShowTwoFa] = useState(false);

  // Settings Toggles (New Features)
  const [logoutAllDevices, setLogoutAllDevices] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);

  // Strength Check Rules
  const meetsMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

  const strengthCount = [meetsMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;
  const strengthLevels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthLevel = strengthLevels[strengthCount];
  const progressColors = ['bg-red-500', 'bg-red-500', 'bg-amber-500', 'bg-indigo-500', 'bg-emerald-500', 'bg-emerald-500'];

  const inputCls = 'w-full pl-4 pr-10 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors';
  const labelCls = 'text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5 block';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      notifyError('Action Required', 'New password and Confirm password do not match.');
      return;
    }
    if (strengthCount < 3) {
      notifyError('Action Required', 'Please use a stronger password with numbers and symbols.');
      return;
    }
    notifySuccess('Saved Successfully', 'Password changed successfully!' + (logoutAllDevices ? ' Logged out all other active sessions.' : ''));
    setNewPassword('');
    setConfirmPassword('');
    setTwoFaCode('');
  }

  return (
    <div className="space-y-6 select-none animate-[fadeIn_0.2s_ease-out]">
      
      {/* ── Main Change Form ─────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Change Password</h2>
        <p className="text-xs text-gray-400 font-bold mb-6 uppercase tracking-wider">New Password</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            
            {/* Old Password */}
            <div>
              <label className={labelCls}>Old Password*:</label>
              <div className="relative">
                <input
                  type={showOld ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  className={inputCls}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-indigo-500 cursor-pointer"
                >
                  {showOld ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 2FA Code */}
            <div>
              <label className={labelCls}>2FA Code*:</label>
              <div className="relative">
                <input
                  type={showTwoFa ? 'text' : 'password'}
                  value={twoFaCode}
                  placeholder="2FA Code"
                  onChange={e => setTwoFaCode(e.target.value)}
                  className={inputCls}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowTwoFa(!showTwoFa)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-indigo-500 cursor-pointer"
                >
                  {showTwoFa ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className={labelCls}>New Password*:</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  placeholder="New Password"
                  onChange={e => setNewPassword(e.target.value)}
                  className={inputCls}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-indigo-500 cursor-pointer"
                >
                  {showNew ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Checklist (New Feature overlay) */}
              {newPassword.length > 0 && (
                <div className="mt-3.5 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-gray-400">Strength:</span>
                    <span className={strengthCount >= 4 ? 'text-emerald-500' : strengthCount >= 3 ? 'text-indigo-500' : strengthCount >= 2 ? 'text-amber-500' : 'text-red-500'}>
                      {strengthLevel}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-100 dark:bg-white/[0.04] rounded-full overflow-hidden flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(step => (
                      <div
                        key={step}
                        className={`h-full flex-1 transition-all ${
                          step <= strengthCount ? progressColors[strengthCount] : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[9px] font-semibold text-gray-500">
                    {[
                      { text: 'At least 8 chars', checked: meetsMinLength },
                      { text: 'An uppercase letter', checked: hasUppercase },
                      { text: 'A lowercase letter', checked: hasLowercase },
                      { text: 'A number', checked: hasNumber },
                      { text: 'A special char', checked: hasSpecial },
                    ].map((req, i) => (
                      <div key={i} className="flex items-center gap-1">
                        {req.checked ? (
                          <FiCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                        ) : (
                          <FiX className="w-3 h-3 text-gray-300 dark:text-gray-650 shrink-0" />
                        )}
                        <span className={req.checked ? 'text-gray-900 dark:text-gray-250' : ''}>{req.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className={labelCls}>Confirm Password*:</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={e => setConfirmPassword(e.target.value)}
                  className={inputCls}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-indigo-500 cursor-pointer"
                >
                  {showConfirm ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-8 py-3 rounded-full transition-all cursor-pointer shadow-md shadow-indigo-500/10 active:scale-98"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>

      {/* ── Security Configuration (New Feature) ─────────────────────────── */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs max-w-xl">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-1.5">
          <FiSettings className="w-4 h-4 text-indigo-500" /> Security Options
        </h3>
        <div className="space-y-4">
          <label className="flex items-start gap-3.5 cursor-pointer">
            <input
              type="checkbox"
              checked={logoutAllDevices}
              onChange={e => setLogoutAllDevices(e.target.checked)}
              className="accent-indigo-600 rounded mt-0.5 shrink-0"
            />
            <div>
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 block">Log out of all other active sessions</span>
              <span className="text-[10px] text-gray-450 dark:text-gray-450 font-semibold block mt-0.5">Recommended if you suspect account compromise</span>
            </div>
          </label>

          <label className="flex items-start gap-3.5 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRotate}
              onChange={e => setAutoRotate(e.target.checked)}
              className="accent-indigo-600 rounded mt-0.5 shrink-0"
            />
            <div>
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 block">Auto-rotate password policy</span>
              <span className="text-[10px] text-gray-450 dark:text-gray-450 font-semibold block mt-0.5">Triggers password update prompt every 90 days</span>
            </div>
          </label>
        </div>
      </div>

      {/* ── Password History Logs (New Feature) ──────────────────────────── */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs max-w-xl">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-1.5">
          <FiClock className="w-4 h-4 text-indigo-500" /> Password Change Logs
        </h3>
        <div className="space-y-3.5">
          {[
            { date: '2026-06-12 14:02:11', ip: '103.82.12.98', action: 'Password Rotated Successfully' },
            { date: '2026-03-10 09:44:56', ip: '172.56.21.104', action: 'Password Rotated Successfully' },
          ].map((log, i) => (
            <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-white/[0.03] text-[10px] font-semibold text-gray-500">
              <div>
                <span className="text-gray-900 dark:text-gray-200 block font-bold text-xs">{log.action}</span>
                <span className="block mt-0.5">{log.date}</span>
              </div>
              <span className="bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.03] px-2 py-0.5 rounded">IP: {log.ip}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
