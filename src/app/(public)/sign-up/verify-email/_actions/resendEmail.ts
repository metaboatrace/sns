'use server';

import { checkServerActionRateLimit } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';

/** IP rate limit: 3 requests per 5 minutes */
const IP_RATE_LIMIT_MAX = 3;
const IP_RATE_LIMIT_WINDOW_MS = 300_000;

export type ResendEmailResult = { success: true } | { error: string };

export async function resendEmail(email: string): Promise<ResendEmailResult> {
  const allowed = await checkServerActionRateLimit('resendEmail', IP_RATE_LIMIT_MAX, IP_RATE_LIMIT_WINDOW_MS);
  if (!allowed) {
    return { error: 'rateLimited' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });

  if (error) {
    return { error: 'resendFailed' };
  }

  return { success: true };
}
