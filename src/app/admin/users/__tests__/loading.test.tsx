import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import AdminUsersLoading from '../loading';

describe('AdminUsersLoading', () => {
  it('renders without crashing', () => {
    const { container } = render(<AdminUsersLoading />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders skeleton elements', () => {
    const { container } = render(<AdminUsersLoading />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders a table structure', () => {
    const { container } = render(<AdminUsersLoading />);
    expect(container.querySelector('table')).not.toBeNull();
    expect(container.querySelector('thead')).not.toBeNull();
    expect(container.querySelector('tbody')).not.toBeNull();
  });

  it('renders 10 table body rows', () => {
    const { container } = render(<AdminUsersLoading />);
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(10);
  });
});
