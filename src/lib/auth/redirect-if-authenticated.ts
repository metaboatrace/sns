import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Redirects authenticated users to /mypage.
 * Call at the top of sign-in / sign-up server pages.
 */
export async function redirectIfAuthenticated(): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    redirect('/mypage');
  }
}
