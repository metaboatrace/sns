import { moderationActions } from '@/lib/db';
import type { ModerationAction, Profile } from '@/lib/db';

import { fetchPaginatedLogPage } from '../../_lib/paginated-query';

export type AuditLogPageData = {
  logs: ModerationAction[];
  profileMap: Map<string, Profile>;
  currentPage: number;
  totalPages: number;
};

export async function getAuditLogPageData(page: number): Promise<AuditLogPageData> {
  return fetchPaginatedLogPage<ModerationAction>(
    moderationActions,
    moderationActions.createdAt,
    page,
    (logs) => {
      const targetIds = logs.map((l) => l.targetId);
      const actorIds = logs.map((l) => l.actorId);
      return [...new Set([...targetIds, ...actorIds])];
    },
  );
}
