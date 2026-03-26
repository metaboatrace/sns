import { eq } from 'drizzle-orm';
import { db, userRoles } from '@/lib/db';

/**
 * Check whether the given user has the 'admin' role.
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const [userRole] = await db
    .select()
    .from(userRoles)
    .where(eq(userRoles.userId, userId))
    .limit(1);
  return !!userRole && userRole.role === 'admin';
}
