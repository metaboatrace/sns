import { vi, type Mock } from 'vitest';

export interface MockDb {
  select: Mock;
  from: Mock;
  where: Mock;
  limit: Mock;
  insert?: Mock;
  values?: Mock;
}

/**
 * Create a mock DB with default chaining behavior.
 * Optionally include `insert`/`values` mocks for write operations.
 */
export function createMockDb(options?: { withInsert?: boolean }): MockDb {
  const mockDb: MockDb = {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue([]),
  };

  if (options?.withInsert !== false) {
    mockDb.insert = vi.fn().mockReturnThis();
    mockDb.values = vi.fn().mockResolvedValue(undefined);
  }

  return mockDb;
}

/**
 * Reset the mock DB to its default chaining behavior.
 * Typically called in `beforeEach` after `vi.clearAllMocks()`.
 */
export function resetMockDb(mockDb: MockDb) {
  mockDb.select.mockReturnThis();
  mockDb.from.mockReturnThis();
  mockDb.where.mockReturnThis();
  mockDb.limit.mockResolvedValue([]);
  mockDb.insert?.mockReturnThis();
  mockDb.values?.mockResolvedValue(undefined);
}
