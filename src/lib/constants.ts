import type { UmkmCategory } from '@/types/db';

// ============================================================
// Kategori UMKM — sesuai CHECK constraint di schema.sql
// ============================================================
export const CATEGORIES: { value: UmkmCategory; label: string }[] = [
  { value: 'kuliner', label: 'Kuliner' },
  { value: 'kerajinan', label: 'Kerajinan' },
  { value: 'hasil_tani', label: 'Hasil Tani' },
  { value: 'jasa', label: 'Jasa' },
  { value: 'toko', label: 'Toko' },
  { value: 'lainnya', label: 'Lainnya' },
];

export const CATEGORY_MAP: Record<UmkmCategory, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.label])
) as Record<UmkmCategory, string>;

// ============================================================
// Ambang kebasian — terkunci 90 hari sesuai Architecture Freeze
// ============================================================
export const STALE_DAYS = 90;

// ============================================================
// Navigasi publik
// ============================================================
export const PUBLIC_NAV = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/umkm', label: 'UMKM' },
];

// ============================================================
// Navigasi admin
// ============================================================
export const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/umkm', label: 'UMKM' },
  { href: '/admin/layanan', label: 'Layanan' },
  { href: '/admin/halaman', label: 'Halaman' },
];

// ============================================================
// Identitas desa
// ============================================================
export const VILLAGE_NAME = 'Desa Surorejo';
export const VILLAGE_TAGLINE = 'Desa Surorejo, Banyuurip, Purworejo';
