import { redirect } from 'next/navigation';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { getAuthenticatedUser } from '@/lib/auth';
import { isUserBanned } from '@/lib/db/queries/profiles';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthenticatedUser();

  // BAN check
  if (await isUserBanned(user.id)) {
    redirect('/banned');
  }

  return <SiteLayout>{children}</SiteLayout>;
}
