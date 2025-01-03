import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    await supabase.auth.refreshSession();
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.\.(?:svg|png|jpg|jpeg|gif|webp)$).)',
    '/api/:path',
    '/((?!api|_next/static|_next/image|favicon.ico).)',
  ],
};
