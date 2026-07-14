import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { predictObesity } from '../services/api';
import StepIndicator from '../components/wizard/StepIndicator';
import Step1Basic from '../components/wizard/Step1Basic';
import Step2Diet from '../components/wizard/Step2Diet';
import Step3Activity from '../components/wizard/Step3Activity';
import Step4Habits from '../components/wizard/Step4Habits';
import { StepVisualizer } from '../components/wizard/StepVisualizer';

const LOADING_STEPS = [
  'Membangun koneksi ke ObeSight API...',
  'Menghitung Indeks Massa Tubuh (BMI)...',
  'Mengevaluasi variabel genetik & antropometri...',
  'Mengeksekusi model kecerdasan buatan (LightGBM/XGBoost)...',
  'Menyusun rekomendasi kesehatan personal bilingual...',
];

const STEP_METADATA = [
  {
    title: 'Data Dasar & Fisik',
    desc: 'Masukkan informasi profil dasar dan ukuran antropometri tubuh Anda.'
  },
  {
    title: 'Pola Makan & Genetik',
    desc: 'Pertanyaan mengenai riwayat keluarga dan perilaku konsumsi makanan harian Anda.'
  },
  {
    title: 'Kebiasaan Hidrasi & Aktivitas',
    desc: 'Pertanyaan mengenai tingkat olahraga, hidrasi harian, serta kepedulian kalori Anda.'
  },
  {
    title: 'Gaya Hidup Harian',
    desc: 'Langkah akhir mengenai screen-time harian, konsumsi alkohol, dan transportasi Anda.'
  }
];

export const WizardPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadingTextIdx, setLoadingTextIdx] = useState(0);

  const {
    formData,
    activeStep,
    setActiveStep,
    nextStep,
    prevStep,
    resetForm,
    loading,
    setLoading,
    error,
    setError,
    setResult,
  } = useFormContext();

  // 1. Sync URL query step to Context activeStep
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const stepIndex = parseInt(stepParam, 10) - 1;
      if (stepIndex >= 0 && stepIndex <= 3 && stepIndex !== activeStep) {
        setActiveStep(stepIndex);
      }
    } else {
      // Default to step 1 in URL if not present
      setSearchParams({ step: '1' }, { replace: true });
    }
  }, [searchParams, setActiveStep]); // Prevent infinite cycles by excluding activeStep from dependencies

  const handleNext = () => {
    if (activeStep < 3) {
      setSearchParams({ step: (activeStep + 2).toString() });
      nextStep();
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setSearchParams({ step: activeStep.toString() });
      prevStep();
    }
  };

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
    navigate('/wizard');
  };

  const handleNavigateHome = () => {
    resetForm();
    navigate('/');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await predictObesity(formData);
      setResult(response);
      navigate('/result');
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
    <div className="relative flex flex-col items-center justify-start pt-28 pb-16 md:pt-32 w-full min-h-[calc(100vh-200px)] overflow-hidden bg-background">

      {/* 1. LOADING SCREEN - Medical AI Scanner */}
      {loading && (
        <div className="max-w-md w-full text-center p-8 rounded-3xl glass-panel border border-outline-variant/40 shadow-2xl relative overflow-hidden z-10 flex flex-col items-center justify-center space-y-6 my-auto">
          {/* Moving Laser Scanner Line */}
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent scanner-line pointer-events-none shadow-[0_0_8px_rgba(6,95,70,0.8)]" />

          <div className="relative">
            {/* Spinning emerald circle with background glow */}
            <div className="w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin relative" />
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-secondary/5 animate-ping -z-10" />
          </div>

          <div className="space-y-3 z-10">
            <h3 className="text-xl font-bold tracking-tight text-on-surface">Menganalisis Profil Kesehatan</h3>
            <p className="text-sm text-text-secondary min-h-[48px] px-4 font-medium leading-relaxed transition-all duration-300">
              {LOADING_STEPS[loadingTextIdx]}
            </p>
          </div>
        </div>
      )}

      {/* 2. ERROR SCREEN */}
      {!loading && error && (
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-rose-100 shadow-xl text-center space-y-6 z-10 my-auto">
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
              className="px-5 py-2.5 rounded-full text-sm font-semibold border border-outline-variant text-text-secondary hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
            >
              Kembali
            </button>
            <button
              onClick={activeStep === 3 ? handleSubmit : handleStartAnalysis}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-secondary hover:bg-secondary/95 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* 3. WIZARD FORM */}
      {!loading && !error && (
        <div className="max-w-container-max 2xl:max-w-[1600px] w-full z-10 flex flex-col gap-8 px-4 md:px-8 lg:px-[80px] 2xl:px-0">
          {/* Header Layout: Outside the grid, spanning full width */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 w-full">
            <div className="max-w-2xl space-y-1.5">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-on-surface transition-all duration-300">
                {STEP_METADATA[activeStep].title}
              </h1>
              <p className="text-base text-text-secondary font-medium leading-relaxed transition-all duration-300">
                {STEP_METADATA[activeStep].desc}
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto flex justify-start md:justify-end">
              <StepIndicator currentStep={activeStep} />
            </div>
          </div>

          {/* 70:30 Grid Layout for screening form and illustrations */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-stretch w-full">
            {/* Left Card Container (70%): Inputs and Navigation */}
            <div className="lg:col-span-7 flex flex-col w-full">
              <div className="flex-1 py-4 w-full flex flex-col justify-between gap-8 h-full">
                {/* Active Step Panel */}
                <div className="min-h-[280px]">
                  {renderWizardStep()}
                </div>

                {/* Footer Navigation */}
                <div className="pt-6 border-t border-outline-variant/40 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={activeStep === 0}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer ${activeStep === 0
                      ? 'border-outline-variant/30 text-outline cursor-not-allowed opacity-40'
                      : 'border-outline-variant text-text-secondary hover:bg-surface-container-low/50'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Sebelumnya
                  </button>

                  {activeStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={activeStep === 0 && !isStep1Valid}
                      className={`px-6 py-2.5 rounded-full text-sm font-bold text-white bg-secondary hover:bg-secondary/95 active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${activeStep === 0 && !isStep1Valid ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                      Lanjut
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-secondary to-teal-700 hover:from-secondary/95 hover:to-teal-800 active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      Analisis Sekarang
                      <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Card Container (30%): Dynamic Animated Illustrations (Desktop only) */}
            <div className="lg:col-span-3 hidden lg:flex flex-col w-full h-full">
              <StepVisualizer activeStep={activeStep} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WizardPage;
