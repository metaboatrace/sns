import { desc, sql } from 'drizzle-orm';
import type { PgColumn } from 'drizzle-orm/pg-core';
import type { PgTable, TableConfig } from 'drizzle-orm/pg-core';

import { db } from '@/lib/db';
import type { Profile } from '@/lib/db';
import { fetchProfileMap } from '@/lib/db/queries/profiles';

import { DEFAULT_PAGE_SIZE } from './pagination';

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
  const pageSize = DEFAULT_PAGE_SIZE;
  const offset = (Math.max(1, page) - 1) * pageSize;

  const [countResult, logs] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(table),
    db
      .select()
      .from(table)
      .orderBy(desc(orderByColumn))
      .limit(pageSize)
      .offset(offset) as Promise<R[]>,
  ]);

  const totalCount = Number(countResult[0].count);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const userIds = extractUserIds(logs);
  const profileMap = await fetchProfileMap(userIds);

  return { logs, profileMap, currentPage, totalPages };
}
