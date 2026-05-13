import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_USER = process.env.ADMIN_USER ?? 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS ?? 'jcsantana2025';

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const auth = request.cookies.get('admin_auth')?.value;
  if (auth === Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString('base64')) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/admin/login', request.url));
}

export const config = {
  matcher: ['/admin/:path*'],
};
