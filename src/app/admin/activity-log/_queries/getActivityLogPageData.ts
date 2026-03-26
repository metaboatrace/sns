import { userActivityLog } from '@/lib/db';
import type { Profile, UserActivityLog } from '@/lib/db';

import { fetchPaginatedLogPage } from '../../_lib/paginated-query';

export type ActivityLogPageData = {
  logs: UserActivityLog[];
  profileMap: Map<string, Profile>;
  currentPage: number;
  totalPages: number;
};

export async function getActivityLogPageData(page: number): Promise<ActivityLogPageData> {
  return fetchPaginatedLogPage<UserActivityLog>(
    userActivityLog,
    userActivityLog.createdAt,
    page,
    (logs) => [...new Set(logs.map((l) => l.userId))],
  );
}
