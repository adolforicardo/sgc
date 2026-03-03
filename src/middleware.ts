import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware - Route protection
 * Note: Auth state is client-side (sessionStorage) so we only redirect
 * public routes. Full protection happens in dashboard layout.
 */
export function middleware(request: NextRequest) {
  // Allow static assets and API
  if (request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
