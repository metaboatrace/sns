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

import { signIn } from '../signIn';
import { getClientIp } from '@/lib/client-ip';
import { checkRateLimitByIp } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';

const mockedGetClientIp = vi.mocked(getClientIp);
const mockedCheckRateLimitByIp = vi.mocked(checkRateLimitByIp);
const mockedCreateClient = vi.mocked(createClient);

describe('signIn', () => {
  const mockSignInWithPassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetClientIp.mockResolvedValue('127.0.0.1');
    mockedCheckRateLimitByIp.mockReturnValue({ allowed: true, retryAfterMs: 0 });
    mockedCreateClient.mockResolvedValue({
      auth: { signInWithPassword: mockSignInWithPassword },
    } as unknown as Awaited<ReturnType<typeof createClient>>);
    mockSignInWithPassword.mockResolvedValue({ error: null });
  });

  it('returns success when sign in succeeds', async () => {
    const result = await signIn('test@example.com', 'abc123');
    expect(result).toEqual({ success: true });
    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'abc123',
    });
  });

  it('returns rateLimited when IP rate limit is exceeded', async () => {
    mockedCheckRateLimitByIp.mockReturnValue({ allowed: false, retryAfterMs: 60000 });
    const result = await signIn('test@example.com', 'abc123');
    expect(result).toEqual({ error: 'rateLimited' });
    expect(mockSignInWithPassword).not.toHaveBeenCalled();
  });

  it('returns invalidCredentials when Supabase returns an error', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: { message: 'Invalid credentials' } });
    const result = await signIn('test@example.com', 'wrongpass1');
    expect(result).toEqual({ error: 'invalidCredentials' });
  });

  it('applies rate limiting with unknown IP fallback', async () => {
    mockedGetClientIp.mockResolvedValue('unknown');
    const result = await signIn('test@example.com', 'abc123');
    expect(result).toEqual({ success: true });
    expect(mockedCheckRateLimitByIp).toHaveBeenCalledWith('unknown', 'signIn', 10, 300_000);
  });

  it('returns invalidCredentials for empty email', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: { message: 'Invalid credentials' } });
    const result = await signIn('', 'abc123');
    expect(result).toEqual({ error: 'invalidCredentials' });
  });

  it('returns invalidCredentials for empty password', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: { message: 'Invalid credentials' } });
    const result = await signIn('test@example.com', '');
    expect(result).toEqual({ error: 'invalidCredentials' });
  });

  it('returns invalidCredentials for both empty email and password', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: { message: 'Invalid credentials' } });
    const result = await signIn('', '');
    expect(result).toEqual({ error: 'invalidCredentials' });
  });
});
