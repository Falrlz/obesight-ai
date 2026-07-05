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
      bgClass: 'bg-primary text-on-primary',
    },
    {
      number: 2,
      title: 'Analisis AI',
      description: 'Sistem kami memproses data Anda secara instan menggunakan model machine learning tercanggih.',
      bgClass: 'bg-secondary text-on-primary',
    },
    {
      number: 3,
      title: 'Terima Hasil',
      description: 'Dapatkan laporan risiko yang komprehensif dan saran tindakan yang dipersonalisasi segera.',
      bgClass: 'bg-spectral-green text-on-primary',
    },
  ];

  return (
    <section className="py-section-gap px-page-margin-desktop relative overflow-hidden">
      <div className="max-w-container-max mx-auto relative z-10">
        <h2 className="font-headline-lg text-headline-lg font-bold mb-20 text-center text-on-surface">
          Mulai dengan 3 Langkah Mudah
        </h2>
        <div className="relative">
          {/* Vertical Path Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-outline-variant/30 -translate-x-1/2 hidden md:block"></div>
          <div className="space-y-24 relative">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
                  {/* Left Side */}
                  <div className={`md:w-1/2 ${isEven ? '' : 'md:pr-20 text-center md:text-right'}`}>
                    {!isEven && (
                      <>
                        <h3 className="font-headline-md text-2xl font-bold mb-2 text-on-surface">{step.title}</h3>
                        <p className="text-on-surface-variant font-body-md leading-relaxed">{step.description}</p>
                      </>
                    )}
                  </div>
                  {/* Circle Badge */}
                  <div className={`relative z-20 w-12 h-12 rounded-full ${step.bgClass} flex items-center justify-center font-bold text-xl shrink-0 shadow-lg`}>
                    {step.number}
                  </div>
                  {/* Right Side */}
                  <div className={`md:w-1/2 ${isEven ? 'md:pl-20 text-center md:text-left' : ''}`}>
                    {isEven && (
                      <>
                        <h3 className="font-headline-md text-2xl font-bold mb-2 text-on-surface">{step.title}</h3>
                        <p className="text-on-surface-variant font-body-md leading-relaxed">{step.description}</p>
                      </>
                    )}
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
