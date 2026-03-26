import { describe, it, expect } from 'vitest';
import { getPasswordValidationError, isPasswordValidationErrorKey } from '../password';

describe('getPasswordValidationError', () => {
  it('returns null for a valid password', () => {
    expect(getPasswordValidationError('abc123')).toBeNull();
  });

  it('returns null for a long valid password', () => {
    expect(getPasswordValidationError('mySecurePassword1')).toBeNull();
  });

  it('returns tooShort for a password shorter than 6 characters', () => {
    expect(getPasswordValidationError('ab1')).toBe('tooShort');
    expect(getPasswordValidationError('a1')).toBe('tooShort');
    expect(getPasswordValidationError('')).toBe('tooShort');
  });

  it('returns tooShort for exactly 5 characters', () => {
    expect(getPasswordValidationError('abc12')).toBe('tooShort');
  });

  it('returns null for exactly 6 characters', () => {
    expect(getPasswordValidationError('abc123')).toBeNull();
  });

  it('returns missingLetter for a password with only digits', () => {
    expect(getPasswordValidationError('123456')).toBe('missingLetter');
  });

  it('returns missingDigit for a password with only letters', () => {
    expect(getPasswordValidationError('abcdef')).toBe('missingDigit');
  });

  it('returns missingLetter for a password with only symbols and digits', () => {
    expect(getPasswordValidationError('!@#456')).toBe('missingLetter');
  });

  it('returns missingDigit for a password with letters and symbols but no digits', () => {
    expect(getPasswordValidationError('abc!@#')).toBe('missingDigit');
  });

  it('accepts passwords with uppercase letters', () => {
    expect(getPasswordValidationError('ABC123')).toBeNull();
  });

  it('accepts passwords with mixed case and digits', () => {
    expect(getPasswordValidationError('AbCdE1')).toBeNull();
  });

  it('accepts passwords with special characters', () => {
    expect(getPasswordValidationError('p@ss1!')).toBeNull();
    expect(getPasswordValidationError('a1!@#$%^&*()')).toBeNull();
  });

  it('returns tooShort for an empty string', () => {
    expect(getPasswordValidationError('')).toBe('tooShort');
  });

  it('accepts a very long password with letters and digits', () => {
    const longPassword = 'a'.repeat(999) + '1';
    expect(getPasswordValidationError(longPassword)).toBeNull();
  });

  it('returns missingDigit for a very long password with only letters', () => {
    const longPassword = 'a'.repeat(1000);
    expect(getPasswordValidationError(longPassword)).toBe('missingDigit');
  });

  it('returns missingLetter for a very long password with only digits', () => {
    const longPassword = '1'.repeat(1000);
    expect(getPasswordValidationError(longPassword)).toBe('missingLetter');
  });
});

describe('isPasswordValidationErrorKey', () => {
  it('returns true for valid error keys', () => {
    expect(isPasswordValidationErrorKey('tooShort')).toBe(true);
    expect(isPasswordValidationErrorKey('missingLetter')).toBe(true);
    expect(isPasswordValidationErrorKey('missingDigit')).toBe(true);
    expect(isPasswordValidationErrorKey('weak')).toBe(true);
  });

  it('returns false for invalid keys', () => {
    expect(isPasswordValidationErrorKey('invalid')).toBe(false);
    expect(isPasswordValidationErrorKey('')).toBe(false);
    expect(isPasswordValidationErrorKey('TOO_SHORT')).toBe(false);
  });
});
