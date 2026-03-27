import { and, eq } from 'drizzle-orm';
import { db, userRoles } from '@/lib/db';

/**
 * Check whether the given user has the 'admin' role.
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const [row] = await db
    .select({ id: userRoles.id })
    .from(userRoles)
    .where(and(eq(userRoles.userId, userId), eq(userRoles.role, 'admin')))
    .limit(1);
  return !!row;
}
