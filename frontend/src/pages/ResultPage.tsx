import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import BMIGauge from '../components/dashboard/BMIGauge';
import ProbChart from '../components/dashboard/ProbChart';
import InsightCards from '../components/dashboard/InsightCards';

export const ResultPage: React.FC = () => {
  const navigate = useNavigate();
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

  return (
    <div className="flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-5xl w-full mx-auto space-y-8 print-container">
        {/* Results Title Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
              Hasil Skrining Kesehatan AI
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Halo <strong className="text-slate-800">{result.name}</strong>, berikut adalah detail evaluasi fisik dan saran aktivitas Anda.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 no-print">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-full text-sm font-bold border border-slate-200 text-slate-600 hover:bg-white active:scale-95 transition-all shadow-sm"
            >
              🖨️ Cetak PDF
            </button>
            <button
              onClick={handleStartAnalysis}
              className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-95 transition-all shadow-md"
            >
              Ulangi Analisis
            </button>
          </div>
        </div>

        {/* Dashboard Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* BMI gauge & Probability distribution */}
          <div className="lg:col-span-1 space-y-6">
            <BMIGauge bmi={result.bmi} category={result.prediction_label_id} />
            <ProbChart
              probabilities={result.probabilities}
              predictedClassLabel={result.prediction_label}
            />
          </div>

          {/* Recommendations Insights */}
          <div className="lg:col-span-2">
            <InsightCards
              general={result.recommendations.general}
              specific={result.recommendations.specific}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
