import { eq, inArray } from 'drizzle-orm';
import { db, profiles } from '@/lib/db';
import type { Profile } from '@/lib/db';

/**
 * Fetch a full profile by user ID.
 * Returns undefined if no profile exists.
 */
export async function getProfileByUserId(userId: string): Promise<Profile | undefined> {
  const [profile] = await db.select().from(profiles).where(eq(profiles.id, userId)).limit(1);
  return profile;
}

/**
 * Check whether a profile exists for the given user ID.
 * Uses a minimal select for efficiency.
 */
export async function hasProfile(userId: string): Promise<boolean> {
  const [row] = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.id, userId))
    .limit(1);
  return !!row;
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
 */
export async function isUserBanned(userId: string): Promise<boolean> {
  const [row] = await db
    .select({ bannedAt: profiles.bannedAt })
    .from(profiles)
    .where(eq(profiles.id, userId))
    .limit(1);
  return !!row?.bannedAt;
}
