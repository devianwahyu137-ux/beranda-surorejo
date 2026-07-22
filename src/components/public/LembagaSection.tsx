import ScrollReveal from './ScrollReveal';
import Image from 'next/image';
import type { Lembaga } from '@/types/db';

interface LembagaSectionProps {
  lembagaList: Lembaga[];
}

export default function LembagaSection({ lembagaList }: LembagaSectionProps) {
  if (!lembagaList || lembagaList.length === 0) {
    return (
      <div className="text-center py-12 bg-neutral-50 rounded-2xl border border-neutral-200">
        <p className="text-neutral-500">Data lembaga belum tersedia.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <ScrollReveal className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">Lembaga Kemasyarakatan Desa</h2>
        <p className="text-neutral-500 max-w-2xl mx-auto">
          Lembaga kemasyarakatan yang dibentuk oleh masyarakat sesuai dengan kebutuhan dan merupakan mitra Pemerintah Desa dalam memberdayakan masyarakat.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lembagaList.map((lembaga, idx) => (
          <ScrollReveal key={lembaga.id} delay={idx + 1}>
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 h-full flex flex-col card-hover shadow-sm">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-16 h-16 shrink-0 relative bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-center p-2">
                  {lembaga.logo_url ? (
                    <Image 
                      src={lembaga.logo_url} 
                      alt={lembaga.name} 
                      fill
                      sizes="64px"
                      className="object-contain p-1.5"
                    />
                  ) : (
                    <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 leading-tight mb-1">{lembaga.name}</h3>
                  {lembaga.head_name && (
                    <div className="flex items-center gap-1.5 text-sm text-neutral-600 font-medium bg-neutral-100/80 px-2 py-0.5 rounded inline-flex">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {lembaga.head_name}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                {lembaga.description ? (
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {lembaga.description}
                  </p>
                ) : (
                  <p className="text-neutral-400 text-sm italic">Belum ada deskripsi.</p>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
