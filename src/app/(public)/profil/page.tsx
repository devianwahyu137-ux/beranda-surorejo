import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Profil Desa',
  description: 'Profil dan informasi tentang Desa Surorejo, Banyuurip, Purworejo.',
};

export const revalidate = 300;

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: page } = await supabase
    .from('page')
    .select('title, content')
    .eq('slug', 'profil')
    .single();

  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">
        {page?.title || 'Profil Desa Surorejo'}
      </h1>

      {page?.content ? (
        <div className="prose prose-neutral max-w-none">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
            <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
              {page.content}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-neutral-50 rounded-xl p-8 text-center">
          <p className="text-neutral-400">Konten profil belum tersedia.</p>
        </div>
      )}
    </div>
  );
}
