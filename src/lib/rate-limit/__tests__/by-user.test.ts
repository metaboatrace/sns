import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockExecute } = vi.hoisted(() => ({
  mockExecute: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  db: {
    execute: mockExecute,
  },
}));

import { checkRateLimit } from '../by-user';

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('allows when under the limit', async () => {
    mockExecute.mockResolvedValue({ rows: [{ allowed: true }] });
    const result = await checkRateLimit('user-1', 'test', 5, 60_000);
    expect(result.allowed).toBe(true);
    expect(mockExecute).toHaveBeenCalledTimes(1);
  });

  it('rejects when the limit is reached', async () => {
    mockExecute.mockResolvedValue({ rows: [{ allowed: false }] });
    const result = await checkRateLimit('user-1', 'test', 5, 60_000);
    expect(result.allowed).toBe(false);
    expect(mockExecute).toHaveBeenCalledTimes(1);
  });

  it('defaults to not allowed when rows are empty', async () => {
    mockExecute.mockResolvedValue({ rows: [] });
    const result = await checkRateLimit('user-1', 'test', 5, 60_000);
    expect(result.allowed).toBe(false);
  });
});
