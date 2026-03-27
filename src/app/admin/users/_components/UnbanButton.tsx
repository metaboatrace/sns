'use client';

import { getLabel } from '../../_lib/labels';
import { unbanUser } from '../_actions/unbanUser';

import { ModerationButton } from './ModerationButton';

export function UnbanButton({ userId }: { userId: string }) {
  return (
    <ModerationButton
      userId={userId}
      action={unbanUser}
      buttonLabel={getLabel('admin.usersTable.unban')}
      buttonVariant="default"
      dialogTitle={getLabel('admin.unbanDialog.title')}
      dialogDescription={getLabel('admin.unbanDialog.description')}
      confirmLabel={getLabel('admin.unbanDialog.confirm')}
    />
  );
}
