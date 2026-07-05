import React from 'react';

interface ProbChartProps {
  probabilities: Record<string, number>;
  predictedClassLabel: string;
}

export const ProbChart: React.FC<ProbChartProps> = ({ probabilities, predictedClassLabel }) => {
  // Map keys to readable Indonesian labels
  const labelMapping: Record<string, string> = {
    Insufficient_Weight: 'Kurus / Berat Kurang',
    Normal_Weight: 'Berat Badan Normal',
    Overweight_Level_I: 'Berat Lebih Tingkat I',
    Overweight_Level_II: 'Berat Lebih Tingkat II',
    Obesity_Type_I: 'Obesitas Tingkat I',
    Obesity_Type_II: 'Obesitas Tingkat II',
    Obesity_Type_III: 'Obesitas Tingkat III (Ekstrem)',
  };

  // Convert map to list and format percentages
  const data = Object.entries(probabilities).map(([key, val]) => {
    return {
      key,
      label: labelMapping[key] || key,
      value: val * 100, // Convert to percentage
      isPredicted: key === predictedClassLabel,
    };
  });

  return (
    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm w-full">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Analisis Distribusi Probabilitas AI
      </h3>
      <p className="text-xs text-slate-500 mb-6">
        Distribusi probabilitas menunjukkan tingkat kecocokan kondisi fisik Anda dengan masing-masing kategori klasifikasi berat badan berdasarkan model Machine Learning.
      </p>

      <div className="space-y-4">
        {data.map((item) => {
          return (
            <div key={item.key} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className={`font-semibold ${item.isPredicted ? 'text-teal-600' : 'text-slate-600'}`}>
                  {item.label} {item.isPredicted && '✨ (Prediksi AI)'}
                </span>
                <span className={`font-bold ${item.isPredicted ? 'text-teal-600' : 'text-slate-500'}`}>
                  {item.value.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    item.isPredicted
                      ? 'bg-gradient-to-r from-teal-500 to-indigo-500 shadow-sm'
                      : 'bg-slate-300'
                  }`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProbChart;
