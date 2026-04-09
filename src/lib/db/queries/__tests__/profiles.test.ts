import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resetMockDb } from '@/test-utils/mock-db';

// --- hoisted mocks ---

const { mockDb } = vi.hoisted(() => ({
  mockDb: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue([]),
  },
}));

// --- module mocks ---

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();
  return {
    ...actual,
    // Make cache() a pass-through so the wrapped function is called normally
    cache: (fn: unknown) => fn,
  };
});

vi.mock('@/lib/db', () => ({
  db: mockDb,
  profiles: { id: 'id' },
}));

// --- import after mocks ---

import { getProfileByUserId, hasProfile, isUserBanned, fetchProfileMap } from '../profiles';

const mockProfile = {
  id: 'user-1',
  username: 'testuser',
  displayName: 'Test User',
  avatarUrl: null,
  bio: null,
  xUsername: null,
  youtubeChannelUrl: null,
  instagramUsername: null,
  bannedAt: null,
  deletedAt: null,
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
};

describe('profiles queries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetMockDb(mockDb);
  });

  describe('getProfileByUserId', () => {
    it('returns a profile when one exists', async () => {
      mockDb.limit.mockResolvedValue([mockProfile]);

      const result = await getProfileByUserId('user-1');

      expect(result).toEqual(mockProfile);
      expect(mockDb.select).toHaveBeenCalled();
    });

    it('returns undefined when no profile exists', async () => {
      mockDb.limit.mockResolvedValue([]);

      const result = await getProfileByUserId('nonexistent');

      expect(result).toBeUndefined();
    });
  });

  describe('hasProfile', () => {
    it('returns true when a profile exists', async () => {
      mockDb.limit.mockResolvedValue([mockProfile]);

      const result = await hasProfile('user-1');

      expect(result).toBe(true);
    });

    it('returns false when no profile exists', async () => {
      mockDb.limit.mockResolvedValue([]);

      const result = await hasProfile('nonexistent');

      expect(result).toBe(false);
    });
  });

  describe('isUserBanned', () => {
    it('returns false when user has no profile', async () => {
      mockDb.limit.mockResolvedValue([]);

      const result = await isUserBanned('nonexistent');

      expect(result).toBe(false);
    });

    it('returns false when user profile has null bannedAt', async () => {
      mockDb.limit.mockResolvedValue([{ ...mockProfile, bannedAt: null }]);

      const result = await isUserBanned('user-1');

      expect(result).toBe(false);
    });

    it('returns true when user profile has a bannedAt timestamp', async () => {
      mockDb.limit.mockResolvedValue([{ ...mockProfile, bannedAt: new Date('2025-06-01') }]);

      const result = await isUserBanned('user-1');

      expect(result).toBe(true);
    });
  });

  describe('fetchProfileMap', () => {
    it('returns an empty Map when given an empty array', async () => {
      const result = await fetchProfileMap([]);

      expect(result).toEqual(new Map());
      expect(mockDb.select).not.toHaveBeenCalled();
    });

    it('returns a Map keyed by user ID', async () => {
      const profile2 = { ...mockProfile, id: 'user-2', username: 'user2' };
      mockDb.where.mockResolvedValue([mockProfile, profile2]);

      const result = await fetchProfileMap(['user-1', 'user-2']);

      expect(result.size).toBe(2);
      expect(result.get('user-1')).toEqual(mockProfile);
      expect(result.get('user-2')).toEqual(profile2);
    });

    it('returns only found profiles when some IDs do not exist', async () => {
      mockDb.where.mockResolvedValue([mockProfile]);

      const result = await fetchProfileMap(['user-1', 'nonexistent']);

      expect(result.size).toBe(1);
      expect(result.has('user-1')).toBe(true);
      expect(result.has('nonexistent')).toBe(false);
    });
  });
});
