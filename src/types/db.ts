// ============================================================
// Beranda Surorejo — Database Entity Types
// Diturunkan 1:1 dari schema.sql dan migrations
// ============================================================

export type UmkmCategory =
  | 'kuliner'
  | 'kerajinan'
  | 'hasil_tani'
  | 'jasa'
  | 'toko'
  | 'lainnya';

export type MessageCategory =
  | 'keluhan'
  | 'saran'
  | 'pertanyaan'
  | 'informasi';

export type GalleryCategory = 'umum' | 'pkk';

export interface Umkm {
  id: string;
  name: string;
  slug: string;
  category: UmkmCategory;
  description: string | null;
  whatsapp_number: string;
  phone_number: string | null;
  address_text: string | null;
  latitude: number | null;
  longitude: number | null;
  operating_hours: string | null;
  last_verified_at: string;
  is_published: boolean;
  consent_given: boolean;
  created_at: string;
  updated_at: string;
}

export interface UmkmPhoto {
  id: string;
  umkm_id: string;
  url: string;
  sort_order: number;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  requirements: string | null;
  steps: string | null;
  hours: string | null;
  contact: string | null;
  form_url: string | null;
  last_verified_at: string;
  is_published: boolean;
  sort_order: number;
  updated_at: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  updated_at: string;
}

export interface Message {
  id: string;
  name: string;
  rt_rw: string;
  phone: string | null;
  category: MessageCategory;
  subject: string;
  body: string;
  is_read: boolean;
  created_at: string;
}

// ------------------------------------------------------------
// Sprint 2 Tables
// ------------------------------------------------------------

export interface VillageOfficial {
  id: string;
  name: string;
  position: string;
  image_url: string | null;
  color: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PkkOfficial {
  id: string;
  name: string;
  position: string;
  image_url: string | null;
  color: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PkkProgram {
  id: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Gallery {
  id: string;
  title: string;
  category: GalleryCategory;
  image_url: string;
  color: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------
// Insert/Update Types
// ------------------------------------------------------------

export interface UmkmWithPhotos extends Umkm {
  umkm_photo: UmkmPhoto[];
}

export type UmkmInsert = Omit<Umkm, 'id' | 'slug' | 'created_at' | 'updated_at' | 'last_verified_at'>;
export type UmkmUpdate = Partial<Omit<Umkm, 'id' | 'slug' | 'created_at' | 'updated_at'>>;
export type ServiceInsert = Omit<Service, 'id' | 'updated_at' | 'last_verified_at'>;
export type ServiceUpdate = Partial<Omit<Service, 'id' | 'updated_at'>>;
export type PageUpdate = Partial<Pick<Page, 'title' | 'content'>>;
export type MessageInsert = Omit<Message, 'id' | 'is_read' | 'created_at'>;

export type VillageOfficialInsert = Omit<VillageOfficial, 'id' | 'created_at' | 'updated_at'>;
export type VillageOfficialUpdate = Partial<Omit<VillageOfficial, 'id' | 'created_at' | 'updated_at'>>;

export type PkkOfficialInsert = Omit<PkkOfficial, 'id' | 'created_at' | 'updated_at'>;
export type PkkOfficialUpdate = Partial<Omit<PkkOfficial, 'id' | 'created_at' | 'updated_at'>>;

export type PkkProgramInsert = Omit<PkkProgram, 'id' | 'created_at' | 'updated_at'>;
export type PkkProgramUpdate = Partial<Omit<PkkProgram, 'id' | 'created_at' | 'updated_at'>>;

export type GalleryInsert = Omit<Gallery, 'id' | 'created_at' | 'updated_at'>;
export type GalleryUpdate = Partial<Omit<Gallery, 'id' | 'created_at' | 'updated_at'>>;

export interface StrategicLocation {
  id: string;
  name: string;
  category: 'pemerintahan' | 'ibadah' | 'pendidikan' | 'kesehatan' | 'lainnya';
  description: string | null;
  image_url: string | null;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}

export type StrategicLocationInsert = Omit<StrategicLocation, 'id' | 'created_at' | 'updated_at'>;
export type StrategicLocationUpdate = Partial<Omit<StrategicLocation, 'id' | 'created_at' | 'updated_at'>>;

// ------------------------------------------------------------
// Sprint 5 Tables
// ------------------------------------------------------------

export type ArticleCategory = 'berita' | 'pengumuman' | 'program_kerja';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: ArticleCategory;
  thumbnail_url: string | null;
  author: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ArticleInsert = Omit<Article, 'id' | 'slug' | 'created_at' | 'updated_at'>;
export type ArticleUpdate = Partial<Omit<Article, 'id' | 'slug' | 'created_at' | 'updated_at'>>;

export interface DemographicStat {
  id: string;
  label: string;
  value: string;
  icon: string;
  sort_order: number;
  updated_at: string;
}

export type DemographicStatInsert = Omit<DemographicStat, 'id' | 'updated_at'>;
export type DemographicStatUpdate = Partial<Omit<DemographicStat, 'id' | 'updated_at'>>;

export interface VillageArea {
  id: string;
  dusun: string;
  rw_count: number;
  rt_count: number;
  population: number;
  head_name: string | null;
  sort_order: number;
  updated_at: string;
}

export type VillageAreaInsert = Omit<VillageArea, 'id' | 'updated_at'>;
export type VillageAreaUpdate = Partial<Omit<VillageArea, 'id' | 'updated_at'>>;

export type LegalDocumentCategory = 'perdes' | 'sk_kades' | 'peraturan_lainnya';

export interface LegalDocument {
  id: string;
  title: string;
  category: LegalDocumentCategory;
  document_number: string | null;
  year: number;
  description: string | null;
  file_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type LegalDocumentInsert = Omit<LegalDocument, 'id' | 'created_at' | 'updated_at'>;
export type LegalDocumentUpdate = Partial<Omit<LegalDocument, 'id' | 'created_at' | 'updated_at'>>;

export interface Event {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  event_date: string;
  event_end_date: string | null;
  is_published: boolean;
  created_at: string;
}

export type EventInsert = Omit<Event, 'id' | 'created_at'>;
export type EventUpdate = Partial<Omit<Event, 'id' | 'created_at'>>;

export interface Lembaga {
  id: string;
  name: string;
  leader_name: string;
  description: string | null;
  logo_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type LembagaInsert = Omit<Lembaga, 'id' | 'created_at' | 'updated_at'>;
export type LembagaUpdate = Partial<Omit<Lembaga, 'id' | 'created_at' | 'updated_at'>>;

export type InstitutionCategory = 'bpd' | 'lpmd' | 'karang_taruna' | 'rt_rw' | 'lainnya';

export interface Institution {
  id: string;
  name: string;
  category: InstitutionCategory;
  description: string | null;
  head_name: string | null;
  head_photo_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type InstitutionInsert = Omit<Institution, 'id' | 'created_at' | 'updated_at'>;
export type InstitutionUpdate = Partial<Omit<Institution, 'id' | 'created_at' | 'updated_at'>>;

