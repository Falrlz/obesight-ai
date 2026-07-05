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
            end: '+=2200',
            scrub: 1,
            pin: pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          titleGroup,
          {
            y: () => {
              return pin.clientHeight / 2 - (titleGroup.offsetTop + titleGroup.offsetHeight / 2);
            },
          },
          { y: 0, ease: 'none' },
          0
        );

        tl.fromTo(
          cards,
          {
            y: (index, target) => {
              const direction = target.getAttribute('data-from') === 'bottom' ? 1 : -1;
              return direction * (window.innerHeight * 1.15);
            },
          },
          { y: 0, ease: 'power3.out', duration: 1, stagger: 0.15 },
          0
        );
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
          <h2>
            <span className="reveal-text" ref={revealRef1}>Solusi Cerdas</span>
            <br />
            <span className="reveal-text" ref={revealRef2}>untuk Anda</span>
          </h2>
          <p>
            <span className="reveal-text" ref={revealRef3}>
              Sistem analisis kesehatan berbasis kecerdasan buatan untuk hasil yang komprehensif.
            </span>
          </p>
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
            <div style={{ transform: 'translateZ(30px)' }} className="flex-grow flex flex-col">
              <svg className="icon mb-4" viewBox="0 0 600 600" fill="none">
                <circle cx="300" cy="300" r="200" stroke="#fff" strokeOpacity="0.85" strokeWidth="14" />
                <polyline points="150,320 230,320 270,180 330,440 370,300 450,300" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
            <div style={{ transform: 'translateZ(30px)' }} className="flex-grow flex flex-col">
              <svg className="icon mb-4" viewBox="0 0 600 600" fill="none">
                <rect x="140" y="110" width="320" height="380" rx="24" stroke="#fff" strokeOpacity="0.85" strokeWidth="14" />
                <line x1="190" y1="200" x2="410" y2="200" stroke="#fff" strokeOpacity="0.7" strokeWidth="10" strokeLinecap="round" />
                <line x1="190" y1="270" x2="410" y2="270" stroke="#fff" strokeOpacity="0.7" strokeWidth="10" strokeLinecap="round" />
                <line x1="190" y1="340" x2="410" y2="340" stroke="#fff" strokeOpacity="0.7" strokeWidth="10" strokeLinecap="round" />
                <line x1="190" y1="410" x2="410" y2="410" stroke="#fff" strokeOpacity="0.7" strokeWidth="10" strokeLinecap="round" />
                <polygon points="430,120 480,170 360,290 310,240" fill="#fff" fillOpacity="0.9" />
              </svg>
              <h3>Prediksi Akurat AI</h3>
              <p>
                Menggunakan model klasifikasi LightGBM/XGBoost terlatih untuk mendeteksi tingkat risiko obesitas.
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
            <div style={{ transform: 'translateZ(30px)' }} className="flex-grow flex flex-col">
              <svg className="icon mb-4" viewBox="0 0 600 600" fill="none">
                <circle cx="300" cy="300" r="220" stroke="#fff" strokeOpacity="0.45" strokeWidth="12" />
                <circle cx="300" cy="300" r="170" stroke="#fff" strokeOpacity="0.6" strokeWidth="12" />
                <circle cx="300" cy="300" r="120" stroke="#fff" strokeOpacity="0.78" strokeWidth="12" />
                <circle cx="300" cy="300" r="70" stroke="#fff" strokeOpacity="1" strokeWidth="12" />
              </svg>
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
