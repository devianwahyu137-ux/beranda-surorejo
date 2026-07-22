'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number; // 0-6, maps to reveal-delay-N class
  threshold?: number;
  className?: string;
  as?: 'div' | 'section' | 'article';
}

// Singleton observer to improve performance
let sharedObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, () => void>();

function getObserver(threshold: number) {
  if (typeof window === 'undefined') return null;
  
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('revealed');
            const callback = observerCallbacks.get(el);
            if (callback) callback();
            sharedObserver?.unobserve(el);
            observerCallbacks.delete(el);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
  }
  return sharedObserver;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.15,
  className = '',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if reduced motion is preferred
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('revealed');
      return;
    }

    const observer = getObserver(threshold);
    if (observer) {
      observerCallbacks.set(el, () => {}); 
      observer.observe(el);
      return () => {
        observer.unobserve(el);
        observerCallbacks.delete(el);
      };
    }
  }, [threshold]);

  const directionClass = direction === 'up'
    ? ''
    : direction === 'left'
    ? 'reveal-left'
    : direction === 'right'
    ? 'reveal-right'
    : 'reveal-scale';

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : '';

  return (
    <Tag
      ref={ref}
      className={`reveal ${directionClass} ${delayClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
