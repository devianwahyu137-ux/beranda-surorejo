import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteContext {
  params: Promise<{ id: string; photoId: string }>;
}

// DELETE /api/umkm/[id]/photos/[photoId]
export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { photoId } = await context.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get photo record to find storage path
  const { data: photo } = await supabase
    .from('umkm_photo')
    .select('url')
    .eq('id', photoId)
    .single();

  if (!photo) {
    return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
  }

  // Delete from Storage
  const match = photo.url.match(/umkm-photos\/(.+)$/);
  if (match) {
    await supabase.storage.from('umkm-photos').remove([match[1]]);
  }

  // Delete DB record
  const { error } = await supabase
    .from('umkm_photo')
    .delete()
    .eq('id', photoId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
