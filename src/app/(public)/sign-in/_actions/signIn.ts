'use server';

import { type ActionResult, withRateLimit } from '@/lib/actions';
import { logActivityEvent } from '@/lib/activity-log';
import { createClient } from '@/lib/supabase/server';

export const signIn = withRateLimit(
  { action: 'signIn', limit: 10, windowMs: 300_000 },
  async (email: string, password: string): Promise<ActionResult> => {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { error: 'invalidCredentials' };
    }

    logActivityEvent({ userId: data.user.id, action: 'login' });

    return { success: true };
  },
);
