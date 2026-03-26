import { describe, it, expect } from 'vitest';

import { formatDateTime, formatDate } from '../date';

describe('formatDateTime', () => {
  it('formats a Date object as a Japanese locale datetime string', () => {
    const date = new Date('2026-03-27T14:05:30');
    const result = formatDateTime(date);
    expect(result).toContain('2026');
    expect(result).toContain('3');
    expect(result).toContain('27');
    expect(result).toContain('14');
    expect(result).toContain('05');
    expect(result).toContain('30');
  });

  it('formats an ISO string as a Japanese locale datetime string', () => {
    const result = formatDateTime('2026-01-15T09:30:00');
    expect(result).toContain('2026');
    expect(result).toContain('1');
    expect(result).toContain('15');
  });

  it('formats a date-only ISO string (treated as UTC midnight)', () => {
    const result = formatDate('2026-06-01');
    expect(result).toContain('2026');
  });

  it('handles Date at epoch (1970-01-01)', () => {
    const date = new Date(0);
    const result = formatDateTime(date);
    expect(result).toContain('1970');
  });

  it('handles Date at year boundary (midnight Jan 1)', () => {
    const date = new Date('2026-01-01T00:00:00');
    const result = formatDateTime(date);
    expect(result).toContain('2026');
    expect(result).toContain('1');
  });

  it('returns "Invalid Date" for an invalid string', () => {
    const result = formatDateTime('not-a-date');
    expect(result).toBe('Invalid Date');
  });

  it('returns "Invalid Date" for NaN date', () => {
    const result = formatDateTime(new Date(NaN));
    expect(result).toBe('Invalid Date');
  });
});

describe('formatDate', () => {
  it('formats a Date object as a Japanese locale date string', () => {
    const date = new Date('2026-03-27T14:05:30');
    const result = formatDate(date);
    expect(result).toContain('2026');
    expect(result).toContain('3');
    expect(result).toContain('27');
    // Should not include time components
    expect(result).not.toContain('14');
    expect(result).not.toContain('05');
  });

  it('formats an ISO string as a Japanese locale date string', () => {
    const result = formatDate('2026-12-31T23:59:59');
    expect(result).toContain('2026');
    expect(result).toContain('12');
    expect(result).toContain('31');
  });

  it('handles Date at epoch (1970-01-01)', () => {
    const date = new Date(0);
    const result = formatDate(date);
    expect(result).toContain('1970');
  });

  it('returns "Invalid Date" for an invalid string', () => {
    const result = formatDate('invalid');
    expect(result).toBe('Invalid Date');
  });

  it('returns "Invalid Date" for NaN date', () => {
    const result = formatDate(new Date(NaN));
    expect(result).toBe('Invalid Date');
  });

  it('formats a leap day correctly', () => {
    const result = formatDate('2024-02-29T12:00:00');
    expect(result).toContain('2024');
    expect(result).toContain('2');
    expect(result).toContain('29');
  });
});
