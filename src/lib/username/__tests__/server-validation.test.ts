import { describe, it, expect, vi } from 'vitest';

vi.mock('server-only', () => ({}));

import { validateUsernameServer } from '../server-validation';

describe('validateUsernameServer', () => {
  describe('delegates format validation to validateUsername', () => {
    it('returns "too_short" for a single character', () => {
      expect(validateUsernameServer('a')).toBe('too_short');
    });

    it('returns "too_long" for username exceeding 20 characters', () => {
      expect(validateUsernameServer('a'.repeat(21))).toBe('too_long');
    });

    it('returns "invalid_format" for uppercase letters', () => {
      expect(validateUsernameServer('User')).toBe('invalid_format');
    });
  });

  describe('delegates reserved word check to validateUsername', () => {
    it('returns "reserved" for reserved usernames', () => {
      expect(validateUsernameServer('administrator')).toBe('reserved');
    });

    it('returns "reserved" for system usernames', () => {
      expect(validateUsernameServer('root')).toBe('reserved');
    });
  });

  describe('inappropriate username detection via isLameName', () => {
    it('returns "username_inappropriate" for usernames containing profanity', () => {
      expect(validateUsernameServer('fuckboy')).toBe('username_inappropriate');
    });

    it('returns "username_inappropriate" for usernames with hate speech', () => {
      expect(validateUsernameServer('nazi_lover')).toBe('username_inappropriate');
    });

    it('returns "username_inappropriate" for impersonation patterns', () => {
      expect(validateUsernameServer('official_racer')).toBe('username_inappropriate');
    });

    it('detects inappropriate words case-insensitively (lowercased input)', () => {
      // Note: uppercase letters fail format validation first,
      // so only lowercase inputs reach the isLameName check
      expect(validateUsernameServer('shitpost')).toBe('username_inappropriate');
    });
  });

  describe('valid usernames', () => {
    it('returns null for a clean, valid username', () => {
      expect(validateUsernameServer('hello_world')).toBeNull();
    });

    it('returns null for a short valid username', () => {
      expect(validateUsernameServer('ab')).toBeNull();
    });

    it('returns null for a username with numbers', () => {
      expect(validateUsernameServer('sailor42')).toBeNull();
    });
  });

  describe('error priority: format > reserved > inappropriate', () => {
    it('returns format error before reserved check', () => {
      // "a" is too short, so format error takes precedence
      expect(validateUsernameServer('a')).toBe('too_short');
    });

    it('returns reserved before inappropriate check', () => {
      // "support" is in reserved list, so reserved takes precedence
      // even though "support_" is also in LAME_PATTERNS
      expect(validateUsernameServer('support')).toBe('reserved');
    });
  });
});
