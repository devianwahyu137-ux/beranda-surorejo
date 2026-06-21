import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateSlug, ensureUniqueSlug } from '@/lib/slug';

// GET /api/service — List services (admin)
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('service')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

// POST /api/service — Create service
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  if (!body.title) {
    return NextResponse.json({ error: 'title wajib diisi.' }, { status: 400 });
  }

  // Generate unique slug
  const baseSlug = generateSlug(body.title);
  const { data: existingSlugs } = await supabase
    .from('service')
    .select('slug');
  const slugList = (existingSlugs || []).map((r) => r.slug);
  const slug = ensureUniqueSlug(baseSlug, slugList);

  const { data, error } = await supabase
    .from('service')
    .insert({
      title: body.title,
      slug,
      requirements: body.requirements || null,
      steps: body.steps || null,
      hours: body.hours || null,
      contact: body.contact || null,
      form_url: body.form_url || null,
      is_published: body.is_published || false,
      sort_order: body.sort_order || 0,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 201 });
}
