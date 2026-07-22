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

  // Fallback to default if empty
  const displayStats = stats?.length ? stats : [];

  return (
    <section className="py-14 md:py-16 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="container-page relative z-10">
        <ScrollReveal className="text-center mb-10">
          <span className="inline-block text-sm font-medium text-primary-300 bg-primary-800/50 px-3 py-1 rounded-full mb-3 border border-primary-700/50">
            Data Desa
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Desa Surorejo dalam Angka
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayStats.map((stat, idx) => {
            // Extract numeric value and suffix for the counter
            // For example: "3.250+" -> num: 3250, suffix: "+"
            // "450 Ha" -> num: 450, suffix: " Ha"
            const numMatch = stat.value.replace(/\./g, '').match(/(\d+)/);
            const numValue = numMatch ? parseInt(numMatch[1], 10) : 0;
            const suffixValue = numMatch ? stat.value.replace(/\./g, '').replace(numMatch[1], '').trim() : stat.value;
            const finalSuffix = suffixValue ? (stat.value.includes(' ') ? ' ' + suffixValue : suffixValue) : '';

            return (
              <ScrollReveal key={stat.id} delay={idx + 1} direction="scale">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 text-center border border-white/10 hover:bg-white/15 transition-colors duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-xl text-primary-300 mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={STAT_ICONS[stat.icon] || STAT_ICONS['users']} />
                    </svg>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    <CounterAnimation target={numValue} suffix={finalSuffix} />
                  </div>
                  <p className="text-sm text-primary-200/80">{stat.label}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
