import type { User } from '@supabase/supabase-js';

import type { Profile } from '@/lib/db';

import { Badge } from '@/components/ui/badge';
import { DataTableCell } from '../../_components/DataTableCell';
import { DataTableRow } from '../../_components/DataTableRow';
import { formatDate } from '../../_lib/date';
import { getLabel } from '../../_lib/labels';

import { BanButton } from './BanButton';
import { StatusBadge } from './StatusBadge';
import { UnbanButton } from './UnbanButton';

type UserRowProps = {
  user: User;
  profileMap: Map<string, Profile>;
  roleMap: Map<string, string>;
  currentUserId: string;
};

export function UserRow({ user, profileMap, roleMap, currentUserId }: UserRowProps) {
  const profile = profileMap.get(user.id);
  const isBanned = profile?.bannedAt != null;
  const isCurrentUser = currentUserId === user.id;

  return (
    <DataTableRow>
      <DataTableCell>{user.email ?? '-'}</DataTableCell>
      <DataTableCell>{profile?.username ?? '-'}</DataTableCell>
      <DataTableCell>
        <Badge variant={roleMap.get(user.id) === 'admin' ? 'default' : 'secondary'}>
          {roleMap.get(user.id) ?? getLabel('admin.usersTable.defaultRole')}
        </Badge>
      </DataTableCell>
      <DataTableCell>
        <StatusBadge profile={profile} />
      </DataTableCell>
      <DataTableCell muted>
        {user.created_at ? formatDate(user.created_at) : '-'}
      </DataTableCell>
      <DataTableCell>
        {!isCurrentUser && profile && (
          isBanned ? <UnbanButton userId={user.id} /> : <BanButton userId={user.id} />
        )}
      </DataTableCell>
    </DataTableRow>
  );
}
