import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const hostname = req.headers.get('host') || '';
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session?.user;

  // 1. Subdomain routing (ai.polutek.pl -> /kurs)
  // We apply this first.
  if (hostname.startsWith('ai.')) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/kurs', req.url));
    }
    // Avoid rewriting internal Next.js paths and API routes if they are already handled
    if (!pathname.startsWith('/api') && !pathname.startsWith('/_next') && !pathname.startsWith('/fonts')) {
       return NextResponse.rewrite(new URL(`/kurs${pathname}`, req.url));
    }
  }

  // 2. Auth logic and onboarding redirects
  const onBoardingPath = '/setup';
  const isOnAdmin = pathname.startsWith('/admin');

  // If user is logged in and is marked as first login
  if (session?.user?.isFirstLogin) {
    // Prevent redirect loop if already on setup page
    if (pathname !== onBoardingPath && !pathname.startsWith('/api')) {
       return NextResponse.redirect(new URL(onBoardingPath, req.url));
    }
    return NextResponse.next();
  }

  // If user is NOT first login but tries to access /setup, redirect to home
  if (!session?.user?.isFirstLogin && pathname === onBoardingPath) {
      return NextResponse.redirect(new URL('/', req.url));
  }

  // Admin protection
  if (isOnAdmin) {
    if (isLoggedIn) return NextResponse.next();
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images, videos (static assets)
     * - favicon.ico (favicon file)
     * - common image extensions
     */
    '/((?!api|_next/static|_next/image|images|videos|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
