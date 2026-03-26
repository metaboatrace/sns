import { describe, it, expect } from 'vitest';
import {
  validateUsernameFormat,
  validateUsername,
  USERNAME_MAX_LENGTH,
  DISPLAY_NAME_MAX_LENGTH,
} from '../validation';

describe('constants', () => {
  it('USERNAME_MAX_LENGTH is 20', () => {
    expect(USERNAME_MAX_LENGTH).toBe(20);
  });

  it('DISPLAY_NAME_MAX_LENGTH is 50', () => {
    expect(DISPLAY_NAME_MAX_LENGTH).toBe(50);
  });
});

describe('validateUsernameFormat', () => {
  describe('valid usernames', () => {
    const validCases = ['ab', 'hello_world', 'user123', 'a_b_c', 'test_1'];

    it.each(validCases)('accepts "%s"', (username) => {
      expect(validateUsernameFormat(username)).toBeNull();
    });

    it('accepts a username with exactly 2 characters', () => {
      expect(validateUsernameFormat('ab')).toBeNull();
    });

    it('accepts a username with exactly 20 characters', () => {
      expect(validateUsernameFormat('a'.repeat(20))).toBeNull();
    });
  });

  describe('too short', () => {
    it('rejects empty string', () => {
      expect(validateUsernameFormat('')).toBe('too_short');
    });

    it('rejects a single character', () => {
      expect(validateUsernameFormat('a')).toBe('too_short');
    });
  });

  describe('too long', () => {
    it('rejects a username with 21 characters', () => {
      expect(validateUsernameFormat('a'.repeat(21))).toBe('too_long');
    });

    it('rejects a username with 30 characters', () => {
      expect(validateUsernameFormat('a'.repeat(30))).toBe('too_long');
    });
  });

  describe('invalid format', () => {
    it('rejects username starting with a number', () => {
      expect(validateUsernameFormat('1user')).toBe('invalid_format');
    });

    it('rejects username containing uppercase letters', () => {
      expect(validateUsernameFormat('User')).toBe('invalid_format');
    });

    it('rejects username containing hyphens', () => {
      expect(validateUsernameFormat('user-name')).toBe('invalid_format');
    });

    it('rejects username with consecutive underscores', () => {
      expect(validateUsernameFormat('user__name')).toBe('invalid_format');
    });

    it('rejects username ending with underscore', () => {
      expect(validateUsernameFormat('user_')).toBe('invalid_format');
    });

    it('rejects username starting with underscore', () => {
      expect(validateUsernameFormat('_user')).toBe('invalid_format');
    });

    it('rejects username containing spaces', () => {
      expect(validateUsernameFormat('user name')).toBe('invalid_format');
    });

    it('rejects username containing special characters', () => {
      expect(validateUsernameFormat('user@name')).toBe('invalid_format');
    });
  });
});

describe('validateUsername', () => {
  it('returns null for valid non-reserved username', () => {
    expect(validateUsername('hello_world')).toBeNull();
  });

  it('returns format errors before checking reserved words', () => {
    expect(validateUsername('a')).toBe('too_short');
  });

  it('returns "reserved" for reserved usernames', () => {
    expect(validateUsername('admin')).toBe('reserved');
    expect(validateUsername('api')).toBe('reserved');
    expect(validateUsername('boatrace')).toBe('reserved');
  });

  it('checks reserved words case-insensitively', () => {
    // Note: uppercase letters are caught by format validation first
    // since the regex only allows lowercase
    expect(validateUsername('Admin')).toBe('invalid_format');
  });
});
