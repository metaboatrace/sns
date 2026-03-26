import type { Profile, UserActivityLog } from '@/lib/db';

import { Badge } from '../../_components/Badge';
import { resolveDisplayName } from '../../_lib/display-name';

type ActivityLogRowProps = {
  log: UserActivityLog;
  profileMap: Map<string, Profile>;
};

export function ActivityLogRow({ log, profileMap }: ActivityLogRowProps) {
  const userDisplay = resolveDisplayName(profileMap, log.userId);
  const metadataStr = log.metadata ? JSON.stringify(log.metadata) : '-';

  return (
    <tr key={log.id} className="border-t border-border">
      <td className="px-4 py-3">{userDisplay}</td>
      <td className="px-4 py-3">
        <Badge variant={log.action === 'login' ? 'primary' : 'secondary'}>
          {log.action}
        </Badge>
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
}
