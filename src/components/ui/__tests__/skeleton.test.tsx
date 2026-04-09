import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
  it('renders a div element', () => {
    const { container } = render(<Skeleton />);
    const div = container.querySelector('div');
    expect(div).not.toBeNull();
  });

  it('has data-slot="skeleton" attribute', () => {
    const { container } = render(<Skeleton />);
    const div = container.querySelector('[data-slot="skeleton"]');
    expect(div).not.toBeNull();
  });

  it('applies default classes (animate-pulse, rounded-md, bg-muted)', () => {
    const { container } = render(<Skeleton />);
    const div = container.querySelector('div')!;
    expect(div.className).toContain('animate-pulse');
    expect(div.className).toContain('rounded-md');
    expect(div.className).toContain('bg-muted');
  });

  it('merges additional className', () => {
    const { container } = render(<Skeleton className="h-8 w-48" />);
    const div = container.querySelector('div')!;
    expect(div.className).toContain('h-8');
    expect(div.className).toContain('w-48');
    expect(div.className).toContain('animate-pulse');
  });

  it('passes through additional props', () => {
    const { container } = render(<Skeleton data-testid="test-skeleton" />);
    const div = container.querySelector('[data-testid="test-skeleton"]');
    expect(div).not.toBeNull();
  });
});
