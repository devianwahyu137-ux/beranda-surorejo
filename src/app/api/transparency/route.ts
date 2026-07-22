import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('transparency_doc')
    .select('*')
    .order('fiscal_year', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json([], { status: 200 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('transparency_doc')
    .insert({
      title: body.title,
      doc_type: body.doc_type,
      fiscal_year: body.fiscal_year,
      file_url: body.file_url,
      description: body.description || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
