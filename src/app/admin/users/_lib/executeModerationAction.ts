import { revalidatePath } from 'next/cache';

import { eq } from 'drizzle-orm';

import type { ActionResult } from '@/lib/actions/types';
import { getClientIp } from '@/lib/client-ip';
import { db, moderationActions, profiles } from '@/lib/db';
import { createAdminClient } from '@/lib/supabase/admin';

import { validateAdminRequest } from '../../_lib/validate-admin-request';

type ModerationActionConfig = {
  targetUserId: string;
  action: string;
  reason?: string;
  /** Called after admin validation but before the Supabase Auth operation. Return an error to abort, or void to continue. */
  preValidate?: (params: { adminUserId: string }) => { error: string } | void;
  /** The Supabase Auth update to apply (e.g., ban_duration). */
  authUpdate: Record<string, unknown>;
  /** The profile fields to set in the DB transaction. */
  profileUpdate: Record<string, unknown>;
  /** Error key returned when the auth operation fails. */
  authErrorKey: string;
  /** Error key returned when the DB transaction fails. */
  dbErrorKey: string;
  /** Called to rollback the Supabase Auth operation if the DB transaction fails. */
  rollbackAuth: (
    adminClient: ReturnType<typeof createAdminClient>,
    targetUserId: string,
  ) => Promise<void>;
};

export async function executeModerationAction(
  config: ModerationActionConfig,
): Promise<ActionResult> {
  const validation = await validateAdminRequest(config.targetUserId);
  if ('error' in validation) {
    return validation;
  }

  if (config.preValidate) {
    const preResult = config.preValidate({ adminUserId: validation.adminUserId });
    if (preResult && 'error' in preResult) {
      return preResult;
    }
  }

  // 1. Apply Supabase Auth operation (external API, outside DB transaction)
  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.updateUserById(
    config.targetUserId,
    config.authUpdate,
  );

  if (error) {
    return { error: config.authErrorKey };
  }

  // 2. Update profile and record audit log atomically in a DB transaction
  const ipAddress = await getClientIp();
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(profiles)
        .set({
          ...config.profileUpdate,
          updatedAt: new Date(),
        })
        .where(eq(profiles.id, config.targetUserId));

      await tx.insert(moderationActions).values({
        actorId: validation.adminUserId,
        action: config.action,
        targetType: 'user',
        targetId: config.targetUserId,
        reason: config.reason,
        ipAddress,
      });
    });
  } catch {
    // Rollback Supabase Auth operation if DB transaction fails
    try {
      await config.rollbackAuth(adminClient, config.targetUserId);
    } catch (rollbackError) {
      console.error(
        `Failed to rollback Supabase Auth ${config.action} for user ${config.targetUserId}:`,
        rollbackError,
      );
    }
    return { error: config.dbErrorKey };
  }

  revalidatePath('/admin/users');

  return { success: true };
}
