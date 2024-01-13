import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    // Providers will be added in auth.ts
  ],
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isUnderAdmin = nextUrl.pathname.startsWith('/admin');
      if (!isUnderAdmin) {
        return true;
      }

      const isLoggedIn = !!auth?.user;
      if (isLoggedIn && nextUrl.pathname === '/admin/login') {
        return Response.redirect(new URL('/admin/dashboard', nextUrl));
      }
      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;
