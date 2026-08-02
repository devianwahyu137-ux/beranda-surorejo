import ScrollReveal from './ScrollReveal';
import type { Gallery } from '@/types/db';

interface GalleryPreviewProps {
  items: Gallery[];
}

export default function GalleryPreview({ items }: GalleryPreviewProps) {
  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="container-page">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary-700 bg-primary-50 px-3.5 py-1 rounded-full mb-3 border border-primary-100 shadow-sm">
            Dokumentasi Desa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-3 tracking-tight">
            Galeri Kegiatan Desa
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-base">
            Dokumentasi momen penting dan berbagai kegiatan kemasyarakatan di Desa Surorejo.
          </p>
        </ScrollReveal>

        {items.length === 0 ? (
          <ScrollReveal>
             <div className="p-12 bg-neutral-50 rounded-2xl border border-neutral-200 text-center max-w-2xl mx-auto">
               <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <p className="text-neutral-500 font-medium">Belum ada foto kegiatan yang ditampilkan.</p>
             </div>
          </ScrollReveal>
        ) : (
          /* Featured Magazine Layout Grid with mathematically perfect gap & height alignment */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {items.map((item, idx) => {
              // Make the first item large featured (2 cols x 2 rows on desktop/tablet)
              const isFeatured = idx === 0;

              return (
                <ScrollReveal 
                  key={item.id} 
                  delay={Math.min(idx + 1, 6)} 
                  direction="scale"
                  className={isFeatured ? 'col-span-2 md:row-span-2' : 'col-span-1'}
                >
                  <div 
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-neutral-100 shadow-sm hover:shadow-lg transition-all duration-500 border border-neutral-200/60 w-full ${
                      isFeatured 
                        ? 'aspect-[16/10] md:aspect-auto md:h-[436px]' 
                        : 'aspect-[4/3] md:aspect-auto md:h-52'
                    }`}
                  >
                    {item.image_url && (item.image_url.startsWith('http') || item.image_url.startsWith('/')) ? (
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                        loading="lazy" 
                        decoding="async" 
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color || 'from-primary-400 to-primary-600'} flex items-center justify-center`}>
                        <svg className="w-12 h-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                    )}

                    {/* Rich Hover Overlay - Automatically visible on mobile screens! */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3 sm:p-6">
                      {/* Zoom glass badge */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 transform scale-100 md:scale-90 md:group-hover:scale-100">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>

                      <span className={`text-white font-bold tracking-tight opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-3 md:group-hover:translate-y-0 transition-all duration-300 drop-shadow-md ${
                        isFeatured ? 'text-sm sm:text-2xl line-clamp-2' : 'text-[13px] sm:text-base line-clamp-1'
                      }`}>
                        {item.title}
                      </span>
                      {isFeatured && (
                        <p className="text-white/80 text-[11px] sm:text-sm mt-0.5 sm:mt-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                          Dokumentasi unggulan kegiatan Desa Surorejo
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
