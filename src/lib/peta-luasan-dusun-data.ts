/**
 * Data deskripsi lengkap untuk modal "Baca Deskripsi" pada Peta Luasan dan Profil Dusun.
 * File ini dipisahkan dari komponen agar konten yang panjang tetap terorganisir dan mudah diperbarui.
 */

export interface UsahaDusun {
  nama: string;
  usaha: string;
}

export interface DataDusun {
  namaDusun: string;
  rt: string;
  rw: string;
  daftarUsaha: UsahaDusun[];
}

export const PETA_LUASAN_DUSUN_JUDUL =
  'Peta Luasan dan Profil Dusun di Desa Surorejo, Kecamatan Banyuurip';

export const PETA_LUASAN_DUSUN_PARAGRAF: string[] = [
  'Peta Luasan dan Profil Dusun Desa Surorejo, Kecamatan Banyuurip, memberikan informasi mengenai pembagian wilayah, letak, dan luasan masing-masing dusun yang terdapat di Desa Surorejo. Wilayah Desa Surorejo terbagi menjadi enam dusun, yaitu Dusun Surobayan, Dusun Kleben, Dusun Kragilan Lor, Dusun Kragilan Kidul, Dusun Kenanggulan, dan Dusun Kiyudan. Berdasarkan posisi pada peta, Dusun Surobayan berada di bagian utara Desa Surorejo, sedangkan Dusun Kiyudan berada di bagian selatan. Dusun lainnya, yaitu Kleben, Kenanggulan, Kragilan Lor, dan Kragilan Kidul, berada di antara dan di sekitar kedua wilayah tersebut.',
  'Dari hasil pemetaan, Dusun Surobayan memiliki luas sekitar 116.502,32 m\u00b2 atau 11,65 hektare, Dusun Kleben seluas 176.061,19 m\u00b2 atau 17,61 hektare, Dusun Kragilan Lor seluas 104.642,29 m\u00b2 atau 10,46 hektare, Dusun Kragilan Kidul seluas 200.325,23 m\u00b2 atau 20,03 hektare, Dusun Kenanggulan seluas 109.167,10 m\u00b2 atau 10,92 hektare, dan Dusun Kiyudan seluas 60.517,36 m\u00b2 atau 6,05 hektare. Berdasarkan luasan tersebut, Dusun Kragilan Kidul merupakan dusun dengan wilayah terluas, sedangkan Dusun Kiyudan memiliki wilayah dengan luasan paling kecil. Informasi mengenai letak dan luasan setiap dusun ini dapat memberikan gambaran mengenai pembagian wilayah Desa Surorejo serta menjadi informasi pendukung dalam pengelolaan potensi dan perencanaan pembangunan desa.',
  'Desa Surorejo juga  memiliki berbagai kegiatan usaha masyarakat yang tersebar di enam dusun. Jenis usaha yang dijalankan cukup beragam, mulai dari kuliner, perdagangan, peternakan, pertanian, kerajinan, hingga jasa. Berikut merupakan daftar usaha beserta nama pemiliknya berdasarkan hasil pendataan:',
];

export const PETA_LUASAN_DUSUN_DATA: DataDusun[] = [
  {
    namaDusun: 'Dusun Surobayan',
    rt: '01',
    rw: '01',
    daftarUsaha: [
      { nama: 'Yulianingsih', usaha: 'Catering/Snack' },
      { nama: 'Rohimah', usaha: 'Keterampilan Rajut' },
      { nama: 'Sri Suryani', usaha: 'Warung Kelontong' },
      { nama: 'Ahmad Hardianto', usaha: 'Warung Makan' },
      { nama: 'Andarini', usaha: 'Warung Kelontong' },
      { nama: 'Tutik Ernawati', usaha: 'Warung Kelontong dan Bakso' },
    ],
  },
  {
    namaDusun: 'Dusun Kleben',
    rt: '02',
    rw: '01',
    daftarUsaha: [
      { nama: 'Fitri Handayani', usaha: 'Catering/Snack' },
      { nama: 'Diyah Mustikawati', usaha: 'Catering/Snack' },
      { nama: 'Soyem', usaha: 'Sayur Matang' },
      { nama: 'Sulasmiarti', usaha: 'Geblek' },
      { nama: 'Sri Gemi', usaha: 'Warung Kelontong' },
      { nama: 'Tri Utami', usaha: 'Warung Jajan' },
      { nama: 'Patimah', usaha: 'Warung Kelontong' },
      { nama: 'Siti Aminah', usaha: 'Warung Kelontong' },
      { nama: 'Nur Avivah', usaha: 'Ayam Petelur' },
      { nama: 'Painah', usaha: 'Gilingan Padi' },
      { nama: 'Aminah', usaha: 'Warung Es' },
      { nama: 'Agus Warjianto', usaha: 'Bengkel' },
      { nama: 'Dwi Ningsih', usaha: 'Warung Kelontong' },
      { nama: 'Nuriyana', usaha: 'Warung Bakso' },
      { nama: 'Duwi Okiyanto', usaha: 'Jual Beli Ayam' },
    ],
  },
  {
    namaDusun: 'Dusun Kragilan Lor',
    rt: '01',
    rw: '02',
    daftarUsaha: [
      { nama: 'Aji Nugroho', usaha: 'Ayam Petelur' },
      { nama: 'Sri Wahyuni', usaha: 'Catering/Snack' },
      { nama: 'Nopi Aryanti', usaha: 'Warung Kelontong' },
      { nama: 'Waseri', usaha: 'Warung Jajan' },
      { nama: 'Rosidah', usaha: 'Ayam Potong' },
      { nama: 'Ari Fitriyanto', usaha: 'Ayam Petelur' },
      { nama: 'Masngudah', usaha: 'Catering/Snack' },
      { nama: 'Tomy', usaha: 'Penggilingan Padi' },
      { nama: 'Margo', usaha: 'Warung Kelontong' },
      { nama: 'Muhammad Nurdin', usaha: 'Jual Beli Kambing' },
    ],
  },
  {
    namaDusun: 'Dusun Kragilan Kidul',
    rt: '02',
    rw: '02',
    daftarUsaha: [
      { nama: 'Sukirnah', usaha: 'Warung Kelontong' },
      { nama: 'Susiami', usaha: 'Catering/Snack' },
      { nama: 'Partinah', usaha: 'Keterampilan Rajut' },
      { nama: 'Titin Agustina', usaha: 'Warung Kelontong' },
      { nama: 'Setyaningsih', usaha: 'Warung Pertanian' },
      { nama: 'Paikem', usaha: 'Pedagang Lotek' },
      { nama: 'Sri Murjinah', usaha: 'Pedagang Lotek' },
      { nama: 'Moh Tohir', usaha: 'Bengkel Las' },
      { nama: 'Mamik Tri W', usaha: 'Warung Gorengan' },
      { nama: 'Tumariyah', usaha: 'Catering/Snack' },
    ],
  },
  {
    namaDusun: 'Dusun Kenanggulan',
    rt: '01',
    rw: '03',
    daftarUsaha: [
      { nama: 'Sri Wiyani', usaha: 'Catering/Snack' },
      { nama: 'Suranto', usaha: 'Dawet' },
      { nama: 'Wuri Nuryanti', usaha: 'Roti' },
      { nama: 'Isnaini', usaha: 'Warung Kelontong' },
      { nama: 'Daryati', usaha: 'Warung Kelontong' },
      { nama: 'Tri Handayani', usaha: 'Jajanan' },
      { nama: 'Siswanto', usaha: 'Warung & Bengkel' },
      { nama: 'Agus', usaha: 'Potong Rambut' },
      { nama: 'Joko Sutiono', usaha: 'Ayam Potong' },
      { nama: 'Sugiarto', usaha: 'Tambal Ban' },
      { nama: 'Heri Setio', usaha: 'Es Kelapa Muda' },
      { nama: 'Triyani', usaha: 'Es Lilin' },
      { nama: 'Suroto', usaha: 'Ayam Geprek' },
      { nama: 'Mijan', usaha: 'Mebel' },
      { nama: 'Aris Sudibyo', usaha: 'Service Elektronik' },
      { nama: 'Nur Syamsudin', usaha: 'Ayam Geprek' },
      { nama: 'Asiyah', usaha: 'Dawet' },
      { nama: 'Ernawati', usaha: 'Dawet' },
      { nama: 'Karsiyem', usaha: 'Krupuk Ketela' },
      { nama: 'Sunyoto', usaha: 'Jual Beli Ternak' },
    ],
  },
  {
    namaDusun: 'Dusun Kiyudan',
    rt: '02',
    rw: '03',
    daftarUsaha: [
      { nama: 'Sugiyanti', usaha: 'Ayam Petelur' },
      { nama: 'Ike Retno W', usaha: 'Usaha Lele' },
      { nama: 'Tumarsih', usaha: 'Warung Sembako' },
      { nama: 'Indah Pratiwi', usaha: 'Warung Jajanan' },
    ],
  },
];
