import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getDatabaseUrl } from '../connection';

const DEFAULT_URL = 'postgresql://postgres:postgres@localhost:5432/metaboatrace_sns';

describe('getDatabaseUrl', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.POSTGRES_URL;
    delete process.env.POSTGRES_URL_NON_POOLING;
    delete process.env.DATABASE_URL;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('without preferNonPooling (default)', () => {
    it('returns POSTGRES_URL when set', () => {
      process.env.POSTGRES_URL = 'postgres://pool:5432/db';
      process.env.DATABASE_URL = 'postgres://direct:5432/db';

      expect(getDatabaseUrl()).toBe('postgres://pool:5432/db');
    });

    it('falls back to DATABASE_URL when POSTGRES_URL is not set', () => {
      process.env.DATABASE_URL = 'postgres://direct:5432/db';

      expect(getDatabaseUrl()).toBe('postgres://direct:5432/db');
    });

    it('returns the default URL when no env vars are set', () => {
      expect(getDatabaseUrl()).toBe(DEFAULT_URL);
    });

    it('ignores POSTGRES_URL_NON_POOLING', () => {
      process.env.POSTGRES_URL_NON_POOLING = 'postgres://nonpool:5432/db';

      expect(getDatabaseUrl()).toBe(DEFAULT_URL);
    });
  });

  describe('with preferNonPooling: true', () => {
    it('returns POSTGRES_URL_NON_POOLING when set', () => {
      process.env.POSTGRES_URL_NON_POOLING = 'postgres://nonpool:5432/db';
      process.env.POSTGRES_URL = 'postgres://pool:5432/db';
      process.env.DATABASE_URL = 'postgres://direct:5432/db';

      expect(getDatabaseUrl({ preferNonPooling: true })).toBe('postgres://nonpool:5432/db');
    });

    it('falls back to POSTGRES_URL when POSTGRES_URL_NON_POOLING is not set', () => {
      process.env.POSTGRES_URL = 'postgres://pool:5432/db';
      process.env.DATABASE_URL = 'postgres://direct:5432/db';

      expect(getDatabaseUrl({ preferNonPooling: true })).toBe('postgres://pool:5432/db');
    });

    it('falls back to DATABASE_URL when neither pooling vars are set', () => {
      process.env.DATABASE_URL = 'postgres://direct:5432/db';

      expect(getDatabaseUrl({ preferNonPooling: true })).toBe('postgres://direct:5432/db');
    });

    it('returns the default URL when no env vars are set', () => {
      expect(getDatabaseUrl({ preferNonPooling: true })).toBe(DEFAULT_URL);
    });
  });

  describe('with preferNonPooling: false', () => {
    it('behaves the same as default (no preferNonPooling)', () => {
      process.env.POSTGRES_URL_NON_POOLING = 'postgres://nonpool:5432/db';
      process.env.POSTGRES_URL = 'postgres://pool:5432/db';

      expect(getDatabaseUrl({ preferNonPooling: false })).toBe('postgres://pool:5432/db');
    });
  });

  describe('edge cases', () => {
    it('treats empty string env vars as falsy and falls through', () => {
      process.env.POSTGRES_URL = '';
      process.env.DATABASE_URL = 'postgres://direct:5432/db';

      expect(getDatabaseUrl()).toBe('postgres://direct:5432/db');
    });

    it('returns default when all env vars are empty strings', () => {
      process.env.POSTGRES_URL = '';
      process.env.POSTGRES_URL_NON_POOLING = '';
      process.env.DATABASE_URL = '';

      expect(getDatabaseUrl({ preferNonPooling: true })).toBe(DEFAULT_URL);
    });
  });
});
