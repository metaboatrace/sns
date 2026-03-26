import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { AuthErrorMessage } from '@/components/auth/AuthErrorMessage';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

type Props = {
  /** i18n namespace: 'signIn' | 'signUp' */
  namespace: 'signIn' | 'signUp';
  error?: string;
  /** The email form component (EmailSignInForm or EmailSignUpForm) */
  emailForm: React.ReactNode;
  /** Link target (e.g. '/sign-up' or '/sign-in') */
  linkHref: string;
  /** i18n key for the prompt text (e.g. 'noAccount' or 'alreadyHaveAccount') */
  linkPromptKey: string;
  /** i18n key for the link label (e.g. 'signUp' or 'signIn') */
  linkLabelKey: string;
};

export async function AuthPageLayout({
  namespace,
  error,
  emailForm,
  linkHref,
  linkPromptKey,
  linkLabelKey,
}: Props) {
  const t = await getTranslations(namespace);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-semibold text-center text-black dark:text-zinc-50 mb-8">
          {t('title')}
        </h1>

        {error && <AuthErrorMessage namespace={namespace} />}

        <div className="mt-4">
          <GoogleSignInButton namespace={namespace} />
        </div>

        <div className="flex items-center gap-4 max-w-sm mx-auto my-6">
          <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{t('orDivider')}</span>
          <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
        </div>

        {emailForm}

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {t(linkPromptKey)}{' '}
          <Link href={linkHref} className="text-blue-600 dark:text-blue-400 hover:underline">
            {t(linkLabelKey)}
          </Link>
        </p>
      </div>
    </div>
  );
}
