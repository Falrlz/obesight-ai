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
    <div className="w-full py-4 mb-4 select-none">
      {/* Progress Bar Container */}
      <div className="relative flex justify-between items-center w-full">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-[2px] bg-secondary -translate-y-1/2 z-0 transition-all duration-500 step-transition"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {/* Steps Nodes */}
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div key={idx} className="flex flex-col items-center z-10 relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                  isCompleted
                    ? 'bg-secondary border-secondary text-white shadow-md shadow-secondary/10'
                    : isActive
                    ? 'bg-white border-secondary text-secondary ring-4 ring-secondary/15 shadow-md scale-105'
                    : 'bg-white border-outline-variant text-outline/60'
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
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
              <div className="mt-2 text-center hidden md:block">
                <p
                  className={`text-xs font-bold transition-colors ${
                    isActive ? 'text-secondary font-bold' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default StepIndicator;
