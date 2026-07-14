import React from 'react';

interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateWizard?: () => void;
  onNavigateAbout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateWizard,
  onNavigateAbout,
}) => {
  return (
    <footer className="w-full flex flex-col justify-between bg-black pt-24 -mt-px relative z-30 print:hidden">
      <div className="max-w-none px-4 md:px-page-margin-desktop lg:px-[6vw] w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & Info */}
          <div className="flex flex-col gap-6 items-center md:items-start">
            <h5 className="font-headline-lg text-3xl font-bold text-white">OBESIGHT</h5>
            <p className="font-body-md text-zinc-400 max-w-xs text-center md:text-left leading-relaxed">
              Solusi cerdas berbasis AI untuk memantau dan mengelola risiko obesitas Anda secara personal.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left">
            <h5 className="font-headline-lg text-3xl font-bold text-white mb-6">NAVIGASI</h5>
            <ul className="space-y-4 font-normal">
              <li>
                <button
                  onClick={onNavigateHome}
                  className="font-body-md text-zinc-400 hover:text-secondary leading-relaxed transition-colors cursor-pointer"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateWizard}
                  className="font-body-md text-zinc-400 hover:text-secondary leading-relaxed transition-colors cursor-pointer"
                >
                  Skrining
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateAbout}
                  className="font-body-md text-zinc-400 hover:text-secondary leading-relaxed transition-colors cursor-pointer"
                >
                  Tentang
                </button>
              </li>
            </ul>
          </div>

          {/* Medical Disclaimer */}
          <div className="text-center md:text-left md:col-span-2">
            <h5 className="font-headline-lg text-3xl font-bold text-white mb-6 text-center md:text-left">
              MEDICAL DISCLAIMER
            </h5>
            <p className="font-body-md text-zinc-400 leading-relaxed text-left md:text-justify">
              Hasil analisis, indeks massa tubuh (BMI), kategori risiko, serta rekomendasi kesehatan yang dihasilkan oleh OBESIGHT bersifat edukatif dan merupakan hasil skrining awal berbasis data perilaku serta statistik model pembelajaran mesin. Layanan ini bukan pengganti saran medis. Jangan mengabaikan atau menunda mendapatkan saran medis hanya karena membaca informasi dari aplikasi ini.
            </p>
          </div>
        </div>
      </div>

      {/* Gigantic Brand Name */}
      <div className="mt-auto overflow-hidden pointer-events-none select-none w-full relative h-[10.5vw] md:h-[14vw] xl:h-[180px]">
        <h2 className="absolute top-0 left-0 w-full text-[15vw] md:text-[20vw] xl:text-[256px] font-bold text-secondary/15 leading-none text-center uppercase tracking-tighter">
          OBESIGHT
        </h2>
      </div>
    </footer>
  );
};
export default Footer;
