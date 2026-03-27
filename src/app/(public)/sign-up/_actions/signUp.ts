'use server';

import { SITE_URL } from '@/config';
import { type ActionResult, withRateLimit } from '@/lib/actions';
import { createClient } from '@/lib/supabase/server';
import { isValidEmail } from '@/lib/validations/email';
import { getPasswordValidationError } from '@/lib/validations/password';

export const signUp = withRateLimit(
  { action: 'signUp', limit: 5, windowMs: 300_000 },
  async (email: string, password: string): Promise<ActionResult> => {
    if (!isValidEmail(email)) {
      return { error: 'invalidEmail' };
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
  },
);
