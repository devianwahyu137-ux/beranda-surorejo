import ScrollReveal from './ScrollReveal';

export default function WelcomeSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Photo placeholder */}
          <ScrollReveal direction="left" className="flex-shrink-0">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <svg className="w-20 h-20 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary-500/10 rounded-full blur-xl" />
            </div>
            {/* Decorative border element */}
            <div className="hidden md:block absolute -z-10 w-full h-full border-2 border-primary-200 rounded-2xl top-3 left-3" />
          </ScrollReveal>

          {/* Text content */}
          <ScrollReveal direction="right" className="flex-1 text-center md:text-left">
            <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-4">
              Sambutan Kepala Desa
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
              Selamat Datang di Desa Surorejo
            </h2>
            <blockquote className="text-neutral-600 leading-relaxed mb-4 text-base sm:text-lg">
              &ldquo;Kami berkomitmen untuk membangun desa yang transparan, mandiri, dan berdaya saing.
              Website ini hadir sebagai jembatan komunikasi antara pemerintah desa dan seluruh warga
              Desa Surorejo. Mari bersama-sama kita wujudkan desa yang lebih maju dan sejahtera.&rdquo;
            </blockquote>
            <div className="mt-4">
              <p className="font-semibold text-neutral-900">Nama Kepala Desa</p>
              <p className="text-sm text-neutral-500">Kepala Desa Surorejo</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
