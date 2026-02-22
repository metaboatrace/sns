import type { Metadata } from 'next';

import { AuthErrorMessage } from './_components/AuthErrorMessage';
import { GoogleSignInButton } from './_components/GoogleSignInButton';

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export const metadata: Metadata = {
  title: 'サインイン',
  description: 'Googleアカウントでサインイン',
  robots: { index: false, follow: false },
};

export default async function SignInPage({ searchParams }: Props) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error(
      'Supabase environment variables are not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }

  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-semibold text-center text-black dark:text-zinc-50 mb-8">
          サインイン
        </h1>
        {error && <AuthErrorMessage />}
        <div className="mt-8">
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}
