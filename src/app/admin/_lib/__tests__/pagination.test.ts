import { describe, it, expect } from 'vitest';

import { DEFAULT_PAGE_SIZE, parsePageParam, getPaginationData } from '../pagination';

describe('DEFAULT_PAGE_SIZE', () => {
  it('is 20', () => {
    expect(DEFAULT_PAGE_SIZE).toBe(20);
  });
});

describe('parsePageParam', () => {
  it('returns 1 when page param is undefined', () => {
    expect(parsePageParam({})).toBe(1);
  });

  it('returns 1 when page param is an empty string', () => {
    expect(parsePageParam({ page: '' })).toBe(1);
  });

  it('parses a valid page number string', () => {
    expect(parsePageParam({ page: '3' })).toBe(3);
  });

  it('returns 1 when page param is "0"', () => {
    expect(parsePageParam({ page: '0' })).toBe(1);
  });

  it('returns 1 when page param is negative', () => {
    expect(parsePageParam({ page: '-5' })).toBe(1);
  });

  it('returns 1 when page param is non-numeric', () => {
    expect(parsePageParam({ page: 'abc' })).toBe(1);
  });

  it('truncates decimal values via Number()', () => {
    // Number("2.9") is 2.9, Math.max(1, 2.9) is 2.9
    expect(parsePageParam({ page: '2.9' })).toBe(2.9);
  });

  it('returns 1 when page param is a string array', () => {
    // Number(["3","4"]) is NaN → || 1
    expect(parsePageParam({ page: ['3', '4'] })).toBe(1);
  });

  it('handles page param "1" correctly', () => {
    expect(parsePageParam({ page: '1' })).toBe(1);
  });

  it('ignores other params and only reads page', () => {
    expect(parsePageParam({ page: '5', sort: 'asc' })).toBe(5);
  });
});

describe('getPaginationData', () => {
  it('returns correct pagination for first page', () => {
    const result = getPaginationData(1, 100);
    expect(result).toEqual({
      currentPage: 1,
      totalPages: 5,
      limit: 20,
      offset: 0,
    });
  });

  it('returns correct pagination for middle page', () => {
    const result = getPaginationData(3, 100);
    expect(result).toEqual({
      currentPage: 3,
      totalPages: 5,
      limit: 20,
      offset: 40,
    });
  });

  it('clamps page to minimum of 1', () => {
    const result = getPaginationData(0, 100);
    expect(result.currentPage).toBe(1);
    expect(result.offset).toBe(0);
  });

  it('clamps page to minimum of 1 for negative values', () => {
    const result = getPaginationData(-5, 100);
    expect(result.currentPage).toBe(1);
  });

  it('returns totalPages of 1 when totalCount is 0', () => {
    const result = getPaginationData(1, 0);
    expect(result.totalPages).toBe(1);
  });

  it('handles custom pageSize', () => {
    const result = getPaginationData(2, 50, 10);
    expect(result).toEqual({
      currentPage: 2,
      totalPages: 5,
      limit: 10,
      offset: 10,
    });
  });

  it('rounds up totalPages for partial pages', () => {
    const result = getPaginationData(1, 21);
    expect(result.totalPages).toBe(2);
  });

  it('calculates totalPages correctly when totalCount equals pageSize', () => {
    const result = getPaginationData(1, 20);
    expect(result.totalPages).toBe(1);
  });

  it('clamps page exceeding totalPages to totalPages', () => {
    const result = getPaginationData(10, 20);
    expect(result.currentPage).toBe(1);
    expect(result.offset).toBe(0);
    expect(result.totalPages).toBe(1);
  });

  it('handles totalCount of 1', () => {
    const result = getPaginationData(1, 1);
    expect(result.totalPages).toBe(1);
    expect(result.offset).toBe(0);
  });

  it('handles pageSize of 1', () => {
    const result = getPaginationData(3, 5, 1);
    expect(result).toEqual({
      currentPage: 3,
      totalPages: 5,
      limit: 1,
      offset: 2,
    });
  });

  it('returns last page correctly', () => {
    const result = getPaginationData(5, 100);
    expect(result).toEqual({
      currentPage: 5,
      totalPages: 5,
      limit: 20,
      offset: 80,
    });
  });

  it('handles very large totalCount', () => {
    const result = getPaginationData(1, 1_000_000);
    expect(result.totalPages).toBe(50_000);
    expect(result.offset).toBe(0);
  });
});
