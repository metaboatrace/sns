import type { Profile, UserActivityLog } from '@/lib/db';

import { Badge } from '@/components/ui/badge';
import { DataTableCell } from '../../_components/DataTableCell';
import { DataTableRow } from '../../_components/DataTableRow';
import { TruncatedText } from '../../_components/TruncatedText';
import { formatDateTime } from '../../_lib/date';
import { resolveDisplayName } from '../../_lib/display-name';

type ActivityLogRowProps = {
  log: UserActivityLog;
  profileMap: Map<string, Profile>;
};

export function ActivityLogRow({ log, profileMap }: ActivityLogRowProps) {
  const userDisplay = resolveDisplayName(profileMap, log.userId);
  const metadataStr = log.metadata ? JSON.stringify(log.metadata) : null;
  const displayMetadata = metadataStr === '{}' ? null : metadataStr;

  return (
    <DataTableRow>
      <DataTableCell>{userDisplay}</DataTableCell>
      <DataTableCell>
        <Badge variant={log.action === 'login' ? 'default' : 'secondary'}>
          {log.action}
        </Badge>
      </DataTableCell>
      <DataTableCell muted>{log.targetType ?? '-'}</DataTableCell>
      <DataTableCell muted>{log.targetId ?? '-'}</DataTableCell>
      <DataTableCell>
        <TruncatedText text={displayMetadata} maxLength={60} className="text-xs text-muted-foreground" />
      </DataTableCell>
      <DataTableCell muted>
        {formatDateTime(log.createdAt)}
      </DataTableCell>
    </DataTableRow>
  );
}
