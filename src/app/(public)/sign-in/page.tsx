import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { createClient } from '@/lib/supabase/server';
import { AuthErrorMessage } from './_components/AuthErrorMessage';
import { GoogleSignInButton } from './_components/GoogleSignInButton';
import { EmailSignInForm } from './_components/EmailSignInForm';

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('signIn');
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default async function SignInPage({ searchParams }: Props) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    redirect('/mypage');
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error(
      'Supabase environment variables are not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }

  const { error } = await searchParams;
  const t = await getTranslations('signIn');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-semibold text-center text-black dark:text-zinc-50 mb-8">
          {t('title')}
        </h1>
        {error && <AuthErrorMessage />}

        <div className="mt-4">
          <GoogleSignInButton />
        </div>

        <div className="flex items-center gap-4 max-w-sm mx-auto my-6">
          <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{t('orDivider')}</span>
          <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
        </div>

        <EmailSignInForm />

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {t('noAccount')}{' '}
          <Link href="/sign-up" className="text-blue-600 dark:text-blue-400 hover:underline">
            {t('signUp')}
          </Link>
        </p>
      </div>
    </div>
  );
}
