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
import { banUser } from '../banUser';

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
    mockSelectFromWhere.mockReturnValue([]);

    const result = await banUser(targetUserId, 'spam');
    expect(result).toEqual({ error: 'unauthorized' });
  });

  it('should return cannotBanSelf when admin tries to ban themselves', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);

    const result = await banUser(adminUserId, 'test');
    expect(result).toEqual({ error: 'cannotBanSelf' });
  });

  it('should return reasonRequired when reason is empty', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);

    const result = await banUser(targetUserId, '   ');
    expect(result).toEqual({ error: 'reasonRequired' });
  });

  it('should successfully ban a user', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const result = await banUser(targetUserId, 'Spamming');
    expect(result).toEqual({ success: true });
    expect(mockUpdateUserById).toHaveBeenCalledWith(targetUserId, {
      ban_duration: '876000h',
    });
  });

  it('should return failedToBan if Supabase Auth ban fails without touching DB', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);
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
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);

    const result = await banUser(targetUserId, '\t\n  ');
    expect(result).toEqual({ error: 'reasonRequired' });
  });

  it('should accept reason with special characters', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const result = await banUser(targetUserId, 'Spam <script>alert("xss")</script> & abuse');
    expect(result).toEqual({ success: true });
  });

  it('should return reasonTooLong when reason exceeds 1000 characters', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);

    const longReason = 'a'.repeat(1001);
    const result = await banUser(targetUserId, longReason);
    expect(result).toEqual({ error: 'reasonTooLong' });
    expect(mockUpdateUserById).not.toHaveBeenCalled();
  });

  it('should accept reason that is exactly 1000 characters (boundary)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    const exactReason = 'a'.repeat(1000);
    const result = await banUser(targetUserId, exactReason);
    expect(result).toEqual({ success: true });
    expect(mockUpdateUserById).toHaveBeenCalled();
  });

  it('should return reasonTooLong when reason is exactly 1001 characters (boundary)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);

    const overReason = 'a'.repeat(1001);
    const result = await banUser(targetUserId, overReason);
    expect(result).toEqual({ error: 'reasonTooLong' });
    expect(mockUpdateUserById).not.toHaveBeenCalled();
  });

  it('should return invalidUserId when targetUserId is an empty string', async () => {
    const result = await banUser('', 'spam');
    expect(result).toEqual({ error: 'invalidUserId' });
    expect(mockUpdateUserById).not.toHaveBeenCalled();
  });

  it('should return invalidUserId when targetUserId is not a valid UUID', async () => {
    const result = await banUser('not-a-uuid', 'spam');
    expect(result).toEqual({ error: 'invalidUserId' });
    expect(mockUpdateUserById).not.toHaveBeenCalled();
  });

  it('should insert a moderation_actions record with correct fields on successful ban', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);
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
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);
    mockUpdateUserById.mockResolvedValue({ error: new Error('Auth error') });

    await banUser(targetUserId, 'Spamming');

    expect(mockInsertValues).not.toHaveBeenCalled();
  });

  it('should trim the reason before storing in moderation_actions', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);
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
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });

    await banUser(targetUserId, 'Spamming');

    expect(mockTransaction).toHaveBeenCalledTimes(1);
  });

  it('should rollback Auth ban when DB transaction fails', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);
    mockUpdateUserById.mockResolvedValue({ error: null });
    mockTransaction.mockRejectedValueOnce(new Error('DB transaction failed'));

    const result = await banUser(targetUserId, 'Spamming');

    expect(result).toEqual({ error: 'failedToBan' });
    expect(mockUpdateUserById).toHaveBeenCalledTimes(2);
    expect(mockUpdateUserById).toHaveBeenNthCalledWith(1, targetUserId, {
      ban_duration: '876000h',
    });
    expect(mockUpdateUserById).toHaveBeenNthCalledWith(2, targetUserId, {
      ban_duration: 'none',
    });
  });

  it('should return failedToBan even when Auth rollback also fails (double failure)', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: adminUserId } } });
    mockSelectFromWhere.mockReturnValue([{ id: 'some-id' }]);
    mockUpdateUserById
      .mockResolvedValueOnce({ error: null })
      .mockRejectedValueOnce(new Error('Auth rollback failed'));
    mockTransaction.mockRejectedValueOnce(new Error('DB transaction failed'));

    const result = await banUser(targetUserId, 'Spamming');

    expect(result).toEqual({ error: 'failedToBan' });
  });
});
