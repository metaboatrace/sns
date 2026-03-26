import type { Profile } from '@/lib/db';

import { getLabel } from '../../_lib/labels';

type StatusBadgeProps = {
  profile: Profile | undefined;
};

export function StatusBadge({ profile }: StatusBadgeProps) {
  if (!profile) {
    return (
      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
        {getLabel('admin.usersTable.anonymous')}
      </span>
    );
  }

  if (profile.bannedAt != null) {
    return (
      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-destructive text-destructive-foreground">
        {getLabel('admin.usersTable.banned')}
      </span>
    );
  }

  return (
    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
      {getLabel('admin.usersTable.active')}
    </span>
  );
}
