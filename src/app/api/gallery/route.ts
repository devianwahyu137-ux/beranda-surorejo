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

  // Ambil semua foto dalam kategori yang sama, urutkan berdasarkan sort_order
  const { data: existingItems, error: fetchError } = await supabase
    .from('gallery')
    .select('id, sort_order')
    .eq('category', body.category)
    .order('sort_order', { ascending: true });

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });

  const total = (existingItems ?? []).length;

  // Klem sort_order ke range valid [1, total+1]
  const targetOrder = Math.max(1, Math.min(body.sort_order ?? total + 1, total + 1));

  // Geser semua foto yang sort_order-nya >= targetOrder satu angka ke atas
  if (existingItems && existingItems.length > 0) {
    const itemsToShift = existingItems.filter((item) => item.sort_order >= targetOrder);
    for (const item of itemsToShift) {
      await supabase
        .from('gallery')
        .update({ sort_order: item.sort_order + 1, updated_at: new Date().toISOString() })
        .eq('id', item.id);
    }
  }

  // Insert foto baru dengan posisi yang sudah ditetapkan
  const { data, error } = await supabase
    .from('gallery')
    .insert({ ...body, sort_order: targetOrder })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
