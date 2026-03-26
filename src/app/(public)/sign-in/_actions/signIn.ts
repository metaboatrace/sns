'use server';

import { checkServerActionRateLimit } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';

/** IP rate limit: 10 requests per 5 minutes */
const IP_RATE_LIMIT_MAX = 10;
const IP_RATE_LIMIT_WINDOW_MS = 300_000;

export type SignInResult = { error: string } | { success: true };

export async function signIn(email: string, password: string): Promise<SignInResult> {
  const allowed = await checkServerActionRateLimit('signIn', IP_RATE_LIMIT_MAX, IP_RATE_LIMIT_WINDOW_MS);
  if (!allowed) {
    return { error: 'rateLimited' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: 'invalidCredentials' };
  }

  return { success: true };
}
