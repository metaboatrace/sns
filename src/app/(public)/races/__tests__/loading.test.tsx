import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import RacesLoading from '../loading';

describe('RacesLoading', () => {
  it('renders without crashing', () => {
    const { container } = render(<RacesLoading />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders skeleton elements', () => {
    const { container } = render(<RacesLoading />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders 6 card-like skeleton rows', () => {
    const { container } = render(<RacesLoading />);
    // 6 skeleton items in the space-y-4 container
    const skeletons = container.querySelectorAll('.space-y-4 [data-slot="skeleton"]');
    expect(skeletons.length).toBe(6);
  });
});
