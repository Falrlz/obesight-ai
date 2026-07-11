import React, { useEffect, useState } from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
  bgClass: string;
}

export const HowItWorks: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps: Step[] = [
    {
      number: 1,
      title: 'Isi Kuesioner',
      description: '1 menit untuk menjawab pertanyaan dasar mengenai gaya hidup dan profil fisik Anda.',
      bgClass: 'bg-secondary text-on-primary',
    },
    {
      number: 2,
      title: 'Analisis AI',
      description: 'Kami memproses data Anda secara instan menggunakan model machine learning.',
      bgClass: 'bg-secondary text-on-primary',
    },
    {
      number: 3,
      title: 'Terima Hasil',
      description: 'Dapatkan laporan risiko yang komprehensif dan saran tindakan yang dipersonalisasi segera.',
      bgClass: 'bg-secondary text-on-primary',
    },
  ];

  return (
    <section id="how-it-works" className="min-h-screen w-full flex flex-col justify-center pt-[12vh] pb-[12vh] md:pt-[34vh] md:pb-[24vh] px-4 md:px-page-margin-desktop relative z-30 overflow-hidden bg-black rounded-t-[28px] md:rounded-t-[44px]">
      <div className="max-w-container-max mx-auto relative z-10 w-full">
        <h2 className="text-3xl md:text-5xl font-normal mb-[6vh] md:mb-[10vh] text-center text-white tracking-tight">
          Mulai dengan 3 Langkah Mudah
        </h2>
        <div className="relative">
          <div className="space-y-[4vh] relative">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
                  {/* Left Side (Desktop-only for odd) */}
                  <div className={`hidden md:block md:flex-1 ${isEven ? '' : 'md:pr-20 text-right'}`}>
                    {!isEven && (
                      <>
                        <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
                        <p className="text-zinc-400 font-body-md leading-relaxed">{step.description}</p>
                      </>
                    )}
                  </div>

                  {/* Circle Badge */}
                  <div className={`relative z-20 w-12 h-12 rounded-full ${step.bgClass} flex items-center justify-center font-bold text-xl shrink-0 shadow-lg`}>
                    {step.number}
                  </div>

                  {/* Right Side (Desktop-only for even) */}
                  <div className={`hidden md:block md:flex-1 ${isEven ? 'md:pl-20 text-left' : ''}`}>
                    {isEven && (
                      <>
                        <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
                        <p className="text-zinc-400 font-body-md leading-relaxed">{step.description}</p>
                      </>
                    )}
                  </div>

                  {/* Mobile-only Content (hidden on desktop) */}
                  <div className="block md:hidden text-center px-4 space-y-1">
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mx-auto">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Floating Decorative Elements (Parallax) */}
      <div
        className="absolute top-1/4 -left-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      ></div>
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-spectral-blue/5 rounded-full blur-3xl pointer-events-none"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      ></div>
    </section>
  );
};

export default HowItWorks;
