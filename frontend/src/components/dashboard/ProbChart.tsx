import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProbChartProps {
  probabilities: Record<string, number>;
  predictedClassLabel: string;
}

export const ProbChart: React.FC<ProbChartProps> = ({ probabilities, predictedClassLabel }) => {
  const { t } = useTranslation();
  // Map keys to readable localized labels
  const labelMapping: Record<string, string> = {
    Insufficient_Weight: t('result.classes.Insufficient_Weight', 'Kurus / Berat Kurang'),
    Normal_Weight: t('result.classes.Normal_Weight', 'Berat Badan Normal'),
    Overweight_Level_I: t('result.classes.Overweight_Level_I', 'Kelebihan Berat Badan Tingkat I'),
    Overweight_Level_II: t('result.classes.Overweight_Level_II', 'Kelebihan Berat Badan Tingkat II'),
    Obesity_Type_I: t('result.classes.Obesity_Type_I', 'Obesitas Tingkat I'),
    Obesity_Type_II: t('result.classes.Obesity_Type_II', 'Obesitas Tingkat II'),
    Obesity_Type_III: t('result.classes.Obesity_Type_III', 'Obesitas Tingkat III (Ekstrem)'),
  };

  // Convert map to list, format percentages, and sort by likelihood (desc)
  const data = Object.entries(probabilities)
    .map(([key, val]) => ({
      key,
      label: labelMapping[key] || key,
      value: val * 100,
      isPredicted: key === predictedClassLabel,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="h-full p-6 sm:p-8 bg-white rounded-3xl border border-outline-variant">
      <h3 className="text-xs font-semibold text-text-secondary/70 uppercase tracking-wider">
        {t('result.prob_title', 'Distribusi Probabilitas AI')}
      </h3>
      <p className="text-sm text-text-secondary/80 mt-2 leading-relaxed">
        {t('result.prob_subtitle', 'Seberapa dekat kondisi fisik Anda dengan tiap kategori berat badan menurut model machine learning.')}
      </p>

      <div className="mt-6 space-y-3.5">
        {data.map((item) => (
          <div key={item.key} className="space-y-1.5">
            <div className="flex justify-between items-center gap-3 text-sm">
              <span
                className={`font-medium truncate ${
                  item.isPredicted ? 'text-secondary' : 'text-text-secondary'
                }`}
              >
                {item.label}
                {item.isPredicted && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-secondary/[0.08] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary align-middle">
                    {t('result.prediction_badge', 'Prediksi')}
                  </span>
                )}
              </span>
              <span
                className={`font-semibold tabular-nums shrink-0 ${
                  item.isPredicted ? 'text-secondary' : 'text-text-secondary/70'
                }`}
              >
                {item.value.toFixed(1)}%
              </span>
            </div>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  item.isPredicted ? 'bg-secondary' : 'bg-outline-variant'
                }`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProbChart;
