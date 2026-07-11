import { useEffect } from 'react';

/**
 * Custom React hook to trigger CSS animations when elements enter the viewport.
 * 
 * Optimization Details:
 * To prevent the IntersectionObserver from tearing down and recreating itself 
 * on every single page render (caused by React array literal reference inequality 
 * like `['opacity-0']` in parent dependencies), `initialClasses` and `visibleClasses` 
 * are serialized into strings (`.join(',')`) for the `useEffect` dependency checks.
 */
export const useIntersectionObserver = (
  selector: string,
  initialClasses: string[],
  visibleClasses: string[],
  trigger?: any
) => {
  const initialClassesKey = initialClasses.join(',');
  const visibleClassesKey = visibleClasses.join(',');

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleClasses.forEach((cls) => entry.target.classList.add(cls));
          initialClasses.forEach((cls) => entry.target.classList.remove(cls));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      // Add initial hidden states
      initialClasses.forEach((cls) => el.classList.add(cls));
      el.classList.add('transition-all', 'duration-1000');
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [selector, initialClassesKey, visibleClassesKey, trigger]);
};

