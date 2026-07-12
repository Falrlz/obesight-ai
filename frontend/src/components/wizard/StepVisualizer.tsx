import React from 'react';

interface StepVisualizerProps {
  activeStep: number;
}

export const StepVisualizer: React.FC<StepVisualizerProps> = ({ activeStep }) => {
  // Render step illustration based on activeStep (only the animated graphics, no text/labels)
  const renderIllustration = () => {
    switch (activeStep) {
      case 0: // Step 1: Vitals & Body
        return (
          <div className="w-full flex items-center justify-center select-none animate-fade-in">
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Radar Pulsing Rings */}
              <div className="absolute inset-0 border-2 border-secondary/20 rounded-full animate-ping opacity-75" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-6 border border-secondary/15 rounded-full animate-ping opacity-50" style={{ animationDuration: '4.5s' }} />
              
              {/* Animated Floating Core */}
              <svg className="w-48 h-48 text-secondary drop-shadow-[0_12px_28px_rgba(6,95,70,0.25)] animate-float" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="vitals-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                </defs>
                {/* Background decorative grid */}
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
                <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1.5" className="opacity-10" />
                {/* Smart Scale Illustration */}
                <rect x="50" y="60" width="100" height="90" rx="16" fill="url(#vitals-grad)" fillOpacity="0.08" stroke="currentColor" strokeWidth="2.5" />
                {/* Scale Top metal plates */}
                <rect x="65" y="75" width="22" height="60" rx="4" fill="currentColor" fillOpacity="0.15" />
                <rect x="113" y="75" width="22" height="60" rx="4" fill="currentColor" fillOpacity="0.15" />
                {/* Digital Display */}
                <rect x="80" y="40" width="40" height="18" rx="6" fill="#1e293b" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="100" cy="49" r="2.5" fill="#10b981" className="animate-pulse" />
                {/* Pulse wave line on scale */}
                <path d="M75 115h12l5-12 6 24 5-18 4 6h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        );

      case 1: // Step 2: Diet & Hydration
        return (
          <div className="w-full flex items-center justify-center select-none animate-fade-in">
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Soft pulsing halo */}
              <div className="absolute w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl animate-pulse" />
              
              <svg className="w-48 h-48 text-emerald-600 drop-shadow-[0_12px_28px_rgba(5,150,105,0.2)] animate-float" style={{ animationDuration: '7s' }} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="diet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                {/* Decorative circles */}
                <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" className="opacity-25" />
                {/* Organic Leaf shape representing nutrition */}
                <path d="M100 40c40 0 65 30 65 65 0 35-25 55-65 55s-65-20-65-55c0-35 25-65 65-65z" fill="url(#diet-grad)" fillOpacity="0.06" stroke="currentColor" strokeWidth="2" />
                {/* Inner leaves */}
                <path d="M100 55c25 0 45 20 45 45 0 20-15 35-45 35s-45-15-45-35c0-25 20-45 45-45z" fill="currentColor" fillOpacity="0.1" />
                <path d="M100 135V55M100 75l25-15M100 95l20-10M100 85l-25-15M100 105l-20-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                {/* Water drop decoration representing hydration */}
                <path d="M148 120c0 10-8 18-18 18s-18-8-18-18c0-10 18-30 18-30s18 20 18 30z" fill="currentColor" fillOpacity="0.8" className="animate-bounce" style={{ animationDuration: '4s' }} />
              </svg>
            </div>
          </div>
        );

      case 2: // Step 3: Physical Activity
        return (
          <div className="w-full flex items-center justify-center select-none animate-fade-in">
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Rotating Outer Ring */}
              <div className="absolute w-48 h-48 border-2 border-dashed border-teal-600/30 rounded-full animate-spin-slow" />
              
              <svg className="w-48 h-48 text-teal-600 drop-shadow-[0_12px_28px_rgba(13,148,136,0.25)] animate-float" style={{ animationDuration: '5.5s' }} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="activity-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </linearGradient>
                </defs>
                {/* Circular activity ring representation */}
                <circle cx="100" cy="100" r="70" stroke="url(#activity-grad)" strokeWidth="6" className="opacity-15" />
                <path d="M100 30a70 70 0 1 1-60.6 105" stroke="url(#activity-grad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="50" />
                {/* Heart rate monitor/runner silhouette */}
                <path d="M70 100h15l5-25 7 45 6-30 4 10h23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* Fire emblem (calorie burn) */}
                <path d="M100 135c10 0 18-8 18-18 0-12-18-28-18-28s-18 16-18 28c0 10 8 18 18 18z" fill="currentColor" className="animate-pulse" />
              </svg>
            </div>
          </div>
        );

      case 3: // Step 4: Habits & Sleep
        return (
          <div className="w-full flex items-center justify-center select-none animate-fade-in">
            <div className="relative w-56 h-56 flex items-center justify-center">
              {/* Twinkling stars in background */}
              <div className="absolute top-8 left-10 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" style={{ animationDuration: '2.5s' }} />
              <div className="absolute bottom-10 right-8 w-2 h-2 bg-indigo-300 rounded-full animate-ping" style={{ animationDuration: '3.5s' }} />
              
              <svg className="w-48 h-48 text-indigo-600 drop-shadow-[0_12px_28px_rgba(79,70,229,0.25)] animate-float" style={{ animationDuration: '6.5s' }} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="sleep-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
                {/* Decorative galaxy spiral */}
                <circle cx="100" cy="100" r="72" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" className="opacity-30" />
                {/* Glowing moon */}
                <path d="M125 115A55 55 0 0 1 55 45a55 55 0 1 0 70 70z" fill="url(#sleep-grad)" fillOpacity="0.08" stroke="currentColor" strokeWidth="2.5" />
                {/* Brainwave circulations representing stress levels */}
                <path d="M60 120c15-5 25 5 40 0s25-5 40 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-40 animate-pulse" />
                <path d="M50 135c20-8 30 8 50 0s30-8 50 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-25" />
                {/* Little clouds */}
                <path d="M120 125a15 15 0 0 1 25-5 12 12 0 0 1 12 12c0 8-8 12-18 12h-22a10 10 0 0 1 3-19z" fill="currentColor" fillOpacity="0.15" />
              </svg>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-white/40 border border-outline-variant/20 backdrop-blur-md rounded-3xl shadow-md min-h-[300px] lg:min-h-[400px]">
      {renderIllustration()}
    </div>
  );
};
