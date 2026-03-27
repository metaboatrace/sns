import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockGetUser = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: () =>
    Promise.resolve({
      auth: {
        getUser: mockGetUser,
      },
    }),
}));

vi.mock('react', () => ({
  cache: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
}));

const mockRedirect = vi.fn<(url: string) => never>();

vi.mock('next/navigation', () => ({
  redirect: (...args: unknown[]) => mockRedirect(...(args as [string])),
}));

describe('getAuthenticatedUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('認証済み時にユーザーオブジェクトを返すこと', async () => {
    const fakeUser = { id: 'user-001', email: 'test@example.com' };
    mockGetUser.mockResolvedValue({ data: { user: fakeUser } });

    const { getAuthenticatedUser } = await import('../get-user');
    const result = await getAuthenticatedUser();

    expect(result).toEqual(fakeUser);
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it('未認証時に /sign-in へリダイレクトすること', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });
    mockRedirect.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT:/sign-in');
    });

    const { getAuthenticatedUser } = await import('../get-user');

    await expect(getAuthenticatedUser()).rejects.toThrow('NEXT_REDIRECT:/sign-in');
    expect(mockRedirect).toHaveBeenCalledWith('/sign-in');
  });
});

describe('getOptionalUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('認証済み時にユーザーオブジェクトを返すこと', async () => {
    const fakeUser = { id: 'user-002', email: 'test2@example.com' };
    mockGetUser.mockResolvedValue({ data: { user: fakeUser } });

    const { getOptionalUser } = await import('../get-user');
    const result = await getOptionalUser();

    expect(result).toEqual(fakeUser);
  });

  it('未認証時に null を返すこと', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const { getOptionalUser } = await import('../get-user');
    const result = await getOptionalUser();

    expect(result).toBeNull();
  });
});
