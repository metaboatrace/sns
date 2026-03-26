import { NextResponse } from 'next/server';

import { logActivityEvent } from '@/lib/activity-log';
import { createClient } from '@/lib/supabase/server';
import { hasProfile } from '@/lib/db/queries/profiles';

const VALID_OTP_TYPES = ['signup', 'recovery'] as const;
type ValidOtpType = (typeof VALID_OTP_TYPES)[number];

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/mypage';
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/';

  const supabase = await createClient();
  let authSuccess = false;

  // パターン1&2: OAuth / PKCE
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    authSuccess = !error;
  } else if (tokenHash && type && VALID_OTP_TYPES.includes(type as ValidOtpType)) {
    // パターン3&4: OTP (メール確認 / パスワードリセット)
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as ValidOtpType,
    });
    authSuccess = !error;
  }

  if (!authSuccess) {
    return NextResponse.redirect(`${origin}/sign-in?error=auth_callback_error`);
  }

  // Recovery → パスワードリセットページへ
  if (type === 'recovery') {
    return NextResponse.redirect(`${origin}/reset-password`);
  }

  // プロフィール設定チェック
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(`${origin}/sign-in?error=auth_callback_error`);
  }

  logActivityEvent({ userId: user.id, action: 'login' });

  if (!(await hasProfile(user.id))) {
    return NextResponse.redirect(`${origin}/mypage/setup-username`);
  }

  return NextResponse.redirect(`${origin}${safeNext}`);
}
