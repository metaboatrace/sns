'use server';

import { SITE_URL } from '@/config';

import { getClientIp } from '@/lib/client-ip';
import { checkRateLimitByIp } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';
import { getPasswordValidationError } from '@/lib/validations/password';

/** IP rate limit: 5 requests per 5 minutes */
const IP_RATE_LIMIT_MAX = 5;
const IP_RATE_LIMIT_WINDOW_MS = 300_000;

export type SignUpResult = { success: true } | { error: string };

export async function signUp(email: string, password: string): Promise<SignUpResult> {
  const ip = await getClientIp();
  const { allowed } = checkRateLimitByIp(ip, 'signUp', IP_RATE_LIMIT_MAX, IP_RATE_LIMIT_WINDOW_MS);
  if (!allowed) {
    return { error: 'rateLimited' };
  }

  const passwordError = getPasswordValidationError(password);
  if (passwordError) {
    return { error: `password:${passwordError}` };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    if (error.code === 'weak_password') {
      return { error: 'password:weak' };
    }
    return { error: 'signUpFailed' };
  }

  return { success: true };
}
