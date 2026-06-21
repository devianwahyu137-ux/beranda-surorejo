import Link from 'next/link';
import Image from 'next/image';
import { VILLAGE_NAME, VILLAGE_TAGLINE } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="relative min-h-[480px] md:min-h-[560px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-desa.png"
        alt="Pemandangan Desa Surorejo"
        fill
        className="object-cover"
        priority
        quality={80}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {VILLAGE_NAME}
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-8 font-light">
          {VILLAGE_TAGLINE}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/layanan"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 touch-target"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Layanan Desa
          </Link>
          <Link
            href="/umkm"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 touch-target"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Direktori UMKM
          </Link>
        </div>
      </div>
    </section>
  );
}
