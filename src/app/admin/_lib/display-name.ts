import type { Profile } from '@/lib/db';

/**
 * Resolve a human-readable display name for the given userId.
 * Falls back to username, then userId if no profile or displayName exists.
 */
export function resolveDisplayName(
  profileMap: Map<string, Profile>,
  userId: string,
): string {
  const profile = profileMap.get(userId);
  return profile?.displayName ?? profile?.username ?? userId;
}
