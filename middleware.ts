import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
// This function can be marked `async` if using `await` inside
export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const validRoles = ['admin', 'SEO'];

  const requestedPage = req.nextUrl.pathname;

  if (requestedPage.startsWith('/checkout')) {
    if (!session) {
      const url = req.nextUrl.clone();
      const loginPage = '/auth/login';
      url.pathname = loginPage;
      url.search = `page=${requestedPage}`;

      return NextResponse.redirect(new URL(url));
    }
  }

  const { role } = req.nextauth.token?.user as any;

  if (requestedPage.includes('/api/admin') && !validRoles.includes(role)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  if (requestedPage.includes('/admin') && !validRoles.includes(role)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (requestedPage.startsWith('/admin/products/new')) {
    if (role !== 'SEO') {
      return NextResponse.redirect(new URL('/admin/products', req.url));
    }
  }

  return NextResponse.next();
});
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};
