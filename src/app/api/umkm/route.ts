import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateSlug, ensureUniqueSlug } from '@/lib/slug';
import { STALE_DAYS, CATEGORIES } from '@/lib/constants';

// GET /api/umkm — List UMKM (admin, includes unpublished)
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const q = searchParams.get('q');
  const stale = searchParams.get('stale');

  let query = supabase
    .from('umkm')
    .select('*, umkm_photo(*)')
    .order('created_at', { ascending: false });

  if (category && CATEGORIES.some((c) => c.value === category)) {
    query = query.eq('category', category);
  }

  if (q) {
    query = query.ilike('name', `%${q}%`);
  }

  if (stale === 'true') {
    const staleDate = new Date();
    staleDate.setDate(staleDate.getDate() - STALE_DAYS);
    query = query.lt('last_verified_at', staleDate.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

// POST /api/umkm — Create UMKM
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  if (!body.name || !body.whatsapp_number || !body.category) {
    return NextResponse.json(
      { error: 'name, whatsapp_number, dan category wajib diisi.' },
      { status: 400 }
    );
  }

  // Generate unique slug
  const baseSlug = generateSlug(body.name);
  const { data: existingSlugs } = await supabase
    .from('umkm')
    .select('slug');
  const slugList = (existingSlugs || []).map((r) => r.slug);
  const slug = ensureUniqueSlug(baseSlug, slugList);

  const { data, error } = await supabase
    .from('umkm')
    .insert({
      name: body.name,
      slug,
      category: body.category,
      description: body.description || null,
      whatsapp_number: body.whatsapp_number,
      phone_number: body.phone_number || null,
      address_text: body.address_text || null,
      latitude: body.latitude || null,
      longitude: body.longitude || null,
      operating_hours: body.operating_hours || null,
      is_published: body.is_published || false,
      consent_given: body.consent_given || false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 201 });
}
