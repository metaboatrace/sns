import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import AdminAuditLogLoading from '../loading';

describe('AdminAuditLogLoading', () => {
  it('renders without crashing', () => {
    const { container } = render(<AdminAuditLogLoading />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders skeleton elements', () => {
    const { container } = render(<AdminAuditLogLoading />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders a table structure', () => {
    const { container } = render(<AdminAuditLogLoading />);
    expect(container.querySelector('table')).not.toBeNull();
  });
});
