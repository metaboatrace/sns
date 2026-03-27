import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { AuthErrorMessage } from './AuthErrorMessage';
import { CenteredAuthContainer } from './CenteredAuthContainer';
import { GoogleSignInButton } from './GoogleSignInButton';

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
    <CenteredAuthContainer title={t('title')}>
      {error && <AuthErrorMessage namespace={namespace} />}

      <div className="mt-4">
        <GoogleSignInButton namespace={namespace} />
      </div>

      <div className="flex items-center gap-4 max-w-sm mx-auto my-6">
        <div className="flex-1 border-t border-border" />
        <span className="text-sm text-muted-foreground">{t('orDivider')}</span>
        <div className="flex-1 border-t border-border" />
      </div>

      {emailForm}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t(linkPromptKey)}{' '}
        <Link href={linkHref} className="text-primary hover:underline">
          {t(linkLabelKey)}
        </Link>
      </p>
    </CenteredAuthContainer>
  );
}
