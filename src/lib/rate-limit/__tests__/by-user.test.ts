import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resetMockDb } from '@/test-utils/mock-db';

const { mockDb } = vi.hoisted(() => ({
  mockDb: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue([]),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock('@/lib/db', () => ({
  db: mockDb,
  rateLimitEvents: {
    userId: 'user_id',
    action: 'action',
    createdAt: 'created_at',
  },
}));

import { checkRateLimit } from '../by-user';

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetMockDb(mockDb);
  });

  it('allows when under the limit', async () => {
    mockDb.where.mockResolvedValue([{ count: 2 }]);
    const result = await checkRateLimit('user-1', 'test', 5, 60_000);
    expect(result.allowed).toBe(true);
  });

  it('rejects when the limit is reached', async () => {
    mockDb.where.mockResolvedValue([{ count: 5 }]);
    const result = await checkRateLimit('user-1', 'test', 5, 60_000);
    expect(result.allowed).toBe(false);
  });
});
