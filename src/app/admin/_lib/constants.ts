/**
 * Duration value used to permanently ban a user via Supabase Auth.
 * Equivalent to ~100 years.
 */
export const PERMANENT_BAN_DURATION = '876000h';

/**
 * Regular expression to validate UUID v4 format.
 */
export const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
