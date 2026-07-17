import React from 'react';
import { useTranslation } from 'react-i18next';

interface ConfidenceRingProps {
  /** Confidence value in the 0–100 range. */
  value: number;
  /** Hex colour for the progress stroke. Defaults to the brand secondary. */
  stroke?: string;
}

/**
 * Compact circular gauge that visualises the model's confidence in its top
 * prediction. Purely presentational — it renders a value that already exists in
 * the API response (the probability of the predicted class).
 */
export const ConfidenceRing: React.FC<ConfidenceRingProps> = ({ value, stroke = '#065f46' }) => {
  const { t } = useTranslation();
  const clamped = Math.max(0, Math.min(value, 100));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-outline-variant"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-on-surface tabular-nums">
          {clamped.toFixed(0)}
          <span className="text-base font-medium text-text-secondary">%</span>
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary/70">
          {t('result.confidence_label', 'Keyakinan')}
        </span>
      </div>
    </div>
  );
};
export default ConfidenceRing;
