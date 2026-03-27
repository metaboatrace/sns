import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  adminUserId,
  mockGetUser,
  mockInsertValues,
  mockSelectFromWhere,
  mockTransaction,
  mockUpdateSetWhere,
  mockUpdateUserById,
  targetUserId,
} from './helpers/admin-action-mocks';
import { unbanUser } from '../unbanUser';

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
    mockSelectFromWhere.mockReturnValue([]);

    const result = await unbanUser(targetUserId);
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should successfully unban a user', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ id: 'some-id' }])
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
      .mockReturnValueOnce([{ id: 'some-id' }])
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
      .mockReturnValueOnce([{ id: 'some-id' }])
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
      .mockReturnValueOnce([{ id: 'some-id' }])
      .mockReturnValueOnce([{ bannedAt: null }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const result = await unbanUser(targetUserId);
    expect(result).toEqual({ success: true });
    expect(mockUpdateSetWhere).toHaveBeenCalled();
  });

  it('should insert a moderation_actions record with correct fields on successful unban', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ id: 'some-id' }])
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
      .mockReturnValueOnce([{ id: 'some-id' }])
      .mockReturnValueOnce([{ bannedAt: new Date('2024-01-01') }]);
    mockUpdateUserById.mockResolvedValue({ error: new Error('Auth error') });

    await unbanUser(targetUserId);

    expect(mockInsertValues).not.toHaveBeenCalled();
  });

  it('should return failedToUnban without DB changes when Supabase Auth unban fails', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ id: 'some-id' }])
      .mockReturnValueOnce([{ bannedAt: new Date('2024-01-01') }]);
    mockUpdateUserById.mockResolvedValue({ error: new Error('Auth error') });

    const result = await unbanUser(targetUserId);

    expect(result).toEqual({ error: 'failedToUnban' });
    expect(mockUpdateSetWhere).not.toHaveBeenCalled();
  });

  it('should use db.transaction to wrap profile update and audit log atomically', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ id: 'some-id' }])
      .mockReturnValueOnce([{ bannedAt: new Date('2024-01-01') }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    await unbanUser(targetUserId);

    expect(mockTransaction).toHaveBeenCalledTimes(1);
  });

  it('should rollback Auth unban and restore original bannedAt when DB transaction fails', async () => {
    const originalBannedAt = new Date('2024-01-01');
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ id: 'some-id' }])
      .mockReturnValueOnce([{ bannedAt: originalBannedAt }]);
    mockUpdateUserById.mockResolvedValue({ error: null });
    mockTransaction.mockRejectedValueOnce(new Error('DB transaction failed'));

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
  });

  it('should restore null bannedAt in rollback when user was not previously banned', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ id: 'some-id' }])
      .mockReturnValueOnce([{ bannedAt: null }]);
    mockUpdateUserById.mockResolvedValue({ error: null });
    mockTransaction.mockRejectedValueOnce(new Error('DB transaction failed'));

    const result = await unbanUser(targetUserId);

    expect(result).toEqual({ error: 'failedToUnban' });
    expect(mockUpdateUserById).toHaveBeenNthCalledWith(2, targetUserId, {
      ban_duration: '876000h',
    });
  });

  it('should return failedToUnban even when Auth rollback also fails (double failure)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere
      .mockReturnValueOnce([{ id: 'some-id' }])
      .mockReturnValueOnce([{ bannedAt: new Date('2024-01-01') }]);
    mockUpdateUserById
      .mockResolvedValueOnce({ error: null })
      .mockRejectedValueOnce(new Error('Auth rollback failed'));
    mockTransaction.mockRejectedValueOnce(new Error('DB transaction failed'));

    const result = await unbanUser(targetUserId);

    expect(result).toEqual({ error: 'failedToUnban' });
  });
});
