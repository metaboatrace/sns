'use server';

import { revalidatePath } from 'next/cache';

import { eq } from 'drizzle-orm';

import { getClientIp } from '@/lib/client-ip';
import { db, moderationActions, profiles } from '@/lib/db';
import { createAdminClient } from '@/lib/supabase/admin';

import { PERMANENT_BAN_DURATION } from '../../_lib/constants';
import { validateAdminRequest } from '../../_lib/validate-admin-request';

import type { AdminActionResult } from '../../_lib/types';

export async function banUser(targetUserId: string, reason: string): Promise<AdminActionResult> {
  const validation = await validateAdminRequest(targetUserId);
  if ('error' in validation) {
    return validation;
  }

  // Prevent admin from banning themselves
  if (targetUserId === validation.adminUserId) {
    return { error: 'cannotBanSelf' };
  }

  const trimmedReason = reason.trim();
  if (!trimmedReason) {
    return { error: 'reasonRequired' };
  }

  if (trimmedReason.length > 1000) {
    return { error: 'reasonTooLong' };
  }

  // 1. Ban at Supabase Auth level first (external API, can't be in DB transaction)
  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.updateUserById(targetUserId, {
    ban_duration: PERMANENT_BAN_DURATION,
  });

  if (error) {
    return { error: 'failedToBan' };
  }

  // 2. Update profile and record audit log atomically in a DB transaction
  const ipAddress = await getClientIp();
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(profiles)
        .set({
          bannedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(profiles.id, targetUserId));

      await tx.insert(moderationActions).values({
        actorId: validation.adminUserId,
        action: 'ban',
        targetType: 'user',
        targetId: targetUserId,
        reason: trimmedReason,
        ipAddress,
      });
    });
  } catch {
    // Rollback Supabase Auth ban if DB transaction fails
    try {
      await adminClient.auth.admin.updateUserById(targetUserId, {
        ban_duration: 'none',
      });
    } catch (rollbackError) {
      console.error(`Failed to rollback Supabase Auth ban for user ${targetUserId}:`, rollbackError);
    }
    return { error: 'failedToBan' };
  }

  revalidatePath('/admin/users');

  return { success: true };
}
