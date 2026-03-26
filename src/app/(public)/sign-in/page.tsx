import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { redirectIfAuthenticated } from '@/lib/auth/redirect-if-authenticated';
import { ensureSupabaseEnv } from '@/lib/auth/ensure-supabase-env';
import { AuthPageLayout } from '@/components/auth/AuthPageLayout';
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
  await redirectIfAuthenticated();
  ensureSupabaseEnv();

  const { error } = await searchParams;

  return (
    <AuthPageLayout
      namespace="signIn"
      error={error}
      emailForm={<EmailSignInForm />}
      linkHref="/sign-up"
      linkPromptKey="noAccount"
      linkLabelKey="signUp"
    />
  );
}
