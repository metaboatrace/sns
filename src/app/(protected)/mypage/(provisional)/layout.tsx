import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth';
import { hasProfile } from '@/lib/db/queries/profiles';

export default async function ProvisionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (await hasProfile(user.id)) {
    redirect('/mypage');
  }

  return <>{children}</>;
}
