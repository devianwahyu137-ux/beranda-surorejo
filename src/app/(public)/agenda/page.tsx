import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ScrollReveal from '@/components/public/ScrollReveal';

export const metadata: Metadata = {
  title: 'Agenda Kegiatan | Desa Surorejo',
  description: 'Jadwal kegiatan, musyawarah, dan acara penting di Desa Surorejo.',
};

export default async function AgendaPage() {
  const supabase = await createClient();
  
  // Ambil event yang belum berlalu
  const today = new Date().toISOString().split('T')[0];
  
  const { data: upcomingEvents } = await supabase
    .from('event')
    .select('*')
    .gte('event_date', today)
    .order('event_date', { ascending: true });

  const { data: pastEvents } = await supabase
    .from('event')
    .select('*')
    .lt('event_date', today)
    .order('event_date', { ascending: false })
    .limit(10); // Batasi kegiatan lampau yang ditampilkan

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Header Section */}
      <section className="bg-primary-900 text-white pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="container-page relative z-10">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Agenda Kegiatan</h1>
            <p className="text-primary-100 text-lg max-w-2xl">
              Informasi jadwal pelaksanaan kegiatan kemasyarakatan dan program pemerintah desa Surorejo.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Wave divider */}
      <div className="relative -mt-10 z-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" className="w-full h-12 preserve-3d">
          <path fill="#f8fafc" d="M0,48 L0,16 Q360,48 720,16 Q1080,-16 1440,16 L1440,48Z" />
        </svg>
      </div>

      <div className="container-page relative z-30 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Kegiatan Mendatang
              </h2>
              
              {upcomingEvents && upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event, idx) => (
                    <div key={event.id} className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 flex items-start gap-3.5 sm:gap-5 card-hover shadow-sm">
                      <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-primary-50 rounded-xl text-primary-700 shrink-0">
                        <span className="text-xl sm:text-2xl font-bold leading-none">
                          {new Date(event.event_date).getDate()}
                        </span>
                        <span className="text-[10px] sm:text-xs font-semibold uppercase mt-0.5 sm:mt-1">
                          {new Date(event.event_date).toLocaleString('id-ID', { month: 'short' })}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-xl font-bold text-neutral-900 mb-1 sm:mb-2 leading-snug">{event.title}</h3>
                        {event.description && (
                          <p className="text-neutral-600 text-xs sm:text-sm mb-2.5 sm:mb-3 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                            {event.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-neutral-500 pt-1 border-t border-neutral-100 sm:border-0 sm:pt-0">
                          {event.time && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {event.time}
                            </span>
                          )}
                          {event.location && (
                            <span className="flex items-center gap-1 text-primary-700 font-medium">
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="truncate">{event.location}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center">
                  <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-neutral-500 font-medium">Belum ada kegiatan yang dijadwalkan.</p>
                </div>
              )}
            </ScrollReveal>
          </div>

          <div className="lg:col-span-1">
            <ScrollReveal delay={1}>
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-neutral-900 mb-6">Kegiatan Lampau</h3>
                
                {pastEvents && pastEvents.length > 0 ? (
                  <div className="space-y-6">
                    {pastEvents.map((event) => (
                      <div key={event.id} className="group cursor-default flex gap-4">
                        <div className="w-2 h-2 mt-2 rounded-full bg-neutral-300 group-hover:bg-neutral-500 transition-colors shrink-0"></div>
                        <div>
                          <p className="text-sm font-semibold text-neutral-800 mb-1">{event.title}</p>
                          <p className="text-xs text-neutral-500">
                            {new Date(event.event_date).toLocaleDateString('id-ID', {
                              day: 'numeric', month: 'long', year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500 text-center py-4">Belum ada riwayat kegiatan.</p>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  );
}
