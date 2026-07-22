import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ArticleInsert } from '@/types/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const isPublished = searchParams.get('is_published');
  const limit = searchParams.get('limit');
  
  const supabase = await createClient();
  let query = supabase.from('article').select('*').order('published_at', { ascending: false, nullsFirst: false });
  
  if (category) {
    query = query.eq('category', category);
  }
  
  if (isPublished === 'true') {
    query = query.eq('is_published', true);
  } else if (isPublished === 'false') {
    query = query.eq('is_published', false);
  }

  if (limit) {
    query = query.limit(parseInt(limit, 10));
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as ArticleInsert;

  if (!body.title || !body.content || !body.category) {
    return NextResponse.json({ error: 'Judul, konten, dan kategori wajib diisi' }, { status: 400 });
  }

  const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + crypto.randomUUID().substring(0, 8);

  const payload = {
    ...body,
    slug: (body as any).slug || slug
  };

  const { data, error } = await supabase
    .from('article')
    .insert(payload)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
