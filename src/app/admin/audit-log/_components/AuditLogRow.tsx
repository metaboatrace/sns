import type { ModerationAction, Profile } from '@/lib/db';

import { Badge } from '@/components/ui/badge';
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
    <tr key={log.id} className="border-t border-border">
      <td className="px-4 py-3">{actorDisplay}</td>
      <td className="px-4 py-3">
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
      </td>
      <td className="px-4 py-3">{targetDisplay}</td>
      <td className="px-4 py-3">
        <TruncatedText text={log.reason} maxLength={50} />
      </td>
      <td className="px-4 py-3 text-muted-foreground">{log.ipAddress ?? '-'}</td>
      <td className="px-4 py-3 text-muted-foreground">
        {formatDateTime(log.createdAt)}
      </td>
    </tr>
  );
}
