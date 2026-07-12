import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { label: 'Data Dasar', desc: 'Fisik & Demografi' },
    { label: 'Pola Makan', desc: 'Asupan & Nutrisi' },
    { label: 'Kebiasaan', desc: 'Aktivitas & Hidrasi' },
    { label: 'Gaya Hidup', desc: 'Mobilitas & Output' },
  ];

  return (
    <div className="flex items-center gap-4 select-none">
      {steps.map((_, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;

        return (
          <div
            key={idx}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-all duration-300 border-2 ${
              isCompleted
                ? 'bg-secondary border-secondary text-white shadow-sm'
                : isActive
                ? 'bg-white border-secondary text-secondary ring-4 ring-secondary/15 scale-105 shadow-sm'
                : 'bg-white border-outline-variant text-outline/40'
            }`}
          >
            {isCompleted ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              idx + 1
            )}
          </div>
        );
      })}
    </div>
  );
};
export default StepIndicator;
