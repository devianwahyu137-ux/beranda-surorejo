import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { VillageAreaInsert } from '@/types/db';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('village_area')
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

  const body = (await request.json()) as VillageAreaInsert;

  const { data, error } = await supabase
    .from('village_area')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
