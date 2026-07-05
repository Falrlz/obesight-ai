import { useEffect } from 'react';

export const useIntersectionObserver = (
  selector: string,
  initialClasses: string[],
  visibleClasses: string[],
  trigger?: any
) => {
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
  }, [selector, initialClasses, visibleClasses, trigger]);
};

