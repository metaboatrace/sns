import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/rate-limit', () => ({
  checkServerActionRateLimit: vi.fn(),
}));

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

import { signUp } from '../signUp';
import { checkServerActionRateLimit } from '@/lib/rate-limit';
import { createClient } from '@/lib/supabase/server';

const mockedCheckServerActionRateLimit = vi.mocked(checkServerActionRateLimit);
const mockedCreateClient = vi.mocked(createClient);

describe('signUp', () => {
  const mockSignUp = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedCheckServerActionRateLimit.mockResolvedValue(true);
    mockedCreateClient.mockResolvedValue({
      auth: { signUp: mockSignUp },
    } as unknown as Awaited<ReturnType<typeof createClient>>);
    mockSignUp.mockResolvedValue({ error: null });
  });

  it('returns success when sign up succeeds', async () => {
    const result = await signUp('test@example.com', 'abc123');
    expect(result).toEqual({ success: true });
    expect(mockSignUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'abc123',
      options: { emailRedirectTo: expect.stringContaining('/auth/callback') },
    });
  });

  it('returns rateLimited when IP rate limit is exceeded', async () => {
    mockedCheckServerActionRateLimit.mockResolvedValue(false);
    const result = await signUp('test@example.com', 'abc123');
    expect(result).toEqual({ error: 'rateLimited' });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('calls checkServerActionRateLimit with correct parameters', async () => {
    await signUp('test@example.com', 'abc123');
    expect(mockedCheckServerActionRateLimit).toHaveBeenCalledWith('signUp', 5, 300_000);
  });

  it('returns password validation error for invalid password', async () => {
    const result = await signUp('test@example.com', 'abc');
    expect(result).toEqual({ error: 'password:tooShort' });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns password:missingDigit for password with no digits', async () => {
    const result = await signUp('test@example.com', 'abcdef');
    expect(result).toEqual({ error: 'password:missingDigit' });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns password:missingLetter for password with no letters', async () => {
    const result = await signUp('test@example.com', '123456');
    expect(result).toEqual({ error: 'password:missingLetter' });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns password:weak when Supabase rejects the password', async () => {
    mockSignUp.mockResolvedValue({ error: { code: 'weak_password' } });
    const result = await signUp('test@example.com', 'abc123');
    expect(result).toEqual({ error: 'password:weak' });
  });

  it('returns signUpFailed when Supabase returns a generic error', async () => {
    mockSignUp.mockResolvedValue({ error: { code: 'unknown_error' } });
    const result = await signUp('test@example.com', 'abc123');
    expect(result).toEqual({ error: 'signUpFailed' });
  });

  it('returns password:tooShort for an empty password', async () => {
    const result = await signUp('test@example.com', '');
    expect(result).toEqual({ error: 'password:tooShort' });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns invalidEmail for empty email', async () => {
    const result = await signUp('', 'abc123');
    expect(result).toEqual({ error: 'invalidEmail' });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('returns invalidEmail for malformed email', async () => {
    const result = await signUp('not-an-email', 'abc123');
    expect(result).toEqual({ error: 'invalidEmail' });
    expect(mockSignUp).not.toHaveBeenCalled();
  });
});
