import React from 'react';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';

interface ContractDetailsProps {
  activeSymbol: string;
  currentPrice: number;
  activeVolume24h: string;
}

export const ContractDetails: React.FC<ContractDetailsProps> = ({
  activeSymbol,
  currentPrice,
  activeVolume24h
}) => {
  const rows = [
    { label: 'Expiration Date', val: 'Perpetual' },
    { label: 'Index Price', val: currentPrice > 0 ? currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 'Loading...' },
    { label: 'Mark Price', val: currentPrice > 0 ? (currentPrice * 0.9997).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 'Loading...' },
    { label: 'Open Interest', val: 'Open Interest' },
    { label: '24H Turnover', val: activeVolume24h },
    { label: '24H Volume', val: '3,228,855,012 USD' },
    { label: 'Risk Limit', val: '150 BTC' },
    { label: 'Contract Value', val: '1 USD', border: true },
  ];

  return (
    <div className="bg-white dark:bg-[#141416] border border-gray-200 dark:border-white/[0.04] rounded-md p-4 select-none h-full flex flex-col justify-between">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/[0.04] pb-2 mb-2 shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white">Contract Details ({activeSymbol})</span>
          <FiSettings className="text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer w-3.5 h-3.5" />
        </div>
        <div className="flex-1 flex flex-col justify-between text-xs py-1 min-h-0">
          {rows.map(({ label, val, border }) => (
            <div key={label} className={`flex justify-between items-center py-0.5${border ? ' border-b border-gray-200 dark:border-white/[0.04] pb-2' : ''}`}>
              <span className="text-gray-400 font-medium">{label}</span>
              <span className="font-semibold text-gray-900 dark:text-white">{val}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-2 shrink-0">
        <Link href="/about" className="block text-center text-xs font-semibold text-primary hover:text-[#6366f1] transition-colors">
          More Info &amp; Contract Specs
        </Link>
      </div>
    </div>
  );
};
