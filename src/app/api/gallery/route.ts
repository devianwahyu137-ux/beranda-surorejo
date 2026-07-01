import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { GalleryInsert } from '@/types/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  const supabase = await createClient();
  let query = supabase.from('gallery').select('*').order('sort_order', { ascending: true });
  
  if (category) {
    query = query.eq('category', category);
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

  const body = (await request.json()) as GalleryInsert;

  if (!body.title || !body.category || !body.image_url) {
    return NextResponse.json({ error: 'Judul, kategori, dan gambar wajib diisi' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('gallery')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
