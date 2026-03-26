import { beforeEach, describe, expect, it, vi } from 'vitest';

import { validateAdminRequest } from '../validate-admin-request';

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

vi.mock('@/lib/auth', () => ({
  getOptionalUser: async () => {
    const result = await mockGetUser();
    return result?.data?.user ?? null;
  },
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

const adminUserId = 'a0000000-0000-0000-0000-000000000001';
const validTargetUserId = 'b0000000-0000-0000-0000-000000000001';

describe('validateAdminRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- UUID validation ---

  it('should return invalidUserId for an empty string', async () => {
    const result = await validateAdminRequest('');
    expect(result).toEqual({ error: 'invalidUserId' });
  });

  it('should return invalidUserId for a non-UUID string', async () => {
    const result = await validateAdminRequest('not-a-uuid');
    expect(result).toEqual({ error: 'invalidUserId' });
  });

  it('should return invalidUserId for a UUID-like string with wrong length', async () => {
    const result = await validateAdminRequest('a0000000-0000-0000-0000-00000000000');
    expect(result).toEqual({ error: 'invalidUserId' });
  });

  it('should return invalidUserId for a UUID with invalid hex characters', async () => {
    const result = await validateAdminRequest('g0000000-0000-0000-0000-000000000001');
    expect(result).toEqual({ error: 'invalidUserId' });
  });

  it('should not call requireAdmin when UUID is invalid', async () => {
    await validateAdminRequest('invalid');
    expect(mockGetUser).not.toHaveBeenCalled();
  });

  // --- Auth validation ---

  it('should return unauthorized when user is not authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const result = await validateAdminRequest(validTargetUserId);
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should return unauthorized when user is not admin', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'user' }]);

    const result = await validateAdminRequest(validTargetUserId);
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should return unauthorized when no role record exists', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([]);

    const result = await validateAdminRequest(validTargetUserId);
    expect(result).toEqual({ error: 'unauthorized' });
  });

  // --- Success ---

  it('should return adminUserId when UUID is valid and user is admin', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);

    const result = await validateAdminRequest(validTargetUserId);
    expect(result).toEqual({ adminUserId });
  });

  it('should accept uppercase UUID', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);

    const uppercaseUuid = 'B0000000-0000-0000-0000-000000000001';
    const result = await validateAdminRequest(uppercaseUuid);
    expect(result).toEqual({ adminUserId });
  });
});
