import { getAuthenticatedUser } from '@/lib/auth';

import { AdminDataTable } from '../_components/AdminDataTable';
import { PaginationNav } from '../_components/PaginationNav';
import { getLabel } from '../_lib/labels';
import { parsePageParam } from '../_lib/pagination';

import { UserRow } from './_components/UserRow';
import { getUsersPageData } from './_queries/getUsersPageData';

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const page = parsePageParam(await searchParams);
  const currentUser = await getAuthenticatedUser();
  const { users, profileMap, roleMap, currentPage, totalPages } = await getUsersPageData(page);

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
        renderRow={(user) => (
          <UserRow
            key={user.id}
            user={user}
            profileMap={profileMap}
            roleMap={roleMap}
            currentUserId={currentUser.id}
          />
        )}
      />

      <PaginationNav currentPage={currentPage} totalPages={totalPages} buildHref={buildHref} />
    </div>
  );
}
