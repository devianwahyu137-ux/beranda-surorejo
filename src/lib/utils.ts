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

/**
 * Kompres gambar sebelum upload (client-side)
 */
export const compressImage = (file: File, maxDimension: number = 1200, maxOutputKb: number = 400): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;

      // Scale down if too large
      if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas tidak didukung'));
      ctx.drawImage(img, 0, 0, width, height);

      // Try quality from 0.85 down to 0.5 until under MAX_OUTPUT_SIZE_KB
      let quality = 0.85;
      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error('Kompresi gagal'));
            if (blob.size > maxOutputKb * 1024 && quality > 0.5) {
              quality -= 0.1;
              tryCompress();
            } else {
              resolve(blob);
            }
          },
          'image/jpeg',
          quality
        );
      };
      tryCompress();
    };
    img.onerror = () => reject(new Error('Gagal membaca gambar'));
    img.src = objectUrl;
  });
};
