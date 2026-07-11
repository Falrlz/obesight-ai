import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);

  const revealRef1 = useRef<HTMLSpanElement>(null);
  const revealRef2 = useRef<HTMLSpanElement>(null);
  const revealRef3 = useRef<HTMLSpanElement>(null);

  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const titleGroup = titleGroupRef.current;

    if (!section || !pin || !titleGroup) return;

    const reveals = [revealRef1.current, revealRef2.current, revealRef3.current].filter(Boolean) as HTMLElement[];
    const cards = [cardRef1.current, cardRef2.current, cardRef3.current].filter(Boolean) as HTMLElement[];

    // 1. Text reveals
    const revealTween = gsap.fromTo(
      reveals,
      { yPercent: 70, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      }
    );

    // 2. Responsive ScrollTrigger
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout: pin and scrub
      mm.add('(min-width: 768px)', () => {
        gsap.set(cards, { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${2200 + window.innerHeight}`,
            scrub: 1,
            pin: pin,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const cardDuration = 2.2;

        tl.fromTo(
          titleGroup,
          {
            y: () => {
              return pin.clientHeight / 2 - (titleGroup.offsetTop + titleGroup.offsetHeight / 2);
            },
          },
          { y: 0, ease: 'none', duration: cardDuration - 0.2 },
          0
        );

        tl.fromTo(
          cards,
          {
            y: (_, target) => {
              const direction = target.getAttribute('data-from') === 'bottom' ? 1 : -1;
              return direction * (window.innerHeight * 1.15);
            },
          },
          { y: 0, ease: 'power3.out', duration: 1.5, stagger: 0.35 },
          0
        );

        // Overlap phase: empty tween to keep the bento container pinned as HowItWorks scrolls up
        tl.to({}, {
          duration: () => cardDuration * (window.innerHeight / 2200)
        });
      });

      // Mobile layout: simple stagger fade-in
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: pin,
              start: 'top 75%',
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      revealTween.kill();
    };
  }, []);

  // 3D tilt hover events using GSAP
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const tiltX = (0.5 - py) * 20; // Max tilt angle
    const tiltY = (px - 0.5) * 20;
    gsap.to(card, {
      rotateY: tiltY,
      rotateX: tiltX,
      duration: 0.4,
      ease: 'power3.out',
      transformPerspective: 800,
      transformOrigin: 'center',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
  };

  return (
    <section id="features" ref={sectionRef}>
      <div className="features-pin w-full" id="pin" ref={pinRef}>
        {/* Title Group */}
        <div className="title-group" id="titleGroup" ref={titleGroupRef}>
          <h2 className="!font-medium">
            <span className="reveal-text" ref={revealRef1}>Solusi Cerdas Untuk Anda</span>
          </h2>
        </div>

        {/* Bento Cards Grid */}
        <div className="cards-row">
          {/* Card 1: Lifestyle screening*/}
          <article
            className="feature-card-animated bg-pink cursor-pointer"
            data-from="top"
            ref={cardRef1}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <div style={{ transform: 'translateZ(30px)' }} className="flex-grow flex flex-col justify-start h-full">
              <div className="w-10 h-10 md:w-12 md:h-12 2xl:w-14 2xl:h-14 rounded-xl md:rounded-2xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 2xl:w-7 2xl:h-7 text-secondary">
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <path d="m9 14 2 2 4-4" />
                </svg>
              </div>
              <h3>Skrining Gaya Hidup</h3>
              <p>
                Kuesioner cepat 4 langkah yang ramah pengguna untuk memetakan kebiasaan harian Anda secara akurat.
              </p>
            </div>
          </article>

          {/* Card 2: AI prediction*/}
          <article
            className="feature-card-animated bg-blue cursor-pointer"
            data-from="bottom"
            ref={cardRef2}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <div style={{ transform: 'translateZ(30px)' }} className="flex-grow flex flex-col justify-start h-full">
              <div className="w-10 h-10 md:w-12 md:h-12 2xl:w-14 2xl:h-14 rounded-xl md:rounded-2xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 2xl:w-7 2xl:h-7 text-secondary">
                  <path d="m10.852 14.772-.383.923" />
                  <path d="m10.852 9.228-.383-.923" />
                  <path d="m13.148 14.772.382.924" />
                  <path d="m13.531 8.305-.383.923" />
                  <path d="m14.772 10.852.923-.383" />
                  <path d="m14.772 13.148.923.383" />
                  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771" />
                  <path d="M17.998 5.125a4 4 0 0 1 2.525 5.771" />
                  <path d="M19.505 10.294a4 4 0 0 1-1.5 7.706" />
                  <path d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516" />
                  <path d="M4.5 10.291A4 4 0 0 0 6 18" />
                  <path d="M6.002 5.125a3 3 0 0 0 .4 1.375" />
                  <path d="m9.228 10.852-.923-.383" />
                  <path d="m9.228 13.148-.923.383" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Prediksi Akurat AI</h3>
              <p>
                Menggunakan model klasifikasi LightGBM terlatih untuk mendeteksi tingkat risiko obesitas.
              </p>
            </div>
          </article>

          {/* Card 3: Personal action insights*/}
          <article
            className="feature-card-animated bg-green cursor-pointer"
            data-from="top"
            ref={cardRef3}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <div style={{ transform: 'translateZ(30px)' }} className="flex-grow flex flex-col justify-start h-full">
              <div className="w-10 h-10 md:w-12 md:h-12 2xl:w-14 2xl:h-14 rounded-xl md:rounded-2xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 2xl:w-7 2xl:h-7 text-secondary">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
                  <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z" />
                  <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
                </svg>
              </div>
              <h3>Insight Tindakan Personal</h3>
              <p>
                Menerima rekomendasi bilingual berbasis aturan klinis yang langsung menyasar poin kekurangan hidrasi atau nutrisi Anda.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
export default Features;
