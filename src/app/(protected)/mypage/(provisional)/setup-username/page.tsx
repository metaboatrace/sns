import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { UsernameForm } from './_components/UsernameForm';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('setupUsername');
  return {
    title: t('title'),
    robots: { index: false, follow: false },
  };
}

export default async function SetupUsernamePage() {
  const t = await getTranslations('setupUsername');
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <UsernameForm />
    </div>
  );
}
