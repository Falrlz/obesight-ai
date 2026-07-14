import React from 'react';

interface BMIGaugeProps {
  bmi: number;
  category: string;
}

/**
 * BMI visualised as a horizontal WHO-category scale. The four zones
 * (Kurus / Normal / Berlebih / Obesitas) are always shown so the user can read
 * their result in context; the zone they fall into is highlighted and a pointer
 * marks the exact value.
 */
const ZONES = [
  {
    label: 'Kurus',
    basis: 14, // 15 → 18.5 on a 15–40 scale
    bar: 'bg-sky-500',
    muted: 'bg-sky-500/20',
    text: 'text-sky-600',
    badge: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    label: 'Normal',
    basis: 26, // 18.5 → 25
    bar: 'bg-secondary',
    muted: 'bg-secondary/20',
    text: 'text-secondary',
    badge: 'bg-secondary/[0.08] text-secondary border-secondary/25',
  },
  {
    label: 'Berlebih',
    basis: 20, // 25 → 30
    bar: 'bg-amber-500',
    muted: 'bg-amber-500/20',
    text: 'text-amber-600',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    label: 'Obesitas',
    basis: 40, // 30 → 40
    bar: 'bg-rose-500',
    muted: 'bg-rose-500/20',
    text: 'text-rose-600',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
  },
];

export const BMIGauge: React.FC<BMIGaugeProps> = ({ bmi, category }) => {
  const minBmi = 15;
  const maxBmi = 40;
  const span = maxBmi - minBmi;

  const clampedBmi = Math.max(minBmi, Math.min(bmi, maxBmi));
  const position = ((clampedBmi - minBmi) / span) * 100;
  // Keep the pointer/pill comfortably inside the track at the extremes
  const markerPos = Math.max(5, Math.min(95, position));

  const activeIdx = bmi < 18.5 ? 0 : bmi < 25 ? 1 : bmi < 30 ? 2 : 3;
  const active = ZONES[activeIdx];

  return (
    <div className="flex flex-col h-full p-6 sm:p-8 bg-white rounded-3xl border border-outline-variant">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xs font-semibold text-text-secondary/70 uppercase tracking-wider">
          Indeks Massa Tubuh
        </h3>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${active.badge}`}>
          {category}
        </span>
      </div>

      {/* Value */}
      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-5xl font-semibold text-on-surface tracking-tight tabular-nums leading-none">
          {bmi.toFixed(1)}
        </span>
        <span className="text-sm font-medium text-text-secondary/70">kg/m²</span>
      </div>

      {/* Scale */}
      <div className="mt-auto pt-8">
        {/* Pointer */}
        <div className="relative h-9">
          <div
            className="absolute bottom-0 flex flex-col items-center transition-all duration-1000 ease-out"
            style={{ left: `${markerPos}%`, transform: 'translateX(-50%)' }}
          >
            <span
              className={`px-2 py-0.5 rounded-full bg-white border border-outline-variant shadow-sm text-xs font-semibold tabular-nums ${active.text}`}
            >
              {bmi.toFixed(1)}
            </span>
            <span className="w-2 h-2 rotate-45 bg-white border-b border-r border-outline-variant -mt-1" />
          </div>
        </div>

        {/* Zone bar */}
        <div className="flex gap-1">
          {ZONES.map((z, i) => (
            <div
              key={z.label}
              className={`h-3 rounded-full transition-colors duration-500 ${
                i === activeIdx ? z.bar : z.muted
              }`}
              style={{ flexBasis: `${z.basis}%` }}
            />
          ))}
        </div>

        {/* Zone labels */}
        <div className="flex gap-1 mt-2">
          {ZONES.map((z, i) => (
            <div key={z.label} className="text-center" style={{ flexBasis: `${z.basis}%` }}>
              <span
                className={`text-[10px] sm:text-xs ${
                  i === activeIdx ? `${z.text} font-semibold` : 'text-text-secondary/60 font-medium'
                }`}
              >
                {z.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-text-secondary/70 leading-relaxed">
          Rentang berat badan sehat berada pada BMI <strong className="text-text-secondary">18,5–24,9</strong>.
        </p>
      </div>
    </div>
  );
};
export default BMIGauge;
