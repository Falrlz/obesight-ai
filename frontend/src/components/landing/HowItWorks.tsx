import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  number: number;
  title: string;
  description: string;
  bgClass: string;
}

/**
 * HowItWorks Component.
 * Displays the 3-step walkthrough section of the landing page.
 *
 * Optimization Details:
 * 1. Scroll Parallax: Floating background blur circles are animated directly via DOM references 
 *    (`circle1Ref`, `circle2Ref`) inside the scroll listener rather than relying on React states. 
 *    This completely avoids high-frequency component re-renders at 60 FPS.
 * 2. Staggered Step Transitions: Grouped individual steps into a single parent-controlled 
 *    GSAP timeline with an offset delay of 0.45s to ensure clean, rhythmic, and consistent staggered animations.
 * 3. Directional Scroll: Enabled `toggleActions: 'play none none reverse'` so that 
 *    steps slide in when scrolling down, and reverse (hide) when scrolling back up.
 */
export const HowItWorks: React.FC = () => {
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (circle1Ref.current) {
        circle1Ref.current.style.transform = `translateY(${y * 0.1}px)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${y * -0.15}px)`;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // GSAP ScrollTrigger for step animations (using a single timeline for slow, staggered entry/exit)
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      stepRefs.current.forEach((stepEl, idx) => {
        if (!stepEl) return;

        // Step 1: left (x: -80)
        // Step 2: right (x: 80)
        // Step 3: left (x: -80)
        const fromLeft = idx % 2 === 0;
        const xOffset = fromLeft ? -80 : 80;

        tl.fromTo(
          stepEl,
          { x: xOffset, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          idx * 0.45 // 0.45s delay (stagger) between step transitions
        );
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
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
    <section id="how-it-works" className="min-h-0 py-[10vh] md:min-h-screen w-full flex flex-col justify-center md:pt-[34vh] md:pb-[24vh] px-4 md:px-page-margin-desktop relative z-30 overflow-hidden bg-black rounded-t-[28px] md:rounded-t-[44px]">
      <div className="max-w-container-max mx-auto relative z-10 w-full">
        <h2 className="text-3xl md:text-5xl font-normal mb-[6vh] md:mb-[10vh] text-center text-white tracking-tight">
          Mulai dengan 3 Langkah Mudah
        </h2>
        <div className="relative">
          <div ref={containerRef} className="space-y-[2vh] 2xl:space-y-[12vh] relative">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={idx}
                  ref={(el) => { if (el) stepRefs.current[idx] = el; }}
                  className="flex flex-col md:grid md:grid-cols-[1fr_48px_1fr] md:gap-x-16 items-center gap-4 md:gap-0"
                >
                  {/* Left Side (Desktop-only for odd steps) */}
                  <div className="hidden md:block">
                    {!isEven ? (
                      <div className="text-right">
                        <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
                        <p className="text-zinc-400 font-body-md leading-relaxed">{step.description}</p>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Circle Badge */}
                  <div className={`relative z-20 w-12 h-12 rounded-full ${step.bgClass} flex items-center justify-center font-bold text-xl shrink-0 shadow-lg mx-auto`}>
                    {step.number}
                  </div>

                  {/* Right Side (Desktop-only for even steps) */}
                  <div className="hidden md:block">
                    {isEven ? (
                      <div className="text-left">
                        <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
                        <p className="text-zinc-400 font-body-md leading-relaxed">{step.description}</p>
                      </div>
                    ) : (
                      <div />
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
        ref={circle1Ref}
        className="absolute top-1/4 -left-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none"
        style={{ transform: 'translateY(0px)', transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)' }}
      ></div>
      <div
        ref={circle2Ref}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-spectral-blue/5 rounded-full blur-3xl pointer-events-none"
        style={{ transform: 'translateY(0px)', transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)' }}
      ></div>
    </section>
  );
};

export default HowItWorks;
