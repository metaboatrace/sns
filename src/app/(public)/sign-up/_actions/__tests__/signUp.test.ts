import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/client-ip', () => ({
  getClientIp: vi.fn(),
}));

vi.mock('@/lib/rate-limit', () => ({
  checkRateLimitByIp: vi.fn(),
}));

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

import { signUp } from '../signUp';
import { getClientIp } from '@/lib/client-ip';
import { checkRateLimitByIp } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';

const mockedGetClientIp = vi.mocked(getClientIp);
const mockedCheckRateLimitByIp = vi.mocked(checkRateLimitByIp);
const mockedCreateClient = vi.mocked(createClient);

describe('signUp', () => {
  const mockSignUp = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetClientIp.mockResolvedValue('127.0.0.1');
    mockedCheckRateLimitByIp.mockReturnValue({ allowed: true, retryAfterMs: 0 });
    mockedCreateClient.mockResolvedValue({
      auth: { signUp: mockSignUp },
    } as unknown as Awaited<ReturnType<typeof createClient>>);
    mockSignUp.mockResolvedValue({ error: null });
  });

  it('returns success when sign up succeeds', async () => {
    const result = await signUp('test@example.com', 'abc123');
    expect(result).toEqual({ success: true });
    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'abc123',
      options: { emailRedirectTo: expect.stringContaining('/auth/callback') },
    });
  });

  it('returns rateLimited when IP rate limit is exceeded', async () => {
    mockedCheckRateLimitByIp.mockReturnValue({ allowed: false, retryAfterMs: 60000 });
    const result = await signUp('test@example.com', 'abc123');
    expect(result).toEqual({ error: 'rateLimited' });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns password validation error for invalid password', async () => {
    const result = await signUp('test@example.com', 'abc');
    expect(result).toEqual({ error: 'password:tooShort' });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns password:missingDigit for password with no digits', async () => {
    const result = await signUp('test@example.com', 'abcdef');
    expect(result).toEqual({ error: 'password:missingDigit' });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns password:missingLetter for password with no letters', async () => {
    const result = await signUp('test@example.com', '123456');
    expect(result).toEqual({ error: 'password:missingLetter' });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns password:weak when Supabase rejects the password', async () => {
    mockSignUp.mockResolvedValue({ error: { code: 'weak_password' } });
    const result = await signUp('test@example.com', 'abc123');
    expect(result).toEqual({ error: 'password:weak' });
  });

  it('returns signUpFailed when Supabase returns a generic error', async () => {
    mockSignUp.mockResolvedValue({ error: { code: 'unknown_error' } });
    const result = await signUp('test@example.com', 'abc123');
    expect(result).toEqual({ error: 'signUpFailed' });
  });

  it('applies rate limiting with unknown IP fallback', async () => {
    mockedGetClientIp.mockResolvedValue('unknown');
    const result = await signUp('test@example.com', 'abc123');
    expect(result).toEqual({ success: true });
    expect(mockedCheckRateLimitByIp).toHaveBeenCalledWith('unknown', 'signUp', 5, 300_000);
  });

  it('returns password:tooShort for an empty password', async () => {
    const result = await signUp('test@example.com', '');
    expect(result).toEqual({ error: 'password:tooShort' });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('passes empty email to Supabase (server-side validation)', async () => {
    mockSignUp.mockResolvedValue({ error: { code: 'validation_failed' } });
    const result = await signUp('', 'abc123');
    expect(result).toEqual({ error: 'signUpFailed' });
    expect(mockSignUp).toHaveBeenCalled();
  });
});
