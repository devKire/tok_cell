// app/api/admin/verify/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USER = process.env.ADMIN_USER ?? 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS ?? 'tokcell2025';

export async function GET() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth')?.value;

  const expectedToken = Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString(
    'base64'
  );

  if (auth === expectedToken) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
