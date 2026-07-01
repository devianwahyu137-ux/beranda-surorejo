import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// Next.js 16+ proxy file — use default export
export default async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Only run on /admin/* routes.
     * Public pages (/, /profil, /layanan, /umkm) do NOT need auth middleware —
     * this is the key fix for slow page transitions on public-facing pages.
     */
    '/admin/:path*',
  ],
};
