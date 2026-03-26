import { checkServerActionRateLimit } from '@/lib/rate-limit';
import type { ActionResult } from './types';

interface RateLimitOptions {
  /** A unique key identifying this action (used as the rate-limit bucket). */
  action: string;
  /** Maximum number of requests allowed within the window. */
  limit: number;
  /** Time window in milliseconds. */
  windowMs: number;
}

/**
 * Wraps a Server Action with IP-based rate limiting.
 *
 * If the rate limit is exceeded, returns `{ error: 'rateLimited' }` immediately.
 * Otherwise, delegates to the provided `handler` function.
 */
export function withRateLimit<Args extends unknown[]>(
  options: RateLimitOptions,
  handler: (...args: Args) => Promise<ActionResult>,
): (...args: Args) => Promise<ActionResult> {
  return async (...args: Args): Promise<ActionResult> => {
    const allowed = await checkServerActionRateLimit(
      options.action,
      options.limit,
      options.windowMs,
    );
    if (!allowed) {
      return { error: 'rateLimited' };
    }
    return handler(...args);
  };
}
