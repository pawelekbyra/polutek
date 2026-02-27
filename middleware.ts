import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const onBoardingPath = '/setup';

export default auth((req) => {
  const { nextUrl } = req;
  const hostname = req.headers.get("host");

  const isEliksirDomain = hostname === "eliksir-wiedzmina.pl" || hostname === "www.eliksir-wiedzmina.pl";
  const isAiDomain = hostname === "vibecoding.polutek.pl" || hostname === "www.vibecoding.polutek.pl";

  if (isEliksirDomain) {
    // No rewrite for eliksir-wiedzmina.pl anymore,
    // it should go to the main page.tsx (password protected)
  }

  if (isAiDomain) {
    const isSeoFile = nextUrl.pathname === "/robots.txt" || nextUrl.pathname === "/sitemap.xml";
    if (!nextUrl.pathname.startsWith("/vibe-public") && !isSeoFile) {
      return NextResponse.rewrite(new URL(`/vibe-public${nextUrl.pathname}`, req.url));
    }
  }

  const session = req.auth;
  const isLoggedIn = !!session?.user;

  const isOnAdmin = nextUrl.pathname.startsWith('/admin');

  // If user is logged in and is marked as first login
  if (session?.user?.isFirstLogin) {
    // Prevent redirect loop if already on setup page or hitting an API/resource
    if (nextUrl.pathname !== onBoardingPath) {
       return NextResponse.redirect(new URL(onBoardingPath, nextUrl));
    }
    return NextResponse.next();
  }

  // If user is NOT first login but tries to access /setup, redirect to home
  if (!session?.user?.isFirstLogin && nextUrl.pathname === onBoardingPath) {
      return NextResponse.redirect(new URL('/', nextUrl));
  }

  if (isOnAdmin) {
    if (isLoggedIn) return NextResponse.next();
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|images|videos|favicon.ico).*)'],
};
