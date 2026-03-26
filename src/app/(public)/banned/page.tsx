import { getTranslations } from 'next-intl/server';

export default async function BannedPage() {
  const t = await getTranslations('banned');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 text-center sm:text-left">
        <h1 className="text-3xl font-bold leading-10 tracking-tight text-foreground">
          {t('title')}
        </h1>
        <p className="max-w-md text-lg leading-8 text-muted-foreground">
          {t('description')}
        </p>
      </div>
    </div>
  );
}
