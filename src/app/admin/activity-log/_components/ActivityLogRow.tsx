import type { Profile, UserActivityLog } from '@/lib/db';

import { Badge } from '@/components/ui/badge';
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
    <tr key={log.id} className="border-t border-border">
      <td className="px-4 py-3">{userDisplay}</td>
      <td className="px-4 py-3">
        <Badge variant={log.action === 'login' ? 'default' : 'secondary'}>
          {log.action}
        </Badge>
      </td>
      <td className="px-4 py-3 text-muted-foreground">{log.targetType ?? '-'}</td>
      <td className="px-4 py-3 text-muted-foreground">{log.targetId ?? '-'}</td>
      <td className="px-4 py-3">
        <TruncatedText text={displayMetadata} maxLength={60} className="text-xs text-muted-foreground" />
      </td>
      <td className="px-4 py-3 text-muted-foreground">
        {formatDateTime(log.createdAt)}
      </td>
    </tr>
  );
}
