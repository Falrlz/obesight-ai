import React from 'react';

interface HeroProps {
  onStartAnalysis: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis }) => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 md:px-page-margin-desktop bg-gradient-to-b from-background to-surface-container-low/30 relative overflow-hidden">
      <div className="max-w-4xl z-10 px-4 flex flex-col items-center justify-center space-y-8 animate-fadeIn">

        {/* Badge Logo & Nama Brand Sementara */}
        <div className="flex items-center gap-2.5 bg-surface-container-low/60 border border-outline-variant/30 px-5 py-2 rounded-full backdrop-blur-md shadow-sm hover:scale-105 transition-all cursor-pointer">
          {/* Ikon SVG Detak Jantung Medis */}
          <svg className="w-5 h-5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          
          {/* Teks Brand */}
          <span className="font-bold text-sm tracking-wider text-on-surface uppercase font-sans">
            OBESIGHT
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] text-on-surface">
          Ketahui risiko obesitas anda secara cerdas
        </h1>


        {/* Action Button */}
        <div className="w-auto">
          <button
            onClick={onStartAnalysis}
            className="w-auto bg-secondary text-on-primary px-6 py-3 md:px-10 md:py-3 rounded-full font-medium text-base md:text-lg hover:bg-secondary/95 hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            Mulai Skrining
          </button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
