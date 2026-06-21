import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/umkm/[id]
export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('umkm')
    .select('*, umkm_photo(*)')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(data);
}

// PATCH /api/umkm/[id]
export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  // Remove fields that shouldn't be updated directly
  const { id: _id, slug: _slug, created_at: _ca, updated_at: _ua, ...updateData } = body;

  const { data, error } = await supabase
    .from('umkm')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

// DELETE /api/umkm/[id]
export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // First get photos to delete from Storage
  const { data: photos } = await supabase
    .from('umkm_photo')
    .select('url')
    .eq('umkm_id', id);

  // Delete Storage files
  if (photos && photos.length > 0) {
    const filePaths = photos
      .map((p) => {
        // Extract file path from public URL
        const match = p.url.match(/umkm-photos\/(.+)$/);
        return match ? match[1] : null;
      })
      .filter(Boolean) as string[];

    if (filePaths.length > 0) {
      await supabase.storage.from('umkm-photos').remove(filePaths);
    }
  }

  // Delete UMKM (cascade deletes umkm_photo records)
  const { error } = await supabase
    .from('umkm')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
