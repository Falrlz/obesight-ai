import React, { useState } from 'react';

interface InsightCardsProps {
  general: string;
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

  return (
    <div className="space-y-6 w-full">
      {/* General Recommendation Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-500/10 to-indigo-500/10 border border-teal-500/20 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">💡</div>
        <h3 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-2">Saran Kesehatan Utama</h3>
        <p className="text-slate-700 text-sm leading-relaxed font-medium">
          {general}
        </p>
      </div>

      {/* Specific Checklist Recommendations */}
      <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Rencana Tindakan Spesifik</h3>
        <p className="text-xs text-slate-500 mb-6">
          Berdasarkan pola makan dan kebiasaan harian Anda, AI menyarankan rencana tindakan berikut. Centang poin yang ingin Anda prioritaskan minggu ini:
        </p>

        {specific.length === 0 ? (
          <div className="text-center py-6 text-sm text-slate-400">
            Tidak ada saran spesifik. Gaya hidup Anda saat ini sudah sangat baik! ✨
          </div>
        ) : (
          <div className="space-y-3">
            {specific.map((rec, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <div
                  key={idx}
                  onClick={() => handleToggle(idx)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 select-none ${
                    isChecked
                      ? 'border-teal-200 bg-teal-50/20 text-slate-500 line-through decoration-slate-300'
                      : 'border-slate-100 bg-slate-50/30 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {/* Custom Checkbox */}
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border-2 mt-0.5 transition-all duration-200 ${
                      isChecked
                        ? 'bg-teal-600 border-teal-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && (
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium leading-relaxed">{rec}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default InsightCards;
