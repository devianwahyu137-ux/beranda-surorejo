import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { PkkOfficialInsert } from '@/types/db';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pkk_official')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as PkkOfficialInsert;

  if (!body.name || !body.position) {
    return NextResponse.json({ error: 'Nama dan jabatan wajib diisi' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('pkk_official')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
