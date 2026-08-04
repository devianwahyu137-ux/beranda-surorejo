'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VILLAGE_NAME } from '@/lib/constants';

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  // GPU-accelerated parallax via requestAnimationFrame (Zero React re-renders for 60FPS performance!)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (bgRef.current && window.scrollY <= 900) {
            const scrollY = window.scrollY;
            // translate3d forces GPU acceleration without CPU lag
            bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.35}px, 0) scale(${1.05 + scrollY * 0.0003})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[580px] md:min-h-[660px] flex items-center justify-center overflow-hidden -mt-16 sm:-mt-20">
      {/* Background Image with High-Performance GPU Parallax */}
      <div 
        ref={bgRef}
        className="absolute inset-0 transition-transform duration-75 ease-out will-change-transform scale-105"
      >
        <Image
          src="/images/hero-desa.png"
          alt="Pemandangan Desa Surorejo"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
      </div>

      {/* Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-neutral-950/90" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-950/60 via-transparent to-black/50 opacity-80" />

      {/* Decorative overlay mesh pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient Floating Light Glows - Static High Performance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[300px] bg-primary-500/25 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-[280px] sm:w-[380px] h-[280px] bg-accent-400/15 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 py-16 sm:py-28 max-w-4xl mx-auto mt-2 sm:mt-6">
        {/* Glowing Badge */}
        <div className="animate-hero-title inline-block">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 bg-white/20 text-white text-[11px] sm:text-sm font-semibold rounded-full border border-white/30 mb-4 sm:mb-6 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:bg-white/25 transition-colors duration-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-400" />
            </span>
            Sistem Informasi Desa & Portal UMKM
          </span>
        </div>

        <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold text-white mb-3 sm:mb-6 leading-[1.15] animate-hero-title tracking-tight drop-shadow-sm">
          {VILLAGE_NAME}
        </h1>

        <p className="text-sm sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 font-normal sm:font-light max-w-2xl mx-auto animate-hero-subtitle leading-relaxed text-balance">
          Membangun desa yang <span className="font-semibold text-primary-300">transparan</span>, <span className="font-semibold text-accent-300">mandiri</span>, dan meningkatkan kesejahteraan masyarakat.
        </p>

        {/* Action Buttons with Glow micro-interactions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 animate-hero-cta max-w-xs sm:max-w-none mx-auto">
          <Link
            href="/layanan"
            className="group w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-extrabold rounded-xl shadow-[0_8px_30px_rgba(34,197,94,0.35)] transition-[transform,box-shadow,background-color] duration-200 transform-gpu hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 text-sm sm:text-lg border border-primary-400/30 touch-target"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-200 group-hover:rotate-12 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Layanan Desa
          </Link>

          <Link
            href="/umkm"
            className="group w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl border border-white/30 shadow-lg hover:shadow-[0_4px_25px_rgba(255,255,255,0.2)] transition-[transform,box-shadow,background-color] duration-200 transform-gpu hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 text-sm sm:text-lg touch-target"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-accent-400 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Direktori UMKM
          </Link>
        </div>
      </div>

      {/* Animated Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[11px] font-medium tracking-widest text-white/70 uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
