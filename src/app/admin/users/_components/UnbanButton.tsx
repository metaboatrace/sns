'use client';

import { useState } from 'react';

import { ConfirmationDialog } from '../../_components/ConfirmationDialog';
import { getLabel } from '../../_lib/labels';
import { unbanUser } from '../_actions/unbanUser';

export function UnbanButton({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUnban() {
    setIsPending(true);
    setError(null);

    try {
      const result = await unbanUser(userId);

      if ('error' in result) {
        setError(result.error);
        setIsPending(false);
      } else {
        setIsOpen(false);
        setIsPending(false);
      }
    } catch {
      setError(getLabel('admin.errors.unexpected'));
      setIsPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 text-xs font-medium rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {getLabel('admin.usersTable.unban')}
      </button>

      <ConfirmationDialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setError(null);
        }}
        onConfirm={handleUnban}
        title={getLabel('admin.unbanDialog.title')}
        description={getLabel('admin.unbanDialog.description')}
        confirmLabel={getLabel('admin.unbanDialog.confirm')}
        isPending={isPending}
        error={error}
      />
    </>
  );
}
