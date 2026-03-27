import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockGetOptionalUser = vi.fn();

vi.mock('../get-user', () => ({
  getOptionalUser: (...args: unknown[]) => mockGetOptionalUser(...args),
}));

const mockRedirect = vi.fn<(url: string) => never>();

vi.mock('next/navigation', () => ({
  redirect: (...args: unknown[]) => mockRedirect(...(args as [string])),
}));

describe('redirectIfAuthenticated', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('認証済み時に /mypage へリダイレクトすること', async () => {
    const fakeUser = { id: 'user-001', email: 'test@example.com' };
    mockGetOptionalUser.mockResolvedValue(fakeUser);
    mockRedirect.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT:/mypage');
    });

    const { redirectIfAuthenticated } = await import('../redirect-if-authenticated');

    await expect(redirectIfAuthenticated()).rejects.toThrow('NEXT_REDIRECT:/mypage');
    expect(mockRedirect).toHaveBeenCalledWith('/mypage');
  });

  it('未認証時にリダイレクトしないこと', async () => {
    mockGetOptionalUser.mockResolvedValue(null);

    const { redirectIfAuthenticated } = await import('../redirect-if-authenticated');

    await expect(redirectIfAuthenticated()).resolves.toBeUndefined();
    expect(mockRedirect).not.toHaveBeenCalled();
  });
});
