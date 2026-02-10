import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  // Check for "ai" subdomain (production: ai.polutek.pl, local: ai.localhost:3000)
  if (hostname.startsWith('ai.')) {
    // If the user is on the root of the subdomain, show the course page
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/kurs', request.url))
    }
    // If accessing subpaths on the subdomain, rewrite them to /kurs/subpath
    return NextResponse.rewrite(new URL(`/kurs${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
