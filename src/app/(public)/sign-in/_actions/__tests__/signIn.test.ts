import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/rate-limit', () => ({
  checkServerActionRateLimit: vi.fn(),
}));

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('@/lib/activity-log', () => ({
  logActivityEvent: vi.fn(),
}));

import { signIn } from '../signIn';
import { checkServerActionRateLimit } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';

const mockedCheckServerActionRateLimit = vi.mocked(checkServerActionRateLimit);
const mockedCreateClient = vi.mocked(createClient);

describe('signIn', () => {
  const mockSignInWithPassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedCheckServerActionRateLimit.mockResolvedValue(true);
    mockedCreateClient.mockResolvedValue({
      auth: { signInWithPassword: mockSignInWithPassword },
    } as unknown as Awaited<ReturnType<typeof createClient>>);
    mockSignInWithPassword.mockResolvedValue({
      error: null,
      data: { user: { id: 'user-1' } },
    });
  });

  it('returns success when sign in succeeds', async () => {
    const result = await signIn('test@example.com', 'abc123');
    expect(result).toEqual({ success: true });
    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'abc123',
    });
  });

  it('returns rateLimited when IP rate limit is exceeded', async () => {
    mockedCheckServerActionRateLimit.mockResolvedValue(false);
    const result = await signIn('test@example.com', 'abc123');
    expect(result).toEqual({ error: 'rateLimited' });
    expect(mockSignInWithPassword).not.toHaveBeenCalled();
  });

  it('calls checkServerActionRateLimit with correct parameters', async () => {
    await signIn('test@example.com', 'abc123');
    expect(mockedCheckServerActionRateLimit).toHaveBeenCalledWith('signIn', 10, 300_000);
  });

  it('returns invalidCredentials when Supabase returns an error', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: { message: 'Invalid credentials' } });
    const result = await signIn('test@example.com', 'wrongpass1');
    expect(result).toEqual({ error: 'invalidCredentials' });
  });

  it('returns invalidCredentials for empty email', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: { message: 'Invalid credentials' } });
    const result = await signIn('', 'abc123');
    expect(result).toEqual({ error: 'invalidCredentials' });
  });

  it('returns invalidCredentials for empty password', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: { message: 'Invalid credentials' } });
    const result = await signIn('test@example.com', '');
    expect(result).toEqual({ error: 'invalidCredentials' });
  });

  it('returns invalidCredentials for both empty email and password', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: { message: 'Invalid credentials' } });
    const result = await signIn('', '');
    expect(result).toEqual({ error: 'invalidCredentials' });
  });
});
