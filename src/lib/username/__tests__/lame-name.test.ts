import { describe, it, expect, vi } from 'vitest';

vi.mock('server-only', () => ({}));

import { isLameName } from '../lame-name';

describe('isLameName', () => {
  it('returns true for usernames containing inappropriate words', () => {
    expect(isLameName('fuckboy')).toBe(true);
    expect(isLameName('shitface')).toBe(true);
  });

  it('returns false for normal usernames', () => {
    expect(isLameName('hello_world')).toBe(false);
    expect(isLameName('sailor42')).toBe(false);
  });

  it('detects inappropriate words regardless of case', () => {
    expect(isLameName('FuCkBoY')).toBe(true);
    expect(isLameName('NAZI')).toBe(true);
  });
});
