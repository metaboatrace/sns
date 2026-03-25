import { isReservedUsername } from '@/lib/reserved-usernames';

const USERNAME_REGEX = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/;
const USERNAME_MIN_LENGTH = 2;
const USERNAME_MAX_LENGTH = 20;

export type UsernameFormatError = 'too_short' | 'too_long' | 'invalid_format';
export type UsernameValidationError = UsernameFormatError | 'reserved';

export function validateUsernameFormat(username: string): UsernameFormatError | null {
  if (username.length < USERNAME_MIN_LENGTH) return 'too_short';
  if (username.length > USERNAME_MAX_LENGTH) return 'too_long';
  if (!USERNAME_REGEX.test(username)) return 'invalid_format';
  return null;
}

export function validateUsername(username: string): UsernameValidationError | null {
  const formatError = validateUsernameFormat(username);
  if (formatError) return formatError;
  if (isReservedUsername(username)) return 'reserved';
  return null;
}
