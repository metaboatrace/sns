import { useCallback, useState } from 'react';

import { getLabel } from '../_lib/labels';

import type { AdminActionResult } from '../_lib/types';

type UseConfirmationActionReturn = {
  isOpen: boolean;
  isPending: boolean;
  error: string | null;
  open: () => void;
  close: () => void;
  execute: (action: () => Promise<AdminActionResult>) => Promise<void>;
  setError: (error: string | null) => void;
};

/**
 * Custom hook that manages dialog open/close state, pending state, and error state
 * for admin confirmation actions (ban, unban, etc.).
 */
export function useConfirmationAction(): UseConfirmationActionReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => {
    setIsOpen(false);
    setError(null);
  }, []);

  const execute = useCallback(async (action: () => Promise<AdminActionResult>) => {
    setIsPending(true);
    setError(null);

    try {
      const result = await action();

      if ('error' in result) {
        const labelKey = `admin.errors.${result.error}`;
        const label = getLabel(labelKey);
        setError(label !== labelKey ? label : result.error);
      } else {
        setIsOpen(false);
      }
    } catch {
      setError(getLabel('admin.errors.unexpected'));
    } finally {
      setIsPending(false);
    }
  }, []);

  return { isOpen, isPending, error, open, close, execute, setError };
}
