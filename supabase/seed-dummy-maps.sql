-- ============================================================
-- Dummy Data UMKM (Trial Peta Interaktif)
-- ============================================================

INSERT INTO public.umkm (
  name, 
  slug, 
  category, 
  description, 
  whatsapp_number, 
  address_text, 
  latitude, 
  longitude, 
  is_published, 
  consent_given
) VALUES (
  'Farm Ternak Surorejo',
  'farm-ternak-surorejo',
  'hasil_tani',
  'Usaha peternakan lokal (data dummy untuk testing peta).',
  '6280000000000',
  'Desa Surorejo',
  -7.771424,
  109.981122,
  true,
  true
)
ON CONFLICT (slug) DO UPDATE SET 
  latitude = EXCLUDED.latitude, 
  longitude = EXCLUDED.longitude;

-- Pastikan migration-sprint4.sql juga sudah dijalankan di Supabase.
