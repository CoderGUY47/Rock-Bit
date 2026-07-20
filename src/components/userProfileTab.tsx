'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiCalendar, FiChevronDown, FiCheck, FiSearch } from 'react-icons/fi';
import { UserInfo, FeatureStatus } from './profileTypes';
import { useProfile } from '@/context/profileContext';
import { WORLD_COUNTRY_CODES } from '@/utils/countryCodes';

// ── Toggle Switch Component ──────────────────────────────────────────────────
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function Switch({ checked, onChange, disabled = false }: SwitchProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
      } ${disabled ? 'opacity-55 cursor-not-allowed' : ''}`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

// ── Nationality Map Table ──────────────────────────────────────────────────
const NATIONALITY_MAP: Record<string, string> = {
  US: "American",
  GB: "British",
  VN: "Vietnamese",
  KR: "Korean",
  JP: "Japanese",
  CA: "Canadian",
  DE: "German",
  FR: "French",
  CN: "Chinese",
  IN: "Indian",
  BD: "Bangladeshi",
  RU: "Russian",
  AU: "Australian",
  BR: "Brazilian",
  ZA: "South African",
  SG: "Singaporean",
  MY: "Malaysian",
  TH: "Thai",
  ID: "Indonesian",
  PH: "Filipino",
  IT: "Italian",
  ES: "Spanish",
  MX: "Mexican",
  NZ: "New Zealander",
  CH: "Swiss",
  SE: "Swedish",
  NL: "Dutch",
  TR: "Turkish",
  PK: "Pakistani",
  AE: "Emirati",
  SA: "Saudi",
  UA: "Ukrainian",
  PL: "Polish",
  IE: "Irish",
  BE: "Belgian",
  AT: "Austrian",
  DK: "Danish",
  FI: "Finnish",
  NO: "Norwegian",
  PT: "Portuguese",
  GR: "Greek",
  IL: "Israeli",
  EG: "Egyptian",
  AR: "Argentinian",
  CO: "Colombian",
  CL: "Chilean",
  PE: "Peruvian",
  VE: "Venezuelan",
  NG: "Nigerian",
  KE: "Kenyan",
  MA: "Moroccan",
  DZ: "Algerian",
  TN: "Tunisian",
  HK: "Hong Konger",
  TW: "Taiwanese",
};

export function FlagRenderer({ code, flagUrl, alt }: { code: string; flagUrl: string; alt: string }) {
  if (code === "AH") {
    return (
      <svg viewBox="0 0 120 60" className="w-5 h-3.5 object-cover rounded-xs shrink-0 shadow-xs">
        <rect width="120" height="20" fill="#d92323"/>
        <rect y="20" width="120" height="20" fill="#0033a0"/>
        <rect y="40" width="120" height="20" fill="#f2a800"/>
        <polygon points="120,0 100,0 95,5 100,10 90,10 85,15 90,20 80,20 75,25 70,30 75,35 80,40 90,40 85,45 90,50 100,50 95,55 100,60 120,60" fill="#ffffff"/>
      </svg>
    );
  }
  if (code === "AK") {
    return (
      <svg viewBox="0 0 120 60" className="w-5 h-3.5 object-cover rounded-xs shrink-0 shadow-xs">
        <rect width="120" height="60" fill="#ffffff"/>
        <rect y="0" width="120" height="8.57" fill="#009e49"/>
        <rect y="17.14" width="120" height="8.57" fill="#009e49"/>
        <rect y="34.28" width="120" height="8.57" fill="#009e49"/>
        <rect y="51.43" width="120" height="8.57" fill="#009e49"/>
        <rect width="45" height="34.28" fill="#d92323"/>
        <circle cx="22.5" cy="17.14" r="5" fill="#ffffff"/>
        <circle cx="10" cy="10" r="1.5" fill="#ffffff"/>
        <circle cx="15" cy="6" r="1.5" fill="#ffffff"/>
        <circle cx="22.5" cy="4" r="1.5" fill="#ffffff"/>
        <circle cx="30" cy="6" r="1.5" fill="#ffffff"/>
        <circle cx="35" cy="10" r="1.5" fill="#ffffff"/>
        <circle cx="7" cy="18" r="1.5" fill="#ffffff"/>
        <circle cx="38" cy="18" r="1.5" fill="#ffffff"/>
      </svg>
    );
  }
  if (code === "NY") {
    return (
      <svg viewBox="0 0 120 60" className="w-5 h-3.5 object-cover rounded-xs shrink-0 shadow-xs border border-gray-100 dark:border-white/10">
        <rect width="120" height="60" fill="#ffffff"/>
        <rect y="10" width="120" height="5" fill="#d92323"/>
        <rect y="45" width="120" height="5" fill="#d92323"/>
        <circle cx="55" cy="30" r="10" fill="#d92323"/>
        <circle cx="58" cy="30" r="8" fill="#ffffff"/>
        <polygon points="73,30 68,33 70,27 65,29 70,31" fill="#d92323"/>
      </svg>
    );
  }
  if (code === "XK") {
    return (
      <svg viewBox="0 0 120 60" className="w-5 h-3.5 object-cover rounded-xs shrink-0 shadow-xs">
        <rect width="120" height="60" fill="#244aa5"/>
        <circle cx="45" cy="15" r="1.5" fill="#ffffff"/>
        <circle cx="51" cy="13" r="1.5" fill="#ffffff"/>
        <circle cx="57" cy="12" r="1.5" fill="#ffffff"/>
        <circle cx="63" cy="12" r="1.5" fill="#ffffff"/>
        <circle cx="69" cy="13" r="1.5" fill="#ffffff"/>
        <circle cx="75" cy="15" r="1.5" fill="#ffffff"/>
        <polygon points="50,35 60,25 70,30 75,40 65,45 55,42" fill="#d0a650"/>
      </svg>
    );
  }
  if (code === "EU") {
    return (
      <svg viewBox="0 0 120 60" className="w-5 h-3.5 object-cover rounded-xs shrink-0 shadow-xs">
        <rect width="120" height="60" fill="#003399"/>
        <circle cx="60" cy="18" r="1.5" fill="#ffcc00"/>
        <circle cx="60" cy="42" r="1.5" fill="#ffcc00"/>
        <circle cx="48" cy="30" r="1.5" fill="#ffcc00"/>
        <circle cx="72" cy="30" r="1.5" fill="#ffcc00"/>
        <circle cx="51" cy="22" r="1.5" fill="#ffcc00"/>
        <circle cx="69" cy="22" r="1.5" fill="#ffcc00"/>
        <circle cx="51" cy="38" r="1.5" fill="#ffcc00"/>
        <circle cx="69" cy="38" r="1.5" fill="#ffcc00"/>
        <circle cx="55" cy="25" r="1.5" fill="#ffcc00"/>
        <circle cx="65" cy="25" r="1.5" fill="#ffcc00"/>
        <circle cx="55" cy="35" r="1.5" fill="#ffcc00"/>
        <circle cx="65" cy="35" r="1.5" fill="#ffcc00"/>
      </svg>
    );
  }
  if (code === "IC") {
    return (
      <svg viewBox="0 0 120 60" className="w-5 h-3.5 object-cover rounded-xs shrink-0 shadow-xs">
        <rect width="40" height="60" fill="#ffffff"/>
        <rect x="40" width="40" height="60" fill="#00a2e8"/>
        <rect x="80" width="40" height="60" fill="#ffcc00"/>
      </svg>
    );
  }
  return (
    <img
      src={flagUrl}
      alt={alt}
      className="w-5 h-3.5 object-cover rounded-xs shrink-0 shadow-xs"
      onError={(e) => {
        (e.target as HTMLElement).style.display = "none";
        const fallbackText = document.createElement("span");
        fallbackText.className = "text-[9px] font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded-xs shrink-0";
        fallbackText.textContent = code;
        (e.target as HTMLElement).parentNode?.appendChild(fallbackText);
      }}
    />
  );
}

export function getPhonePlaceholder(code: string, dialCode: string): string {
  const normCode = code.toUpperCase();
  if (normCode === "BD" || dialCode === "+880") {
    return "1873741645"; // Bangladesh (10 digits)
  }
  if (normCode === "US" || normCode === "CA" || dialCode === "+1") {
    return "2155551234"; // US/Canada (10 digits)
  }
  if (normCode === "GB" || dialCode === "+44") {
    return "7911123456"; // UK (10 digits)
  }
  if (normCode === "VN" || dialCode === "+84") {
    return "912345678"; // Vietnam (9 digits)
  }
  if (normCode === "IN" || dialCode === "+91") {
    return "9876543219"; // India (10 digits)
  }
  if (normCode === "JP" || dialCode === "+81") {
    return "9123456789"; // Japan (10 digits)
  }
  if (normCode === "KR" || dialCode === "+82") {
    return "1234567891"; // South Korea (10 digits)
  }
  if (normCode === "AU" || dialCode === "+61") {
    return "412345678"; // Australia (9 digits)
  }
  if (normCode === "DE" || dialCode === "+49") {
    return "1712345678"; // Germany (10 digits)
  }
  if (normCode === "FR" || dialCode === "+33") {
    return "612345678"; // France (9 digits)
  }
  if (normCode === "BR" || dialCode === "+55") {
    return "11912345678"; // Brazil (11 digits)
  }
  if (normCode === "RU" || dialCode === "+7") {
    return "9123456789"; // Russia (10 digits)
  }

  // Calculate dynamic dummy numbers using digits 1-9 for all other countries based on dialCode size:
  const dialLen = dialCode.replace("+", "").length;
  if (dialLen === 1) {
    return "2155551234"; // 10 digits
  } else if (dialLen === 2) {
    return "987654321"; // 9 digits
  } else if (dialLen === 3) {
    return "912345678"; // 9 digits
  } else {
    return "12345678"; // 8 digits
  }
}

export function UserProfileTab() {
  const { userInfo, updateUserInfo, features, updateFeature } = useProfile();
  const [localInfo, setLocalInfo] = useState<UserInfo>(userInfo);

  useEffect(() => {
    setLocalInfo(userInfo);
  }, [userInfo]);

  const [showCountryMenu, setShowCountryMenu] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [showNationalityMenu, setShowNationalityMenu] = useState(false);
  const [nationalitySearch, setNationalitySearch] = useState("");
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});
  const dateInputRef = useRef<HTMLInputElement>(null);

  const inputCls = 'w-full px-4 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors';
  const labelCls = 'text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5 block';

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateUserInfo(localInfo);
  }

  // Filter country codes by name, code or dialCode
  const filteredCountries = WORLD_COUNTRY_CODES.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.dialCode.includes(countrySearch) ||
    c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Find currently selected country
  const selectedCountry = WORLD_COUNTRY_CODES.find(c => c.dialCode === localInfo.countryCode) || WORLD_COUNTRY_CODES[0];

  // Get unique nationalities list with flag references
  const uniqueNationalitiesWithFlags = Array.from(
    new Map(
      WORLD_COUNTRY_CODES.map(c => [
        NATIONALITY_MAP[c.code] || c.name,
        {
          code: c.code,
          name: c.name,
          flag: c.flag,
          flagUrl: c.flagUrl,
          nationality: NATIONALITY_MAP[c.code] || c.name
        }
      ])
    ).values()
  ).sort((a, b) => a.nationality.localeCompare(b.nationality));

  const filteredNationalities = uniqueNationalitiesWithFlags.filter(item =>
    item.nationality.toLowerCase().includes(nationalitySearch.toLowerCase()) ||
    item.name.toLowerCase().includes(nationalitySearch.toLowerCase())
  );

  const selectedNationalityCountry = WORLD_COUNTRY_CODES.find(c =>
    (NATIONALITY_MAP[c.code] || c.name) === localInfo.nationality
  ) || WORLD_COUNTRY_CODES.find(c => c.code === "US") || WORLD_COUNTRY_CODES[0];

  // Converts DD/MM/YYYY to YYYY-MM-DD
  const toInputDateFormat = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return dateStr;
  };

  // Converts YYYY-MM-DD to DD/MM/YYYY
  const toDisplayDateFormat = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 select-none animate-[fadeIn_0.2s_ease-out]">
      {/* ── Personal Info Card ────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-6 shadow-xs">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">User Profile</h2>
        <p className="text-xs text-gray-400 font-bold mb-5 uppercase tracking-wider">Information</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className={labelCls}>First Name</label>
            <input
              type="text"
              value={localInfo.firstName}
              onChange={e => setLocalInfo({ ...localInfo, firstName: e.target.value })}
              className={inputCls}
              placeholder="First name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className={labelCls}>Last Name</label>
            <input
              type="text"
              value={localInfo.lastName}
              onChange={e => setLocalInfo({ ...localInfo, lastName: e.target.value })}
              className={inputCls}
              placeholder="Last name"
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelCls}>Email</label>
            <input
              type="email"
              value={localInfo.email}
              onChange={e => setLocalInfo({ ...localInfo, email: e.target.value })}
              className={inputCls}
              placeholder="name@domain.com"
            />
          </div>

          {/* Phone Number with Custom Country Selector */}
          <div>
            <label className={labelCls}>Phone Number</label>
            <div className="flex gap-2 relative items-stretch">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryMenu(!showCountryMenu)}
                  className="h-full px-3 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#1d1d22] text-gray-900 dark:text-white flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer min-w-[90px] justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FlagRenderer
                      code={selectedCountry.code}
                      flagUrl={selectedCountry.flagUrl}
                      alt={selectedCountry.name}
                    />
                    <span className="font-bold text-gray-900 dark:text-white">
                      {selectedCountry.code}
                    </span>
                    <span className="text-gray-500 font-semibold">
                      {selectedCountry.dialCode}
                    </span>
                  </span>
                  <FiChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </button>

                {showCountryMenu && (
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-[#1f2026] border border-gray-200 dark:border-white/10 rounded-md shadow-2xl z-50 p-3 max-h-60 overflow-y-auto animate-[fadeIn_0.15s_ease-out]">
                    <div className="relative mb-2">
                      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                      <input
                        type="text"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search country or dial code..."
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#141416] text-gray-900 dark:text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      {filteredCountries.map(c => (
                        <button
                          key={`${c.code}-${c.dialCode}`}
                          type="button"
                          onClick={() => {
                            setLocalInfo({ ...localInfo, countryCode: c.dialCode, phone: "" });
                            setShowCountryMenu(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 text-xs font-bold flex items-center justify-between rounded-md cursor-pointer transition-colors ${
                            c.dialCode === localInfo.countryCode
                              ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                              : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span className="flex items-center gap-2.5 overflow-hidden">
                            <FlagRenderer
                              code={c.code}
                              flagUrl={c.flagUrl}
                              alt={c.name}
                            />
                            <span className="font-bold w-6 shrink-0">{c.code}</span>
                            <span className="truncate max-w-[110px]">{c.name}</span>
                            <span className="text-[10px] text-gray-400 font-semibold lowercase tracking-tight shrink-0">
                              (ex: {getPhonePlaceholder(c.code, c.dialCode)})
                            </span>
                          </span>
                          <span className="text-gray-400 font-medium text-[11px] shrink-0">
                            {c.dialCode}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <input
                type="tel"
                value={localInfo.phone}
                onChange={e => setLocalInfo({ ...localInfo, phone: e.target.value })}
                className="flex-1 px-4 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#1d1d22] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition-colors"
                placeholder={getPhonePlaceholder(selectedCountry.code, selectedCountry.dialCode)}
              />
            </div>
          </div>

          {/* Nationality */}
          <div>
            <label className={labelCls}>Nationality</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNationalityMenu(!showNationalityMenu)}
                className="w-full px-4 py-3 text-xs font-semibold rounded-md border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#1d1d22] text-gray-900 dark:text-white flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <FlagRenderer
                    code={selectedNationalityCountry.code}
                    flagUrl={selectedNationalityCountry.flagUrl}
                    alt={localInfo.nationality}
                  />
                  <span className="font-bold text-gray-900 dark:text-white">
                    {localInfo.nationality}
                  </span>
                </span>
                <FiChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${showNationalityMenu ? "rotate-180" : ""}`}
                />
              </button>

              {/* Nationality Accordion Dropdown Panel */}
              {showNationalityMenu && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#1f2026] border border-gray-200 dark:border-white/10 rounded-md shadow-2xl z-50 p-3 max-h-60 overflow-y-auto animate-[fadeIn_0.15s_ease-out] w-full">
                  <div className="relative mb-2">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                    <input
                      type="text"
                      value={nationalitySearch}
                      onChange={(e) => setNationalitySearch(e.target.value)}
                      placeholder="Search nationality..."
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-md border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-[#141416] text-gray-900 dark:text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {filteredNationalities.map(item => (
                      <button
                        key={`${item.code}-${item.nationality}`}
                        type="button"
                        onClick={() => {
                          setLocalInfo({ ...localInfo, nationality: item.nationality });
                          setShowNationalityMenu(false);
                        }}
                        className={`text-left px-2 py-2 text-[10px] font-bold flex items-center gap-1.5 rounded-md cursor-pointer transition-colors ${
                          item.nationality === localInfo.nationality
                            ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                            : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <FlagRenderer
                          code={item.code}
                          flagUrl={item.flagUrl}
                          alt={item.nationality}
                        />
                        <span className="truncate" title={item.nationality}>
                          {item.nationality}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className={labelCls}>Gender</label>
            <div className="relative">
              <select
                value={localInfo.gender}
                onChange={e => setLocalInfo({ ...localInfo, gender: e.target.value })}
                className={`${inputCls} appearance-none cursor-pointer pr-10`}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
              <FiChevronDown className="absolute right-3.5 top-3.5 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className={labelCls}>Date of Birth</label>
            <div className="relative">
              <input
                ref={dateInputRef}
                type="date"
                value={toInputDateFormat(localInfo.dob)}
                onChange={e => {
                  const displayDate = toDisplayDateFormat(e.target.value);
                  setLocalInfo({ ...localInfo, dob: displayDate });
                }}
                className={`${inputCls} pr-10 [&::-webkit-calendar-picker-indicator]:hidden cursor-pointer`}
              />
              <button
                type="button"
                onClick={() => dateInputRef.current?.showPicker()}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <FiCalendar className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Features Card ────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-2xl p-6 shadow-xs">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-6">Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEVEL 1 */}
          <div className="space-y-4">
            <h3 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/[0.03] pb-2">Level 1</h3>
            
            {/* Deposit Assets */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Deposit assets</span>
              <Switch
                checked={features.depositAssets}
                onChange={val => updateFeature('depositAssets', val)}
              />
            </div>

            {/* Withdraw Assets */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Withdraw assets</span>
                <span className="block text-[10px] text-gray-400 font-semibold mt-0.5">Enabled $1,000,000/day</span>
              </div>
              <Switch
                checked={features.withdrawAssets}
                onChange={val => updateFeature('withdrawAssets', val)}
              />
            </div>

            {/* Card Purchases */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Card purchases</span>
              <Switch
                checked={features.cardPurchases}
                onChange={val => updateFeature('cardPurchases', val)}
              />
            </div>

            {/* Bank Deposit */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Bank deposit</span>
              <Switch
                checked={features.bankDeposit}
                onChange={val => updateFeature('bankDeposit', val)}
              />
            </div>
          </div>

          {/* LEVEL 2 */}
          <div className="space-y-4">
            <h3 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100 dark:border-white/[0.03] pb-2">Level 2</h3>

            {/* Fiat and Spot wallet */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Fiat and Spot wallet</span>
              <Switch
                checked={features.fiatSpotWallet}
                onChange={val => updateFeature('fiatSpotWallet', val)}
              />
            </div>

            {/* Margin Wallet */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Margin wallet</span>
                <span className="block text-[10px] text-gray-400 font-semibold mt-0.5">Enabled 100x Leverage</span>
              </div>
              <Switch
                checked={features.marginWallet}
                onChange={val => updateFeature('marginWallet', val)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Update Profile Button ────────────────────────────────────────── */}
      <div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-8 py-3 rounded-full transition-all cursor-pointer shadow-md shadow-indigo-500/10 active:scale-98"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
}
