import React from 'react';

interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateWizard?: () => void;
  onOpenAbout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateWizard,
  onOpenAbout,
}) => {
  return (
    <footer className="w-full flex flex-col justify-between bg-surface-container-lowest pt-24 pb-12 border-t border-outline-variant/30 print:hidden">
      <div className="max-w-container-max mx-auto px-4 md:px-page-margin-desktop w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & Info */}
          <div className="flex flex-col gap-6 items-center md:items-start">
            <div className="flex items-center gap-2">
              <span className="font-headline-lg text-3xl font-bold text-primary">OBESIGHT</span>
            </div>
            <p className="font-body-md text-on-surface-variant max-w-xs text-center md:text-left leading-relaxed">
              Solusi cerdas berbasis AI untuk memantau dan mengelola risiko obesitas Anda secara personal.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left">
            <h5 className="font-bold mb-6 text-on-surface">Navigasi</h5>
            <ul className="space-y-4 font-medium">
              <li>
                <button
                  onClick={onNavigateHome}
                  className="text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateWizard}
                  className="text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
                >
                  Skrining Mandiri
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
                >
                  Tentang AI
                </button>
              </li>
            </ul>
          </div>

          {/* Medical Disclaimer */}
          <div className="text-center md:text-left md:col-span-2">
            <h5 className="font-bold mb-6 text-600 flex items-center justify-center md:justify-start gap-1">
              PENAFIAN MEDIS (MEDICAL DISCLAIMER)
            </h5>
            <p className="text-xs text-on-surface-variant leading-relaxed text-justify">
              Hasil analisis, indeks massa tubuh (BMI), kategori risiko, serta rekomendasi kesehatan yang dihasilkan oleh ObeSight bersifat edukatif dan merupakan hasil skrining awal berbasis data perilaku serta statistik model pembelajaran mesin. <strong>Layanan ini bukan pengganti saran medis profesional, diagnosis, konsultasi pribadi, atau perawatan oleh dokter, ahli gizi, atau tenaga kesehatan tersertifikasi lainnya.</strong> Jangan mengabaikan atau menunda mendapatkan saran medis profesional hanya karena membaca informasi dari aplikasi ini.
            </p>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-outline-variant/20">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-on-surface-variant font-body-sm text-center md:text-left">
            <span>© {new Date().getFullYear()} Obesight.</span>
          </div>
        </div>
      </div>

      {/* Gigantic Brand Name */}
      <div className="mt-auto overflow-hidden pointer-events-none select-none w-full">
        <h2 className="text-[15vw] md:text-[20vw] font-bold text-on-surface/5 leading-none -mb-4 md:-mb-10 text-center uppercase tracking-tighter">
          OBESIGHT
        </h2>
      </div>
    </footer>
  );
};
export default Footer;
