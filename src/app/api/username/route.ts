import { NextResponse } from 'next/server';
import { db, profiles } from '@/lib/db';
import { isUniqueViolation } from '@/lib/db/errors';
import { createClient } from '@/lib/supabase/server';
import { validateUsernameServer } from '@/lib/username-server';
import { getClientIp, checkRateLimitByIp } from '@/lib/rate-limit-ip';
import { checkRateLimit } from '@/lib/rate-limit';
import { hasProfile } from '@/lib/db/queries/profiles';

/** IP rate limit: 10 requests per 5 minutes */
const IP_RATE_LIMIT_MAX = 10;
const IP_RATE_LIMIT_WINDOW_MS = 300_000;

/** User rate limit: 5 requests per 10 minutes */
const USER_RATE_LIMIT_MAX = 5;
const USER_RATE_LIMIT_WINDOW_MS = 600_000;

export async function POST(request: Request) {
  // IP-based rate limiting (before auth)
  const clientIp = getClientIp(request);
  const ipCheck = checkRateLimitByIp(clientIp, 'setupUsername', IP_RATE_LIMIT_MAX, IP_RATE_LIMIT_WINDOW_MS);
  if (!ipCheck.allowed) {
    const retryAfterSeconds = Math.ceil(ipCheck.retryAfterMs / 1000);
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
  const userCheck = await checkRateLimit(user.id, 'setupUsername', USER_RATE_LIMIT_MAX, USER_RATE_LIMIT_WINDOW_MS);
  if (!userCheck.allowed) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: { username?: string; displayName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }
  const username = body.username?.trim().toLowerCase();
  const displayName = body.displayName?.trim() || undefined;

  if (!username) {
    return NextResponse.json({ error: 'username_required' }, { status: 400 });
  }

  const validationError = validateUsernameServer(username);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // Check if the user already has a profile
  if (await hasProfile(user.id)) {
    return NextResponse.json({ error: 'already_set' }, { status: 409 });
  }

  try {
    await db.insert(profiles).values({
      id: user.id,
      username,
      displayName: displayName ?? username,
    });
  } catch (err: unknown) {
    if (isUniqueViolation(err)) {
      return NextResponse.json({ error: 'username_taken' }, { status: 409 });
    }
    throw err;
  }

  return NextResponse.json({ success: true, username });
}
