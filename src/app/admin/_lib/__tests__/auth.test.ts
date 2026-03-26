import { beforeEach, describe, expect, it, vi } from 'vitest';

import { requireAdmin } from '../auth';

const mockGetUser = vi.fn();
const mockSelectFromWhere = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: () =>
    Promise.resolve({
      auth: {
        getUser: mockGetUser,
      },
    }),
}));

vi.mock('@/lib/db', () => ({
  db: {
    select: () => ({
      from: () => ({
        where: (...args: unknown[]) => {
          mockSelectFromWhere(...args);
          return {
            limit: () =>
              mockSelectFromWhere.mock.results[mockSelectFromWhere.mock.calls.length - 1]?.value ??
              [],
          };
        },
      }),
    }),
  },
  userRoles: { userId: 'user_id' },
}));

const adminUserId = 'admin-00000000-0000-0000-0000-000000000001';

describe('requireAdmin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return unauthorized when user is not authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const result = await requireAdmin();
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should return unauthorized when user has no role record', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([]);

    const result = await requireAdmin();
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should return unauthorized when user role is not admin', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'user' }]);

    const result = await requireAdmin();
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should return userId when user is admin', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);

    const result = await requireAdmin();
    expect(result).toEqual({ userId: adminUserId });
  });
});
