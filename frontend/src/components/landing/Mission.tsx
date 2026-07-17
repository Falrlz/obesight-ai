import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Mission Component for the Landing Page.
 * Renders the core purpose of Obesight with a dynamic typewriter sequence.
 * 
 * Key Features:
 * - Scroll-triggered: Animation only starts when the component is at least 20% visible in the viewport.
 * - Faster character speed (20ms) for high readability of a longer sentence.
 * - Permanent cursor: The typewriter blinking cursor stays visible at the end of the text indefinitely.
 */
export const Mission: React.FC = () => {
  const { t } = useTranslation();
  const fullText = t('landing.mission.text');
  const [typedText, setTypedText] = useState("");
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect(); // Only trigger the typing animation once
      }
    }, { threshold: 0.2 }); // Trigger when 20% of the section is visible

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  // Reset typewriter animation if the language changes
  useEffect(() => {
    if (isInView) {
      setTypedText("");
    }
  }, [fullText, isInView]);

  useEffect(() => {
    if (isInView && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 20); // 20ms typing speed (slightly faster for longer text)
      return () => clearTimeout(timeout);
    }
  }, [isInView, typedText, fullText]);

  return (
    <section
      ref={containerRef}
      className="min-h-0 py-[12vh] md:min-h-screen md:py-0 w-full flex flex-col justify-center px-4 md:px-8 lg:px-page-margin-desktop bg-white"
    >
      <div className="w-full text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-[3.2vw] font-medium leading-relaxed max-w-4xl 2xl:max-w-[72vw] text-on-surface text-left tracking-tight min-h-[7.5em] md:min-h-[5.5em] lg:min-h-[5em]">
          {typedText}
          <span
            className="inline-block w-[3px] h-[0.85em] ml-1.5 bg-secondary typewriter-cursor"
            style={{ verticalAlign: 'baseline' }}
          />
        </h2>
      </div>
    </section>
  );
};

export default Mission;
