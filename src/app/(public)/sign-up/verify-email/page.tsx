import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-semibold text-center text-black dark:text-zinc-50 mb-8">
          {t('title')}
        </h1>

        <div className="text-center space-y-3">
          <p className="text-black dark:text-zinc-50">{t('description')}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('checkInbox')}</p>
        </div>

        <div className="text-center mt-6">
          <ResendEmailButton email={email ?? ''} />
        </div>
      </div>
    </div>
  );
}
