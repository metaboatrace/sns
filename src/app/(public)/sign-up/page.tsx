/**
 * Sign Up Page
 *
 * @description
 * Registration page using Google OAuth or email/password.
 * Since OAuth treats sign-up and sign-in as the same operation (signInWithOAuth),
 * existing users authenticating from this page are silently logged in.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { createClient } from '@/lib/supabase/server';

import { AuthErrorMessage } from '../sign-in/_components/AuthErrorMessage';
import { GoogleSignInButton } from '../sign-in/_components/GoogleSignInButton';
import { EmailSignUpForm } from './_components';

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('signUp');
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default async function SignUpPage({ searchParams }: Props) {
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
  const t = await getTranslations('signUp');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-semibold text-center text-black dark:text-zinc-50 mb-8">
          {t('title')}
        </h1>

        {error && <AuthErrorMessage namespace="signUp" />}

        <div className="mt-4">
          <GoogleSignInButton namespace="signUp" />
        </div>

        <div className="flex items-center gap-4 max-w-sm mx-auto my-6">
          <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{t('orDivider')}</span>
          <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
        </div>

        <EmailSignUpForm />

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {t('alreadyHaveAccount')}{' '}
          <Link href="/sign-in" className="text-blue-600 dark:text-blue-400 hover:underline">
            {t('signIn')}
          </Link>
        </p>
      </div>
    </div>
  );
}
