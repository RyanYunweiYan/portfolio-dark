import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * Used for header transparency/solid state transitions
 */
export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
          setScrollDirection('down');
        } else if (currentScrollY < lastScrollY) {
          setScrollDirection('up');
        }
        setScrollY(currentScrollY);
        setIsScrolled(currentScrollY > 50);
        lastScrollY = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { scrollY, scrollDirection, isScrolled };
};
