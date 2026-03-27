'use client';

import { type ReactNode, useEffect, useId } from 'react';

import { Button } from '@/components/ui/button';
import { getLabel } from '../_lib/labels';

type ConfirmationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel: string;
  confirmVariant?: 'default' | 'destructive';
  isPending: boolean;
  error: string | null;
  children?: ReactNode;
};

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  confirmVariant = 'default',
  isPending,
  error,
  children,
}: ConfirmationDialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id={titleId} className="text-lg font-semibold text-foreground mb-4">{title}</h3>

        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}

        {children}

        {error && <p className="text-destructive text-sm mt-2">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isPending}
          >
            {getLabel('admin.dialog.cancel')}
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            size="sm"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? getLabel('admin.dialog.processing') : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
