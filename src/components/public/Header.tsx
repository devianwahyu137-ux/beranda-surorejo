'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PUBLIC_NAV, VILLAGE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Optimized scroll detection with requestAnimationFrame for 60fps smoothness without lag
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll(); // Check initial scroll state
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  // Transparent only on home page when at top and mobile menu closed
  const isTransparent = isHome && !isScrolled && !mobileMenuOpen;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-200 ease-in-out',
        isTransparent
          ? 'bg-transparent border-b border-transparent text-white'
          : 'bg-white/98 border-b border-neutral-200 text-neutral-900 shadow-sm'
      )}
    >
      <div className="container-page">
        <div className="flex items-center justify-between h-16 sm:h-20 transition-all duration-300">
          {/* Logo & Cross-link */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div
                className={cn(
                  'w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden flex items-center justify-center border shadow-sm relative transition-all duration-300',
                  isTransparent ? 'border-white/30 bg-white/10 backdrop-blur-sm group-hover:scale-105' : 'border-neutral-100 bg-white group-hover:scale-105'
                )}
              >
                <Image src="/logo tugu tani.png" alt="Logo Desa" fill sizes="40px" className="object-cover p-0.5" />
              </div>
              <span
                className={cn(
                  'font-bold text-lg sm:text-xl transition-colors tracking-tight',
                  isTransparent
                    ? 'text-white group-hover:text-primary-200'
                    : 'text-neutral-900 group-hover:text-primary-700'
                )}
              >
                {VILLAGE_NAME}
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5">
            {PUBLIC_NAV.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? isTransparent
                        ? 'bg-white/20 text-white font-semibold shadow-sm backdrop-blur-md'
                        : 'bg-primary-50 text-primary-700 font-semibold'
                      : isTransparent
                      ? 'text-white/90 hover:bg-white/15 hover:text-white'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              'md:hidden p-2 rounded-xl transition-colors touch-target',
              isTransparent
                ? 'text-white hover:bg-white/15'
                : 'text-neutral-600 hover:bg-neutral-100'
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden transition-all duration-300 ease-in-out',
            mobileMenuOpen
              ? 'max-h-[calc(100vh-5rem)] overflow-y-auto pb-6 opacity-100'
              : 'max-h-0 overflow-hidden opacity-0'
          )}
        >
          <nav className="flex flex-col gap-1.5 pt-3 border-t border-neutral-200/20">
            {PUBLIC_NAV.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-xl text-base font-medium transition-colors touch-target flex items-center justify-between',
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-primary-600" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
