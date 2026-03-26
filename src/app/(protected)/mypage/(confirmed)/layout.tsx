import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth';
import { hasProfile } from '@/lib/db/queries/profiles';

export default async function ConfirmedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (!(await hasProfile(user.id))) {
    redirect('/mypage/setup-username');
  }

  return <>{children}</>;
}
