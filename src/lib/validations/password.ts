import { MIN_PASSWORD_LENGTH } from '@/config';

// Keep in sync with Supabase password_requirements in supabase/config.toml
// Production: also update in Supabase Dashboard > Authentication > Settings > Password

export const PASSWORD_VALIDATION_ERROR_KEYS = [
  'tooShort',
  'missingLetter',
  'missingDigit',
  'weak', // Supabase-side rejection (e.g. HIBP, or requirements stricter than local schema)
] as const;

export type PasswordValidationErrorKey = (typeof PASSWORD_VALIDATION_ERROR_KEYS)[number];

export function isPasswordValidationErrorKey(key: string): key is PasswordValidationErrorKey {
  return (PASSWORD_VALIDATION_ERROR_KEYS as readonly string[]).includes(key);
}

export function getPasswordValidationError(password: string): PasswordValidationErrorKey | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return 'tooShort';
  }
  if (!/[a-zA-Z]/.test(password)) {
    return 'missingLetter';
  }
  if (!/\d/.test(password)) {
    return 'missingDigit';
  }
  return null;
}
