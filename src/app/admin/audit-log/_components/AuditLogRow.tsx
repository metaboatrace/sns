import type { ModerationAction, Profile } from '@/lib/db';

import { Badge } from '@/components/ui/badge';
import { DataTableCell } from '../../_components/DataTableCell';
import { DataTableRow } from '../../_components/DataTableRow';
import { TruncatedText } from '../../_components/TruncatedText';
import { formatDateTime } from '../../_lib/date';
import { resolveDisplayName } from '../../_lib/display-name';

type AuditLogRowProps = {
  log: ModerationAction;
  profileMap: Map<string, Profile>;
};

export function AuditLogRow({ log, profileMap }: AuditLogRowProps) {
  const actorDisplay = resolveDisplayName(profileMap, log.actorId);
  const targetDisplay = resolveDisplayName(profileMap, log.targetId);

  return (
    <DataTableRow>
      <DataTableCell>{actorDisplay}</DataTableCell>
      <DataTableCell>
        <Badge
          variant={
            log.action === 'ban'
              ? 'destructive'
              : log.action === 'unban'
                ? 'default'
                : 'secondary'
          }
        >
          {log.action}
        </Badge>
      </DataTableCell>
      <DataTableCell>{targetDisplay}</DataTableCell>
      <DataTableCell>
        <TruncatedText text={log.reason} maxLength={50} />
      </DataTableCell>
      <DataTableCell muted>{log.ipAddress ?? '-'}</DataTableCell>
      <DataTableCell muted>
        {formatDateTime(log.createdAt)}
      </DataTableCell>
    </DataTableRow>
  );
}
