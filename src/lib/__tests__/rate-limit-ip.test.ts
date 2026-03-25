import { describe, it, expect, beforeEach, vi } from 'vitest';
import { checkRateLimitByIp } from '../rate-limit-ip';

describe('checkRateLimitByIp', () => {
  beforeEach(() => {
    // Reset the internal store by advancing time past any existing windows
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows requests under the limit', () => {
    const result = checkRateLimitByIp('10.0.0.1', 'test', 3, 60_000);
    expect(result.allowed).toBe(true);
    expect(result.retryAfterMs).toBe(0);
  });

  it('rejects requests when the limit is reached', () => {
    for (let i = 0; i < 3; i++) {
      checkRateLimitByIp('10.0.0.2', 'test', 3, 60_000);
    }
    const result = checkRateLimitByIp('10.0.0.2', 'test', 3, 60_000);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it('counts different IPs independently', () => {
    for (let i = 0; i < 3; i++) {
      checkRateLimitByIp('10.0.0.3', 'test', 3, 60_000);
    }
    const result = checkRateLimitByIp('10.0.0.4', 'test', 3, 60_000);
    expect(result.allowed).toBe(true);
  });
});
