import { and, eq, gte, sql } from 'drizzle-orm';
import { db, rateLimitEvents } from '@/lib/db';

export async function checkRateLimit(
  userId: string,
  action: string,
  limit: number,
  windowMs: number,
): Promise<{ allowed: boolean }> {
  const windowStart = new Date(Date.now() - windowMs);

  const [result] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(rateLimitEvents)
    .where(
      and(
        eq(rateLimitEvents.userId, userId),
        eq(rateLimitEvents.action, action),
        gte(rateLimitEvents.createdAt, windowStart),
      ),
    );

  if (result.count >= limit) {
    return { allowed: false };
  }

  await db.insert(rateLimitEvents).values({ userId, action });

  return { allowed: true };
}
