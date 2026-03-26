import { headers } from 'next/headers';

/**
 * Extract the client IP address from header values (pure function).
 *
 * Strategy:
 * 1. Prefer x-real-ip set by trusted reverse proxy (e.g., Vercel)
 * 2. Fallback: use the rightmost x-forwarded-for value
 *    (appended by the trusted proxy, not the client-supplied leftmost value)
 * 3. Final fallback: the provided defaultIp
 */
export function extractClientIp(
  realIp: string | null,
  forwardedFor: string | null,
  defaultIp: string = 'unknown',
): string {
  if (realIp) return realIp.trim();

  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(s => s.trim()).filter(Boolean);
    if (ips.length > 0) {
      return ips[ips.length - 1];
    }
  }

  return defaultIp;
}

/**
 * Extract the client IP address from next/headers.
 * For use in Server Actions and Server Components (not Route Handlers).
 */
export async function getClientIp(): Promise<string> {
  const headersList = await headers();

  return extractClientIp(
    headersList.get('x-real-ip'),
    headersList.get('x-forwarded-for'),
    'unknown',
  );
}

/**
 * Extract the client IP address from a Request object.
 * For use in Route Handlers.
 */
export function getClientIpFromRequest(request: Request): string {
  return extractClientIp(
    request.headers.get('x-real-ip'),
    request.headers.get('x-forwarded-for'),
    '127.0.0.1',
  );
}
