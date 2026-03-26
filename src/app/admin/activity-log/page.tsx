import { AdminDataTable } from '../_components/AdminDataTable';
import { PaginationNav } from '../_components/PaginationNav';
import { getLabel } from '../_lib/labels';
import { parsePageParam } from '../_lib/pagination';

import { ActivityLogRow } from './_components/ActivityLogRow';
import { getActivityLogPageData } from './_queries/getActivityLogPageData';

export default async function AdminActivityLogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const page = parsePageParam(await searchParams);
  const { logs, profileMap, currentPage, totalPages } = await getActivityLogPageData(page);

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
        renderRow={(log) => (
          <ActivityLogRow key={log.id} log={log} profileMap={profileMap} />
        )}
      />

      <PaginationNav currentPage={currentPage} totalPages={totalPages} buildHref={buildHref} />
    </div>
  );
}
