-- ============================================================
-- Migration: Add message table for citizen aspirations
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ---------- TABLE: message ----------
create table if not exists public.message (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  rt_rw       text not null,
  phone       text,
  category    text not null
                check (category in ('keluhan','saran','pertanyaan','informasi')),
  subject     text not null,
  body        text not null,
  is_read     boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists message_created_at_idx on public.message (created_at desc);
create index if not exists message_is_read_idx on public.message (is_read);
create index if not exists message_category_idx on public.message (category);

-- RLS
alter table public.message enable row level security;

-- Anyone can insert a message (public form)
create policy "public insert message" on public.message
  for insert with check (true);

-- Only authenticated admin can read/update/delete messages
create policy "admin read message" on public.message
  for select to authenticated using (true);

create policy "admin update message" on public.message
  for update to authenticated using (true) with check (true);

create policy "admin delete message" on public.message
  for delete to authenticated using (true);
