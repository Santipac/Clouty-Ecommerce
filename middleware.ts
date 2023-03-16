import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// TODO: Find the way to fix the middleware redirection

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const loginPage = '/auth/login';

    // Check if we're already on the login page to avoid redirect loop
    if (requestedPage === loginPage) {
      return NextResponse.next();
    }

    const url = req.nextUrl.clone();
    url.pathname = loginPage;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/address', '/checkout/summary'],
};
