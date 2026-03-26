/**
 * Sign Up Page
 *
 * @description
 * Registration page using Google OAuth or email/password.
 * Since OAuth treats sign-up and sign-in as the same operation (signInWithOAuth),
 * existing users authenticating from this page are silently logged in.
 */
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { redirectIfAuthenticated } from '@/lib/auth';
import { AuthPageLayout } from '@/components/auth/AuthPageLayout';
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
  await redirectIfAuthenticated();

  const { error } = await searchParams;

  return (
    <AuthPageLayout
      namespace="signUp"
      error={error}
      emailForm={<EmailSignUpForm />}
      linkHref="/sign-in"
      linkPromptKey="alreadyHaveAccount"
      linkLabelKey="signIn"
    />
  );
}
