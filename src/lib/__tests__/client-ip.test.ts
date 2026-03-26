import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next/headers', () => ({
  headers: vi.fn(),
}));

import { getClientIp } from '../client-ip';
import { headers } from 'next/headers';

const mockedHeaders = vi.mocked(headers);

describe('getClientIp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns x-real-ip when present', async () => {
    mockedHeaders.mockResolvedValue(
      new Headers({ 'x-real-ip': '203.0.113.1' }) as Awaited<ReturnType<typeof headers>>,
    );
    const ip = await getClientIp();
    expect(ip).toBe('203.0.113.1');
  });

  it('trims whitespace from x-real-ip', async () => {
    mockedHeaders.mockResolvedValue(
      new Headers({ 'x-real-ip': '  203.0.113.1  ' }) as Awaited<ReturnType<typeof headers>>,
    );
    const ip = await getClientIp();
    expect(ip).toBe('203.0.113.1');
  });

  it('returns rightmost x-forwarded-for value when x-real-ip is absent', async () => {
    mockedHeaders.mockResolvedValue(
      new Headers({ 'x-forwarded-for': '10.0.0.1, 192.168.1.1, 203.0.113.5' }) as Awaited<
        ReturnType<typeof headers>
      >,
    );
    const ip = await getClientIp();
    expect(ip).toBe('203.0.113.5');
  });

  it('returns the single x-forwarded-for value when only one IP is present', async () => {
    mockedHeaders.mockResolvedValue(
      new Headers({ 'x-forwarded-for': '203.0.113.10' }) as Awaited<ReturnType<typeof headers>>,
    );
    const ip = await getClientIp();
    expect(ip).toBe('203.0.113.10');
  });

  it('prefers x-real-ip over x-forwarded-for', async () => {
    mockedHeaders.mockResolvedValue(
      new Headers({
        'x-real-ip': '203.0.113.1',
        'x-forwarded-for': '10.0.0.1, 192.168.1.1',
      }) as Awaited<ReturnType<typeof headers>>,
    );
    const ip = await getClientIp();
    expect(ip).toBe('203.0.113.1');
  });

  it('returns unknown when no IP headers are present', async () => {
    mockedHeaders.mockResolvedValue(new Headers() as Awaited<ReturnType<typeof headers>>);
    const ip = await getClientIp();
    expect(ip).toBe('unknown');
  });
});
