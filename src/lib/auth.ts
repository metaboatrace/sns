import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { authConfig } from '@/config/auth.config';
import prisma from '@/db/prisma';

async function getAdmin(email: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email: email
      }
    });
    return admin;
  } catch (error) {
    console.error('Failed to fetch admin:', error);
    throw new Error('Failed to fetch admin.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const admin = await getAdmin(email);
          if (!admin) return null;

          const passwordsMatch = await bcrypt.compare(password, admin.password);
          if (passwordsMatch) return admin;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
