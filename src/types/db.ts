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
