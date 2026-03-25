import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, profiles } from '@/lib/db';
import { createClient } from '@/lib/supabase/server';
import { validateUsername } from '@/lib/username';
import { getClientIp, checkRateLimitByIp } from '@/lib/rate-limit-ip';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  // TODO: Lame-name filtering

  // IP-based rate limiting (before auth)
  const clientIp = getClientIp(request);
  const ipCheck = checkRateLimitByIp(clientIp, 'setupUsername', 10, 300_000);
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
  const userCheck = await checkRateLimit(user.id, 'setupUsername', 5, 600_000);
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

  const validationError = validateUsername(username);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // Check if the user already has a profile
  const existing = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.id, user.id))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json({ error: 'already_set' }, { status: 409 });
  }

  try {
    await db.insert(profiles).values({
      id: user.id,
      username,
      displayName: displayName ?? username,
    });
  } catch (err: unknown) {
    // UNIQUE constraint violation (PostgreSQL error code 23505)
    if (
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      (err as { code: string }).code === '23505'
    ) {
      return NextResponse.json({ error: 'username_taken' }, { status: 409 });
    }
    throw err;
  }

  return NextResponse.json({ success: true, username });
}
