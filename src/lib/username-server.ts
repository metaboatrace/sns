import 'server-only';

import { validateUsername, type UsernameValidationError } from '@/lib/username';
import { isLameName } from '@/lib/lame-name';

export function validateUsernameServer(
  username: string,
): UsernameValidationError | 'username_inappropriate' | null {
  const validationError = validateUsername(username);
  if (validationError) return validationError;

  if (isLameName(username)) return 'username_inappropriate';

  return null;
}
