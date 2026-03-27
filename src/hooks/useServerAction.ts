import { useCallback, useState } from 'react';

import type { ActionResult } from '@/lib/actions/types';

type UseServerActionOptions = {
  /** Map specific error keys to user-facing messages. */
  errorMap?: Record<string, string>;
  /** Fallback message when error key is not in errorMap. */
  fallbackError: string;
  /** Message to show when error key is 'rateLimited'. */
  rateLimitedError: string;
};

type UseServerActionReturn = {
  error: string;
  isLoading: boolean;
  execute: (action: () => Promise<ActionResult>) => Promise<ActionResult>;
  setError: (error: string) => void;
  clearError: () => void;
  setIsLoading: (loading: boolean) => void;
};

/**
 * A hook that manages error and loading state for server action calls.
 * Handles rateLimited errors and provides a generic fallback for unknown errors.
 */
export function useServerAction(options: UseServerActionOptions): UseServerActionReturn {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearError = useCallback(() => setError(''), []);

  const execute = useCallback(
    async (action: () => Promise<ActionResult>): Promise<ActionResult> => {
      setError('');
      setIsLoading(true);

      try {
        const result = await action();

        if ('error' in result) {
          if (result.error === 'rateLimited') {
            setError(options.rateLimitedError);
          } else if (options.errorMap && result.error in options.errorMap) {
            setError(options.errorMap[result.error]);
          } else {
            setError(options.fallbackError);
          }
          return result;
        }

        return result;
      } catch {
        setError(options.fallbackError);
        return { error: 'unexpected' };
      } finally {
        setIsLoading(false);
      }
    },
    [options.rateLimitedError, options.fallbackError, options.errorMap],
  );

  return { error, isLoading, execute, setError, clearError, setIsLoading };
}
