import { desc, sql } from 'drizzle-orm';

import { db, userActivityLog } from '@/lib/db';
import type { Profile, UserActivityLog } from '@/lib/db';
import { fetchProfileMap } from '@/lib/db/queries/profiles';

import { getPaginationData } from '../../_lib/pagination';

export type ActivityLogPageData = {
  logs: UserActivityLog[];
  profileMap: Map<string, Profile>;
  currentPage: number;
  totalPages: number;
};

export async function getActivityLogPageData(page: number): Promise<ActivityLogPageData> {
  const [countResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(userActivityLog);
  const { currentPage, totalPages, limit, offset } = getPaginationData(
    page,
    Number(countResult.count),
  );

  const logs = await db
    .select()
    .from(userActivityLog)
    .orderBy(desc(userActivityLog.createdAt))
    .limit(limit)
    .offset(offset);

  const userIds = [...new Set(logs.map((l) => l.userId))];

  const profileMap = await fetchProfileMap(userIds);

  return { logs, profileMap, currentPage, totalPages };
}
