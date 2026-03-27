'use server';

import type { ActionResult } from '@/lib/actions/types';

import { PERMANENT_BAN_DURATION } from '../../_lib/constants';
import { executeModerationAction } from '../_lib/executeModerationAction';

export async function unbanUser(targetUserId: string): Promise<ActionResult> {
  return executeModerationAction({
    targetUserId,
    action: 'unban',
    authUpdate: { ban_duration: 'none' },
    profileUpdate: { bannedAt: null },
    authErrorKey: 'failedToUnban',
    dbErrorKey: 'failedToUnban',
    rollbackAuth: async (adminClient, userId) => {
      await adminClient.auth.admin.updateUserById(userId, {
        ban_duration: PERMANENT_BAN_DURATION,
      });
    },
  });
}
