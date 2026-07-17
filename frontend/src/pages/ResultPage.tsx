import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '../context/FormContext';
import BMIGauge from '../components/dashboard/BMIGauge';
import ProbChart from '../components/dashboard/ProbChart';
import InsightCards from '../components/dashboard/InsightCards';
import ConfidenceRing from '../components/dashboard/ConfidenceRing';
import { getStatusTheme } from '../utils/resultStatus';

export const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { result, resetForm } = useFormContext();

  // Redirect to home if there is no result (e.g., user navigated directly to /result)
  useEffect(() => {
    if (!result) {
      navigate('/');
    }
  }, [result, navigate]);

  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleStartAnalysis = () => {
    resetForm();
    navigate('/wizard');
  };

  const handleNavigateHome = () => {
    resetForm();
    navigate('/');
  };

  const theme = getStatusTheme(result.prediction_label_id);
  const confidence = (result.probabilities[result.prediction_label] ?? 0) * 100;

  return (
    <div className="relative w-full pt-28 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl w-full mx-auto space-y-6 sm:space-y-8 print-container">

        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
              {t('result.report_header', 'Laporan Skrining')}
            </span>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-on-surface leading-tight">
              {t('result.title', 'Hasil Analisis Kesehatan')}
            </h1>
            <p className="text-sm sm:text-base text-text-secondary font-medium leading-relaxed">
              {t('result.greeting', 'Halo')}{' '}
              <strong className="text-on-surface font-semibold">{result.name}</strong>
              {t('result.greeting_body', ', berikut ringkasan evaluasi fisik dan rekomendasi personal Anda.')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 no-print shrink-0">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-full text-sm font-semibold border border-outline-variant text-text-secondary hover:bg-surface-container-low/70 active:scale-95 transition-all cursor-pointer"
            >
              {t('result.print_pdf', 'Cetak PDF')}
            </button>
            <button
              onClick={handleStartAnalysis}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-on-primary bg-secondary hover:bg-secondary/95 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              {t('result.repeat_button', 'Ulangi Analisis')}
            </button>
          </div>
        </header>

        {/* HERO VERDICT — primary result, confidence, risk & BMI stats */}
        <section className="rounded-3xl border border-outline-variant bg-white overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <div className="flex-1 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary/70">
                {t('result.ai_prediction', 'Prediksi Utama Model AI')}
              </span>
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-on-surface leading-tight">
                  {result.prediction_label_id}
                </h2>
                <span
                  className={`inline-flex items-center gap-2 text-sm font-semibold px-3.5 py-1.5 rounded-full border ${theme.bg} ${theme.text} ${theme.border}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${theme.text.replace('text-', 'bg-')}`} />
                  {t(`result.risk_${theme.key}`, theme.riskLabel)}
                </span>
              </div>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl">
                {t('result.confidence_desc_part1', 'Model mengklasifikasikan kondisi Anda dengan tingkat keyakinan')}{' '}
                <strong className="text-on-surface font-semibold">{confidence.toFixed(0)}%</strong>
                {t('result.confidence_desc_part2', '. Gunakan rekomendasi di bawah sebagai langkah awal, bukan pengganti diagnosis medis.')}
              </p>
            </div>

            {/* Confidence ring */}
            <div className="flex sm:flex-col items-center gap-4 sm:border-l sm:border-outline-variant/70 sm:pl-10">
              <ConfidenceRing value={confidence} stroke={theme.stroke} />
            </div>
          </div>

          {/* Stat strip */}
          <dl className="grid grid-cols-3 border-t border-outline-variant divide-x divide-outline-variant">
            <div className="p-4 sm:p-6 text-center">
              <dt className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-text-secondary/60">
                {t('result.bmi_label', 'BMI')}
              </dt>
              <dd className="mt-1 text-xl sm:text-2xl font-semibold text-on-surface tabular-nums">
                {result.bmi.toFixed(1)}
              </dd>
            </div>
            <div className="p-4 sm:p-6 text-center">
              <dt className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-text-secondary/60">
                {t('result.category_label', 'Kategori')}
              </dt>
              <dd className={`mt-1 text-sm sm:text-base font-semibold ${theme.text} leading-snug`}>
                {result.bmi_category}
              </dd>
            </div>
            <div className="p-4 sm:p-6 text-center">
              <dt className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-text-secondary/60">
                {t('result.risk_level_label', 'Tingkat Risiko')}
              </dt>
              <dd className={`mt-1 text-sm sm:text-base font-semibold ${theme.text} leading-snug`}>
                {t(`result.risk_${theme.key}`, theme.riskLabel)}
              </dd>
            </div>
          </dl>
        </section>

        {/* VISUALIZATION */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
          <div className="lg:col-span-2">
            <BMIGauge
              bmi={result.bmi}
              category={result.prediction_label_id}
              general={result.recommendations.general}
            />
          </div>
          <div className="lg:col-span-3">
            <ProbChart
              probabilities={result.probabilities}
              predictedClassLabel={result.prediction_label}
            />
          </div>
        </section>

        {/* INSIGHTS & RECOMMENDATIONS */}
        <section>
          <InsightCards
            specific={result.recommendations.specific}
          />
        </section>

        {/* NEXT ACTION */}
        <section className="no-print rounded-3xl bg-secondary/[0.04] border border-secondary/15 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-on-surface tracking-tight">
              {t('result.update_results_title', 'Ingin memperbarui hasil Anda?')}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t('result.update_results_desc', 'Jalankan skrining ulang kapan saja setelah kebiasaan Anda berubah.')}
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleNavigateHome}
              className="px-5 py-2.5 rounded-full text-sm font-semibold border border-outline-variant text-text-secondary hover:bg-white active:scale-95 transition-all cursor-pointer"
            >
              {t('common.home', 'Beranda')}
            </button>
            <button
              onClick={handleStartAnalysis}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-on-primary bg-secondary hover:bg-secondary/95 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              {t('result.repeat_button', 'Skrining Ulang')}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultPage;
