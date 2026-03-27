'use server';

import { type ActionResult, withRateLimit } from '@/lib/actions';
import { createClient } from '@/lib/supabase/server';
import { isValidEmail } from '@/lib/validations/email';

export const resendEmail = withRateLimit(
  { action: 'resendEmail', limit: 3, windowMs: 300_000 },
  async (email: string): Promise<ActionResult> => {
    if (!isValidEmail(email)) {
      return { error: 'invalidEmail' };
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
  },
);
