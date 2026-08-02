'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Beranda',
      href: '/',
      isActive: pathname === '/',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 transition-all duration-200 ${active ? 'text-primary-600 scale-110' : 'text-neutral-400'}`} fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 1.5 : 1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: 'Berita',
      href: '/berita',
      isActive: pathname.startsWith('/berita'),
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 transition-all duration-200 ${active ? 'text-primary-600 scale-110' : 'text-neutral-400'}`} fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 1.5 : 1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      label: 'Layanan',
      href: '/layanan',
      isActive: pathname.startsWith('/layanan'),
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 transition-all duration-200 ${active ? 'text-primary-600 scale-110' : 'text-neutral-400'}`} fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 1.5 : 1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: 'UMKM',
      href: '/umkm',
      isActive: pathname.startsWith('/umkm'),
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 transition-all duration-200 ${active ? 'text-primary-600 scale-110' : 'text-neutral-400'}`} fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 1.5 : 1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      label: 'Aspirasi',
      href: '/#aspirasi',
      isActive: false, // Quick scroll link
      icon: (active: boolean) => (
        <div className="relative">
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          </span>
          <svg className={`w-6 h-6 text-neutral-400 group-active:text-accent-600 transition-colors duration-200`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    /* Only render on smartphone screen sizes (< md), fixed floating bottom bar */
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-50 pointer-events-none">
      <nav className="bg-white/98 border border-neutral-200/80 shadow-[0_12px_35px_rgba(0,0,0,0.16)] rounded-2xl px-2 py-2 flex items-center justify-around pointer-events-auto max-w-sm mx-auto">
        {navItems.map((item) => {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative flex flex-col items-center justify-center min-w-[58px] py-1 px-1.5 rounded-xl transition-all duration-150 active:scale-85 ${
                item.isActive 
                  ? 'bg-primary-50/80 text-primary-700 font-bold' 
                  : 'text-neutral-500 font-medium hover:text-primary-600 active:bg-neutral-100/80'
              }`}
            >
              {item.icon(item.isActive)}
              
              <span className={`text-[11px] tracking-tight mt-0.5 transition-all ${
                item.isActive ? 'font-extrabold text-primary-700' : 'text-neutral-500 font-medium'
              }`}>
                {item.label}
              </span>

              {/* Active Indicator Dot */}
              {item.isActive && (
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-0.5 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
