-- Tabel Transparansi Keuangan Desa
-- Jalankan SQL ini di Supabase SQL Editor

CREATE TABLE IF NOT EXISTS transparency_doc (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  doc_type TEXT NOT NULL DEFAULT 'apbdes'
    CHECK (doc_type IN ('apbdes', 'rab', 'realisasi', 'lpj', 'infografis', 'lainnya')),
  fiscal_year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  file_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE transparency_doc ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public can read transparency_doc"
  ON transparency_doc FOR SELECT
  USING (true);

-- Allow authenticated insert/update/delete
CREATE POLICY "Authenticated can manage transparency_doc"
  ON transparency_doc FOR ALL
  USING (auth.role() = 'authenticated');
