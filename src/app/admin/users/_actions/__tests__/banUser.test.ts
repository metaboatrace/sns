import { beforeEach, describe, expect, it, vi } from 'vitest';

import { banUser } from '../banUser';

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

describe('banUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return unauthorized when user is not authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const result = await banUser(targetUserId, 'spam');
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should return unauthorized when user is not admin', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'user' }]);

    const result = await banUser(targetUserId, 'spam');
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should return cannotBanSelf when admin tries to ban themselves', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);

    const result = await banUser(adminUserId, 'test');
    expect(result).toEqual({ error: 'cannotBanSelf' });
  });

  it('should return reasonRequired when reason is empty', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);

    const result = await banUser(targetUserId, '   ');
    expect(result).toEqual({ error: 'reasonRequired' });
  });

  it('should successfully ban a user', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const result = await banUser(targetUserId, 'Spamming');
    expect(result).toEqual({ success: true });
    expect(mockUpdateUserById).toHaveBeenCalledWith(targetUserId, {
      ban_duration: '876000h',
    });
  });

  it('should return failedToBan if Supabase Auth ban fails without touching DB', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);
    mockUpdateUserById.mockResolvedValue({ error: new Error('Auth error') });

    const result = await banUser(targetUserId, 'Spamming');
    expect(result).toEqual({ error: 'failedToBan' });
    expect(mockUpdateSetWhere).not.toHaveBeenCalled();
    expect(mockInsertValues).not.toHaveBeenCalled();
  });

  it('should return unauthorized when no userRole record exists', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([]);

    const result = await banUser(targetUserId, 'spam');
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should return reasonRequired when reason is only whitespace after trim', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);

    const result = await banUser(targetUserId, '\t\n  ');
    expect(result).toEqual({ error: 'reasonRequired' });
  });

  it('should accept reason with special characters', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const result = await banUser(targetUserId, 'Spam <script>alert("xss")</script> & abuse');
    expect(result).toEqual({ success: true });
  });

  it('should return reasonTooLong when reason exceeds 1000 characters', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);

    const longReason = 'a'.repeat(1001);
    const result = await banUser(targetUserId, longReason);
    expect(result).toEqual({ error: 'reasonTooLong' });
    expect(mockUpdateUserById).not.toHaveBeenCalled();
  });

  it('should accept reason that is exactly 1000 characters (boundary)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const exactReason = 'a'.repeat(1000);
    const result = await banUser(targetUserId, exactReason);
    expect(result).toEqual({ success: true });
    expect(mockUpdateUserById).toHaveBeenCalled();
  });

  it('should return reasonTooLong when reason is exactly 1001 characters (boundary)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);

    const overReason = 'a'.repeat(1001);
    const result = await banUser(targetUserId, overReason);
    expect(result).toEqual({ error: 'reasonTooLong' });
    expect(mockUpdateUserById).not.toHaveBeenCalled();
  });

  it('should proceed to Supabase Auth ban when targetUserId is an empty string', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const result = await banUser('', 'spam');
    // Empty string does not match adminUserId so self-ban check passes;
    // no server-side validation rejects it before reaching Supabase Auth
    expect(result).toEqual({ success: true });
    expect(mockUpdateUserById).toHaveBeenCalledWith('', {
      ban_duration: '876000h',
    });
  });

  it('should insert a moderation_actions record with correct fields on successful ban', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    await banUser(targetUserId, 'Spamming');

    expect(mockInsertValues).toHaveBeenCalledWith({
      actorId: adminUserId,
      action: 'ban',
      targetType: 'user',
      targetId: targetUserId,
      reason: 'Spamming',
      ipAddress: '127.0.0.1',
    });
  });

  it('should NOT insert moderation_actions when Supabase Auth ban fails', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);
    mockUpdateUserById.mockResolvedValue({ error: new Error('Auth error') });

    await banUser(targetUserId, 'Spamming');

    expect(mockInsertValues).not.toHaveBeenCalled();
  });

  it('should trim the reason before storing in moderation_actions', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    await banUser(targetUserId, '  Spamming  ');

    expect(mockInsertValues).toHaveBeenCalledWith(
      expect.objectContaining({
        reason: 'Spamming',
      })
    );
  });

  it('should use db.transaction to wrap profile update and audit log atomically', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    await banUser(targetUserId, 'Spamming');

    expect(mockTransaction).toHaveBeenCalledTimes(1);
  });

  it('should rollback Auth ban when DB transaction fails', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });
    mockTransaction.mockImplementationOnce(() => {
      throw new Error('DB transaction failed');
    });

    const { db } = await import('@/lib/db');
    const originalTransaction = db.transaction;
    db.transaction = vi.fn().mockRejectedValueOnce(new Error('DB transaction failed'));

    const result = await banUser(targetUserId, 'Spamming');

    expect(result).toEqual({ error: 'failedToBan' });
    expect(mockUpdateUserById).toHaveBeenCalledTimes(2);
    expect(mockUpdateUserById).toHaveBeenNthCalledWith(1, targetUserId, {
      ban_duration: '876000h',
    });
    expect(mockUpdateUserById).toHaveBeenNthCalledWith(2, targetUserId, {
      ban_duration: 'none',
    });

    db.transaction = originalTransaction;
  });

  it('should throw when both DB transaction and Auth rollback fail (double failure)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ role: 'admin' }]);
    mockUpdateUserById
      .mockResolvedValueOnce({ error: null })
      .mockRejectedValueOnce(new Error('Auth rollback failed'));

    const { db } = await import('@/lib/db');
    const originalTransaction = db.transaction;
    db.transaction = vi.fn().mockRejectedValueOnce(new Error('DB transaction failed'));

    await expect(banUser(targetUserId, 'Spamming')).rejects.toThrow('Auth rollback failed');

    db.transaction = originalTransaction;
  });
});
