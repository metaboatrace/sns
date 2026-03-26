import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { TruncatedText } from '../TruncatedText';

describe('TruncatedText', () => {
  describe('when text is null or undefined or empty', () => {
    it('renders "-" when text is null', () => {
      render(<TruncatedText text={null} maxLength={10} />);
      expect(screen.getByText('-')).toBeDefined();
    });

    it('renders "-" when text is undefined', () => {
      render(<TruncatedText text={undefined} maxLength={10} />);
      expect(screen.getByText('-')).toBeDefined();
    });

    it('renders "-" when text is an empty string', () => {
      render(<TruncatedText text="" maxLength={10} />);
      expect(screen.getByText('-')).toBeDefined();
    });

    it('applies text-muted-foreground class to the "-" placeholder', () => {
      const { container } = render(<TruncatedText text={null} maxLength={10} />);
      const span = container.querySelector('span');
      expect(span?.className).toContain('text-muted-foreground');
    });
  });

  describe('when text is shorter than or equal to maxLength', () => {
    it('renders full text without truncation', () => {
      render(<TruncatedText text="hello" maxLength={10} />);
      expect(screen.getByText('hello')).toBeDefined();
    });

    it('renders full text when exactly at maxLength', () => {
      render(<TruncatedText text="1234567890" maxLength={10} />);
      expect(screen.getByText('1234567890')).toBeDefined();
    });

    it('does not append ellipsis', () => {
      render(<TruncatedText text="short" maxLength={10} />);
      expect(screen.queryByText(/\.\.\./)).toBeNull();
    });

    it('sets title attribute to the full text', () => {
      render(<TruncatedText text="hello" maxLength={10} />);
      const span = screen.getByText('hello');
      expect(span.getAttribute('title')).toBe('hello');
    });
  });

  describe('when text exceeds maxLength', () => {
    it('truncates text and appends "..."', () => {
      render(<TruncatedText text="hello world!" maxLength={5} />);
      expect(screen.getByText('hello...')).toBeDefined();
    });

    it('sets title attribute to the full original text', () => {
      render(<TruncatedText text="hello world!" maxLength={5} />);
      const span = screen.getByText('hello...');
      expect(span.getAttribute('title')).toBe('hello world!');
    });

    it('truncates to maxLength characters before adding ellipsis', () => {
      const text = 'abcdefghij';
      render(<TruncatedText text={text} maxLength={3} />);
      expect(screen.getByText('abc...')).toBeDefined();
    });
  });

  describe('className prop', () => {
    it('applies className to the span when text is present', () => {
      const { container } = render(
        <TruncatedText text="hello" maxLength={10} className="custom-class" />,
      );
      const span = container.querySelector('span');
      expect(span?.className).toContain('custom-class');
    });

    it('does not apply className to the "-" placeholder span', () => {
      const { container } = render(
        <TruncatedText text={null} maxLength={10} className="custom-class" />,
      );
      const span = container.querySelector('span');
      expect(span?.className).not.toContain('custom-class');
    });
  });

  describe('edge cases', () => {
    it('handles maxLength of 0', () => {
      render(<TruncatedText text="hello" maxLength={0} />);
      expect(screen.getByText('...')).toBeDefined();
    });

    it('handles single character text within maxLength', () => {
      render(<TruncatedText text="a" maxLength={1} />);
      expect(screen.getByText('a')).toBeDefined();
    });

    it('handles text with special characters', () => {
      render(<TruncatedText text="<script>alert('xss')</script>" maxLength={10} />);
      const span = screen.getByTitle("<script>alert('xss')</script>");
      expect(span.textContent).toBe("<script>al...");
    });

    it('handles text with unicode characters', () => {
      render(<TruncatedText text="こんにちは世界" maxLength={3} />);
      expect(screen.getByText('こんに...')).toBeDefined();
    });
  });
});
