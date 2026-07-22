import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ArticleForm from '@/components/admin/ArticleForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: article } = await supabase
    .from('article')
    .select('*')
    .eq('id', id)
    .single();

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Edit Artikel</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Perbarui informasi artikel berita desa.
        </p>
      </div>

      <ArticleForm initialData={article} />
    </div>
  );
}
