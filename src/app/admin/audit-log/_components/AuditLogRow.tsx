import type { ModerationAction, Profile } from '@/lib/db';

import { Badge } from '../../_components/Badge';
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
                ? 'primary'
                : 'secondary'
          }
        >
          {log.action}
        </Badge>
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
}
