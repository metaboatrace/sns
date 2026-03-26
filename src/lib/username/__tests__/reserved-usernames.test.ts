import { describe, it, expect } from 'vitest';
import { isReservedUsername } from '../reserved-usernames';

describe('isReservedUsername', () => {
  describe('returns true for reserved usernames', () => {
    const reservedCases = [
      'administrator',
      'api',
      'root',
      'system',
      'boatrace',
      'kyotei',
      'support',
      'moderator',
      'official',
      'mypage',
      'login',
    ];

    it.each(reservedCases)('"%s" is reserved', (username) => {
      expect(isReservedUsername(username)).toBe(true);
    });
  });

  describe('case insensitivity', () => {
    it('treats "Administrator" as reserved', () => {
      expect(isReservedUsername('Administrator')).toBe(true);
    });

    it('treats "ADMINISTRATOR" as reserved', () => {
      expect(isReservedUsername('ADMINISTRATOR')).toBe(true);
    });

    it('treats "BoatRace" as reserved', () => {
      expect(isReservedUsername('BoatRace')).toBe(true);
    });
  });

  describe('returns false for normal usernames', () => {
    const normalCases = [
      'hello_world',
      'user123',
      'john_doe',
      'sailor42',
      'racing_fan',
    ];

    it.each(normalCases)('"%s" is not reserved', (username) => {
      expect(isReservedUsername(username)).toBe(false);
    });
  });
});
