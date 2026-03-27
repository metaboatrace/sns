'use client';

import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '../../_components/ConfirmationDialog';
import { useConfirmationAction } from '../../_hooks/useConfirmationAction';
import type { ActionResult } from '@/lib/actions/types';

type ModerationButtonBaseProps = {
  userId: string;
  buttonLabel: string;
  buttonVariant: 'default' | 'destructive';
  dialogTitle: string;
  dialogDescription?: string;
  confirmLabel: string;
  confirmVariant?: 'default' | 'destructive';
};

type WithReasonProps = ModerationButtonBaseProps & {
  requiresReason: true;
  action: (userId: string, reason: string) => Promise<ActionResult>;
  reasonLabel: string;
  reasonPlaceholder: string;
  reasonRequiredMessage: string;
};

type WithoutReasonProps = ModerationButtonBaseProps & {
  requiresReason?: false;
  action: (userId: string) => Promise<ActionResult>;
  reasonLabel?: never;
  reasonPlaceholder?: never;
  reasonRequiredMessage?: never;
};

type ModerationButtonProps = WithReasonProps | WithoutReasonProps;

export function ModerationButton(props: ModerationButtonProps) {
  const {
    userId,
    action,
    buttonLabel,
    buttonVariant,
    dialogTitle,
    dialogDescription,
    confirmLabel,
    confirmVariant = 'default',
    requiresReason = false,
    reasonLabel,
    reasonPlaceholder,
  } = props;

  const reasonRequiredMessage = props.requiresReason ? props.reasonRequiredMessage : '';
  const { isOpen, isPending, error, open, close, execute, setError } = useConfirmationAction();
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  async function handleConfirm() {
    if (requiresReason) {
      const reason = reasonRef.current?.value.trim();
      if (!reason) {
        setError(reasonRequiredMessage);
        return;
      }
      // TypeScript cannot narrow the discriminated union inside a closure,
      // so we cast `action` to the expected signature after the `requiresReason` check.
      await execute(() => (action as (userId: string, reason: string) => Promise<ActionResult>)(userId, reason));
    } else {
      await execute(() => (action as (userId: string) => Promise<ActionResult>)(userId));
    }
  }

  return (
    <>
      <Button
        type="button"
        variant={buttonVariant}
        size="xs"
        onClick={open}
      >
        {buttonLabel}
      </Button>

      <ConfirmationDialog
        isOpen={isOpen}
        onClose={close}
        onConfirm={handleConfirm}
        title={dialogTitle}
        description={dialogDescription}
        confirmLabel={confirmLabel}
        confirmVariant={confirmVariant}
        isPending={isPending}
        error={error}
      >
        {requiresReason && (
          <>
            <label htmlFor={`reason-${userId}`} className="block text-sm font-medium text-foreground mb-2">
              {reasonLabel}
            </label>
            <textarea
              id={`reason-${userId}`}
              ref={reasonRef}
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground resize-none"
              rows={3}
              maxLength={1000}
              placeholder={reasonPlaceholder}
            />
          </>
        )}
      </ConfirmationDialog>
    </>
  );
}
