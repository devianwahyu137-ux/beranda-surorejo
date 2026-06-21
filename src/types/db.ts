// ============================================================
// Beranda Surorejo — Database Entity Types
// Diturunkan 1:1 dari schema.sql
// ============================================================

export type UmkmCategory =
  | 'kuliner'
  | 'kerajinan'
  | 'hasil_tani'
  | 'jasa'
  | 'toko'
  | 'lainnya';

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

// Type for UMKM with photos joined
export interface UmkmWithPhotos extends Umkm {
  umkm_photo: UmkmPhoto[];
}

// Type for creating a new UMKM (omit auto-generated fields)
export type UmkmInsert = Omit<Umkm, 'id' | 'slug' | 'created_at' | 'updated_at' | 'last_verified_at'>;

// Type for updating a UMKM (all fields optional except id)
export type UmkmUpdate = Partial<Omit<Umkm, 'id' | 'slug' | 'created_at' | 'updated_at'>>;

// Type for creating a new Service
export type ServiceInsert = Omit<Service, 'id' | 'updated_at' | 'last_verified_at'>;

// Type for updating a Service
export type ServiceUpdate = Partial<Omit<Service, 'id' | 'updated_at'>>;

// Type for updating a Page
export type PageUpdate = Partial<Pick<Page, 'title' | 'content'>>;
