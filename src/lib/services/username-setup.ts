import 'server-only';

import { db, profiles } from '@/lib/db';
import { isUniqueViolation } from '@/lib/db/errors';
import { validateUsernameServer } from '@/lib/username/server-validation';
import { hasProfile } from '@/lib/db/queries/profiles';

export type SetupUsernameError =
  | { type: 'validation_error'; error: string }
  | { type: 'already_set' }
  | { type: 'username_taken' };

export type SetupUsernameResult =
  | { success: true; username: string }
  | { success: false; error: SetupUsernameError };

export async function setupUsername(
  userId: string,
  username: string,
  displayName?: string,
): Promise<SetupUsernameResult> {
  const validationError = validateUsernameServer(username);
  if (validationError) {
    return { success: false, error: { type: 'validation_error', error: validationError } };
  }

  if (await hasProfile(userId)) {
    return { success: false, error: { type: 'already_set' } };
  }

  try {
    await db.insert(profiles).values({
      id: userId,
      username,
      displayName: displayName ?? username,
    });
  } catch (err: unknown) {
    if (isUniqueViolation(err)) {
      return { success: false, error: { type: 'username_taken' } };
    }
    throw err;
  }

  return { success: true, username };
}
