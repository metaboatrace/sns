import { getTranslations } from 'next-intl/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { getProfileByUserId } from '@/lib/db/queries/profiles';

export default async function MyPage() {
  const user = await getAuthenticatedUser();
  const t = await getTranslations('mypage');
  const profile = await getProfileByUserId(user.id);

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {t('welcome', { username: profile!.username })}
      </h1>
    </div>
  );
}
