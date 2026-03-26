import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getClientIp, checkRateLimitByIp, checkRateLimit } from '@/lib/rate-limit';
import { DISPLAY_NAME_MAX_LENGTH } from '@/lib/username';
import { setupUsername } from '@/lib/services/username-setup';

/** IP rate limit: 10 requests per 5 minutes */
const IP_RATE_LIMIT_MAX = 10;
const IP_RATE_LIMIT_WINDOW_MS = 300_000;

/** User rate limit: 5 requests per 10 minutes */
const USER_RATE_LIMIT_MAX = 5;
const USER_RATE_LIMIT_WINDOW_MS = 600_000;

export async function POST(request: Request) {
  // IP-based rate limiting (before auth)
  const clientIp = getClientIp(request);
  const ipResult = checkRateLimitByIp(clientIp, 'setupUsername', IP_RATE_LIMIT_MAX, IP_RATE_LIMIT_WINDOW_MS);
  if (!ipResult.allowed) {
    const retryAfterSeconds = Math.ceil(ipResult.retryAfterMs / 1000);
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // User-ID-based rate limiting (after auth)
  const userResult = await checkRateLimit(user.id, 'setupUsername', USER_RATE_LIMIT_MAX, USER_RATE_LIMIT_WINDOW_MS);
  if (!userResult.allowed) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: { username?: string; displayName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }
  const username = body.username?.trim().toLowerCase();
  const displayName = body.displayName?.trim().slice(0, DISPLAY_NAME_MAX_LENGTH) || undefined;

  if (!username) {
    return NextResponse.json({ error: 'username_required' }, { status: 400 });
  }

  const result = await setupUsername(user.id, username, displayName);

  if (!result.success) {
    switch (result.error.type) {
      case 'validation_error':
        return NextResponse.json({ error: result.error.error }, { status: 400 });
      case 'already_set':
        return NextResponse.json({ error: 'already_set' }, { status: 409 });
      case 'username_taken':
        return NextResponse.json({ error: 'username_taken' }, { status: 409 });
      default: {
        const _exhaustive: never = result.error;
        return NextResponse.json({ error: 'unexpected_error' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ success: true, username: result.username });
}
