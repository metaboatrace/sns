import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import type { Profile } from '@/lib/db';

import { StatusBadge } from '../StatusBadge';

function buildProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: '00000000-0000-0000-0000-000000000001',
    username: 'testuser',
    displayName: null,
    avatarUrl: null,
    bio: null,
    xUsername: null,
    youtubeChannelUrl: null,
    instagramUsername: null,
    bannedAt: null,
    deletedAt: null,
    createdAt: new Date('2025-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-01T00:00:00Z'),
    ...overrides,
  };
}

describe('StatusBadge', () => {
  it('renders "匿名" badge when profile is undefined', () => {
    render(<StatusBadge profile={undefined} />);
    const badge = screen.getByText('匿名');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-muted');
  });

  it('renders "停止中" badge when profile has bannedAt', () => {
    const profile = buildProfile({ bannedAt: new Date('2025-06-01T00:00:00Z') });
    render(<StatusBadge profile={profile} />);
    const badge = screen.getByText('停止中');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-destructive');
  });

  it('renders "有効" badge when profile exists and is not banned', () => {
    const profile = buildProfile();
    render(<StatusBadge profile={profile} />);
    const badge = screen.getByText('有効');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-primary');
  });

  it('renders "有効" badge when bannedAt is explicitly null', () => {
    const profile = buildProfile({ bannedAt: null });
    render(<StatusBadge profile={profile} />);
    expect(screen.getByText('有効')).toBeInTheDocument();
  });
});
