import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import AdminActivityLogLoading from '../loading';

describe('AdminActivityLogLoading', () => {
  it('renders without crashing', () => {
    const { container } = render(<AdminActivityLogLoading />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders skeleton elements', () => {
    const { container } = render(<AdminActivityLogLoading />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders a table structure', () => {
    const { container } = render(<AdminActivityLogLoading />);
    expect(container.querySelector('table')).not.toBeNull();
  });
});
