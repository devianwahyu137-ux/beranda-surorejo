import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const supabase = await createClient();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/profil`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/pembangunan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/layanan`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/umkm`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/produk-hukum`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Published services
  const { data: services } = await supabase
    .from('service')
    .select('slug, updated_at')
    .eq('is_published', true);

  const serviceRoutes: MetadataRoute.Sitemap = (services || []).map((s) => ({
    url: `${baseUrl}/layanan/${s.slug}`,
    lastModified: new Date(s.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Published UMKM
  const { data: umkmList } = await supabase
    .from('umkm')
    .select('slug, updated_at')
    .eq('is_published', true);

  const umkmRoutes: MetadataRoute.Sitemap = (umkmList || []).map((u) => ({
    url: `${baseUrl}/umkm/${u.slug}`,
    lastModified: new Date(u.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...umkmRoutes];
}
