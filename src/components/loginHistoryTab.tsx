'use client';

import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { notifyWarning } from '@/components/toastProvider';

// ── Custom SVG Device Icons (Increased to w-16 h-16) ────────────────────────
function DeviceIcon({ type }: { type: 'tablet' | 'desktop' | 'mobile' }) {
  if (type === 'tablet') {
    return (
      <svg className="w-16 h-16 text-gray-400 shrink-0 object-contain" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="4" width="28" height="40" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
        <rect x="13" y="7" width="22" height="31" fill="#FFFFFF" />
        <circle cx="24" cy="41" r="1.5" fill="#64748B" />
        <circle cx="24" cy="5" r="0.5" fill="#64748B" />
      </svg>
    );
  }
  if (type === 'desktop') {
    return (
      <svg className="w-16 h-16 text-gray-400 shrink-0 object-contain" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="36" height="24" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
        <rect x="9" y="11" width="30" height="18" fill="#FFFFFF" />
        <path d="M18 32L15 42H33L30 32H18Z" fill="#94A3B8" />
        <rect x="12" y="42" width="24" height="2" fill="#64748B" />
      </svg>
    );
  }
  return (
    <svg className="w-16 h-16 text-gray-400 shrink-0 object-contain" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="4" width="20" height="40" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
      <rect x="16" y="7" width="16" height="30" fill="#FFFFFF" />
      <circle cx="24" cy="40" r="1.5" fill="#64748B" />
      <rect x="22" y="5" width="4" height="1" rx="0.5" fill="#64748B" />
    </svg>
  );
}

interface Session {
  id?: string;
  device: string;
  date: string;
  time: string;
  ip: string;
  twoFa: boolean;
  locationName: string;
  locationAddress: string;
  locationCity: string;
  timePeriod: string;
}

// ── Component ────────────────────────────────────────────────────────────────
export function LoginHistoryTab() {
  const [dynIp, setDynIp] = useState('103.78.226.101');
  const [dynLocCity, setDynLocCity] = useState('Dhaka');
  const [dynLocAddr, setDynLocAddr] = useState('Dhaka Division');
  const [dynLocState, setDynLocState] = useState('1212, Bangladesh');

  useEffect(() => {
    async function fetchGeo() {
      try {
        const res = await fetch('http://ip-api.com/json/');
        if (!res.ok) return;
        const data = await res.json();
        if (data.query) setDynIp(data.query);
        if (data.city) setDynLocCity(data.city);
        if (data.regionName) setDynLocAddr(data.regionName);
        if (data.country) setDynLocState(`${data.zip || ''}, ${data.country}`);
      } catch { /* use default */ }
    }
    fetchGeo();
  }, []);

  const [activeSessions, setActiveSessions] = useState<Session[]>([
    {
      id: '1',
      device: 'desktop',
      date: '2026-07-19',
      time: '18:32:02',
      ip: 'DYNAMIC_IP',
      twoFa: true,
      locationName: 'Current Session',
      locationAddress: 'DYNAMIC_ADDR',
      locationCity: 'DYNAMIC_CITY',
      timePeriod: 'Active Now'
    },
    {
      id: '2',
      device: 'tablet',
      date: '2026-07-18',
      time: '14:22:15',
      ip: '46.137.91.24',
      twoFa: true,
      locationName: 'iPad Air 5',
      locationAddress: 'Marina Bay Sands',
      locationCity: 'Singapore 018972',
      timePeriod: 'Active 1d ago'
    },
    {
      id: '3',
      device: 'mobile',
      date: '2026-07-17',
      time: '09:15:30',
      ip: '210.123.45.67',
      twoFa: false,
      locationName: 'Samsung Galaxy S24',
      locationAddress: 'Gangnam-gu',
      locationCity: 'Seoul 06000, South Korea',
      timePeriod: 'Active 2d ago'
    }
  ]);

  const [historySessions, setHistorySessions] = useState<Session[]>([
    {
      id: 'h1',
      device: 'desktop',
      date: '2026-07-12',
      time: '11:30:55',
      ip: '85.25.104.22',
      twoFa: true,
      locationName: 'Windows Desktop',
      locationAddress: 'Westminster',
      locationCity: 'London SW1A, UK',
      timePeriod: '7 days ago'
    },
    {
      id: 'h2',
      device: 'desktop',
      date: '2026-07-08',
      time: '16:45:10',
      ip: '54.210.82.11',
      twoFa: false,
      locationName: 'MacBook Pro 16',
      locationAddress: 'Silicon Valley',
      locationCity: 'San Francisco CA, USA',
      timePeriod: '11 days ago'
    },
    {
      id: 'h3',
      device: 'mobile',
      date: '2026-07-01',
      time: '08:12:45',
      ip: '193.51.208.4',
      twoFa: true,
      locationName: 'iPhone 15 Pro',
      locationAddress: 'Champs-Élysées',
      locationCity: 'Paris 75008, France',
      timePeriod: '18 days ago'
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    description: string | React.ReactNode;
    confirmText: string;
    isDestructive?: boolean;
    onConfirm: () => void;
  } | null>(null);

  function openConfirm(title: string, description: string | React.ReactNode, onConfirm: () => void, isDestructive = false) {
    setModalConfig({
      title,
      description,
      confirmText: isDestructive ? 'Delete' : 'Confirm',
      isDestructive,
      onConfirm: () => {
        onConfirm();
        setModalOpen(false);
      }
    });
    setModalOpen(true);
  }

  function handleLogoutAll() {
    openConfirm(
      'Logout All Sessions',
      'Are you sure you want to log out of all other active sessions?',
      () => {
        setActiveSessions(activeSessions.slice(0, 1));
        notifyWarning('Session Ended', 'Logged out of all other active devices.');
      },
      true
    );
  }

  function handleDeleteSession(id: string | undefined, isHistory: boolean) {
    if (!id) return;
    if (isHistory) {
      const session = historySessions.find(s => s.id === id);
      if (!session) return;
      openConfirm(
        'Delete Login Log',
        <span>
          Are you sure you want to delete the login record for <strong>{session.locationName}</strong>? This action cannot be undone.
        </span>,
        () => {
          setHistorySessions(prev => prev.filter(s => s.id !== id));
          notifyWarning('Session Ended', 'Login history log entry deleted.');
        },
        true
      );
    } else {
      const session = activeSessions.find(s => s.id === id);
      if (!session) return;

      if (id === '1') {
        openConfirm(
          'Confirm Current Session Logout',
          'You are about to log out of your current session. Do you want to continue?',
          () => {
            window.location.reload();
          },
          true
        );
        return;
      }

      openConfirm(
        'Revoke Active Session',
        <span>
          Are you sure you want to log out of <strong>{session.locationName}</strong> ({session.ip})?
        </span>,
        () => {
          setActiveSessions(prev => prev.filter(s => s.id !== id));
          notifyWarning('Session Ended', `Active session for ${session.locationName} revoked.`);
        },
        true
      );
    }
  }

  const renderTableRows = (list: Session[], isHistory: boolean) => (
    list.map((session, index) => {
      const isDynamic = session.ip === 'DYNAMIC_IP';
      const ipVal = isDynamic ? dynIp : session.ip;
      const nameVal = isDynamic ? session.locationName : session.locationName;
      const addrVal = isDynamic ? dynLocAddr : session.locationAddress;
      const cityVal = isDynamic ? `${dynLocCity}, ${dynLocState}` : session.locationCity;

      return (
        <tr key={index} className="hover:bg-gray-55 dark:hover:bg-white/[0.01] transition-colors border-b border-gray-100 dark:border-white/[0.03]">
          {/* Device Icon (Centered) */}
          <td className="py-4 text-center">
            <div className="flex justify-center items-center w-full">
              <DeviceIcon type={session.device as 'tablet' | 'desktop' | 'mobile'} />
            </div>
          </td>
          
          {/* Date / Time */}
          <td className="py-4 text-xs font-bold text-gray-555 dark:text-gray-400">
            <div>{session.date}</div>
            <div className="text-[10px] text-gray-450 dark:text-gray-500 font-semibold mt-0.5">{session.time}</div>
          </td>

          {/* IP Address */}
          <td className="py-4 text-xs font-bold text-gray-900 dark:text-white">
            {ipVal}
          </td>

          {/* 2FA Badge (Centered) */}
          <td className="py-4 text-center">
            <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
              session.twoFa 
                ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600' 
                : 'bg-red-50 dark:bg-red-950/20 text-red-600'
            }`}>
              {session.twoFa ? 'YES' : 'NO'}
            </span>
          </td>

          {/* Location Info */}
          <td className="py-4 text-[10px] text-gray-555 dark:text-gray-400 font-semibold leading-relaxed">
            <div className="font-bold text-gray-800 dark:text-gray-200 text-xs mb-0.5">{nameVal}</div>
            <div>{addrVal}</div>
            <div>{cityVal}</div>
          </td>

          {/* Time Period */}
          <td className="py-4 text-xs font-bold text-gray-900 dark:text-white">
            {session.timePeriod}
          </td>

          {/* Dustbin Action Icon */}
          <td className="py-4 text-right">
            <button 
              onClick={() => handleDeleteSession(session.id, isHistory)}
              className="text-gray-400 hover:text-red-555 cursor-pointer p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors"
              title={isHistory ? "Delete login log" : "Log out device"}
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </td>
        </tr>
      );
    })
  );

  return (
    <div className="space-y-10 select-none animate-[fadeIn_0.2s_ease-out]">

      {/* ── Active Sessions Section ──────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Active sessions</h2>
        <p className="text-xs text-gray-400 font-bold mb-6">Review currently logged in devices accessing your account.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs table-fixed min-w-[700px]">
            <colgroup>
              <col className="w-24" />
              <col className="w-32" />
              <col className="w-36" />
              <col className="w-20" />
              <col className="w-48" />
              <col className="w-36" />
              <col className="w-16" />
            </colgroup>
            <thead>
              <tr className="text-gray-400 font-bold border-b border-gray-100 dark:border-white/[0.03] uppercase tracking-wider">
                <th className="pb-3 text-center">Device</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">IP Address</th>
                <th className="pb-3 text-center">2FA</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Time Period</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.03]">
              {renderTableRows(activeSessions, false)}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogoutAll}
            className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-white/[0.12] bg-white dark:bg-[#141416] text-gray-900 dark:text-white font-bold text-xs hover:bg-gray-55 dark:hover:bg-white/[0.03] transition-all cursor-pointer"
          >
            Logout All Sessions
          </button>
        </div>
      </div>

      {/* ── Login History Section ────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Login History</h2>
        <p className="text-xs text-gray-400 font-bold mb-6">Review complete authentication log history.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs table-fixed min-w-[700px]">
            <colgroup>
              <col className="w-24" />
              <col className="w-32" />
              <col className="w-36" />
              <col className="w-20" />
              <col className="w-48" />
              <col className="w-36" />
              <col className="w-16" />
            </colgroup>
            <thead>
              <tr className="text-gray-400 font-bold border-b border-gray-100 dark:border-white/[0.03] uppercase tracking-wider">
                <th className="pb-3 text-center">Device</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">IP Address</th>
                <th className="pb-3 text-center">2FA</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Time Period</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.03]">
              {renderTableRows(historySessions, true)}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Shadcn-like Dialogue Modal (New Custom Prompt UI) ───────────── */}
      {modalOpen && modalConfig && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 animate-[fadeIn_0.15s_ease-out]">
          <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 max-w-sm w-full mx-4 shadow-xl select-none animate-[scaleUp_0.15s_ease-out]">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{modalConfig.title}</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-6 leading-relaxed">
              {modalConfig.description}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-gray-200 dark:border-white/[0.06] rounded-md text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/[0.02] text-gray-700 dark:text-gray-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={modalConfig.onConfirm}
                className={`px-4 py-2 text-white font-bold text-xs rounded-md cursor-pointer ${
                  modalConfig.isDestructive 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {modalConfig.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
