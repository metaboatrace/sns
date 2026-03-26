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

import { resendEmail } from '../resendEmail';
import { getClientIp } from '@/lib/client-ip';
import { checkRateLimitByIp } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';

const mockedGetClientIp = vi.mocked(getClientIp);
const mockedCheckRateLimitByIp = vi.mocked(checkRateLimitByIp);
const mockedCreateClient = vi.mocked(createClient);

describe('resendEmail', () => {
  const mockResend = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetClientIp.mockResolvedValue('127.0.0.1');
    mockedCheckRateLimitByIp.mockReturnValue({ allowed: true, retryAfterMs: 0 });
    mockedCreateClient.mockResolvedValue({
      auth: { resend: mockResend },
    } as unknown as Awaited<ReturnType<typeof createClient>>);
    mockResend.mockResolvedValue({ error: null });
  });

  it('returns success when resend succeeds', async () => {
    const result = await resendEmail('test@example.com');
    expect(result).toEqual({ success: true });
    expect(mockResend).toHaveBeenCalledWith({
      type: 'signup',
      email: 'test@example.com',
    });
  });

  it('returns rateLimited when IP rate limit is exceeded', async () => {
    mockedCheckRateLimitByIp.mockReturnValue({ allowed: false, retryAfterMs: 60000 });
    const result = await resendEmail('test@example.com');
    expect(result).toEqual({ error: 'rateLimited' });
    expect(mockResend).not.toHaveBeenCalled();
  });

  it('returns resendFailed when Supabase returns an error', async () => {
    mockResend.mockResolvedValue({ error: { message: 'Failed' } });
    const result = await resendEmail('test@example.com');
    expect(result).toEqual({ error: 'resendFailed' });
  });

  it('applies rate limiting with unknown IP fallback', async () => {
    mockedGetClientIp.mockResolvedValue('unknown');
    const result = await resendEmail('test@example.com');
    expect(result).toEqual({ success: true });
    expect(mockedCheckRateLimitByIp).toHaveBeenCalledWith('unknown', 'resendEmail', 3, 300_000);
  });

  it('passes empty email to Supabase (server-side validation)', async () => {
    mockResend.mockResolvedValue({ error: { message: 'Invalid email' } });
    const result = await resendEmail('');
    expect(result).toEqual({ error: 'resendFailed' });
    expect(mockResend).toHaveBeenCalledWith({
      type: 'signup',
      email: '',
    });
  });
});
