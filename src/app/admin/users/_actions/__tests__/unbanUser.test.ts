import { beforeEach, describe, expect, it, vi } from 'vitest';

import { unbanUser } from '../unbanUser';

const mockGetUser = vi.fn();
const mockSelectFromWhere = vi.fn();
const mockUpdateSetWhere = vi.fn();
const mockUpdateUserById = vi.fn();
const mockInsertValues = vi.fn();
const mockTransaction = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: () =>
    Promise.resolve({
      auth: {
        getUser: mockGetUser,
      },
    }),
}));

vi.mock('@/lib/db', () => {
  const makeDbOps = () => ({
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
    update: () => ({
      set: () => ({
        where: mockUpdateSetWhere,
      }),
    }),
    insert: () => ({
      values: mockInsertValues,
    }),
  });

  return {
    db: {
      ...makeDbOps(),
      transaction: async (fn: (tx: ReturnType<typeof makeDbOps>) => Promise<void>) => {
        mockTransaction();
        return fn(makeDbOps());
      },
    },
    profiles: { id: 'id', bannedAt: 'banned_at', updatedAt: 'updated_at' },
    moderationActions: {
      actorId: 'actor_id',
      action: 'action',
      targetType: 'target_type',
      targetId: 'target_id',
      reason: 'reason',
      ipAddress: 'ip_address',
    },
    userRoles: { userId: 'user_id' },
  };
});

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: () => ({
    auth: {
      admin: {
        updateUserById: mockUpdateUserById,
      },
    },
  }),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('../getClientIp', () => ({
  getClientIp: () => Promise.resolve('127.0.0.1'),
}));

const adminUserId = 'admin-00000000-0000-0000-0000-000000000001';
const targetUserId = 'target-00000000-0000-0000-0000-000000000001';

describe('unbanUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return unauthorized when user is not authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const result = await unbanUser(targetUserId);
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should return unauthorized when user is not admin', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'user' }]);

    const result = await unbanUser(targetUserId);
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should successfully unban a user', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ role: 'admin' }])
      .mockReturnValueOnce([{ bannedAt: new Date('2024-01-01') }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const result = await unbanUser(targetUserId);
    expect(result).toEqual({ success: true });
    expect(mockUpdateSetWhere).toHaveBeenCalled();
    expect(mockUpdateUserById).toHaveBeenCalledWith(targetUserId, {
      ban_duration: 'none',
    });
  });

  it('should return failedToUnban without touching DB if Supabase Auth unban fails', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ role: 'admin' }])
      .mockReturnValueOnce([{ bannedAt: new Date('2024-01-01') }]);
    mockUpdateUserById.mockResolvedValue({ error: new Error('Auth error') });

    const result = await unbanUser(targetUserId);
    expect(result).toEqual({ error: 'failedToUnban' });
    expect(mockUpdateSetWhere).not.toHaveBeenCalled();
    expect(mockInsertValues).not.toHaveBeenCalled();
  });

  it('should return unauthorized when no userRole record exists', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([]);

    const result = await unbanUser(targetUserId);
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should proceed with unban even when target profile does not exist in DB', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    // First call returns admin role, second call returns empty array (no profile found)
    mockSelectFromWhere
      .mockReturnValueOnce([{ role: 'admin' }])
      .mockReturnValueOnce([]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const result = await unbanUser(targetUserId);
    // targetProfile is undefined, so originalBannedAt defaults to null
    // The function still proceeds to unban at Supabase Auth level
    expect(result).toEqual({ success: true });
    expect(mockUpdateUserById).toHaveBeenCalledWith(targetUserId, {
      ban_duration: 'none',
    });
  });

  it('should still succeed when unbanning a user who is not currently banned', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ role: 'admin' }])
      .mockReturnValueOnce([{ bannedAt: null }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const result = await unbanUser(targetUserId);
    expect(result).toEqual({ success: true });
    expect(mockUpdateSetWhere).toHaveBeenCalled();
  });

  it('should insert a moderation_actions record with correct fields on successful unban', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ role: 'admin' }])
      .mockReturnValueOnce([{ bannedAt: new Date('2024-01-01') }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    await unbanUser(targetUserId);

    expect(mockInsertValues).toHaveBeenCalledWith({
      actorId: adminUserId,
      action: 'unban',
      targetType: 'user',
      targetId: targetUserId,
      ipAddress: '127.0.0.1',
    });
  });

  it('should NOT insert moderation_actions when Supabase Auth unban fails', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ role: 'admin' }])
      .mockReturnValueOnce([{ bannedAt: new Date('2024-01-01') }]);
    mockUpdateUserById.mockResolvedValue({ error: new Error('Auth error') });

    await unbanUser(targetUserId);

    expect(mockInsertValues).not.toHaveBeenCalled();
  });

  it('should return failedToUnban without DB changes when Supabase Auth unban fails', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ role: 'admin' }])
      .mockReturnValueOnce([{ bannedAt: new Date('2024-01-01') }]);
    mockUpdateUserById.mockResolvedValue({ error: new Error('Auth error') });

    const result = await unbanUser(targetUserId);

    expect(result).toEqual({ error: 'failedToUnban' });
    expect(mockUpdateSetWhere).not.toHaveBeenCalled();
  });

  it('should use db.transaction to wrap profile update and audit log atomically', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ role: 'admin' }])
      .mockReturnValueOnce([{ bannedAt: new Date('2024-01-01') }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    await unbanUser(targetUserId);

    expect(mockTransaction).toHaveBeenCalledTimes(1);
  });

  it('should rollback Auth unban and restore original bannedAt when DB transaction fails', async () => {
    const originalBannedAt = new Date('2024-01-01');
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ role: 'admin' }])
      .mockReturnValueOnce([{ bannedAt: originalBannedAt }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const { db } = await import('@/lib/db');
    const originalTransaction = db.transaction;
    db.transaction = vi.fn().mockRejectedValueOnce(new Error('DB transaction failed'));

    const result = await unbanUser(targetUserId);

    expect(result).toEqual({ error: 'failedToUnban' });
    expect(mockUpdateUserById).toHaveBeenCalledTimes(2);
    expect(mockUpdateUserById).toHaveBeenNthCalledWith(1, targetUserId, {
      ban_duration: 'none',
    });
    expect(mockUpdateUserById).toHaveBeenNthCalledWith(2, targetUserId, {
      ban_duration: '876000h',
    });
    expect(mockUpdateSetWhere).toHaveBeenCalled();

    db.transaction = originalTransaction;
  });

  it('should restore null bannedAt in rollback when user was not previously banned', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ role: 'admin' }])
      .mockReturnValueOnce([{ bannedAt: null }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const { db } = await import('@/lib/db');
    const originalTransaction = db.transaction;
    db.transaction = vi.fn().mockRejectedValueOnce(new Error('DB transaction failed'));

    const result = await unbanUser(targetUserId);

    expect(result).toEqual({ error: 'failedToUnban' });
    expect(mockUpdateUserById).toHaveBeenNthCalledWith(2, targetUserId, {
      ban_duration: '876000h',
    });

    db.transaction = originalTransaction;
  });

  it('should throw when both DB transaction and Auth rollback fail (double failure)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ role: 'admin' }])
      .mockReturnValueOnce([{ bannedAt: new Date('2024-01-01') }]);
    mockUpdateUserById
      .mockResolvedValueOnce({ error: null })
      .mockRejectedValueOnce(new Error('Auth rollback failed'));

    const { db } = await import('@/lib/db');
    const originalTransaction = db.transaction;
    db.transaction = vi.fn().mockRejectedValueOnce(new Error('DB transaction failed'));

    await expect(unbanUser(targetUserId)).rejects.toThrow('Auth rollback failed');

    db.transaction = originalTransaction;
  });
});
