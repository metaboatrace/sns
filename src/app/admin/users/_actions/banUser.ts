'use server';

import type { ActionResult } from '@/lib/actions/types';

import { PERMANENT_BAN_DURATION } from '../../_lib/constants';
import { executeModerationAction } from '../_lib/executeModerationAction';

export async function banUser(targetUserId: string, reason: string): Promise<ActionResult> {
  const trimmedReason = reason.trim();
  if (!trimmedReason) {
    return { error: 'reasonRequired' };
  }

  if (trimmedReason.length > 1000) {
    return { error: 'reasonTooLong' };
  }

  return executeModerationAction({
    targetUserId,
    action: 'ban',
    reason: trimmedReason,
    preValidate: ({ adminUserId }) => {
      if (targetUserId === adminUserId) {
        return { error: 'cannotBanSelf' };
      }
    },
    authUpdate: { ban_duration: PERMANENT_BAN_DURATION },
    profileUpdate: { bannedAt: new Date() },
    authErrorKey: 'failedToBan',
    dbErrorKey: 'failedToBan',
    rollbackAuth: async (adminClient, userId) => {
      await adminClient.auth.admin.updateUserById(userId, {
        ban_duration: 'none',
      });
    },
  });
}
