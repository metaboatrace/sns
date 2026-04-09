import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import MypageLoading from '../loading';

describe('MypageLoading', () => {
  it('renders without crashing', () => {
    const { container } = render(<MypageLoading />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders a skeleton element', () => {
    const { container } = render(<MypageLoading />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBe(1);
  });
});
