import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getClientIp, checkRateLimitByIp } from '../by-ip';

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

describe('getClientIp', () => {
  it('returns x-real-ip when present', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-real-ip': '203.0.113.1' },
    });
    expect(getClientIp(request)).toBe('203.0.113.1');
  });

  it('returns the rightmost x-forwarded-for IP when x-real-ip is absent', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '10.0.0.1, 172.16.0.1, 203.0.113.50' },
    });
    expect(getClientIp(request)).toBe('203.0.113.50');
  });

  it('returns 127.0.0.1 when neither header is present', () => {
    const request = new Request('http://localhost');
    expect(getClientIp(request)).toBe('127.0.0.1');
  });

  it('handles x-forwarded-for with a single IP', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '192.168.1.1' },
    });
    expect(getClientIp(request)).toBe('192.168.1.1');
  });

  it('handles x-forwarded-for with extra whitespace', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-forwarded-for': ' 10.0.0.1 , 172.16.0.1 , 203.0.113.99 ' },
    });
    expect(getClientIp(request)).toBe('203.0.113.99');
  });

  it('prefers x-real-ip over x-forwarded-for when both are present', () => {
    const request = new Request('http://localhost', {
      headers: {
        'x-real-ip': '203.0.113.1',
        'x-forwarded-for': '10.0.0.1, 172.16.0.1',
      },
    });
    expect(getClientIp(request)).toBe('203.0.113.1');
  });

  it('trims whitespace from x-real-ip', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-real-ip': '  203.0.113.1  ' },
    });
    expect(getClientIp(request)).toBe('203.0.113.1');
  });
});
