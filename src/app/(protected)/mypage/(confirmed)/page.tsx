import { getTranslations } from 'next-intl/server';
import { eq } from 'drizzle-orm';
import { getAuthenticatedUser } from '@/lib/auth';
import { db, profiles } from '@/lib/db';

export default async function MyPage() {
  const user = await getAuthenticatedUser();
  const t = await getTranslations('mypage');
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user.id))
    .limit(1);

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {t('welcome', { username: profile!.username })}
      </h1>
    </div>
  );
}
