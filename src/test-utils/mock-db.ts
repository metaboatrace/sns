import type { Mock } from 'vitest';

export interface MockDb {
  select: Mock;
  from: Mock;
  where: Mock;
  limit: Mock;
  insert?: Mock;
  values?: Mock;
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
