import type { Profile } from '@/lib/db';

import { Badge } from '@/components/ui/badge';
import { getLabel } from '../../_lib/labels';

type StatusBadgeProps = {
  profile: Profile | undefined;
};

export function StatusBadge({ profile }: StatusBadgeProps) {
  if (!profile) {
    return (
      <Badge variant="muted">
        {getLabel('admin.usersTable.anonymous')}
      </Badge>
    );
  }

  if (profile.bannedAt != null) {
    return (
      <Badge variant="destructive">
        {getLabel('admin.usersTable.banned')}
      </Badge>
    );
  }

  return (
    <Badge variant="default">
      {getLabel('admin.usersTable.active')}
    </Badge>
  );
}
