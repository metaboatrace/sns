'use client';

import { ConfirmationDialog } from '../../_components/ConfirmationDialog';
import { useConfirmationAction } from '../../_hooks/useConfirmationAction';
import { getLabel } from '../../_lib/labels';
import { unbanUser } from '../_actions/unbanUser';

export function UnbanButton({ userId }: { userId: string }) {
  const { isOpen, isPending, error, open, close, execute } = useConfirmationAction();

  async function handleUnban() {
    await execute(() => unbanUser(userId));
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="px-3 py-1 text-xs font-medium rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {getLabel('admin.usersTable.unban')}
      </button>

      <ConfirmationDialog
        isOpen={isOpen}
        onClose={close}
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
