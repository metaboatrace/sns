/**
 * In-memory IP-based rate limiting.
 *
 * LIMITATION: This store is local to each process / serverless instance.
 * In a multi-instance or serverless environment (e.g., Vercel), requests
 * may be distributed across instances, reducing the effectiveness of this
 * rate limit. For production use, consider replacing with a distributed
 * store such as Redis (e.g., Upstash + @upstash/ratelimit).
 *
 * The user-ID-based rate limit (by-user.ts) uses the database and is
 * unaffected by this limitation.
 */

const store = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(request: Request): string {
  // Prefer x-real-ip set by trusted reverse proxy (e.g., Vercel)
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  // Fallback: use the rightmost X-Forwarded-For value
  // (the one appended by the trusted proxy, not the client-supplied leftmost value)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',').map(s => s.trim()).filter(Boolean);
    return ips[ips.length - 1];
  }
  return '127.0.0.1';
}

export function checkRateLimitByIp(
  ip: string,
  action: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; retryAfterMs: number } {
  const key = `${ip}:${action}`;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count < limit) {
    entry.count += 1;
    return { allowed: true, retryAfterMs: 0 };
  }

  return { allowed: false, retryAfterMs: entry.resetAt - now };
}
