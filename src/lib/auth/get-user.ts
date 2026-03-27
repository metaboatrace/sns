import { cache } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Get the authenticated user, redirecting to sign-in if not authenticated.
 * Cached per-request via React's `cache()`.
 */
export const getAuthenticatedUser = cache(async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/sign-in');
  }
  return user;
});

/**
 * Get the current user if authenticated, or null.
 * Cached per-request via React's `cache()`.
 */
export const getOptionalUser = cache(async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
});
