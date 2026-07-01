import ScrollReveal from './ScrollReveal';
import CounterAnimation from './CounterAnimation';

const STATS = [
  {
    label: 'Jumlah Penduduk',
    value: 3250,
    suffix: '+',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    label: 'Luas Wilayah',
    value: 450,
    suffix: ' Ha',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
  {
    label: 'Jumlah RT',
    value: 28,
    suffix: '',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: 'Jumlah RW',
    value: 6,
    suffix: '',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
];

export default function StatsSection() {
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
          {STATS.map((stat, idx) => (
            <ScrollReveal key={stat.label} delay={idx + 1} direction="scale">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 text-center border border-white/10 hover:bg-white/15 transition-colors duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-xl text-primary-300 mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  <CounterAnimation target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-primary-200/80">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
