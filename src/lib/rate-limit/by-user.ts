import { sql } from 'drizzle-orm';
import { db } from '@/lib/db';

export async function checkRateLimit(
  userId: string,
  action: string,
  limit: number,
  windowMs: number,
): Promise<{ allowed: boolean }> {
  const windowStart = new Date(Date.now() - windowMs);

  // Atomic: insert only if current count is below the limit
  const result = await db.execute(
    sql`
      WITH inserted AS (
        INSERT INTO rate_limit_events (user_id, action)
        SELECT ${userId}, ${action}
        WHERE (
          SELECT count(*)
          FROM rate_limit_events
          WHERE user_id = ${userId}
            AND action = ${action}
            AND created_at >= ${windowStart}
        ) < ${limit}
        RETURNING id
      )
      SELECT EXISTS (SELECT 1 FROM inserted) AS allowed
    `
  );

  const allowed = result.rows?.[0]?.allowed ?? false;
  return { allowed: Boolean(allowed) };
}
