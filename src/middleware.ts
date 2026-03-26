import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect the CMS routes
  if (request.nextUrl.pathname.startsWith('/cms')) {
    // Exclude the login page from protection
    if (request.nextUrl.pathname === '/cms/login') {
      return NextResponse.next();
    }

    const authCookie = request.cookies.get('cms_auth')?.value;

    // Verify token (in production, use a secure secret signature or JWT)
    if (authCookie !== 'authenticated') {
      const loginUrl = new URL('/cms/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/cms/:path*',
};
