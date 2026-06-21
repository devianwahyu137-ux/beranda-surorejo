/**
 * Utility untuk menggabungkan class names secara kondisional.
 * Sederhana, tanpa dependensi tambahan.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Truncate teks ke panjang maksimum dengan ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}
