import 'server-only';

import { db, profiles } from '@/lib/db';
import { isUniqueViolation } from '@/lib/db/errors';
import { validateUsernameServer } from '@/lib/username/server-validation';
import { checkRateLimitByIp, checkRateLimit } from '@/lib/rate-limit';
import { hasProfile } from '@/lib/db/queries/profiles';

/** IP rate limit: 10 requests per 5 minutes */
export const IP_RATE_LIMIT_MAX = 10;
export const IP_RATE_LIMIT_WINDOW_MS = 300_000;

/** User rate limit: 5 requests per 10 minutes */
export const USER_RATE_LIMIT_MAX = 5;
export const USER_RATE_LIMIT_WINDOW_MS = 600_000;

export type SetupUsernameError =
  | { type: 'validation_error'; error: string }
  | { type: 'already_set' }
  | { type: 'username_taken' };

export type SetupUsernameResult =
  | { success: true; username: string }
  | { success: false; error: SetupUsernameError };

export function checkIpRateLimit(
  clientIp: string,
): { allowed: true } | { allowed: false; retryAfterMs: number } {
  const result = checkRateLimitByIp(clientIp, 'setupUsername', IP_RATE_LIMIT_MAX, IP_RATE_LIMIT_WINDOW_MS);
  if (!result.allowed) {
    return { allowed: false, retryAfterMs: result.retryAfterMs };
  }
  return { allowed: true };
}

export async function checkUserRateLimit(userId: string): Promise<boolean> {
  const result = await checkRateLimit(userId, 'setupUsername', USER_RATE_LIMIT_MAX, USER_RATE_LIMIT_WINDOW_MS);
  return result.allowed;
}

export async function setupUsername(
  userId: string,
  username: string,
  displayName?: string,
): Promise<SetupUsernameResult> {
  const validationError = validateUsernameServer(username);
  if (validationError) {
    return { success: false, error: { type: 'validation_error', error: validationError } };
  }

  if (await hasProfile(userId)) {
    return { success: false, error: { type: 'already_set' } };
  }

  try {
    await db.insert(profiles).values({
      id: userId,
      username,
      displayName: displayName ?? username,
    });
  } catch (err: unknown) {
    if (isUniqueViolation(err)) {
      return { success: false, error: { type: 'username_taken' } };
    }
    throw err;
  }

  return { success: true, username };
}
