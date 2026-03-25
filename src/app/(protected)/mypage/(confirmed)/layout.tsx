import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { getAuthenticatedUser } from '@/lib/auth';
import { db, profiles } from '@/lib/db';

export default async function ConfirmedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();
  const [profile] = await db
    .select({ username: profiles.username })
    .from(profiles)
    .where(eq(profiles.id, user.id))
    .limit(1);

  if (!profile) {
    redirect('/mypage/setup-username');
  }

  return <>{children}</>;
}
