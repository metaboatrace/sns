import { headers } from 'next/headers';

/**
 * Extract the client IP address from request headers.
 * For use in Server Actions and Server Components (not Route Handlers).
 *
 * Uses the same strategy as rate-limit/by-ip.ts:
 * 1. Prefer x-real-ip set by trusted reverse proxy (e.g., Vercel)
 * 2. Fallback: use the rightmost x-forwarded-for value
 *    (appended by the trusted proxy, not the client-supplied leftmost value)
 * 3. Final fallback: 'unknown' (ensures rate limiting is never skipped)
 */
export async function getClientIp(): Promise<string> {
  const headersList = await headers();

  const realIp = headersList.get('x-real-ip');
  if (realIp) return realIp.trim();

  const forwarded = headersList.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',').map(s => s.trim()).filter(Boolean);
    if (ips.length > 0) {
      return ips[ips.length - 1];
    }
  }

  return 'unknown';
}
