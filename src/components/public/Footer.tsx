import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { VILLAGE_NAME, PUBLIC_NAV } from '@/lib/constants';

export default async function Footer() {
  const supabase = await createClient();
  const { data: kontakPage } = await supabase
    .from('page')
    .select('content')
    .eq('slug', 'kontak')
    .single();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Village Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BS</span>
              </div>
              <span className="font-bold text-lg text-white">{VILLAGE_NAME}</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Sistem informasi desa untuk kemudahan akses layanan administrasi dan direktori UMKM lokal.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigasi</h3>
            <ul className="space-y-2">
              {PUBLIC_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact from DB */}
          <div>
            <h3 className="font-semibold text-white mb-4">Kontak</h3>
            {kontakPage?.content ? (
              <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line">
                {kontakPage.content}
              </p>
            ) : (
              <p className="text-sm text-neutral-500 italic">
                Informasi kontak belum tersedia.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} {VILLAGE_NAME}. Beranda Surorejo.
          </p>
          <p className="text-xs text-neutral-600">
            Dibuat dengan ❤️ untuk Desa Surorejo
          </p>
        </div>
      </div>
    </footer>
  );
}
