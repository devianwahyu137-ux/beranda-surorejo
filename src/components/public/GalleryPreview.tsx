import ScrollReveal from './ScrollReveal';
import type { Gallery } from '@/types/db';

interface GalleryPreviewProps {
  items: Gallery[];
}

export default function GalleryPreview({ items }: GalleryPreviewProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-page">
        <ScrollReveal className="text-center mb-10">
          <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">
            Dokumentasi
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
            Galeri Kegiatan Desa
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Dokumentasi berbagai kegiatan dan acara di Desa Surorejo.
          </p>
        </ScrollReveal>

        {items.length === 0 ? (
          <ScrollReveal>
             <div className="p-8 bg-neutral-50 rounded-xl border border-neutral-200 text-center max-w-2xl mx-auto">
               <p className="text-neutral-500">Belum ada foto kegiatan.</p>
             </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {items.map((item, idx) => (
              <ScrollReveal key={item.id} delay={Math.min(idx + 1, 6)} direction="scale">
                <div className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer card-hover bg-neutral-100">
                  {item.image_url && (item.image_url.startsWith('http') || item.image_url.startsWith('/')) ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color || 'from-primary-200 to-primary-300'} flex items-center justify-center`}>
                      <svg className="w-10 h-10 md:w-12 md:h-12 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                    <span className="text-white text-sm font-medium px-3 py-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {item.title}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
