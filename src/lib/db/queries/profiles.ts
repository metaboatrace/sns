import { cache } from 'react';
import { eq, inArray } from 'drizzle-orm';
import { db, profiles } from '@/lib/db';
import type { Profile } from '@/lib/db';

/**
 * React.cache()-wrapped profile fetcher.
 * Within a single server render pass, multiple calls with the same userId
 * will reuse the first result, eliminating duplicate DB queries.
 */
const getCachedProfile = cache(async (userId: string): Promise<Profile | undefined> => {
  const [profile] = await db.select().from(profiles).where(eq(profiles.id, userId)).limit(1);
  return profile;
});

/**
 * Fetch a full profile by user ID.
 * Returns undefined if no profile exists.
 */
export async function getProfileByUserId(userId: string): Promise<Profile | undefined> {
  return getCachedProfile(userId);
}

/**
 * Check whether a profile exists for the given user ID.
 * Derives the result from the cached full profile fetch.
 */
export async function hasProfile(userId: string): Promise<boolean> {
  const profile = await getCachedProfile(userId);
  return !!profile;
}

/**
 * Fetch profiles for the given user IDs and return them as a Map keyed by user ID.
 */
export async function fetchProfileMap(userIds: string[]): Promise<Map<string, Profile>> {
  if (userIds.length === 0) {
    return new Map();
  }
  const rows = await db.select().from(profiles).where(inArray(profiles.id, userIds));
  return new Map(rows.map((p) => [p.id, p]));
}

/**
 * Check whether a user is banned.
 * Returns true if the profile exists and has a non-null bannedAt timestamp.
 * Derives the result from the cached full profile fetch.
 */
export async function isUserBanned(userId: string): Promise<boolean> {
  const profile = await getCachedProfile(userId);
  return !!profile?.bannedAt;
}
