import { STALE_DAYS } from './constants';

/**
 * Cek apakah data sudah melewati ambang kebasian (90 hari).
 */
export function isStale(lastVerifiedAt: string | Date): boolean {
  const verifiedDate = new Date(lastVerifiedAt);
  const now = new Date();
  const diffMs = now.getTime() - verifiedDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays > STALE_DAYS;
}

/**
 * Format tanggal verifikasi terakhir ke format Indonesia.
 * Contoh: "15 Juni 2025"
 */
export function formatVerifiedDate(lastVerifiedAt: string | Date): string {
  const date = new Date(lastVerifiedAt);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Hitung jumlah hari sejak terakhir diverifikasi.
 */
export function daysSinceVerified(lastVerifiedAt: string | Date): number {
  const verifiedDate = new Date(lastVerifiedAt);
  const now = new Date();
  const diffMs = now.getTime() - verifiedDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
