import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import JsonLd from '@/components/public/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    default: 'Beranda Surorejo — Sistem Informasi Desa',
    template: '%s | Beranda Surorejo',
  },
  description:
    'Sistem informasi Desa Surorejo, Banyuurip, Purworejo. Temukan layanan administrasi desa dan direktori UMKM lokal.',
  metadataBase: new URL(siteUrl),
  keywords: ['desa', 'surorejo', 'banyuurip', 'purworejo', 'sistem informasi desa', 'umkm', 'layanan desa'],
  authors: [{ name: 'Pemerintah Desa Surorejo' }],
  creator: 'Pemerintah Desa Surorejo',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    title: 'Beranda Surorejo — Sistem Informasi Desa',
    description: 'Sistem informasi Desa Surorejo, Banyuurip, Purworejo. Pelayanan publik dan UMKM yang lebih terintegrasi.',
    siteName: 'Beranda Surorejo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beranda Surorejo — Sistem Informasi Desa',
    description: 'Sistem informasi Desa Surorejo, Banyuurip, Purworejo.',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${inter.variable} h-full`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  );
}
