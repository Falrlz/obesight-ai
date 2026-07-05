import React from 'react';

interface HeroProps {
  onStartAnalysis: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis }) => {
  return (
    <section className="pt-40 pb-section-gap flex flex-col items-center text-center px-page-margin-mobile">
      <div className="max-w-4xl">
        <h1 className="font-display-xl text-display-xl mb-12 tracking-tight leading-tight text-on-surface">
          Ketahui Risiko Obesitas Anda Secara Cerdas
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto bg-secondary text-on-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-secondary/90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
          >
            Mulai Skrining
          </button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
