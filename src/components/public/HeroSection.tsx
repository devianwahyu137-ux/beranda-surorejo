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

      {/* Ambient Floating Light Glows - Pure CSS, Lightweight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[300px] bg-primary-500/25 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-[280px] sm:w-[380px] h-[280px] bg-accent-400/15 blur-[100px] rounded-full pointer-events-none animate-pulse delay-1000" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 py-24 sm:py-28 max-w-4xl mx-auto mt-6">
        {/* Glowing Badge */}
        <div className="animate-hero-title inline-block">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-md text-white/95 text-xs sm:text-sm font-semibold rounded-full border border-white/25 mb-6 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:bg-white/20 transition-all duration-300">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-ping mr-[-4px]" />
            <span className="w-2 h-2 bg-primary-400 rounded-full" />
            Sistem Informasi Desa & Portal UMKM
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 leading-[1.15] animate-hero-title tracking-tight drop-shadow-sm">
          {VILLAGE_NAME}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 font-light max-w-2xl mx-auto animate-hero-subtitle leading-relaxed text-balance">
          Membangun desa yang <span className="font-semibold text-primary-300">transparan</span>, <span className="font-semibold text-accent-300">mandiri</span>, dan meningkatkan kesejahteraan masyarakat.
        </p>

        {/* Action Buttons with Glow micro-interactions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center animate-hero-cta max-w-md mx-auto sm:max-w-none">
          <Link
            href="/layanan"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-[0_4px_25px_rgba(22,163,74,0.45)] hover:shadow-[0_6px_35px_rgba(22,163,74,0.65)] transition-all duration-300 transform hover:-translate-y-1 touch-target border border-primary-400/40 overflow-hidden"
          >
            {/* Subtle background glow hover effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            <svg
              className="w-5 h-5 mr-2.5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Layanan Desa
          </Link>

          <Link
            href="/umkm"
            className="group inline-flex items-center justify-center px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl backdrop-blur-md border border-white/30 hover:border-white/60 shadow-lg hover:shadow-[0_4px_25px_rgba(255,255,255,0.2)] transition-all duration-300 transform hover:-translate-y-1 touch-target"
          >
            <svg
              className="w-5 h-5 mr-2.5 text-accent-400 group-hover:scale-125 transition-transform duration-300"
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
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1 backdrop-blur-sm">
          <div className="w-1.5 h-2.5 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
