/**
 * Generate slug dari nama (lowercase, strip non-alfanumerik, ganti spasi dengan dash).
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // hapus karakter non-alfanumerik
    .replace(/\s+/g, '-')          // ganti spasi dengan dash
    .replace(/-+/g, '-')           // collapse multiple dashes
    .replace(/^-|-$/g, '');        // trim dashes
}

/**
 * Pastikan slug unik dengan menambahkan sufiks angka jika perlu.
 * @param baseSlug - slug yang di-generate dari nama
 * @param existingSlugs - array slug yang sudah ada di database
 * @returns slug unik
 */
export function ensureUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  let candidate = `${baseSlug}-${counter}`;
  while (existingSlugs.includes(candidate)) {
    counter++;
    candidate = `${baseSlug}-${counter}`;
  }
  return candidate;
}
