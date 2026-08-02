import ScrollReveal from './ScrollReveal';
import CounterAnimation from './CounterAnimation';
import { createClient } from '@/lib/supabase/server';
import { STAT_ICONS } from '@/lib/constants';

export default async function StatsSection() {
  const supabase = await createClient();
  const { data: stats } = await supabase
    .from('demographic_stat')
    .select('*')
    .order('sort_order', { ascending: true });

  // Fallback to default if empty or error
  const defaultStats = [
    { id: '1', label: 'Penduduk', value: '1.218', icon: 'users' },
    { id: '2', label: 'Kepala Keluarga', value: '361 KK', icon: 'home' },
    { id: '3', label: 'Luas Wilayah', value: '186,772 Ha', icon: 'map' },
    { id: '4', label: 'Rukun Tetangga', value: '6 RT', icon: 'building' }
  ];

  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 relative overflow-hidden z-10">
      {/* Top SVG Wave Transition from White WelcomeSection */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-8 sm:h-12 text-white fill-current">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,-20 1200,40 L1200,0 L0,0 Z" />
        </svg>
      </div>

      {/* Decorative background ambient glows */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary-400 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-accent-400 rounded-full blur-3xl" />
      </div>

      <div className="container-page relative z-20 my-2">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block text-xs uppercase tracking-wider font-bold text-primary-200 bg-primary-800/80 px-3.5 py-1.5 rounded-full mb-3 border border-primary-600/50 shadow-sm">
            Data Desa Surorejo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Desa Surorejo dalam Angka
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayStats.map((stat, idx) => {
            const numMatch = stat.value.replace(/\./g, '').match(/(\d+)/);
            const numValue = numMatch ? parseInt(numMatch[1], 10) : 0;
            const suffixValue = numMatch ? stat.value.replace(/\./g, '').replace(numMatch[1], '').trim() : stat.value;
            const finalSuffix = suffixValue ? (stat.value.includes(' ') ? ' ' + suffixValue : suffixValue) : '';

            return (
              <ScrollReveal key={stat.id} delay={idx + 1} direction="scale">
                <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/15 hover:border-primary-400/50 hover:bg-white/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 transform hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-500/20 to-primary-400/10 rounded-2xl text-primary-300 mb-4 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={STAT_ICONS[stat.icon] || STAT_ICONS['users']} />
                    </svg>
                  </div>
                  <div className="text-2xl sm:text-4xl font-black text-white mb-1 tracking-tight">
                    <CounterAnimation target={numValue} suffix={finalSuffix} />
                  </div>
                  <p className="text-sm sm:text-base font-medium text-primary-200/90">{stat.label}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Bottom SVG Wave Transition into White Services Section */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-8 sm:h-12 text-white fill-current">
          <path d="M0,0 C300,90 600,-40 900,60 C1050,110 1150,30 1200,10 L1200,0 L0,0 Z" />
        </svg>
      </div>
    </section>
  );
}
