import { desc, sql } from 'drizzle-orm';

import { db, moderationActions } from '@/lib/db';
import type { ModerationAction, Profile } from '@/lib/db';
import { fetchProfileMap } from '@/lib/db/queries/profiles';

import { getPaginationData } from '../../_lib/pagination';

export type AuditLogPageData = {
  logs: ModerationAction[];
  profileMap: Map<string, Profile>;
  currentPage: number;
  totalPages: number;
};

export async function getAuditLogPageData(page: number): Promise<AuditLogPageData> {
  const [countResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(moderationActions);
  const { currentPage, totalPages, limit, offset } = getPaginationData(
    page,
    Number(countResult.count),
  );

  const logs = await db
    .select()
    .from(moderationActions)
    .orderBy(desc(moderationActions.createdAt))
    .limit(limit)
    .offset(offset);

  const targetIds = [...new Set(logs.map((l) => l.targetId))];
  const actorIds = [...new Set(logs.map((l) => l.actorId))];
  const allUserIds = [...new Set([...targetIds, ...actorIds])];

  const profileMap = await fetchProfileMap(allUserIds);

  return { logs, profileMap, currentPage, totalPages };
}
