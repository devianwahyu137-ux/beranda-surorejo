import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ScrollReveal from './ScrollReveal';

export default async function UpcomingEvents() {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];
  
  const { data: events } = await supabase
    .from('event')
    .select('*')
    .gte('event_date', today)
    .order('event_date', { ascending: true })
    .limit(3);

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-white relative">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-10 md:mb-12">
          <ScrollReveal direction="up">
            <span className="inline-block text-xs sm:text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-2 sm:mb-3 border border-primary-100">
              Jadwal Kegiatan
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Agenda Desa
            </h2>
            <p className="text-neutral-500 mt-2 sm:mt-3 max-w-2xl text-xs sm:text-base">
              Ikuti berbagai kegiatan, musyawarah, dan program pemberdayaan masyarakat yang akan datang.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="left" delay={1} className="shrink-0">
            <Link 
              href="/agenda" 
              className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white border border-neutral-200 text-neutral-700 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm group"
            >
              Lihat Kalender
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {events.map((event, index) => (
            <ScrollReveal key={event.id} direction="up" delay={index + 2}>
              <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-4 sm:p-6 flex flex-col h-full card-hover shadow-sm hover:border-primary-200 hover:bg-white group">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-5">
                  <div className="flex-shrink-0 flex flex-col items-center justify-center w-11 h-11 sm:w-14 sm:h-14 bg-primary-100 rounded-xl text-primary-700 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <span className="text-base sm:text-xl font-bold leading-none">
                      {new Date(event.event_date).getDate()}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase mt-0.5">
                      {new Date(event.event_date).toLocaleString('id-ID', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-0.5 sm:mb-1 leading-snug group-hover:text-primary-600 transition-colors">{event.title}</h3>
                    {event.time && (
                      <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-medium text-neutral-500">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  {event.description && (
                    <p className="text-neutral-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
                      {event.description}
                    </p>
                  )}
                </div>
                
                {event.location && (
                  <div className="pt-2.5 sm:pt-4 border-t border-neutral-200 flex items-start gap-2 text-xs sm:text-sm text-neutral-600 mt-auto">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="line-clamp-2">{event.location}</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
