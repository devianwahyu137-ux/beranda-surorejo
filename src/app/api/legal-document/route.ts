import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { LegalDocumentInsert } from '@/types/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const year = searchParams.get('year');
  
  const supabase = await createClient();
  let query = supabase.from('legal_document').select('*').order('year', { ascending: false }).order('created_at', { ascending: false });
  
  if (category) {
    query = query.eq('category', category);
  }
  
  if (year) {
    query = query.eq('year', parseInt(year, 10));
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

  const body = (await request.json()) as LegalDocumentInsert;

  if (!body.title || !body.category || !body.year) {
    return NextResponse.json({ error: 'Judul, kategori, dan tahun wajib diisi' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('legal_document')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
