import React from 'react';

export const Mission: React.FC = () => {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center px-4 md:px-8 lg:px-page-margin-desktop bg-surface-container-low/20">
      <div className="max-w-container-max mx-auto w-full text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-relaxed max-w-4xl text-on-surface text-left tracking-tight">
          ObeSight mengevaluasi profil fisik, perilaku makan, hidrasi, dan kebiasaan harian Anda melalui 17
          faktor utama untuk menghitung BMI secara akurat dan menyusun rencana tindakan gaya hidup yang
          dipersonalisasi.
        </h2>
      </div>
    </section>
  );
};

export default Mission;
