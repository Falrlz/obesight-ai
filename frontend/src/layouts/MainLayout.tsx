import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateWizard = () => {
    navigate('/wizard');
  };

  const handleNavigateAbout = () => {
    navigate('/tentang');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md overflow-x-hidden antialiased selection:bg-secondary selection:text-on-primary print:bg-white print:text-black">
      {/* Styles to optimize print rendering */}
      <style>{`
        @media print {
          /* Hilangkan header, footer web, dan elemen tombol no-print */
          header, footer, .no-print {
            display: none !important;
          }
          
          /* Hilangkan margin/padding luar dari body */
          body {
            background-color: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Reset padding halaman web agar tidak menyisakan ruang kosong di atas kertas */
          .pt-28, .md\:pt-32, .pb-20 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          /* Paksa cetak semua warna & latar belakang */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Pengaturan kertas A4 */
          @page {
            size: A4 portrait;
            margin: 15mm;
          }

          /* Cegah bagian kartu terpotong di batas kertas (tapi biarkan antar section pecah alami) */
          .rounded-3xl, canvas {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>

      {/* Navigation */}
      <Navbar
        onNavigateHome={handleNavigateHome}
        onNavigateWizard={handleNavigateWizard}
        onNavigateAbout={handleNavigateAbout}
      />

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Disclaimer */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateWizard={handleNavigateWizard}
        onNavigateAbout={handleNavigateAbout}
      />
    </div>
  );
};

export default MainLayout;
