import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CenteredAuthContainer } from '@/components/auth/CenteredAuthContainer';

import { ResendEmailButton } from './_components';

type Props = {
  searchParams: Promise<{ email?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('verifyEmail');
  return {
    title: t('title'),
    robots: { index: false, follow: false },
  };
}

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { email } = await searchParams;
  const t = await getTranslations('verifyEmail');

  return (
    <CenteredAuthContainer title={t('title')}>
      <div className="text-center space-y-3">
        <p className="text-foreground">{t('description')}</p>
        <p className="text-sm text-muted-foreground">{t('checkInbox')}</p>
      </div>

      <div className="text-center mt-6">
        <ResendEmailButton email={email ?? ''} />
      </div>
    </CenteredAuthContainer>
  );
}
