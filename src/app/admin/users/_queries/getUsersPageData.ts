import { inArray } from 'drizzle-orm';
import type { User } from '@supabase/supabase-js';

import { db, userRoles } from '@/lib/db';
import type { Profile } from '@/lib/db';
import { fetchProfileMap } from '@/lib/db/queries/profiles';
import { createAdminClient } from '@/lib/supabase/admin';

import { DEFAULT_PAGE_SIZE, getPaginationData } from '../../_lib/pagination';

export type UsersPageData = {
  users: User[];
  profileMap: Map<string, Profile>;
  roleMap: Map<string, string>;
  currentPage: number;
  totalPages: number;
};

export async function getUsersPageData(page: number): Promise<UsersPageData> {
  const adminClient = createAdminClient();

  const { data: usersData, error } = await adminClient.auth.admin.listUsers({
    page,
    perPage: DEFAULT_PAGE_SIZE,
  });

  if (error) {
    throw new Error(`Failed to list users: ${error.message}`);
  }

  const users = usersData?.users ?? [];
  const totalCount = typeof usersData?.total === 'number' ? usersData.total : 0;
  const { currentPage, totalPages } = getPaginationData(page, totalCount);

  const userIds = users.map((u) => u.id);

  const profileMap = await fetchProfileMap(userIds);

  const roles =
    userIds.length > 0
      ? await db.select().from(userRoles).where(inArray(userRoles.userId, userIds))
      : [];
  const roleMap = new Map(roles.map((r) => [r.userId, r.role]));

  return { users, profileMap, roleMap, currentPage, totalPages };
}
