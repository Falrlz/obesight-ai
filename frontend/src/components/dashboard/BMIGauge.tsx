import React from 'react';

interface BMIGaugeProps {
  bmi: number;
  category: string;
}

export const BMIGauge: React.FC<BMIGaugeProps> = ({ bmi, category }) => {
  // Clamp BMI between 15 and 40 for visualization
  const minBmi = 15;
  const maxBmi = 40;
  const clampedBmi = Math.max(minBmi, Math.min(bmi, maxBmi));
  const percentage = ((clampedBmi - minBmi) / (maxBmi - minBmi)) * 100;

  // SVG parameters for half-circle gauge
  const radius = 80;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // 251.3
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine color theme based on category
  const getColorScheme = (cat: string) => {
    const lowercaseCat = cat.toLowerCase();
    if (lowercaseCat.includes('kurang') || lowercaseCat.includes('insufficient') || lowercaseCat.includes('underweight')) {
      return {
        color: 'text-sky-500',
        bg: 'bg-sky-50',
        border: 'border-sky-200',
        stroke: '#0EA5E9',
      };
    } else if (lowercaseCat.includes('normal') || lowercaseCat.includes('ideal')) {
      return {
        color: 'text-emerald-500',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        stroke: '#10B981',
      };
    } else if (lowercaseCat.includes('lebih') || lowercaseCat.includes('overweight')) {
      return {
        color: 'text-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        stroke: '#F59E0B',
      };
    } else {
      // Obesity
      return {
        color: 'text-rose-500',
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        stroke: '#F43F5E',
      };
    }
  };

  const theme = getColorScheme(category);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Indeks Massa Tubuh (BMI)</h3>
      
      <div className="relative w-48 h-28 flex justify-center mt-4">
        {/* SVG Arc Gauge */}
        <svg className="w-48 h-48 transform -rotate-180" viewBox="0 0 180 180">
          {/* Background Track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          {/* Colored Value Arc */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={theme.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              transitionDelay: '100ms'
            }}
          />
        </svg>

        {/* Absolute Centered BMI Info */}
        <div className="absolute bottom-0 text-center flex flex-col items-center">
          <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{bmi.toFixed(1)}</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full mt-2 border ${theme.bg} ${theme.color} ${theme.border}`}>
            {category}
          </span>
        </div>
      </div>

      {/* Under labels for scale */}
      <div className="flex justify-between w-full max-w-[200px] text-[10px] text-slate-400 mt-2 font-medium">
        <span>BMI 15 (Kurus)</span>
        <span>BMI 40 (Obesitas)</span>
      </div>
    </div>
  );
};
export default BMIGauge;
