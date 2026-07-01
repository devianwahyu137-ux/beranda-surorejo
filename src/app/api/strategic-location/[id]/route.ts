import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteContext { params: Promise<{ id: string }> }

// PATCH /api/strategic-location/[id]
export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id: _id, created_at: _ca, updated_at: _ua, ...updateData } = body;
  if (updateData.latitude) updateData.latitude = parseFloat(updateData.latitude);
  if (updateData.longitude) updateData.longitude = parseFloat(updateData.longitude);

  const { data, error } = await supabase
    .from('strategic_location')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// DELETE /api/strategic-location/[id]
export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { error } = await supabase.from('strategic_location').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
