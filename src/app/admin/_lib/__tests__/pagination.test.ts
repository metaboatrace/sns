import { describe, it, expect } from 'vitest';

import { DEFAULT_PAGE_SIZE, getPaginationData } from '../pagination';

describe('DEFAULT_PAGE_SIZE', () => {
  it('is 20', () => {
    expect(DEFAULT_PAGE_SIZE).toBe(20);
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

  it('does not clamp page exceeding totalPages', () => {
    const result = getPaginationData(10, 20);
    expect(result.currentPage).toBe(10);
    expect(result.offset).toBe(180);
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
