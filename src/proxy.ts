import { neonAuthMiddleware } from '@neondatabase/auth/next/server';

export default neonAuthMiddleware({
   loginUrl: '/auth/sign-in',
});

export const config = {
  matcher: [
    // Protected routes requiring authentication
    '/dashboard',
  ],
};

// import { NextRequest, NextResponse } from 'next/server';

// /**
//  * Middleware that delegates to Neon Auth's middleware when configured.
//  * Falls back to a no-op if `NEON_AUTH_BASE_URL` is not present.
//  */
// export default async function middleware(req: NextRequest) {
//   if (process.env.NEON_AUTH_BASE_URL) {
//     const { neonAuthMiddleware } = await import('@neondatabase/auth/next/server');
//     const handler = neonAuthMiddleware({ loginUrl: '/auth/sign-in' });
//     return handler(req);
//   }

//   // No Neon Auth configured — allow the request through.
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     // Protect dashboard pages
//     '/dashboard/:path*',
//   ],
// };