import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockExchangeCodeForSession, mockVerifyOtp, mockGetUser, mockDb } = vi.hoisted(() => ({
  mockExchangeCodeForSession: vi.fn(),
  mockVerifyOtp: vi.fn(),
  mockGetUser: vi.fn(),
  mockDb: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue([]),
  },
}));

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      exchangeCodeForSession: (...args: unknown[]) => mockExchangeCodeForSession(...args),
      verifyOtp: (...args: unknown[]) => mockVerifyOtp(...args),
      getUser: () => mockGetUser(),
    },
  }),
}));

vi.mock('@/lib/db', () => ({
  db: mockDb,
  profiles: { id: 'id' },
}));

import { GET } from '../route';

function buildRequest(params: Record<string, string> = {}): Request {
  const url = new URL('http://localhost:3000/auth/callback');
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return new Request(url.toString());
}

describe('GET /auth/callback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDb.select.mockReturnThis();
    mockDb.from.mockReturnThis();
    mockDb.where.mockReturnThis();
    mockDb.limit.mockResolvedValue([]);
  });

  it('redirects to /mypage/setup-username when OAuth succeeds but no profile exists', async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } } });
    mockDb.limit.mockResolvedValue([]);

    const response = await GET(buildRequest({ code: 'valid-code' }));
    expect(response.status).toBe(307);
    expect(new URL(response.headers.get('location')!).pathname).toBe('/mypage/setup-username');
  });

  it('redirects to /mypage when OAuth succeeds and profile exists', async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } } });
    mockDb.limit.mockResolvedValue([{ id: 'user-1' }]);

    const response = await GET(buildRequest({ code: 'valid-code' }));
    expect(response.status).toBe(307);
    expect(new URL(response.headers.get('location')!).pathname).toBe('/mypage');
  });

  it('redirects to /sign-in with error when code exchange fails', async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: new Error('invalid') });

    const response = await GET(buildRequest({ code: 'bad-code' }));
    const url = new URL(response.headers.get('location')!);
    expect(url.pathname).toBe('/sign-in');
    expect(url.searchParams.get('error')).toBe('auth_callback_error');
  });

  it('redirects to /reset-password for OTP recovery with valid token_hash', async () => {
    mockVerifyOtp.mockResolvedValue({ error: null });

    const response = await GET(buildRequest({ token_hash: 'hash123', type: 'recovery' }));
    expect(new URL(response.headers.get('location')!).pathname).toBe('/reset-password');
  });

  it('redirects to error when neither code nor token_hash is provided', async () => {
    const response = await GET(buildRequest({}));
    const url = new URL(response.headers.get('location')!);
    expect(url.pathname).toBe('/sign-in');
    expect(url.searchParams.get('error')).toBe('auth_callback_error');
  });

  it('prevents open redirect by falling back to / for external next URLs', async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } } });
    mockDb.limit.mockResolvedValue([{ id: 'user-1' }]);

    const response = await GET(buildRequest({ code: 'valid-code', next: 'https://evil.com' }));
    expect(new URL(response.headers.get('location')!).pathname).toBe('/');
  });
});
