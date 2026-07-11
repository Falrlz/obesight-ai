import React from 'react';

export const Mission: React.FC = () => {
  return (
    <section className="min-h-0 py-[12vh] md:min-h-screen md:py-0 w-full flex flex-col justify-center px-4 md:px-8 lg:px-page-margin-desktop bg-white">
      <div className="w-full text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-[3.2vw] font-medium leading-relaxed max-w-4xl 2xl:max-w-[72vw] text-on-surface text-left tracking-tight">
          Obesight mengevaluasi profil fisik, perilaku makan, hidrasi, dan kebiasaan harian Anda melalui 17
          faktor utama untuk menghitung BMI secara akurat dan menyusun rencana tindakan gaya hidup yang
          dipersonalisasi.
        </h2>
      </div>
    </section>
  );
};

export default Mission;
