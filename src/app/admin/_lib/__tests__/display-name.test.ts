import { describe, it, expect } from 'vitest';

import { resolveDisplayName } from '../display-name';

import type { Profile } from '@/lib/db';

/**
 * Helper to create a minimal Profile object for testing.
 * Only the fields relevant to resolveDisplayName are required;
 * the rest are filled with sensible defaults.
 */
function makeProfile(
  overrides: Partial<Pick<Profile, 'id' | 'displayName' | 'username'>> & { id: string; username: string },
): Profile {
  return {
    id: overrides.id,
    username: overrides.username,
    displayName: overrides.displayName ?? null,
    avatarUrl: null,
    bio: null,
    xUsername: null,
    youtubeChannelUrl: null,
    instagramUsername: null,
    bannedAt: null,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

describe('resolveDisplayName', () => {
  it('returns displayName when profile has one', () => {
    const profile = makeProfile({ id: 'u1', username: 'alice', displayName: 'Alice A.' });
    const map = new Map([['u1', profile]]);

    expect(resolveDisplayName(map, 'u1')).toBe('Alice A.');
  });

  it('falls back to username when displayName is null', () => {
    const profile = makeProfile({ id: 'u2', username: 'bob' });
    const map = new Map([['u2', profile]]);

    expect(resolveDisplayName(map, 'u2')).toBe('bob');
  });

  it('falls back to userId when profile is not in the map', () => {
    const map = new Map<string, Profile>();

    expect(resolveDisplayName(map, 'unknown-id')).toBe('unknown-id');
  });

  it('falls back to username when displayName is undefined', () => {
    const profile = makeProfile({ id: 'u3', username: 'charlie', displayName: undefined });
    const map = new Map([['u3', profile]]);

    expect(resolveDisplayName(map, 'u3')).toBe('charlie');
  });

  it('returns displayName even if it is an empty string', () => {
    const profile = makeProfile({ id: 'u4', username: 'dave', displayName: '' });
    const map = new Map([['u4', profile]]);

    // Empty string is falsy but not nullish — ?? does not trigger
    expect(resolveDisplayName(map, 'u4')).toBe('');
  });

  it('works with a map containing multiple profiles', () => {
    const p1 = makeProfile({ id: 'u1', username: 'alice', displayName: 'Alice' });
    const p2 = makeProfile({ id: 'u2', username: 'bob' });
    const map = new Map([
      ['u1', p1],
      ['u2', p2],
    ]);

    expect(resolveDisplayName(map, 'u1')).toBe('Alice');
    expect(resolveDisplayName(map, 'u2')).toBe('bob');
    expect(resolveDisplayName(map, 'u3')).toBe('u3');
  });
});
