import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import PageForm from '@/components/admin/PageForm';
import type { Page } from '@/types/db';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditPagePage({ params }: PageProps) {
  const { slug } = await params;

  // Only allow profil and kontak
  if (!['profil', 'kontak'].includes(slug)) {
    notFound();
  }

  const supabase = await createClient();
  const { data: page } = await supabase
    .from('page')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!page) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">
        Edit Halaman: {(page as Page).title}
      </h1>
      <PageForm page={page as Page} />
    </div>
  );
}
