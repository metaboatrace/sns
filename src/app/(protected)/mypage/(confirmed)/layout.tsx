// This layout guards the confirmed (post-profile-setup) area.
// Authentication is handled by the parent (protected) layout.
// getAuthenticatedUser() is called here for the user ID, but the actual
// auth check is cached and does not result in an additional request.
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
