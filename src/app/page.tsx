import Link from "next/link";
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('Home');

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
      <div>
        <Link
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-primary-foreground transition-colors hover:bg-primary/90 md:w-[158px]"
          href="/races"
        >
          {t('raceList')}
        </Link>
      </div>
    </div>
  );
}
