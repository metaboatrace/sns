import { AdminDataTable } from '../_components/AdminDataTable';
import { PaginationNav } from '../_components/PaginationNav';
import { getLabel } from '../_lib/labels';
import { parsePageParam } from '../_lib/pagination';

import { AuditLogRow } from './_components/AuditLogRow';
import { getAuditLogPageData } from './_queries/getAuditLogPageData';

export default async function AdminAuditLogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const page = parsePageParam(await searchParams);
  const { logs, profileMap, currentPage, totalPages } = await getAuditLogPageData(page);

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
        renderRow={(log) => (
          <AuditLogRow key={log.id} log={log} profileMap={profileMap} />
        )}
      />

      <PaginationNav currentPage={currentPage} totalPages={totalPages} buildHref={buildHref} />
    </div>
  );
}
