import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ParticleField from './ParticleField';
import logo from '../../assets/obesight-icon.svg';

/**
 * Properties for the Hero component.
 */
interface HeroProps {
  /** Callback triggered when clicking the primary action button to start screening. */
  onStartAnalysis: () => void;
}

/**
 * Hero Component for the Landing Page.
 * Renders the initial introduction fold with a customized entrance sequence:
 * 1. Initial 3 cursor blink beats (waiting terminal animation) over 900ms.
 * 2. Typewriter animation writing the main title at 50ms intervals.
 * 3. Staggered fade-in & slide transitions for the brand badge, CTA button, and interactive particle field.
 */
export const Hero: React.FC<HeroProps> = ({ onStartAnalysis }) => {
  const { t } = useTranslation();
  const fullText = t('landing.hero.title');
  const [typedText, setTypedText] = useState("");
  const [blinkCount, setBlinkCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Reset typewriter animation if the language changes
  useEffect(() => {
    setTypedText("");
    setBlinkCount(0);
    setIsDone(false);
  }, [fullText]);

  useEffect(() => {
    if (blinkCount < 3) {
      const timeout = setTimeout(() => {
        setBlinkCount((prev) => prev + 1);
      }, 300); // 300ms per cursor blink tick (0.9s total delay)
      return () => clearTimeout(timeout);
    } else if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50); // 50ms typing speed
      return () => clearTimeout(timeout);
    } else {
      setIsDone(true);
    }
  }, [blinkCount, typedText, fullText]);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 md:px-page-margin-desktop bg-white relative overflow-hidden">
      {/* Background Particle Field - Only mount and fade in after typing finishes to maximize smoothness */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isDone ? 'opacity-100' : 'opacity-0'}`}>
        {isDone && <ParticleField />}
      </div>

      <div className="max-w-4xl z-10 px-4 flex flex-col items-center justify-center space-y-8">
        {/* Badge Logo & Nama Brand Sementara - Staggered fade in from top */}
        <div 
          className={`flex items-center gap-2.5 bg-surface-container-low/60 border border-outline-variant/30 px-5 py-2 rounded-full backdrop-blur-md shadow-sm hover:scale-105 transition-all duration-700 delay-200 transform cursor-pointer ${
            isDone ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          {/* Brand Icon */}
          <img src={logo} className="w-5 h-5 object-contain text-secondary" alt="" />
          
          {/* Teks Brand */}
          <span className="font-bold text-sm tracking-wider text-on-surface uppercase font-sans">
            OBESIGHT
          </span>
        </div>

        {/* Main Title - Typewriter style with cursor */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] text-on-surface min-h-[1.1em]">
          {typedText}
          {!isDone && (
            <span 
              className="inline-block w-[3px] h-[0.85em] ml-1.5 bg-secondary typewriter-cursor" 
              style={{ verticalAlign: 'baseline' }}
            />
          )}
        </h1>

        {/* Action Button - Staggered fade in from bottom */}
        <div 
          className={`w-auto transition-all duration-700 delay-400 transform ${
            isDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={onStartAnalysis}
            className="w-auto bg-secondary text-on-primary px-6 py-3 md:px-10 md:py-3 rounded-full font-medium text-base md:text-lg hover:bg-secondary/95 hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            {t('landing.hero.cta_start')}
          </button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
