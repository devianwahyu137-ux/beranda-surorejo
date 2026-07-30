const names = [
  ['Margino', 'Kepala Desa', 1],
  ['Suwardi', 'Sekretaris Desa', 2],
  ['Ponidjo', 'Kepala Seksi Pemerintahan', 3],
  ['Sudrajad', 'Kepala Urusan T.U & Umum', 4],
  ['Liana D.S', 'Kepala Urusan Perencanaan', 5],
  ['Samngani', 'Kepala Seksi Pelayanan', 6],
  ['Adilla S', 'Kepala Urusan Keuangan', 7],
  ['Dalyono', 'Kepala Seksi Kesejahteraan', 8],
  ['Agung Supangkat', 'Kepala Dusun Surobayan', 9],
  ['Budi Santoso', 'Kepala Dusun Kleben', 10],
  ['Ari F.', 'Kepala Dusun Kragilan Lor', 11],
  ['Gian Bisono', 'Kepala Dusun Kragilan Kidul', 12],
  ['Usman', 'Kepala Dusun Kenanggulan', 13],
  ['Dimas', 'Kepala Dusun Kiyudan', 14]
];

const files = [
  "1784712179073.jpg",
  "1784712211577.jpg",
  "1784712250476.jpg",
  "1784712301523.jpg",
  "1784712330525.jpg",
  "1784712360716.jpg",
  "1784712397112.jpg",
  "1784712426349.jpg",
  "1784712460092.jpg",
  "1784712484606.jpg",
  "1784712521618.jpg",
  "1784712548128.jpg",
  "1784712597347.jpg",
  "1784712620877.jpg"
];

const baseUrl = "https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/";

const values = names.map((n, i) => {
  return `  ('${n[0]}', '${n[1]}', ${n[2]}, '${baseUrl}${files[i]}')`;
}).join(',\n');

console.log(values);
