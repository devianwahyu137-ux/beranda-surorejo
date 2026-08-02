import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { GalleryUpdate } from '@/types/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as GalleryUpdate;

  // Ambil data foto yang akan diedit
  const { data: currentItem, error: currentError } = await supabase
    .from('gallery')
    .select('id, sort_order, category')
    .eq('id', id)
    .single();

  if (currentError || !currentItem) {
    return NextResponse.json({ error: 'Foto tidak ditemukan' }, { status: 404 });
  }

  // Ambil semua foto dalam kategori yang sama (kecuali item ini sendiri)
  const category = body.category ?? currentItem.category;
  const { data: siblings, error: siblingsError } = await supabase
    .from('gallery')
    .select('id, sort_order')
    .eq('category', category)
    .neq('id', id)
    .order('sort_order', { ascending: true });

  if (siblingsError) return NextResponse.json({ error: siblingsError.message }, { status: 500 });

  const total = (siblings ?? []).length; // total foto lain (tanpa item ini)

  // Klem sort_order baru ke range valid [1, total+1]
  const newOrder = body.sort_order != null
    ? Math.max(1, Math.min(body.sort_order, total + 1))
    : currentItem.sort_order;

  // Jika urutan berubah, geser foto-foto lain secara tepat
  if (newOrder !== currentItem.sort_order || category !== currentItem.category) {
    if (siblings && siblings.length > 0) {
      // Susun ulang: masukkan item ini ke posisi baru, lalu normalisasi semua
      const otherItems = [...siblings];
      const finalOrder: { id: string; sort_order: number }[] = [];

      // Bangun urutan baru: sisipkan current item di posisi baru
      let pos = 1;
      let inserted = false;
      for (let i = 0; i < otherItems.length; i++) {
        if (pos === newOrder && !inserted) {
          // Tempatkan item ini di sini
          finalOrder.push({ id, sort_order: pos });
          pos++;
          inserted = true;
        }
        finalOrder.push({ id: otherItems[i].id, sort_order: pos });
        pos++;
      }
      // Jika belum disisipkan (posisi di akhir)
      if (!inserted) {
        finalOrder.push({ id, sort_order: pos });
      }

      // Update semua item dengan sort_order baru secara batch
      for (const item of finalOrder) {
        await supabase
          .from('gallery')
          .update({ sort_order: item.sort_order, updated_at: new Date().toISOString() })
          .eq('id', item.id);
      }

      // Update field lain dari body (selain sort_order yang sudah di-handle)
      const { sort_order: _so, ...restBody } = body;
      if (Object.keys(restBody).length > 0) {
        const { data, error } = await supabase
          .from('gallery')
          .update({ ...restBody, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json(data);
      }

      // Return data yang sudah diupdate
      const { data: updatedItem } = await supabase
        .from('gallery')
        .select('*')
        .eq('id', id)
        .single();

      return NextResponse.json(updatedItem);
    }
  }

  // Tidak ada perubahan urutan, update field lain saja
  const { data, error } = await supabase
    .from('gallery')
    .update({ ...body, sort_order: newOrder, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Ambil data foto yang akan dihapus (untuk mengetahui kategori-nya)
  const { data: targetItem, error: fetchError } = await supabase
    .from('gallery')
    .select('id, sort_order, category')
    .eq('id', id)
    .single();

  if (fetchError || !targetItem) {
    return NextResponse.json({ error: 'Foto tidak ditemukan' }, { status: 404 });
  }

  // Hapus foto
  const { error: deleteError } = await supabase.from('gallery').delete().eq('id', id);
  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 });

  // Ambil semua foto tersisa dalam kategori yang sama, urutkan berdasarkan sort_order
  const { data: remaining, error: remainError } = await supabase
    .from('gallery')
    .select('id, sort_order')
    .eq('category', targetItem.category)
    .order('sort_order', { ascending: true });

  if (remainError) return NextResponse.json({ error: remainError.message }, { status: 500 });

  // Normalisasi: pastikan sort_order berurutan 1, 2, 3, ... tanpa celah
  if (remaining && remaining.length > 0) {
    for (let i = 0; i < remaining.length; i++) {
      const correctOrder = i + 1;
      if (remaining[i].sort_order !== correctOrder) {
        await supabase
          .from('gallery')
          .update({ sort_order: correctOrder, updated_at: new Date().toISOString() })
          .eq('id', remaining[i].id);
      }
    }
  }

  return NextResponse.json({ success: true });
}
