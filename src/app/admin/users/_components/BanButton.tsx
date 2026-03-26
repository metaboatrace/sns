'use client';

import { useRef } from 'react';

import { ConfirmationDialog } from '../../_components/ConfirmationDialog';
import { useConfirmationAction } from '../../_hooks/useConfirmationAction';
import { getLabel } from '../../_lib/labels';
import { banUser } from '../_actions/banUser';

export function BanButton({ userId }: { userId: string }) {
  const { isOpen, isPending, error, open, close, execute, setError } = useConfirmationAction();
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  async function handleBan() {
    const reason = reasonRef.current?.value.trim();
    if (!reason) {
      setError(getLabel('admin.banDialog.reasonRequired'));
      return;
    }

    await execute(() => banUser(userId, reason));
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="px-3 py-1 text-xs font-medium rounded bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
      >
        {getLabel('admin.usersTable.ban')}
      </button>

      <ConfirmationDialog
        isOpen={isOpen}
        onClose={close}
        onConfirm={handleBan}
        title={getLabel('admin.banDialog.title')}
        confirmLabel={getLabel('admin.banDialog.confirm')}
        confirmClassName="bg-destructive text-destructive-foreground hover:bg-destructive/90"
        isPending={isPending}
        error={error}
      >
        <label htmlFor={`ban-reason-${userId}`} className="block text-sm font-medium text-foreground mb-2">
          {getLabel('admin.banDialog.reasonLabel')}
        </label>
        <textarea
          id={`ban-reason-${userId}`}
          ref={reasonRef}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background text-foreground resize-none"
          rows={3}
          maxLength={1000}
          placeholder={getLabel('admin.banDialog.reasonPlaceholder')}
        />
      </ConfirmationDialog>
    </>
  );
}
