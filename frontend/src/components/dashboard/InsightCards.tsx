import React, { useState } from 'react';

interface InsightCardsProps {
  general?: string;
  specific: string[];
}

export const InsightCards: React.FC<InsightCardsProps> = ({ general, specific }) => {
  // Local state to track which recommendations have been checked by the user
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const handleToggle = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 w-full">
      {/* General Recommendation Card */}
      {general && (
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-secondary/[0.04] border border-secondary/15 relative overflow-hidden flex flex-col">
          <div className="w-11 h-11 rounded-2xl bg-secondary/[0.08] border border-secondary/15 flex items-center justify-center text-secondary">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18h6" />
              <path d="M10 22h4" />
              <path d="M12 2a7 7 0 0 0-4 12.7c.5.4.8 1 .9 1.6l.1.7h6l.1-.7c.1-.6.4-1.2.9-1.6A7 7 0 0 0 12 2Z" />
            </svg>
          </div>
          <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mt-5">
            Saran Kesehatan Utama
          </h3>
          <p className="text-on-surface/85 text-sm sm:text-base leading-relaxed mt-2">
            {general}
          </p>
        </div>
      )}

      {/* Specific Checklist Recommendations */}
      <div className={`${general ? 'lg:col-span-3' : 'lg:col-span-5'} p-6 sm:p-8 bg-white rounded-3xl border border-outline-variant`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xs font-semibold text-text-secondary/70 uppercase tracking-wider">
              Rencana Tindakan
            </h3>
            <p className="text-sm text-text-secondary/80 mt-2 leading-relaxed">
              Centang poin yang ingin Anda prioritaskan minggu ini.
            </p>
          </div>
          {specific.length > 0 && (
            <span className="shrink-0 mt-0.5 text-xs font-semibold text-secondary bg-secondary/[0.08] rounded-full px-3 py-1 tabular-nums">
              {completedCount}/{specific.length}
            </span>
          )}
        </div>

        {specific.length === 0 ? (
          <div className="text-center py-10 text-sm text-text-secondary/70">
            Tidak ada saran spesifik. Gaya hidup Anda saat ini sudah sangat baik!
          </div>
        ) : (
          <div className="mt-6 space-y-2.5">
            {specific.map((rec, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleToggle(idx)}
                  aria-pressed={isChecked}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 select-none ${
                    isChecked
                      ? 'border-secondary/35 bg-secondary/[0.04] text-secondary shadow-sm shadow-secondary/5'
                      : 'border-outline-variant bg-surface-container-low/40 text-text-secondary hover:border-slate-300 hover:bg-surface-container-low/70'
                  }`}
                >
                  {/* Custom Checkbox */}
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center border-2 mt-0.5 shrink-0 transition-all duration-200 ${
                      isChecked ? 'bg-secondary border-secondary text-white' : 'border-outline-variant bg-white'
                    }`}
                  >
                    {isChecked && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className={`text-sm leading-relaxed transition-all duration-200 ${isChecked ? 'font-bold' : 'font-medium'}`}>{rec}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default InsightCards;
