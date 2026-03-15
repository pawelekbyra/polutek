import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

let locales = ['pl', 'en', 'es', 'de', 'fr']

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  // For this project, we default to 'pl' if not specified
  return 'pl'
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale || pathname === '/') return

  // Redirect if there is no locale and not root
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|favicon.ico|images|pdf|fonts|api).*)',
    // Optional: only run on root (/)
    // '/'
  ],
}
