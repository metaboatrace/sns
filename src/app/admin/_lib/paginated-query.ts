import { desc, sql } from 'drizzle-orm';
import type { PgColumn } from 'drizzle-orm/pg-core';
import type { PgTable, TableConfig } from 'drizzle-orm/pg-core';

import { db } from '@/lib/db';
import type { Profile } from '@/lib/db';
import { fetchProfileMap } from '@/lib/db/queries/profiles';

import { getPaginationData } from './pagination';

export type PaginatedLogResult<T> = {
  logs: T[];
  profileMap: Map<string, Profile>;
  currentPage: number;
  totalPages: number;
};

/**
 * Fetch a paginated slice of a log table with associated profile data.
 *
 * @param table - Drizzle table reference
 * @param orderByColumn - Column to order results by (descending)
 * @param page - 1-based page number
 * @param extractUserIds - function to extract user IDs from the fetched rows
 */
export async function fetchPaginatedLogPage<R extends Record<string, unknown>>(
  table: PgTable<TableConfig>,
  orderByColumn: PgColumn,
  page: number,
  extractUserIds: (logs: R[]) => string[],
): Promise<PaginatedLogResult<R>> {
  const [countResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(table);
  const { currentPage, totalPages, limit, offset } = getPaginationData(
    page,
    Number(countResult.count),
  );

  const logs = (await db
    .select()
    .from(table)
    .orderBy(desc(orderByColumn))
    .limit(limit)
    .offset(offset)) as R[];

  const userIds = extractUserIds(logs);
  const profileMap = await fetchProfileMap(userIds);

  return { logs, profileMap, currentPage, totalPages };
}
