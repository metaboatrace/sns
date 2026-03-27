import { sql } from 'drizzle-orm';
import { db } from '@/lib/db';

/**
 * Probabilistically delete expired rate limit events to prevent unbounded table growth.
 * Fire-and-forget: failures are logged but never thrown.
 */
function maybeCleanupExpiredEvents(action: string, windowMs: number): void {
  // Run cleanup on ~1% of calls to avoid a DELETE on every request
  if (Math.random() >= 0.01) return;

  const cutoff = new Date(Date.now() - windowMs).toISOString();
  db.execute(
    sql`DELETE FROM rate_limit_events WHERE action = ${action} AND created_at < ${cutoff}`
  ).catch((err) => {
    console.error('Failed to cleanup expired rate_limit_events:', err);
  });
}

export async function checkRateLimit(
  userId: string,
  action: string,
  limit: number,
  windowMs: number,
): Promise<{ allowed: boolean }> {
  const windowStart = new Date(Date.now() - windowMs).toISOString();

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

  // db.execute() with drizzle-orm/postgres-js returns an array of rows directly,
  // not a { rows: [...] } wrapper.
  const row = result[0] as { allowed: boolean } | undefined;

  // Opportunistically clean up expired records (fire-and-forget)
  maybeCleanupExpiredEvents(action, windowMs);

  return { allowed: Boolean(row?.allowed ?? false) };
}
