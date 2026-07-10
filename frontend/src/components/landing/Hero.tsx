import React from 'react';

interface HeroProps {
  onStartAnalysis: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis }) => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 md:px-page-margin-desktop bg-gradient-to-b from-background to-surface-container-low/30 relative overflow-hidden">
      <div className="max-w-4xl z-10 px-4 flex flex-col items-center justify-center space-y-8 animate-fadeIn">

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-on-surface">
          Ketahui Risiko Obesitas Anda Secara Cerdas
        </h1>


        {/* Action Button */}
        <div className="pt-4 w-full sm:w-auto">
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto bg-secondary text-on-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-secondary/95 hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            Mulai Skrining
          </button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
