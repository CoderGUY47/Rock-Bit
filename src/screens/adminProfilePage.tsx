"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FiUsers, FiUserCheck, FiUserX, FiSearch, FiFilter,
  FiMoreHorizontal, FiMail, FiPhone, FiCalendar, FiMapPin,
  FiShield, FiClock, FiTrendingUp, FiArrowUpRight, FiCheckCircle,
  FiXCircle, FiAlertCircle, FiChevronDown, FiChevronUp, FiEye,
  FiPlus, FiEdit2, FiTrash2, FiX, FiCheck,
} from "react-icons/fi";
import { DEFAULT_AVATARS } from "@/context/profileContext";

export interface AdminUserItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  joined: string;
  lastSeen: string;
  status: "active" | "suspended";
  kyc: "verified" | "pending" | "rejected";
  role: "user" | "admin";
  totalTrades: number;
  totalVolume: string;
  avatarUrl: string;
  timeline: { event: string; time: string; icon: string }[];
}

const INITIAL_USERS: AdminUserItem[] = [
  {
    id: "USR-001",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    phone: "+1 (415) 234-5678",
    country: "United States",
    joined: "Jan 12, 2024",
    lastSeen: "2 min ago",
    status: "active",
    kyc: "verified",
    role: "user",
    totalTrades: 142,
    totalVolume: "$284,930",
    avatarUrl: "/assets/avatars/avatar1.svg",
    timeline: [
      { event: "Account created",         time: "Jan 12, 2024 09:14", icon: "signup"   },
      { event: "KYC verified",            time: "Jan 14, 2024 11:32", icon: "verify"   },
      { event: "First BTC purchase",      time: "Jan 15, 2024 14:20", icon: "trade"    },
      { event: "2FA enabled",             time: "Feb 02, 2024 10:05", icon: "security" },
      { event: "Referred 3 users",        time: "Mar 18, 2024 16:45", icon: "referral" },
      { event: "Last login from US",      time: "Jul 20, 2026 08:12", icon: "login"    },
    ],
  },
  {
    id: "USR-002",
    firstName: "Bob",
    lastName: "Martinez",
    email: "bob@example.com",
    phone: "+44 7700 900123",
    country: "United Kingdom",
    joined: "Feb 03, 2024",
    lastSeen: "15 min ago",
    status: "active",
    kyc: "verified",
    role: "user",
    totalTrades: 87,
    totalVolume: "$138,210",
    avatarUrl: "/assets/avatars/avatar2.svg",
    timeline: [
      { event: "Account created",         time: "Feb 03, 2024 13:22", icon: "signup"   },
      { event: "KYC verified",            time: "Feb 07, 2024 09:00", icon: "verify"   },
      { event: "First ETH purchase",      time: "Feb 10, 2024 17:30", icon: "trade"    },
      { event: "Upgraded to Pro",         time: "Apr 01, 2024 12:00", icon: "upgrade"  },
      { event: "Last login from UK",      time: "Jul 20, 2026 09:47", icon: "login"    },
    ],
  },
  {
    id: "USR-003",
    firstName: "Carol",
    lastName: "Nguyen",
    email: "carol@example.com",
    phone: "+84 90 123 4567",
    country: "Vietnam",
    joined: "Mar 20, 2024",
    lastSeen: "1 hr ago",
    status: "active",
    kyc: "pending",
    role: "user",
    totalTrades: 31,
    totalVolume: "$42,890",
    avatarUrl: "/assets/avatars/avatar3.svg",
    timeline: [
      { event: "Account created",         time: "Mar 20, 2024 08:00", icon: "signup"   },
      { event: "KYC submitted",           time: "Mar 22, 2024 10:15", icon: "pending"  },
      { event: "First SOL purchase",      time: "Mar 25, 2024 14:05", icon: "trade"    },
      { event: "Last login from Vietnam", time: "Jul 20, 2026 11:30", icon: "login"    },
    ],
  },
  {
    id: "USR-004",
    firstName: "David",
    lastName: "Chen",
    email: "david@example.com",
    phone: "+86 138 0013 8000",
    country: "China",
    joined: "Apr 05, 2024",
    lastSeen: "3 days ago",
    status: "suspended",
    kyc: "rejected",
    role: "user",
    totalTrades: 9,
    totalVolume: "$4,120",
    avatarUrl: "/assets/avatars/avatar4.svg",
    timeline: [
      { event: "Account created",         time: "Apr 05, 2024 07:12", icon: "signup"   },
      { event: "KYC rejected — mismatch", time: "Apr 08, 2024 16:00", icon: "rejected" },
      { event: "Account suspended",       time: "May 01, 2024 09:30", icon: "suspend"  },
      { event: "Appeal submitted",        time: "May 05, 2024 11:00", icon: "pending"  },
    ],
  },
  {
    id: "USR-005",
    firstName: "Eve",
    lastName: "Patel",
    email: "eve@example.com",
    phone: "+91 98765 43210",
    country: "India",
    joined: "May 11, 2024",
    lastSeen: "5 min ago",
    status: "active",
    kyc: "verified",
    role: "user",
    totalTrades: 210,
    totalVolume: "$512,400",
    avatarUrl: "/assets/avatars/avatar5.svg",
    timeline: [
      { event: "Account created",         time: "May 11, 2024 10:00", icon: "signup"   },
      { event: "KYC verified",            time: "May 13, 2024 14:00", icon: "verify"   },
      { event: "First DOGE purchase",     time: "May 15, 2024 18:20", icon: "trade"    },
      { event: "VIP tier unlocked",       time: "Jun 10, 2024 08:00", icon: "upgrade"  },
      { event: "2FA enabled",             time: "Jun 12, 2024 09:15", icon: "security" },
      { event: "Referred 8 users",        time: "Jul 01, 2024 12:30", icon: "referral" },
      { event: "Last login from India",   time: "Jul 20, 2026 13:55", icon: "login"    },
    ],
  },
  {
    id: "USR-006",
    firstName: "Frank",
    lastName: "Müller",
    email: "frank@example.com",
    phone: "+49 151 23456789",
    country: "Germany",
    joined: "Jun 02, 2024",
    lastSeen: "45 min ago",
    status: "active",
    kyc: "verified",
    role: "user",
    totalTrades: 55,
    totalVolume: "$89,750",
    avatarUrl: "/assets/avatars/avatar6.svg",
    timeline: [
      { event: "Account created",         time: "Jun 02, 2024 11:00", icon: "signup"   },
      { event: "KYC verified",            time: "Jun 05, 2024 09:30", icon: "verify"   },
      { event: "First BNB purchase",      time: "Jun 08, 2024 15:10", icon: "trade"    },
      { event: "Last login from Germany", time: "Jul 20, 2026 10:22", icon: "login"    },
    ],
  },
];

const kycStyle: Record<string, string> = {
  verified: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  pending:  "bg-amber-100  dark:bg-amber-900/30  text-amber-700  dark:text-amber-400",
  rejected: "bg-red-100    dark:bg-red-900/30    text-red-700    dark:text-red-400",
};

const statusStyle: Record<string, string> = {
  active:    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  suspended: "bg-red-100    dark:bg-red-900/30    text-red-700    dark:text-red-400",
};

const timelineIcon: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  signup:   { icon: FiUsers,       color: "text-blue-500",    bg: "bg-blue-100 dark:bg-blue-900/30"    },
  verify:   { icon: FiCheckCircle, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  trade:    { icon: FiTrendingUp,  color: "text-violet-500",  bg: "bg-violet-100 dark:bg-violet-900/30" },
  security: { icon: FiShield,      color: "text-indigo-500",  bg: "bg-indigo-100 dark:bg-indigo-900/30" },
  referral: { icon: FiArrowUpRight,color: "text-amber-500",   bg: "bg-amber-100 dark:bg-amber-900/30"  },
  login:    { icon: FiClock,       color: "text-gray-500",    bg: "bg-gray-100 dark:bg-white/10"        },
  upgrade:  { icon: FiShield,      color: "text-purple-500",  bg: "bg-purple-100 dark:bg-purple-900/30" },
  pending:  { icon: FiAlertCircle, color: "text-amber-500",   bg: "bg-amber-100 dark:bg-amber-900/30"  },
  rejected: { icon: FiXCircle,     color: "text-red-500",     bg: "bg-red-100 dark:bg-red-900/30"      },
  suspend:  { icon: FiUserX,       color: "text-red-600",     bg: "bg-red-100 dark:bg-red-900/30"      },
  update:   { icon: FiEdit2,       color: "text-blue-500",    bg: "bg-blue-100 dark:bg-blue-900/30"    },
};

export default function AdminProfilePage() {
  const [users, setUsers]               = useState<AdminUserItem[]>(INITIAL_USERS);
  const [search, setSearch]             = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterKyc, setFilterKyc]       = useState("all");
  const [filterRole, setFilterRole]     = useState("all");
  const [expandedId, setExpandedId]     = useState<string | null>(null);
  const [viewMode, setViewMode]         = useState<"list" | "grid">("list");
  
  // Interactive Menu state
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef                         = useRef<HTMLDivElement>(null);

  // Modal States
  const [showAddModal, setShowAddModal]   = useState(false);
  const [editUser, setEditUser]           = useState<AdminUserItem | null>(null);
  const [deleteId, setDeleteId]           = useState<string | null>(null);

  // Form State (used for Add and Edit)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "United States",
    role: "user" as "user" | "admin",
    status: "active" as "active" | "suspended",
    kyc: "verified" as "verified" | "pending" | "rejected",
    avatarUrl: DEFAULT_AVATARS[0],
  });

  // Close 3-dots dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Stats
  const total     = users.length;
  const active    = users.filter((u) => u.status === "active").length;
  const suspended = users.filter((u) => u.status === "suspended").length;
  const verified  = users.filter((u) => u.kyc === "verified").length;

  // Search & Filter
  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q) ||
      u.phone.toLowerCase().includes(q) ||
      u.country.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || u.status === filterStatus;
    const matchKyc    = filterKyc === "all"    || u.kyc === filterKyc;
    const matchRole   = filterRole === "all"   || u.role === filterRole;
    return matchSearch && matchStatus && matchKyc && matchRole;
  });

  // Open Add User Modal
  const handleOpenAddModal = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "United States",
      role: "user",
      status: "active",
      kyc: "verified",
      avatarUrl: DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)],
    });
    setShowAddModal(true);
  };

  // Open Edit User Modal
  const handleOpenEditModal = (user: AdminUserItem) => {
    setEditUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      country: user.country,
      role: user.role,
      status: user.status,
      kyc: user.kyc,
      avatarUrl: user.avatarUrl,
    });
    setActiveMenuId(null);
  };

  // Create User Handler
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) return;

    const newUser: AdminUserItem = {
      id: `USR-00${users.length + 1}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || "+1 (555) 000-0000",
      country: formData.country,
      joined: "Just now",
      lastSeen: "Just now",
      status: formData.status,
      kyc: formData.kyc,
      role: formData.role,
      totalTrades: 0,
      totalVolume: "$0",
      avatarUrl: formData.avatarUrl,
      timeline: [
        { event: "Account created by Admin", time: "Just now", icon: "signup" },
      ],
    };

    setUsers([newUser, ...users]);
    setShowAddModal(false);
  };

  // Save Edit Handler
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;

    const updated = users.map((u) => {
      if (u.id === editUser.id) {
        return {
          ...u,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          role: formData.role,
          status: formData.status,
          kyc: formData.kyc,
          avatarUrl: formData.avatarUrl,
          timeline: [
            ...u.timeline,
            { event: "Profile updated by Admin", time: "Just now", icon: "update" },
          ],
        };
      }
      return u;
    });

    setUsers(updated);
    setEditUser(null);
  };

  // Toggle Suspend Status
  const handleToggleStatus = (user: AdminUserItem) => {
    const newStatus = user.status === "active" ? "suspended" : "active";
    const updated = users.map((u) => {
      if (u.id === user.id) {
        return {
          ...u,
          status: newStatus as "active" | "suspended",
          timeline: [
            ...u.timeline,
            {
              event: `Account ${newStatus === "suspended" ? "suspended" : "activated"} by Admin`,
              time: "Just now",
              icon: newStatus === "suspended" ? "suspend" : "verify",
            },
          ],
        };
      }
      return u;
    });
    setUsers(updated);
    setActiveMenuId(null);
  };

  // Change KYC Status
  const handleChangeKyc = (user: AdminUserItem, newKyc: "verified" | "pending" | "rejected") => {
    const updated = users.map((u) => {
      if (u.id === user.id) {
        return {
          ...u,
          kyc: newKyc,
          timeline: [
            ...u.timeline,
            {
              event: `KYC set to ${newKyc} by Admin`,
              time: "Just now",
              icon: newKyc === "verified" ? "verify" : newKyc === "rejected" ? "rejected" : "pending",
            },
          ],
        };
      }
      return u;
    });
    setUsers(updated);
    setActiveMenuId(null);
  };

  // Confirm Delete Handler
  const handleConfirmDelete = () => {
    if (!deleteId) return;
    setUsers(users.filter((u) => u.id !== deleteId));
    setDeleteId(null);
    setActiveMenuId(null);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-50 dark:bg-[#0c0c0e]">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            User Management
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
            Full user directory with SVG avatars, timelines, and CRUD admin operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            <FiPlus className="w-4 h-4" /> Add New User
          </button>

          <div className="flex gap-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-1 rounded-md">
            {(["list","grid"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md capitalize transition-all cursor-pointer ${
                  viewMode === m
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {m === "list" ? "☰ List" : "⊞ Grid"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Users",    value: total,     icon: FiUsers,     color: "blue"    },
          { label: "Active",         value: active,    icon: FiUserCheck, color: "emerald" },
          { label: "Suspended",      value: suspended, icon: FiUserX,     color: "red"     },
          { label: "KYC Verified",   value: verified,  icon: FiShield,    color: "violet"  },
        ].map((k) => {
          const Icon = k.icon;
          const bg: Record<string,string> = {
            blue:   "bg-blue-50   dark:bg-blue-900/20   text-blue-600   dark:text-blue-400",
            emerald:"bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
            red:    "bg-red-50    dark:bg-red-900/20    text-red-600    dark:text-red-400",
            violet: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
          };
          return (
            <div key={k.label} className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-5 flex items-start justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">{k.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{k.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${bg[k.color]}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, ID or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-md text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <FiFilter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-md px-3 py-2.5 text-gray-700 dark:text-gray-300 font-bold focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <select
            value={filterKyc}
            onChange={(e) => setFilterKyc(e.target.value)}
            className="text-sm bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-md px-3 py-2.5 text-gray-700 dark:text-gray-300 font-bold focus:outline-none"
          >
            <option value="all">All KYC</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="text-sm bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-md px-3 py-2.5 text-gray-700 dark:text-gray-300 font-bold focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <span className="text-xs text-gray-400 font-bold">{filtered.length} user{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* ── GRID VIEW ─────────────────────────────────────────────────────────── */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] overflow-hidden hover:shadow-md transition-shadow relative"
            >
              {/* Card Header */}
              <div className="h-16 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 relative p-4 flex justify-between items-start">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white dark:border-[#111] bg-white dark:bg-gray-800 shadow-md absolute -bottom-7 left-5">
                  <img src={user.avatarUrl} alt={user.firstName} className="w-full h-full object-cover" />
                </div>

                {/* 3-Dots Button Grid View */}
                <div className="relative ml-auto">
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === user.id ? null : user.id)}
                    className="p-1.5 rounded-md bg-white/80 dark:bg-black/50 text-gray-600 dark:text-gray-300 hover:bg-white transition-colors cursor-pointer"
                  >
                    <FiMoreHorizontal className="w-4 h-4" />
                  </button>
                  {activeMenuId === user.id && (
                    <div ref={menuRef} className="absolute right-0 mt-1 w-48 bg-white dark:bg-[#181920] border border-gray-200 dark:border-white/10 rounded-md shadow-xl py-1 z-50 text-xs font-bold text-gray-700 dark:text-gray-200">
                      <button onClick={() => handleOpenEditModal(user)} className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                        <FiEdit2 className="w-3.5 h-3.5 text-blue-500" /> Edit User
                      </button>
                      <button onClick={() => { setExpandedId(expandedId === user.id ? null : user.id); setActiveMenuId(null); }} className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                        <FiEye className="w-3.5 h-3.5 text-indigo-500" /> View Timeline
                      </button>
                      <button onClick={() => handleToggleStatus(user)} className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                        <FiUserX className="w-3.5 h-3.5 text-amber-500" /> {user.status === "active" ? "Suspend Account" : "Activate Account"}
                      </button>
                      <button onClick={() => handleChangeKyc(user, "verified")} className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                        <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Set KYC Verified
                      </button>
                      <div className="border-t border-gray-100 dark:border-white/5 my-1" />
                      <button onClick={() => { setDeleteId(user.id); setActiveMenuId(null); }} className="w-full px-3 py-2 text-left hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 flex items-center gap-2">
                        <FiTrash2 className="w-3.5 h-3.5" /> Delete User
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-10 px-5 pb-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">{user.id} • {user.role}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md capitalize ${statusStyle[user.status]}`}>
                    {user.status}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
                  <div className="flex items-center gap-1.5"><FiMail className="w-3 h-3 shrink-0" />{user.email}</div>
                  <div className="flex items-center gap-1.5"><FiPhone className="w-3 h-3 shrink-0" />{user.phone}</div>
                  <div className="flex items-center gap-1.5"><FiMapPin className="w-3 h-3 shrink-0" />{user.country}</div>
                  <div className="flex items-center gap-1.5"><FiCalendar className="w-3 h-3 shrink-0" />Joined {user.joined}</div>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${kycStyle[user.kyc]}`}>
                    KYC {user.kyc}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400">
                    {user.totalTrades} trades
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    {user.totalVolume}
                  </span>
                </div>

                {/* Timeline */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Recent Activity</p>
                    <button
                      onClick={() => setExpandedId(expandedId === user.id ? null : user.id)}
                      className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {expandedId === user.id ? "Hide Timeline" : "View All"}
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {user.timeline.slice(-3).map((t, i) => {
                      const cfg = timelineIcon[t.icon] ?? timelineIcon.login;
                      const Icon = cfg.icon;
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${cfg.bg}`}>
                            <Icon className={`w-2.5 h-2.5 ${cfg.color}`} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold text-gray-700 dark:text-gray-200 truncate">{t.event}</p>
                            <p className="text-[9px] text-gray-400">{t.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (

      /* ── LIST VIEW ────────────────────────────────────────────────────────── */
        <div className="space-y-4">
          {filtered.map((user) => {
            const isOpen = expandedId === user.id;
            const isMenuOpen = activeMenuId === user.id;

            return (
              <div
                key={user.id}
                className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] overflow-hidden hover:shadow-sm transition-shadow"
              >
                {/* Row Header */}
                <div className="flex flex-wrap items-center gap-4 px-5 py-4">

                  {/* SVG Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-gray-800 shrink-0 shadow-sm">
                    <img src={user.avatarUrl} alt={user.firstName} className="w-full h-full object-cover" />
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                        {user.firstName} {user.lastName}
                      </h3>
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">{user.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md capitalize ${statusStyle[user.status]}`}>
                        {user.status}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${kycStyle[user.kyc]}`}>
                        KYC {user.kyc}
                      </span>
                      {user.role === "admin" && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                          Admin
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-gray-400 dark:text-gray-500">
                      <span className="flex items-center gap-1"><FiMail className="w-3 h-3" />{user.email}</span>
                      <span className="flex items-center gap-1"><FiPhone className="w-3 h-3" />{user.phone}</span>
                      <span className="flex items-center gap-1"><FiMapPin className="w-3 h-3" />{user.country}</span>
                      <span className="flex items-center gap-1"><FiCalendar className="w-3 h-3" />Joined {user.joined}</span>
                      <span className="flex items-center gap-1"><FiClock className="w-3 h-3" />Last seen {user.lastSeen}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden xl:flex items-center gap-6 text-center shrink-0">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Trades</p>
                      <p className="text-base font-bold text-gray-900 dark:text-white">{user.totalTrades}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Volume</p>
                      <p className="text-base font-bold text-gray-900 dark:text-white">{user.totalVolume}</p>
                    </div>
                  </div>

                  {/* Actions & 3-Dots Menu */}
                  <div className="flex items-center gap-2 shrink-0 relative">
                    <button
                      onClick={() => handleOpenEditModal(user)}
                      title="Edit User"
                      className="p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>

                    {/* 3-Dots Button */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveMenuId(isMenuOpen ? null : user.id)}
                        className="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                      >
                        <FiMoreHorizontal className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {isMenuOpen && (
                        <div ref={menuRef} className="absolute right-0 mt-1 w-48 bg-white dark:bg-[#181920] border border-gray-200 dark:border-white/10 rounded-md shadow-xl py-1 z-50 text-xs font-bold text-gray-700 dark:text-gray-200">
                          <button onClick={() => handleOpenEditModal(user)} className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                            <FiEdit2 className="w-3.5 h-3.5 text-blue-500" /> Edit User Details
                          </button>
                          <button onClick={() => { setExpandedId(isOpen ? null : user.id); setActiveMenuId(null); }} className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                            <FiEye className="w-3.5 h-3.5 text-indigo-500" /> View Activity Timeline
                          </button>
                          <button onClick={() => handleToggleStatus(user)} className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                            <FiUserX className="w-3.5 h-3.5 text-amber-500" /> {user.status === "active" ? "Suspend Account" : "Activate Account"}
                          </button>
                          <button onClick={() => handleChangeKyc(user, "verified")} className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                            <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Mark KYC Verified
                          </button>
                          <button onClick={() => handleChangeKyc(user, "rejected")} className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 cursor-pointer">
                            <FiXCircle className="w-3.5 h-3.5 text-red-500" /> Reject KYC
                          </button>
                          <div className="border-t border-gray-100 dark:border-white/5 my-1" />
                          <button onClick={() => { setDeleteId(user.id); setActiveMenuId(null); }} className="w-full px-3 py-2 text-left hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 flex items-center gap-2 cursor-pointer">
                            <FiTrash2 className="w-3.5 h-3.5" /> Delete User
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setExpandedId(isOpen ? null : user.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Timeline {isOpen ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* ── Timeline Expanded ─────────────────────────────────────────── */}
                {isOpen && (
                  <div className="border-t border-gray-100 dark:border-white/[0.06] px-5 py-5 bg-gray-50/50 dark:bg-white/[0.01]">
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                      User Activity Timeline
                    </p>
                    <div className="relative pl-6">
                      <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/[0.08]" />

                      <div className="space-y-5">
                        {user.timeline.map((t, i) => {
                          const cfg = timelineIcon[t.icon] ?? timelineIcon.login;
                          const Icon = cfg.icon;
                          const isLast = i === user.timeline.length - 1;
                          return (
                            <div key={i} className="relative flex items-start gap-3">
                              <div className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 border-white dark:border-[#111] ${cfg.bg}`}>
                                <Icon className={`w-3 h-3 ${cfg.color}`} />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="text-xs font-bold text-gray-800 dark:text-gray-100">
                                    {t.event}
                                  </p>
                                  {isLast && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                      Latest Event
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mt-0.5 flex items-center gap-1">
                                  <FiClock className="w-3 h-3" />
                                  {t.time}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="bg-white dark:bg-white/[0.03] rounded-md border border-gray-100 dark:border-white/[0.06] p-16 text-center">
              <FiUsers className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-sm font-bold text-gray-400">No users match your filters</p>
            </div>
          )}
        </div>
      )}

      {/* ── ADD / EDIT USER MODAL ────────────────────────────────────────────── */}
      {(showAddModal || editUser) && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/10 rounded-md shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-white/[0.06] flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editUser ? "Edit User Profile" : "Add New User"}
              </h3>
              <button
                onClick={() => { setShowAddModal(false); setEditUser(null); }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-md transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editUser ? handleSaveEdit : handleCreateUser} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-bold rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1f2026] text-gray-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-bold rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1f2026] text-gray-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-bold rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1f2026] text-gray-900 dark:text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-bold rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1f2026] text-gray-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-bold rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1f2026] text-gray-900 dark:text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-2 py-2 text-xs font-bold rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1f2026] text-gray-900 dark:text-white outline-none"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-2 py-2 text-xs font-bold rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1f2026] text-gray-900 dark:text-white outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-1">KYC Status</label>
                  <select
                    value={formData.kyc}
                    onChange={(e) => setFormData({ ...formData, kyc: e.target.value as any })}
                    className="w-full px-2 py-2 text-xs font-bold rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1f2026] text-gray-900 dark:text-white outline-none"
                  >
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Avatar Selection */}
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-300 block mb-2">Select SVG Avatar</label>
                <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto p-2 border border-gray-200 dark:border-white/10 rounded-md bg-gray-50 dark:bg-[#1a1c22]">
                  {DEFAULT_AVATARS.map((url) => (
                    <button
                      key={url}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatarUrl: url })}
                      className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                        formData.avatarUrl === url
                          ? "border-blue-600 ring-2 ring-blue-500/20 scale-105"
                          : "border-gray-200 dark:border-white/10 hover:border-blue-400"
                      }`}
                    >
                      <img src={url} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-gray-100 dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditUser(null); }}
                  className="px-4 py-2 rounded-md bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  {editUser ? "Save Changes" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ───────────────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/10 rounded-md p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center mx-auto">
              <FiTrash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Delete User Account</h3>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                Are you sure you want to delete user ID <span className="font-bold text-gray-800 dark:text-gray-200">{deleteId}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-md bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
