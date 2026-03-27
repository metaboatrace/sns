import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/rate-limit', () => ({
  checkServerActionRateLimit: vi.fn(),
}));

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

import { resendEmail } from '../resendEmail';
import { checkServerActionRateLimit } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';

const mockedCheckServerActionRateLimit = vi.mocked(checkServerActionRateLimit);
const mockedCreateClient = vi.mocked(createClient);

describe('resendEmail', () => {
  const mockResend = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedCheckServerActionRateLimit.mockResolvedValue(true);
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
    mockedCheckServerActionRateLimit.mockResolvedValue(false);
    const result = await resendEmail('test@example.com');
    expect(result).toEqual({ error: 'rateLimited' });
    expect(mockResend).not.toHaveBeenCalled();
  });

  it('calls checkServerActionRateLimit with correct parameters', async () => {
    await resendEmail('test@example.com');
    expect(mockedCheckServerActionRateLimit).toHaveBeenCalledWith('resendEmail', 3, 300_000);
  });

  it('returns resendFailed when Supabase returns an error', async () => {
    mockResend.mockResolvedValue({ error: { message: 'Failed' } });
    const result = await resendEmail('test@example.com');
    expect(result).toEqual({ error: 'resendFailed' });
  });

  it('returns invalidEmail for empty email', async () => {
    const result = await resendEmail('');
    expect(result).toEqual({ error: 'invalidEmail' });
    expect(mockResend).not.toHaveBeenCalled();
  });

  it('returns invalidEmail for malformed email', async () => {
    const result = await resendEmail('not-an-email');
    expect(result).toEqual({ error: 'invalidEmail' });
    expect(mockResend).not.toHaveBeenCalled();
  });
});
