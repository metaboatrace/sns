import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resetMockDb } from '@/test-utils/mock-db';

// --- hoisted mocks ---

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

const { mockValidateUsernameServer } = vi.hoisted(() => ({
  mockValidateUsernameServer: vi.fn(),
}));

const { mockHasProfile } = vi.hoisted(() => ({
  mockHasProfile: vi.fn(),
}));

const { mockIsUniqueViolation } = vi.hoisted(() => ({
  mockIsUniqueViolation: vi.fn(),
}));

// --- module mocks ---

vi.mock('server-only', () => ({}));

vi.mock('@/lib/db', () => ({
  db: mockDb,
  profiles: { id: 'id', username: 'username', displayName: 'display_name' },
}));

vi.mock('@/lib/db/errors', () => ({
  isUniqueViolation: mockIsUniqueViolation,
}));

vi.mock('@/lib/username/server-validation', () => ({
  validateUsernameServer: mockValidateUsernameServer,
}));

vi.mock('@/lib/db/queries/profiles', () => ({
  hasProfile: mockHasProfile,
}));

// --- import SUT after mocks ---

import { setupUsername } from '../../services/username-setup';

// =============================================================================
// Tests
// =============================================================================

describe('username-setup service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetMockDb(mockDb);
    mockValidateUsernameServer.mockReturnValue(null);
    mockHasProfile.mockResolvedValue(false);
    mockIsUniqueViolation.mockReturnValue(false);
  });

  // ---------------------------------------------------------------------------
  // setupUsername - success cases
  // ---------------------------------------------------------------------------

  describe('setupUsername - success', () => {
    it('inserts a profile and returns success with the username', async () => {
      const result = await setupUsername('user-1', 'validname');

      expect(result).toEqual({ success: true, username: 'validname' });
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.values).toHaveBeenCalledWith({
        id: 'user-1',
        username: 'validname',
        displayName: 'validname',
      });
    });

    it('uses the provided displayName when given', async () => {
      const result = await setupUsername('user-1', 'myuser', 'My Display Name');

      expect(result).toEqual({ success: true, username: 'myuser' });
      expect(mockDb.values).toHaveBeenCalledWith({
        id: 'user-1',
        username: 'myuser',
        displayName: 'My Display Name',
      });
    });

    it('defaults displayName to username when displayName is undefined', async () => {
      await setupUsername('user-1', 'sailor42');

      expect(mockDb.values).toHaveBeenCalledWith(
        expect.objectContaining({ displayName: 'sailor42' }),
      );
    });

    it('calls validateUsernameServer before inserting', async () => {
      await setupUsername('user-1', 'goodname');

      expect(mockValidateUsernameServer).toHaveBeenCalledWith('goodname');
      // insert should have been called because validation passed
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it('checks hasProfile before inserting', async () => {
      await setupUsername('user-1', 'goodname');

      expect(mockHasProfile).toHaveBeenCalledWith('user-1');
    });
  });

  // ---------------------------------------------------------------------------
  // setupUsername - validation error
  // ---------------------------------------------------------------------------

  describe('setupUsername - validation error', () => {
    it('returns validation_error when username is too short', async () => {
      mockValidateUsernameServer.mockReturnValue('too_short');

      const result = await setupUsername('user-1', 'a');

      expect(result).toEqual({
        success: false,
        error: { type: 'validation_error', error: 'too_short' },
      });
    });

    it('returns validation_error when username is too long', async () => {
      mockValidateUsernameServer.mockReturnValue('too_long');

      const result = await setupUsername('user-1', 'a'.repeat(21));

      expect(result).toEqual({
        success: false,
        error: { type: 'validation_error', error: 'too_long' },
      });
    });

    it('returns validation_error when username has invalid format', async () => {
      mockValidateUsernameServer.mockReturnValue('invalid_format');

      const result = await setupUsername('user-1', 'Bad_Name');

      expect(result).toEqual({
        success: false,
        error: { type: 'validation_error', error: 'invalid_format' },
      });
    });

    it('returns validation_error when username is reserved', async () => {
      mockValidateUsernameServer.mockReturnValue('reserved');

      const result = await setupUsername('user-1', 'admin');

      expect(result).toEqual({
        success: false,
        error: { type: 'validation_error', error: 'reserved' },
      });
    });

    it('returns validation_error when username is inappropriate', async () => {
      mockValidateUsernameServer.mockReturnValue('username_inappropriate');

      const result = await setupUsername('user-1', 'badword');

      expect(result).toEqual({
        success: false,
        error: { type: 'validation_error', error: 'username_inappropriate' },
      });
    });

    it('does not call hasProfile or insert when validation fails', async () => {
      mockValidateUsernameServer.mockReturnValue('too_short');

      await setupUsername('user-1', 'a');

      expect(mockHasProfile).not.toHaveBeenCalled();
      expect(mockDb.insert).not.toHaveBeenCalled();
    });
  });

  // ---------------------------------------------------------------------------
  // setupUsername - already has profile
  // ---------------------------------------------------------------------------

  describe('setupUsername - already_set', () => {
    it('returns already_set when user already has a profile', async () => {
      mockHasProfile.mockResolvedValue(true);

      const result = await setupUsername('user-1', 'validname');

      expect(result).toEqual({
        success: false,
        error: { type: 'already_set' },
      });
    });

    it('does not attempt to insert when profile already exists', async () => {
      mockHasProfile.mockResolvedValue(true);

      await setupUsername('user-1', 'validname');

      expect(mockDb.insert).not.toHaveBeenCalled();
    });
  });

  // ---------------------------------------------------------------------------
  // setupUsername - username taken (unique violation)
  // ---------------------------------------------------------------------------

  describe('setupUsername - username_taken', () => {
    it('returns username_taken when insert throws a unique violation', async () => {
      const uniqueError = { code: '23505' };
      mockDb.values.mockRejectedValue(uniqueError);
      mockIsUniqueViolation.mockReturnValue(true);

      const result = await setupUsername('user-1', 'taken_name');

      expect(result).toEqual({
        success: false,
        error: { type: 'username_taken' },
      });
    });

    it('re-throws non-unique-violation errors', async () => {
      const otherError = new Error('connection lost');
      mockDb.values.mockRejectedValue(otherError);
      mockIsUniqueViolation.mockReturnValue(false);

      await expect(setupUsername('user-1', 'validname')).rejects.toThrow('connection lost');
    });
  });

  // ---------------------------------------------------------------------------
  // setupUsername - edge cases
  // ---------------------------------------------------------------------------

  describe('setupUsername - edge cases', () => {
    it('uses empty string displayName as-is (nullish coalescing does not treat it as fallback)', async () => {
      const result = await setupUsername('user-1', 'myuser', '');

      expect(result).toEqual({ success: true, username: 'myuser' });
      // ?? only falls back on null/undefined, so empty string is kept
      expect(mockDb.values).toHaveBeenCalledWith(
        expect.objectContaining({ displayName: '' }),
      );
    });

    it('handles displayName that is explicitly provided', async () => {
      const result = await setupUsername('user-1', 'myuser', 'Custom Name');

      expect(result).toEqual({ success: true, username: 'myuser' });
      expect(mockDb.values).toHaveBeenCalledWith(
        expect.objectContaining({ displayName: 'Custom Name' }),
      );
    });
  });
});
