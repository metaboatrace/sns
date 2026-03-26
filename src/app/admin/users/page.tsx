import { inArray } from 'drizzle-orm';

import { db, type Profile, profiles, userRoles } from '@/lib/db';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

import { AdminDataTable } from '../_components/AdminDataTable';
import { PaginationNav } from '../_components/PaginationNav';
import { getLabel } from '../_lib/labels';
import { DEFAULT_PAGE_SIZE, getPaginationData } from '../_lib/pagination';

import { BanButton } from './_components/BanButton';
import { StatusBadge } from './_components/StatusBadge';
import { UnbanButton } from './_components/UnbanButton';

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const adminClient = createAdminClient();

  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const { data: usersData, error } = await adminClient.auth.admin.listUsers({
    page,
    perPage: DEFAULT_PAGE_SIZE,
  });

  if (error) {
    throw new Error(`Failed to list users: ${error.message}`);
  }

  const users = usersData?.users ?? [];
  const totalCount = usersData && 'total' in usersData ? Number(usersData.total) : 0;
  const { currentPage, totalPages } = getPaginationData(page, totalCount);

  const userIds = users.map((u) => u.id);

  const userProfiles: Profile[] =
    userIds.length > 0
      ? await db.select().from(profiles).where(inArray(profiles.id, userIds))
      : [];
  const profileMap = new Map(userProfiles.map((p) => [p.id, p]));

  const roles =
    userIds.length > 0
      ? await db.select().from(userRoles).where(inArray(userRoles.userId, userIds))
      : [];
  const roleMap = new Map(roles.map((r) => [r.userId, r.role]));

  const buildHref = (p: number) => `/admin/users?page=${p}`;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{getLabel('admin.users')}</h1>

      <AdminDataTable
        headers={[
          getLabel('admin.usersTable.email'),
          getLabel('admin.usersTable.username'),
          getLabel('admin.usersTable.role'),
          getLabel('admin.usersTable.status'),
          getLabel('admin.usersTable.createdAt'),
          getLabel('admin.usersTable.actions'),
        ]}
        items={users}
        emptyMessage={getLabel('admin.usersTable.noUsersFound')}
        renderRow={(user) => {
          const profile = profileMap.get(user.id);
          const isBanned = profile?.bannedAt != null;
          const isCurrentUser = currentUser?.id === user.id;

          return (
            <tr key={user.id} className="border-t border-border">
              <td className="px-4 py-3">{user.email ?? '-'}</td>
              <td className="px-4 py-3">{profile?.username ?? '-'}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    roleMap.get(user.id) === 'admin'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  {roleMap.get(user.id) ?? getLabel('admin.usersTable.defaultRole')}
                </span>
              </td>
              <td className="px-4 py-3">
                <StatusBadge profile={profile} />
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {user.created_at ? new Date(user.created_at).toLocaleDateString('ja-JP') : '-'}
              </td>
              <td className="px-4 py-3">
                {!isCurrentUser && profile && (
                  <>
                    {isBanned ? <UnbanButton userId={user.id} /> : <BanButton userId={user.id} />}
                  </>
                )}
              </td>
            </tr>
          );
        }}
      />

      <PaginationNav currentPage={currentPage} totalPages={totalPages} buildHref={buildHref} />
    </div>
  );
}
