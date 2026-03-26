import { vi } from 'vitest';

// Shared mock functions used by banUser and unbanUser tests
export const mockGetUser = vi.fn();
export const mockSelectFromWhere = vi.fn();
export const mockUpdateSetWhere = vi.fn();
export const mockUpdateUserById = vi.fn();
export const mockInsertValues = vi.fn();
export const mockTransaction = vi.fn();

// Shared test constants
export const adminUserId = 'a0000000-0000-0000-0000-000000000001';
export const targetUserId = 'b0000000-0000-0000-0000-000000000001';

// --- vi.mock() calls (hoisted by Vitest) ---

vi.mock('@/lib/supabase/server', () => ({
  createClient: () =>
    Promise.resolve({
      auth: {
        getUser: mockGetUser,
      },
    }),
}));

vi.mock('@/lib/auth', () => ({
  getOptionalUser: async () => {
    const result = await mockGetUser();
    return result?.data?.user ?? null;
  },
}));

vi.mock('@/lib/db', () => {
  const makeDbOps = () => ({
    select: () => ({
      from: () => ({
        where: (...args: unknown[]) => {
          mockSelectFromWhere(...args);
          return {
            limit: () =>
              mockSelectFromWhere.mock.results[mockSelectFromWhere.mock.calls.length - 1]?.value ??
              [],
          };
        },
      }),
    }),
    update: () => ({
      set: () => ({
        where: mockUpdateSetWhere,
      }),
    }),
    insert: () => ({
      values: mockInsertValues,
    }),
  });

  return {
    db: {
      ...makeDbOps(),
      transaction: async (fn: (tx: ReturnType<typeof makeDbOps>) => Promise<void>) => {
        await mockTransaction(fn);
        return fn(makeDbOps());
      },
    },
    profiles: { id: 'id', bannedAt: 'banned_at', updatedAt: 'updated_at' },
    moderationActions: {
      actorId: 'actor_id',
      action: 'action',
      targetType: 'target_type',
      targetId: 'target_id',
      reason: 'reason',
      ipAddress: 'ip_address',
    },
    userRoles: { userId: 'user_id' },
  };
});

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: () => ({
    auth: {
      admin: {
        updateUserById: mockUpdateUserById,
      },
    },
  }),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('../../getClientIp', () => ({
  getClientIp: () => Promise.resolve('127.0.0.1'),
}));
