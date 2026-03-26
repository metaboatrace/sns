import { describe, it, expect } from 'vitest';
import { isUniqueViolation } from '../errors';

describe('isUniqueViolation', () => {
  describe('returns true for PostgreSQL unique violation errors', () => {
    it('detects a plain object with code "23505"', () => {
      expect(isUniqueViolation({ code: '23505' })).toBe(true);
    });

    it('detects an object with code "23505" and additional properties', () => {
      expect(
        isUniqueViolation({
          code: '23505',
          message: 'duplicate key value violates unique constraint',
          detail: 'Key (username)=(test) already exists.',
        }),
      ).toBe(true);
    });

    it('detects an Error-like object with code "23505"', () => {
      const err = new Error('unique violation');
      (err as Error & { code: string }).code = '23505';
      expect(isUniqueViolation(err)).toBe(true);
    });
  });

  describe('returns false for non-unique-violation errors', () => {
    it('rejects null', () => {
      expect(isUniqueViolation(null)).toBe(false);
    });

    it('rejects undefined', () => {
      expect(isUniqueViolation(undefined)).toBe(false);
    });

    it('rejects a string', () => {
      expect(isUniqueViolation('23505')).toBe(false);
    });

    it('rejects a number', () => {
      expect(isUniqueViolation(23505)).toBe(false);
    });

    it('rejects a boolean', () => {
      expect(isUniqueViolation(true)).toBe(false);
    });

    it('rejects an empty object', () => {
      expect(isUniqueViolation({})).toBe(false);
    });

    it('rejects an object without code property', () => {
      expect(isUniqueViolation({ message: 'some error' })).toBe(false);
    });

    it('rejects an object with a different error code', () => {
      expect(isUniqueViolation({ code: '23503' })).toBe(false);
    });

    it('rejects an object with numeric code 23505 (not string)', () => {
      expect(isUniqueViolation({ code: 23505 })).toBe(false);
    });

    it('rejects an array', () => {
      expect(isUniqueViolation([23505])).toBe(false);
    });
  });
});
