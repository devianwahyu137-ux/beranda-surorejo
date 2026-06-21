/**
 * Normalisasi nomor telepon ke format internasional (62xxx).
 * - Hapus non-digit
 * - Ganti awalan 0 dengan 62
 * - Ganti awalan +62 dengan 62
 */
export function normalizePhoneNumber(raw: string): string {
  let digits = raw.replace(/\D/g, '');

  if (digits.startsWith('0')) {
    digits = '62' + digits.slice(1);
  } else if (digits.startsWith('62')) {
    // sudah benar
  } else if (digits.startsWith('+62')) {
    digits = digits.slice(1); // hapus +
  }

  return digits;
}

/**
 * Bangun deep link WhatsApp ke pemilik UMKM dengan pesan prefilled.
 */
export function buildOwnerWaLink(whatsappNumber: string, businessName: string): string {
  const normalized = normalizePhoneNumber(whatsappNumber);
  const text = encodeURIComponent(
    `Halo, saya melihat ${businessName} di Beranda Surorejo. Saya ingin bertanya...`
  );
  return `https://wa.me/${normalized}?text=${text}`;
}

/**
 * Bangun deep link WhatsApp ke admin untuk perbarui info UMKM.
 */
export function buildUpdateInfoLink(businessName: string): string {
  const adminWa = process.env.NEXT_PUBLIC_ADMIN_WA || '';
  const normalized = normalizePhoneNumber(adminWa);
  const text = encodeURIComponent(
    `[UPDATE UMKM] Nama usaha: ${businessName}. Yang ingin diperbarui: `
  );
  return `https://wa.me/${normalized}?text=${text}`;
}

/**
 * Bangun link telepon.
 */
export function buildPhoneLink(phoneNumber: string): string {
  const normalized = normalizePhoneNumber(phoneNumber);
  return `tel:+${normalized}`;
}
