import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getClientIp } from '@/lib/rate-limit';
import { checkIpRateLimit, checkUserRateLimit, setupUsername } from '@/lib/services/username-setup';

export async function POST(request: Request) {
  // IP-based rate limiting (before auth)
  const clientIp = getClientIp(request);
  const ipCheck = checkIpRateLimit(clientIp);
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
  if (!(await checkUserRateLimit(user.id))) {
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
