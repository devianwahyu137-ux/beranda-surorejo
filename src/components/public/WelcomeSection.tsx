import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

export default function WelcomeSection() {
  return (
    <section className="py-20 md:py-24 bg-white section-wave relative z-20">
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Photo Kepala Desa */}
          <ScrollReveal direction="left" className="flex-shrink-0">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/images/foto kepala desa surorejo.webp"
                alt="Margino - Kepala Desa Surorejo"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                priority
              />
              {/* Decorative accent */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary-500/10 rounded-full blur-xl" />
            </div>
            {/* Decorative border element */}
            <div className="hidden md:block absolute -z-10 w-full h-full border-2 border-primary-200 rounded-2xl top-3 left-3 group-hover:top-4 group-hover:left-4 transition-all duration-500" />
          </ScrollReveal>

          {/* Text content */}
          <ScrollReveal direction="right" className="flex-1 text-center md:text-left">
            <span className="inline-block text-sm font-semibold text-primary-700 bg-primary-50 px-3.5 py-1 rounded-full mb-4 border border-primary-100 shadow-sm">
              Sambutan Kepala Desa
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 mb-4 tracking-tight">
              Selamat Datang di Desa Surorejo
            </h2>
            <blockquote className="text-neutral-600 leading-relaxed mb-6 text-base sm:text-lg font-normal">
              &ldquo;Kami berkomitmen untuk membangun desa yang transparan, mandiri, dan berdaya saing.
              Website ini hadir sebagai jembatan komunikasi antara pemerintah desa dan seluruh warga
              Desa Surorejo. Mari bersama-sama kita wujudkan desa yang lebih maju dan sejahtera.&rdquo;
            </blockquote>
            <div className="mt-4 border-l-4 border-primary-500 pl-4 py-1 text-left inline-block md:block">
              <p className="font-bold text-neutral-900 text-lg">Margino</p>
              <p className="text-sm font-medium text-primary-600">Kepala Desa Surorejo</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
