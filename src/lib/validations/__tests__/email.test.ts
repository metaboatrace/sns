import { describe, it, expect } from 'vitest';

import { isValidEmail } from '../email';

describe('isValidEmail', () => {
  it('returns true for a standard email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('returns true for an email with subdomain', () => {
    expect(isValidEmail('user@mail.example.com')).toBe(true);
  });

  it('returns true for an email with plus addressing', () => {
    expect(isValidEmail('user+tag@example.com')).toBe(true);
  });

  it('returns true for an email with dots in local part', () => {
    expect(isValidEmail('first.last@example.com')).toBe(true);
  });

  it('returns true for an email with hyphens in domain', () => {
    expect(isValidEmail('user@my-domain.com')).toBe(true);
  });

  it('returns false for an empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });

  it('returns false for a string without @', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
  });

  it('returns false for a string with no local part', () => {
    expect(isValidEmail('@example.com')).toBe(false);
  });

  it('returns false for a string with no domain', () => {
    expect(isValidEmail('user@')).toBe(false);
  });

  it('returns false for a string with no TLD (no dot in domain)', () => {
    expect(isValidEmail('user@localhost')).toBe(false);
  });

  it('returns false for a string with spaces', () => {
    expect(isValidEmail('user @example.com')).toBe(false);
    expect(isValidEmail('user@ example.com')).toBe(false);
    expect(isValidEmail(' user@example.com')).toBe(false);
  });

  it('returns false for multiple @ signs', () => {
    expect(isValidEmail('user@@example.com')).toBe(false);
    expect(isValidEmail('user@name@example.com')).toBe(false);
  });

  it('returns false for a domain ending with a dot but no TLD after it', () => {
    expect(isValidEmail('user@example.')).toBe(false);
  });
});
