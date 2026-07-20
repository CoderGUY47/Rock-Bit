'use client';
import React from 'react';
import { FiCheck } from 'react-icons/fi';
import type { Step, Mode } from './walletTypes';

export function StepBar({ step, mode }: { step: Step; mode: Mode }) {
  if (mode === 'overview') return null;

  const steps = mode === 'buy'
    ? ['Select currency', 'Confirm Payment', 'Payment Details']
    : ['Select crypto', 'Enter Amount', 'Payment Details', 'Payment Details'];

  return (
    <div className="flex items-center gap-0 mb-8 w-full overflow-x-auto pb-2 select-none">
      {steps.map((label, i) => {
        const idx = (i + 1) as Step;
        const done = mode === 'sell' ? (step > idx || idx === 1) : step > idx;
        const active = step === idx;
        return (
          <React.Fragment key={`${label}-${i}`}>
            <div className="flex items-center gap-2 shrink-0">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors text-[9px] font-bold
                ${done ? 'bg-[#58bd7d] border-[#58bd7d] text-white' : active ? 'border-[#3b82f6] bg-white dark:bg-[#141416] text-[#3b82f6]' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#141416] text-gray-400'}`}>
                {done ? <FiCheck className="w-3 h-3 text-white" strokeWidth={3} /> : <span className="w-1.5 h-1.5 rounded-full bg-transparent" />}
              </div>
              <span className={`text-xs font-semibold whitespace-nowrap ${done ? 'text-[#58bd7d]' : active ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 min-w-[50px] md:min-w-[90px] h-[3px] mx-3 rounded-full transition-colors duration-300 ${done ? 'bg-[#58bd7d]' : 'bg-gray-200 dark:bg-gray-800'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
