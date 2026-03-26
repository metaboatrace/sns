import { describe, it, expect } from 'vitest';

import { getLabel } from '../labels';

describe('getLabel', () => {
  it('returns the correct label for a top-level key', () => {
    expect(getLabel('admin.users')).toBe('ユーザー一覧');
  });

  it('returns the correct label for a nested key', () => {
    expect(getLabel('admin.usersTable.email')).toBe('メール');
  });

  it('returns the correct label for other nested keys', () => {
    expect(getLabel('admin.usersTable.username')).toBe('ユーザー名');
    expect(getLabel('admin.usersTable.role')).toBe('ロール');
    expect(getLabel('admin.usersTable.status')).toBe('ステータス');
    expect(getLabel('admin.usersTable.createdAt')).toBe('作成日');
    expect(getLabel('admin.usersTable.active')).toBe('有効');
    expect(getLabel('admin.usersTable.banned')).toBe('停止中');
    expect(getLabel('admin.usersTable.anonymous')).toBe('匿名');
    expect(getLabel('admin.usersTable.noUsersFound')).toBe('ユーザーが見つかりませんでした');
  });

  it('returns the key itself for a non-existent path', () => {
    expect(getLabel('admin.nonExistent')).toBe('admin.nonExistent');
  });

  it('returns the key itself for a deeply non-existent path', () => {
    expect(getLabel('admin.usersTable.nonExistent')).toBe('admin.usersTable.nonExistent');
  });

  it('returns the key itself when path goes through a string value', () => {
    expect(getLabel('admin.users.deep')).toBe('admin.users.deep');
  });

  it('returns the key itself for an empty-like path that resolves to an object', () => {
    // "admin.usersTable" resolves to an object, not a string
    expect(getLabel('admin.usersTable')).toBe('admin.usersTable');
  });

  it('returns the key itself for an empty string', () => {
    expect(getLabel('')).toBe('');
  });

  it('returns the key itself for a single non-existent key', () => {
    expect(getLabel('nonExistent')).toBe('nonExistent');
  });

  it('returns the key itself for the root object key', () => {
    // "admin" resolves to an object, not a string
    expect(getLabel('admin')).toBe('admin');
  });

  it('returns the correct label for pagination keys', () => {
    expect(getLabel('pagination.previous')).toBe('前へ');
    expect(getLabel('pagination.next')).toBe('次へ');
    expect(getLabel('pagination.ariaLabel')).toBe('ページネーション');
  });

  it('returns the key itself for a path with trailing dot', () => {
    expect(getLabel('admin.')).toBe('admin.');
  });
});
