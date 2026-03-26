import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resetMockDb } from '@/test-utils/mock-db';

const { mockGetUser, mockDb, mockCheckRateLimitByIp } = vi.hoisted(() => ({
  mockGetUser: vi.fn(),
  mockDb: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue([]),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockResolvedValue(undefined),
  },
  mockCheckRateLimitByIp: vi.fn().mockReturnValue({ allowed: true, retryAfterMs: 0 }),
}));

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: () => mockGetUser(),
    },
  }),
}));

vi.mock('@/lib/db', () => ({
  db: mockDb,
  profiles: { id: 'id', username: 'username', displayName: 'display_name' },
}));

vi.mock('@/lib/rate-limit-ip', () => ({
  getClientIp: vi.fn().mockReturnValue('127.0.0.1'),
  checkRateLimitByIp: (...args: unknown[]) => mockCheckRateLimitByIp(...args),
}));

vi.mock('@/lib/rate-limit', () => ({
  checkRateLimit: vi.fn().mockResolvedValue({ allowed: true }),
}));

vi.mock('server-only', () => ({}));

import { POST } from '../route';

function buildRequest(body?: unknown): Request {
  if (body === undefined) {
    return new Request('http://localhost:3000/api/username', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid json{{{',
    });
  }
  return new Request('http://localhost:3000/api/username', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/username', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetMockDb(mockDb);
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-1' } } });
    mockCheckRateLimitByIp.mockReturnValue({ allowed: true, retryAfterMs: 0 });
  });

  it('returns 401 when not authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });
    const response = await POST(buildRequest({ username: 'testuser' }));
    expect(response.status).toBe(401);
  });

  it('returns 200 when a valid username is submitted', async () => {
    const response = await POST(buildRequest({ username: 'validuser' }));
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.username).toBe('validuser');
  });

  it('returns 400 for too short username', async () => {
    const response = await POST(buildRequest({ username: 'a' }));
    expect(response.status).toBe(400);
  });

  it('returns 409 when profile already exists', async () => {
    mockDb.limit.mockResolvedValue([{ id: 'user-1' }]);
    const response = await POST(buildRequest({ username: 'validuser' }));
    expect(response.status).toBe(409);
    const json = await response.json();
    expect(json.error).toBe('already_set');
  });

  it('returns 409 on UNIQUE constraint violation', async () => {
    mockDb.values.mockRejectedValue({ code: '23505' });
    const response = await POST(buildRequest({ username: 'validuser' }));
    expect(response.status).toBe(409);
    const json = await response.json();
    expect(json.error).toBe('username_taken');
  });

  it('returns 400 for invalid request body', async () => {
    const response = await POST(buildRequest(undefined));
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBe('invalid_body');
  });

  it('returns 429 when IP rate limit is exceeded', async () => {
    mockCheckRateLimitByIp.mockReturnValue({ allowed: false, retryAfterMs: 5000 });
    const response = await POST(buildRequest({ username: 'validuser' }));
    expect(response.status).toBe(429);
  });

  it('returns 400 for a lame name', async () => {
    const response = await POST(buildRequest({ username: 'fuckboy' }));
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBe('username_inappropriate');
  });
});
