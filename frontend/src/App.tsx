import React, { useState, useEffect } from 'react';
import { useFormContext } from './context/FormContext';
import { predictObesity, getModelInfo } from './services/api';
import type { ModelInfoResponse } from './services/api';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StepIndicator from './components/wizard/StepIndicator';
import Step1Basic from './components/wizard/Step1Basic';
import Step2Diet from './components/wizard/Step2Diet';
import Step3Activity from './components/wizard/Step3Activity';
import Step4Habits from './components/wizard/Step4Habits';
import BMIGauge from './components/dashboard/BMIGauge';
import ProbChart from './components/dashboard/ProbChart';
import InsightCards from './components/dashboard/InsightCards';
import Hero from './components/landing/Hero';
import Mission from './components/landing/Mission';
import Features from './components/landing/Features';
import HowItWorks from './components/landing/HowItWorks';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';


const LOADING_STEPS = [
  'Membangun koneksi ke ObeSight API...',
  'Menghitung Indeks Massa Tubuh (BMI)...',
  'Mengevaluasi variabel genetik & antropometri...',
  'Mengeksekusi model kecerdasan buatan (LightGBM/XGBoost)...',
  'Menyusun rekomendasi kesehatan personal bilingual...',
];

export const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'wizard'>('landing');

  useIntersectionObserver(
    'section:not(#features) > div',
    ['opacity-0', 'translate-y-10'],
    ['opacity-100', 'translate-y-0'],
    view
  );

  const [loadingTextIdx, setLoadingTextIdx] = useState(0);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [modelInfo, setModelInfo] = useState<ModelInfoResponse | null>(null);
  const [modelLoading, setModelLoading] = useState(false);

  const handleOpenAbout = async () => {
    setIsAboutOpen(true);
    if (!modelInfo) {
      setModelLoading(true);
      try {
        const info = await getModelInfo();
        setModelInfo(info);
      } catch (err) {
        console.error('Gagal memuat metadata model:', err);
      } finally {
        setModelLoading(false);
      }
    }
  };

  const {
    formData,
    activeStep,
    nextStep,
    prevStep,
    resetForm,
    loading,
    setLoading,
    error,
    setError,
    result,
    setResult,
  } = useFormContext();

  // Rotate loading text for high-end AI feel
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (loading) {
      setLoadingTextIdx(0);
      interval = setInterval(() => {
        setLoadingTextIdx((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 1500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  const handleStartAnalysis = () => {
    resetForm();
    setView('wizard');
  };

  const handleNavigateHome = () => {
    resetForm();
    setView('landing');
  };

  const handleNavigateWizard = () => {
    resetForm();
    setView('wizard');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await predictObesity(formData);
      setResult(response);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        err.message || 
        'Gagal terhubung dengan server API. Harap periksa apakah server backend sudah berjalan.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Render current step in the Wizard
  const renderWizardStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1Basic />;
      case 1:
        return <Step2Diet />;
      case 2:
        return <Step3Activity />;
      case 3:
        return <Step4Habits />;
      default:
        return <Step1Basic />;
    }
  };

  const isStep1Valid = formData.name.trim() !== '';

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md overflow-x-hidden antialiased selection:bg-secondary selection:text-on-primary print:bg-white print:text-black">
      {/* Styles to optimize print rendering */}
      <style>{`
        @media print {
          header, footer, .no-print {
            display: none !important;
          }
          body {
            background-color: white !important;
          }
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>

      {/* Navigation */}
      <Navbar
        onNavigateHome={handleNavigateHome}
        onNavigateWizard={handleNavigateWizard}
        onOpenAbout={handleOpenAbout}
        isWizardActive={view === 'wizard' && !result}
      />

      <main className={`flex-grow ${
        view === 'landing' && !loading && !error && !result
          ? 'w-full'
          : 'flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8'
      }`}>
        {/* 1. LOADING SCREEN */}
        {loading && (
          <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl glass-panel border border-slate-200/50 shadow-lg animate-pulse">
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-800">Menganalisis Kesehatan</h3>
              <p className="text-sm text-slate-500 min-h-[40px] px-4 font-medium transition-all duration-300">
                {LOADING_STEPS[loadingTextIdx]}
              </p>
            </div>
          </div>
        )}

        {/* 2. ERROR SCREEN */}
        {!loading && error && (
          <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-rose-100 shadow-lg text-center space-y-6">
            <div className="text-5xl">⚠️</div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-800">Terjadi Kesalahan</h3>
              <p className="text-sm text-slate-500 leading-relaxed px-2 font-medium">
                {error}
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleNavigateHome}
                className="px-5 py-2.5 rounded-full text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
              >
                Kembali
              </button>
              <button
                onClick={activeStep === 3 ? handleSubmit : handleStartAnalysis}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:scale-95 transition-all shadow-sm"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}

        {/* 3. LANDING PAGE */}
        {!loading && !error && !result && view === 'landing' && (
          <div className="w-full">
            <Hero onStartAnalysis={handleStartAnalysis} />
            <Mission />
            <Features />
            <HowItWorks />
          </div>
        )}

        {/* 4. WIZARD FORM */}
        {!loading && !error && !result && view === 'wizard' && (
          <div className="max-w-2xl w-full p-6 sm:p-8 bg-white rounded-3xl border border-slate-100 shadow-lg">
            {/* Stepper Header */}
            <StepIndicator currentStep={activeStep} />

            {/* Active Step Panel */}
            <div className="mt-8 min-h-[300px]">
              {renderWizardStep()}
            </div>

            {/* Footer Navigation */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                disabled={activeStep === 0}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all active:scale-95 ${
                  activeStep === 0
                    ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Sebelumnya
              </button>

              {activeStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={activeStep === 0 && !isStep1Valid}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-95 transition-all shadow-sm ${
                    activeStep === 0 && !isStep1Valid ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Lanjut
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 active:scale-95 transition-all shadow-md"
                >
                  Analisis Sekarang 🚀
                </button>
              )}
            </div>
          </div>
        )}

        {/* 5. DASHBOARD RESULTS */}
        {!loading && !error && result && (
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
        )}
      </main>

      {/* About AI Modal Overlay */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm no-print">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-100 shadow-2xl space-y-6 relative animate-fadeIn">
            <button
              onClick={() => setIsAboutOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold p-1 select-none"
            >
              ✕
            </button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧠</span>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Tentang Kecerdasan Buatan</h3>
                <p className="text-xs text-slate-500">Metadata Model Prediksi Obesitas</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <p>
                ObeSight menggunakan model klasifikasi Machine Learning terintegrasi untuk mendeteksi tingkat risiko obesitas berdasarkan data survei perilaku harian.
              </p>

              {modelLoading ? (
                <div className="flex items-center justify-center py-4 gap-2 text-teal-600 font-medium">
                  <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                  <span>Memuat metadata model...</span>
                </div>
              ) : modelInfo ? (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                  <div>
                    <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">Algoritma Model</span>
                    <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{modelInfo.model_name}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">Framework Pipeline</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">{modelInfo.framework}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px] mb-1">Fitur yang Diperhitungkan ({modelInfo.features_required.length})</span>
                    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                      {modelInfo.features_required.map((feat) => (
                        <span key={feat} className="px-2 py-0.5 bg-slate-200/60 rounded text-[9px] font-semibold text-slate-600">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-xs text-rose-500 font-medium">
                  Gagal mengambil metadata model dari API.
                </div>
              )}
            </div>

            <button
              onClick={() => setIsAboutOpen(false)}
              className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Footer Disclaimer */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateWizard={handleNavigateWizard}
        onOpenAbout={handleOpenAbout}
      />
    </div>
  );
};
export default App;
