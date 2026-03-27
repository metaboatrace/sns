'use client';

import { getLabel } from '../../_lib/labels';
import { banUser } from '../_actions/banUser';

import { ModerationButton } from './ModerationButton';

export function BanButton({ userId }: { userId: string }) {
  return (
    <ModerationButton
      userId={userId}
      action={banUser}
      buttonLabel={getLabel('admin.usersTable.ban')}
      buttonVariant="destructive"
      dialogTitle={getLabel('admin.banDialog.title')}
      confirmLabel={getLabel('admin.banDialog.confirm')}
      confirmVariant="destructive"
      requiresReason
      reasonLabel={getLabel('admin.banDialog.reasonLabel')}
      reasonPlaceholder={getLabel('admin.banDialog.reasonPlaceholder')}
      reasonRequiredMessage={getLabel('admin.banDialog.reasonRequired')}
    />
  );
}
