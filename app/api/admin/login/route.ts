import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USER = process.env.ADMIN_USER ?? 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS ?? 'jcsantana2025';

export async function POST(request: Request) {
  const { user, pass } = await request.json();

  if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString('base64');
  const cookieStore = await cookies();

  cookieStore.set('admin_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return NextResponse.json({ ok: true });
}
