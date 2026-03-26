import { desc, inArray, sql } from 'drizzle-orm';

import { db, profiles, userActivityLog } from '@/lib/db';

import { AdminDataTable } from '../_components/AdminDataTable';
import { PaginationNav } from '../_components/PaginationNav';
import { getLabel } from '../_lib/labels';
import { getPaginationData } from '../_lib/pagination';

export default async function AdminActivityLogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  // Get total count for pagination
  const [countResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(userActivityLog);
  const { currentPage, totalPages, limit, offset } = getPaginationData(
    page,
    Number(countResult.count),
  );

  // Fetch logs for current page
  const logs = await db
    .select()
    .from(userActivityLog)
    .orderBy(desc(userActivityLog.createdAt))
    .limit(limit)
    .offset(offset);

  // Collect unique user IDs for lookups
  const userIds = [...new Set(logs.map((l) => l.userId))];

  // Fetch profiles
  const userProfiles =
    userIds.length > 0
      ? await db.select().from(profiles).where(inArray(profiles.id, userIds))
      : [];
  const profileMap = new Map(userProfiles.map((p) => [p.id, p]));

  const buildHref = (p: number) => `/admin/activity-log?page=${p}`;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{getLabel('admin.activityLog')}</h1>

      <AdminDataTable
        headers={[
          getLabel('admin.activityLogTable.user'),
          getLabel('admin.activityLogTable.action'),
          getLabel('admin.activityLogTable.targetType'),
          getLabel('admin.activityLogTable.targetId'),
          getLabel('admin.activityLogTable.metadata'),
          getLabel('admin.activityLogTable.createdAt'),
        ]}
        items={logs}
        emptyMessage={getLabel('admin.activityLogTable.noLogsFound')}
        renderRow={(log) => {
          const userProfile = profileMap.get(log.userId);
          const userDisplay =
            userProfile?.displayName ?? userProfile?.username ?? log.userId;
          const metadataStr = log.metadata ? JSON.stringify(log.metadata) : '-';

          return (
            <tr key={log.id} className="border-t border-border">
              <td className="px-4 py-3">{userDisplay}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    log.action === 'login'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  {log.action}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{log.targetType ?? '-'}</td>
              <td className="px-4 py-3 text-muted-foreground">{log.targetId ?? '-'}</td>
              <td className="px-4 py-3">
                {metadataStr !== '-' && metadataStr !== '{}' ? (
                  <span title={metadataStr} className="text-xs text-muted-foreground">
                    {metadataStr.length > 60 ? `${metadataStr.slice(0, 60)}...` : metadataStr}
                  </span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {new Date(log.createdAt).toLocaleString('ja-JP')}
              </td>
            </tr>
          );
        }}
      />

      <PaginationNav currentPage={currentPage} totalPages={totalPages} buildHref={buildHref} />
    </div>
  );
}
