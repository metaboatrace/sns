import { desc, inArray, sql } from 'drizzle-orm';

import { db, moderationActions, profiles } from '@/lib/db';

import { AdminDataTable } from '../_components/AdminDataTable';
import { PaginationNav } from '../_components/PaginationNav';
import { getLabel } from '../_lib/labels';
import { getPaginationData } from '../_lib/pagination';

export default async function AdminAuditLogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  // Get total count for pagination
  const [countResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(moderationActions);
  const { currentPage, totalPages, limit, offset } = getPaginationData(
    page,
    Number(countResult.count),
  );

  // Fetch logs for current page
  const logs = await db
    .select()
    .from(moderationActions)
    .orderBy(desc(moderationActions.createdAt))
    .limit(limit)
    .offset(offset);

  // Collect unique user IDs for actor and target lookups
  const targetIds = [...new Set(logs.map((l) => l.targetId))];
  const actorIds = [...new Set(logs.map((l) => l.actorId))];
  const allUserIds = [...new Set([...targetIds, ...actorIds])];

  // Fetch profiles
  const userProfiles =
    allUserIds.length > 0
      ? await db.select().from(profiles).where(inArray(profiles.id, allUserIds))
      : [];
  const profileMap = new Map(userProfiles.map((p) => [p.id, p]));

  const buildHref = (p: number) => `/admin/audit-log?page=${p}`;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{getLabel('admin.auditLog')}</h1>

      <AdminDataTable
        headers={[
          getLabel('admin.auditLogTable.actor'),
          getLabel('admin.auditLogTable.action'),
          getLabel('admin.auditLogTable.target'),
          getLabel('admin.auditLogTable.reason'),
          getLabel('admin.auditLogTable.ipAddress'),
          getLabel('admin.auditLogTable.createdAt'),
        ]}
        items={logs}
        emptyMessage={getLabel('admin.auditLogTable.noLogsFound')}
        renderRow={(log) => {
          const actorProfile = profileMap.get(log.actorId);
          const actorDisplay =
            actorProfile?.displayName ?? actorProfile?.username ?? log.actorId;
          const targetProfile = profileMap.get(log.targetId);
          const targetDisplay =
            targetProfile?.displayName ?? targetProfile?.username ?? log.targetId;

          return (
            <tr key={log.id} className="border-t border-border">
              <td className="px-4 py-3">{actorDisplay}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    log.action === 'ban'
                      ? 'bg-destructive text-destructive-foreground'
                      : log.action === 'unban'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground'
                  }`}
                >
                  {log.action}
                </span>
              </td>
              <td className="px-4 py-3">{targetDisplay}</td>
              <td className="px-4 py-3">
                {log.reason ? (
                  <span title={log.reason}>
                    {log.reason.length > 50 ? `${log.reason.slice(0, 50)}...` : log.reason}
                  </span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{log.ipAddress ?? '-'}</td>
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
