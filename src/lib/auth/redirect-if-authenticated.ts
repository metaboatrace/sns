import { redirect } from 'next/navigation';
import { getOptionalUser } from './get-user';

/**
 * Redirects authenticated users to /mypage.
 * Call at the top of sign-in / sign-up server pages.
 */
export async function redirectIfAuthenticated(): Promise<void> {
  const user = await getOptionalUser();
  if (user) {
    redirect('/mypage');
  }
}
