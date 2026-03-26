/**
 * PostgreSQL error code type guard utilities.
 */

/** PostgreSQL UNIQUE constraint violation (error code 23505) */
export function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code: string }).code === '23505'
  );
}
