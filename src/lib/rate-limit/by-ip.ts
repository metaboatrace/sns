const store = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
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
