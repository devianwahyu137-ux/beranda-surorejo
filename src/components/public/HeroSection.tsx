import Link from 'next/link';
import Image from 'next/image';
import { VILLAGE_NAME } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with subtle zoom */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-desa.png"
          alt="Pemandangan Desa Surorejo"
          fill
          className="object-cover scale-105"
          priority
          quality={80}
        />
      </div>

      {/* Gradient Overlay — deeper for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Decorative overlay pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-16 max-w-3xl mx-auto">
        {/* Small badge */}
        <div className="animate-hero-title">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-sm text-white/90 text-xs font-medium rounded-full border border-white/20 mb-6">
            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-soft-pulse" />
            Sistem Informasi Desa
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight animate-hero-title">
          {VILLAGE_NAME}
        </h1>
        <p className="text-lg sm:text-xl text-white/85 mb-10 font-light max-w-lg mx-auto animate-hero-subtitle">
          Membangun desa dan meningkatkan kesejahteraan masyarakat
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-hero-cta">
          <Link
            href="/layanan"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 touch-target"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Layanan Desa
          </Link>
          <Link
            href="/umkm"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl backdrop-blur-sm border border-white/25 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 touch-target"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Direktori UMKM
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-float">
        <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
