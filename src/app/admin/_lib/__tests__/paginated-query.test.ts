import { describe, it, expect, vi, beforeEach } from 'vitest';

// --- hoisted mocks ---

const { mockDb } = vi.hoisted(() => ({
  mockDb: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    offset: vi.fn().mockResolvedValue([]),
  },
}));

const { mockFetchProfileMap } = vi.hoisted(() => ({
  mockFetchProfileMap: vi.fn().mockResolvedValue(new Map()),
}));

// --- module mocks ---

vi.mock('@/lib/db', () => ({
  db: mockDb,
}));

vi.mock('@/lib/db/queries/profiles', () => ({
  fetchProfileMap: mockFetchProfileMap,
}));

vi.mock('drizzle-orm', () => ({
  desc: vi.fn((col) => col),
  sql: vi.fn(),
}));

// --- import after mocks ---

import { fetchPaginatedLogPage } from '../paginated-query';

// Minimal table/column stubs for testing
const mockTable = {} as Parameters<typeof fetchPaginatedLogPage>[0];
const mockColumn = {} as Parameters<typeof fetchPaginatedLogPage>[1];

describe('fetchPaginatedLogPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset chainable mock
    mockDb.select.mockReturnThis();
    mockDb.from.mockReturnThis();
    mockDb.orderBy.mockReturnThis();
    mockDb.limit.mockReturnThis();
    mockDb.offset.mockResolvedValue([]);

    mockFetchProfileMap.mockResolvedValue(new Map());
  });

  function setupMock(countValue: number, rows: Record<string, unknown>[]) {
    // The function uses Promise.all with two db queries.
    // First call to select() -> count query chain
    // Second call to select() -> data query chain
    let callCount = 0;

    mockDb.select.mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        // COUNT query: select().from() resolves directly
        return {
          from: vi.fn().mockResolvedValue([{ count: countValue }]),
        };
      }
      // DATA query: select().from().orderBy().limit().offset()
      return {
        from: vi.fn().mockReturnValue({
          orderBy: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              offset: vi.fn().mockResolvedValue(rows),
            }),
          }),
        }),
      };
    });
  }

  it('returns correct structure with logs, profileMap, currentPage, totalPages', async () => {
    const rows = [{ id: '1', userId: 'u1' }];
    setupMock(1, rows);

    const result = await fetchPaginatedLogPage(
      mockTable,
      mockColumn,
      1,
      (logs) => logs.map((l) => l.userId as string),
    );

    expect(result).toHaveProperty('logs');
    expect(result).toHaveProperty('profileMap');
    expect(result).toHaveProperty('currentPage');
    expect(result).toHaveProperty('totalPages');
    expect(result.logs).toEqual(rows);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(1);
  });

  it('calculates totalPages correctly from count', async () => {
    setupMock(45, []);

    const result = await fetchPaginatedLogPage(
      mockTable,
      mockColumn,
      1,
      () => [],
    );

    // 45 items / 20 per page = 3 pages (ceil)
    expect(result.totalPages).toBe(3);
  });

  it('clamps page to minimum of 1 when page is 0', async () => {
    setupMock(100, []);

    const result = await fetchPaginatedLogPage(
      mockTable,
      mockColumn,
      0,
      () => [],
    );

    expect(result.currentPage).toBe(1);
  });

  it('clamps page to minimum of 1 when page is negative', async () => {
    setupMock(100, []);

    const result = await fetchPaginatedLogPage(
      mockTable,
      mockColumn,
      -5,
      () => [],
    );

    expect(result.currentPage).toBe(1);
  });

  it('clamps currentPage to totalPages when page exceeds total', async () => {
    setupMock(20, []);

    const result = await fetchPaginatedLogPage(
      mockTable,
      mockColumn,
      999,
      () => [],
    );

    // 20 items / 20 per page = 1 page, so currentPage is clamped to 1
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(1);
  });

  it('returns totalPages of 1 when count is 0', async () => {
    setupMock(0, []);

    const result = await fetchPaginatedLogPage(
      mockTable,
      mockColumn,
      1,
      () => [],
    );

    expect(result.totalPages).toBe(1);
    expect(result.currentPage).toBe(1);
  });

  it('calls fetchProfileMap with extracted user IDs', async () => {
    const rows = [
      { id: '1', userId: 'u1' },
      { id: '2', userId: 'u2' },
    ];
    setupMock(2, rows);

    await fetchPaginatedLogPage(
      mockTable,
      mockColumn,
      1,
      (logs) => logs.map((l) => l.userId as string),
    );

    expect(mockFetchProfileMap).toHaveBeenCalledWith(['u1', 'u2']);
  });

  it('returns the profileMap from fetchProfileMap', async () => {
    const profileMap = new Map([['u1', { id: 'u1', username: 'user1' }]]);
    mockFetchProfileMap.mockResolvedValue(profileMap);
    setupMock(1, [{ id: '1', userId: 'u1' }]);

    const result = await fetchPaginatedLogPage(
      mockTable,
      mockColumn,
      1,
      (logs) => logs.map((l) => l.userId as string),
    );

    expect(result.profileMap).toBe(profileMap);
  });

  it('executes COUNT and SELECT queries in parallel via Promise.all', async () => {
    // Verify both queries are initiated before either resolves
    const countResolve: { resolve?: (v: unknown) => void } = {};
    const dataResolve: { resolve?: (v: unknown) => void } = {};

    const countPromise = new Promise((r) => { countResolve.resolve = r; });
    const dataPromise = new Promise((r) => { dataResolve.resolve = r; });

    let callCount = 0;
    mockDb.select.mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        return { from: vi.fn().mockReturnValue(countPromise) };
      }
      return {
        from: vi.fn().mockReturnValue({
          orderBy: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              offset: vi.fn().mockReturnValue(dataPromise),
            }),
          }),
        }),
      };
    });

    const resultPromise = fetchPaginatedLogPage(
      mockTable,
      mockColumn,
      1,
      () => [],
    );

    // Both queries should have been initiated
    expect(callCount).toBe(2);

    // Resolve both
    countResolve.resolve!([{ count: 0 }]);
    dataResolve.resolve!([]);

    const result = await resultPromise;
    expect(result.totalPages).toBe(1);
  });
});
