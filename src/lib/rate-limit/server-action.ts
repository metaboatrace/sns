import { getClientIp } from '@/lib/client-ip';
import { checkRateLimitByIp } from './by-ip';

/**
 * Check IP-based rate limit for a Server Action.
 * Returns true if the request is allowed, false if rate-limited.
 */
export async function checkServerActionRateLimit(
  action: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  const ip = await getClientIp();
  const { allowed } = checkRateLimitByIp(ip, action, limit, windowMs);
  return allowed;
}
