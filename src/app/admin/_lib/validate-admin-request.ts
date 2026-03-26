import { UUID_REGEX } from './constants';
import { requireAdmin } from './auth';

type ValidationSuccess = { adminUserId: string };
type ValidationFailure = { error: string };

/**
 * Validates that the target user ID is a valid UUID and that the current user is an admin.
 * Returns the authenticated admin's userId on success, or an error object on failure.
 */
export async function validateAdminRequest(
  targetUserId: string
): Promise<ValidationSuccess | ValidationFailure> {
  if (!UUID_REGEX.test(targetUserId)) {
    return { error: 'invalidUserId' };
  }

  const auth = await requireAdmin();
  if ('error' in auth) {
    return auth;
  }

  return { adminUserId: auth.userId };
}
