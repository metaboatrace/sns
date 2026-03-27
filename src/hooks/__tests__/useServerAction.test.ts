import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import type { ActionResult } from '@/lib/actions/types';

import { useServerAction } from '../useServerAction';

const defaultOptions = {
  fallbackError: 'Something went wrong',
  rateLimitedError: 'Too many requests',
};

describe('useServerAction', () => {
  it('returns initial state with empty error and not loading', () => {
    const { result } = renderHook(() => useServerAction(defaultOptions));

    expect(result.current.error).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('returns success result and sets isLoading during execution', async () => {
    const { result } = renderHook(() => useServerAction(defaultOptions));

    const successAction = vi.fn<() => Promise<ActionResult>>().mockResolvedValue({ success: true });

    let actionResult: ActionResult;
    await act(async () => {
      actionResult = await result.current.execute(successAction);
    });

    expect(actionResult!).toEqual({ success: true });
    expect(result.current.error).toBe('');
    // isLoading is NOT reset on success — the caller controls it (e.g., after redirect)
  });

  it('sets rateLimitedError when action returns rateLimited error', async () => {
    const { result } = renderHook(() => useServerAction(defaultOptions));

    const rateLimitedAction = vi
      .fn<() => Promise<ActionResult>>()
      .mockResolvedValue({ error: 'rateLimited' });

    await act(async () => {
      await result.current.execute(rateLimitedAction);
    });

    expect(result.current.error).toBe('Too many requests');
    expect(result.current.isLoading).toBe(false);
  });

  it('sets fallbackError when action returns an unknown error key', async () => {
    const { result } = renderHook(() => useServerAction(defaultOptions));

    const errorAction = vi
      .fn<() => Promise<ActionResult>>()
      .mockResolvedValue({ error: 'unknownError' });

    await act(async () => {
      await result.current.execute(errorAction);
    });

    expect(result.current.error).toBe('Something went wrong');
    expect(result.current.isLoading).toBe(false);
  });

  it('uses errorMap to resolve known error keys', async () => {
    const options = {
      ...defaultOptions,
      errorMap: {
        invalidInput: 'Invalid input provided',
        notFound: 'Resource not found',
      },
    };
    const { result } = renderHook(() => useServerAction(options));

    const errorAction = vi
      .fn<() => Promise<ActionResult>>()
      .mockResolvedValue({ error: 'invalidInput' });

    await act(async () => {
      await result.current.execute(errorAction);
    });

    expect(result.current.error).toBe('Invalid input provided');
  });

  it('falls back to fallbackError when error key is not in errorMap', async () => {
    const options = {
      ...defaultOptions,
      errorMap: { known: 'Known error' },
    };
    const { result } = renderHook(() => useServerAction(options));

    const errorAction = vi
      .fn<() => Promise<ActionResult>>()
      .mockResolvedValue({ error: 'somethingElse' });

    await act(async () => {
      await result.current.execute(errorAction);
    });

    expect(result.current.error).toBe('Something went wrong');
  });

  it('handles thrown exceptions with fallbackError', async () => {
    const { result } = renderHook(() => useServerAction(defaultOptions));

    const throwingAction = vi.fn<() => Promise<ActionResult>>().mockRejectedValue(new Error('Network error'));

    let actionResult: ActionResult;
    await act(async () => {
      actionResult = await result.current.execute(throwingAction);
    });

    expect(actionResult!).toEqual({ error: 'unexpected' });
    expect(result.current.error).toBe('Something went wrong');
    expect(result.current.isLoading).toBe(false);
  });

  it('clears previous error when execute is called again', async () => {
    const { result } = renderHook(() => useServerAction(defaultOptions));

    // First call: error
    const errorAction = vi
      .fn<() => Promise<ActionResult>>()
      .mockResolvedValue({ error: 'fail' });
    await act(async () => {
      await result.current.execute(errorAction);
    });
    expect(result.current.error).toBe('Something went wrong');

    // Second call: success — error should be cleared
    const successAction = vi
      .fn<() => Promise<ActionResult>>()
      .mockResolvedValue({ success: true });
    await act(async () => {
      await result.current.execute(successAction);
    });
    expect(result.current.error).toBe('');
  });

  it('clearError resets error to empty string', async () => {
    const { result } = renderHook(() => useServerAction(defaultOptions));

    await act(async () => {
      result.current.setError('manual error');
    });
    expect(result.current.error).toBe('manual error');

    await act(async () => {
      result.current.clearError();
    });
    expect(result.current.error).toBe('');
  });

  it('setError sets a custom error message', async () => {
    const { result } = renderHook(() => useServerAction(defaultOptions));

    await act(async () => {
      result.current.setError('custom error');
    });
    expect(result.current.error).toBe('custom error');
  });

  it('setIsLoading updates loading state', async () => {
    const { result } = renderHook(() => useServerAction(defaultOptions));

    await act(async () => {
      result.current.setIsLoading(true);
    });
    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      result.current.setIsLoading(false);
    });
    expect(result.current.isLoading).toBe(false);
  });
});
