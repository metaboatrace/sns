import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/client-ip', () => ({
  getClientIp: vi.fn(),
}));

vi.mock('../by-ip', () => ({
  checkRateLimitByIp: vi.fn(),
}));

import { checkServerActionRateLimit } from '../server-action';
import { getClientIp } from '@/lib/client-ip';
import { checkRateLimitByIp } from '../by-ip';

const mockedGetClientIp = vi.mocked(getClientIp);
const mockedCheckRateLimitByIp = vi.mocked(checkRateLimitByIp);

describe('checkServerActionRateLimit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetClientIp.mockResolvedValue('127.0.0.1');
    mockedCheckRateLimitByIp.mockReturnValue({ allowed: true, retryAfterMs: 0 });
  });

  it('returns true when rate limit allows the request', async () => {
    const result = await checkServerActionRateLimit('testAction', 5, 300_000);
    expect(result).toBe(true);
    expect(mockedGetClientIp).toHaveBeenCalled();
    expect(mockedCheckRateLimitByIp).toHaveBeenCalledWith('127.0.0.1', 'testAction', 5, 300_000);
  });

  it('returns false when rate limit is exceeded', async () => {
    mockedCheckRateLimitByIp.mockReturnValue({ allowed: false, retryAfterMs: 60000 });
    const result = await checkServerActionRateLimit('testAction', 5, 300_000);
    expect(result).toBe(false);
  });

  it('passes the resolved IP to checkRateLimitByIp', async () => {
    mockedGetClientIp.mockResolvedValue('203.0.113.1');
    await checkServerActionRateLimit('signUp', 10, 600_000);
    expect(mockedCheckRateLimitByIp).toHaveBeenCalledWith('203.0.113.1', 'signUp', 10, 600_000);
  });
});
