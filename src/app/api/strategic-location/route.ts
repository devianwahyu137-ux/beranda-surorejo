import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// GET /api/strategic-location
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('strategic_location')
    .select('*')
    .order('category', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

// POST /api/strategic-location
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  if (!body.name || !body.category || body.latitude == null || body.longitude == null) {
    return NextResponse.json({ error: 'name, category, latitude, longitude wajib diisi.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('strategic_location')
    .insert({
      name: body.name,
      category: body.category,
      description: body.description || null,
      image_url: body.image_url || null,
      latitude: parseFloat(body.latitude),
      longitude: parseFloat(body.longitude),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
