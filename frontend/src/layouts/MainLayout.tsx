import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { getModelInfo } from '../services/api';
import type { ModelInfoResponse } from '../services/api';

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateWizard = () => {
    navigate('/wizard');
  };

  const isWizardActive = location.pathname === '/wizard';

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
        isWizardActive={isWizardActive}
      />

      <main className="flex-grow">
        <Outlet />
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

export default MainLayout;
