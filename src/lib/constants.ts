import type { UmkmCategory, ArticleCategory, LegalDocumentCategory, InstitutionCategory } from '@/types/db';

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
// Kategori Artikel
// ============================================================
export const ARTICLE_CATEGORIES: { value: ArticleCategory; label: string }[] = [
  { value: 'berita', label: 'Berita Desa' },
  { value: 'pengumuman', label: 'Pengumuman' },
  { value: 'program_kerja', label: 'Program Kerja' },
];

export const ARTICLE_CATEGORY_MAP: Record<ArticleCategory, string> = Object.fromEntries(
  ARTICLE_CATEGORIES.map((c) => [c.value, c.label])
) as Record<ArticleCategory, string>;

// ============================================================
// Kategori Produk Hukum
// ============================================================
export const LEGAL_CATEGORIES: { value: LegalDocumentCategory; label: string }[] = [
  { value: 'perdes', label: 'Peraturan Desa' },
  { value: 'sk_kades', label: 'SK Kepala Desa' },
  { value: 'peraturan_lainnya', label: 'Peraturan Lainnya' },
];

export const LEGAL_CATEGORY_MAP: Record<LegalDocumentCategory, string> = Object.fromEntries(
  LEGAL_CATEGORIES.map((c) => [c.value, c.label])
) as Record<LegalDocumentCategory, string>;

// ============================================================
// Kategori Lembaga
// ============================================================
export const INSTITUTION_CATEGORIES: { value: InstitutionCategory; label: string }[] = [
  { value: 'bpd', label: 'BPD' },
  { value: 'lpmd', label: 'LPMD' },
  { value: 'karang_taruna', label: 'Karang Taruna' },
  { value: 'rt_rw', label: 'RT/RW' },
  { value: 'lainnya', label: 'Lainnya' },
];

export const INSTITUTION_CATEGORY_MAP: Record<InstitutionCategory, string> = Object.fromEntries(
  INSTITUTION_CATEGORIES.map((c) => [c.value, c.label])
) as Record<InstitutionCategory, string>;

// ============================================================
// Ikon Statistik Demografi
// ============================================================
export const STAT_ICONS: Record<string, string> = {
  users: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
  map: 'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z',
  home: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  building: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
  person: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  chart: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
};

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
  { href: '/berita', label: 'Berita' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/umkm', label: 'UMKM' },
  { href: '/peta', label: 'Peta' },
];

// ============================================================
// Navigasi admin
// ============================================================
export const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/berita', label: 'Berita' },
  { href: '/admin/umkm', label: 'UMKM' },
  { href: '/admin/layanan', label: 'Layanan' },
  { href: '/admin/transparansi', label: 'Transparansi' },
  { href: '/admin/agenda', label: 'Agenda' },
  { href: '/admin/statistik', label: 'Statistik' },
  { href: '/admin/lembaga', label: 'Lembaga' },
  { href: '/admin/lokasi', label: 'Lokasi' },
  { href: '/admin/halaman', label: 'Halaman' },
  { href: '/admin/pesan', label: 'Pesan' },
  { href: '/admin/perangkat', label: 'Perangkat' },
  { href: '/admin/pkk', label: 'PKK' },
  { href: '/admin/galeri', label: 'Galeri' },
];

// ============================================================
// Identitas desa
// ============================================================
export const VILLAGE_NAME = 'Desa Surorejo';
export const VILLAGE_TAGLINE = 'Membangun desa dan meningkatkan kesejahteraan masyarakat';
export const OFFICIAL_WEBSITE_URL = 'https://surorejo-banyuurip.purworejokab.go.id';
