import type { User } from '@supabase/supabase-js';

import type { Profile } from '@/lib/db';

import { Badge } from '../../_components/Badge';
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
    <tr key={user.id} className="border-t border-border">
      <td className="px-4 py-3">{user.email ?? '-'}</td>
      <td className="px-4 py-3">{profile?.username ?? '-'}</td>
      <td className="px-4 py-3">
        <Badge variant={roleMap.get(user.id) === 'admin' ? 'primary' : 'secondary'}>
          {roleMap.get(user.id) ?? getLabel('admin.usersTable.defaultRole')}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <StatusBadge profile={profile} />
      </td>
      <td className="px-4 py-3 text-muted-foreground">
        {user.created_at ? formatDate(user.created_at) : '-'}
      </td>
      <td className="px-4 py-3">
        {!isCurrentUser && profile && (
          <>{isBanned ? <UnbanButton userId={user.id} /> : <BanButton userId={user.id} />}</>
        )}
      </td>
    </tr>
  );
}
