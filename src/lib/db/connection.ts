const DEFAULT_DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/metaboatrace_sns';

/**
 * Resolve the database connection URL from environment variables.
 *
 * Priority order:
 * - When `preferNonPooling` is true (migrations, drizzle-kit):
 *   POSTGRES_URL_NON_POOLING → POSTGRES_URL → DATABASE_URL → default
 * - When `preferNonPooling` is false or omitted (application runtime):
 *   POSTGRES_URL → DATABASE_URL → default
 */
export function getDatabaseUrl(options?: { preferNonPooling?: boolean }): string {
  if (options?.preferNonPooling) {
    return (
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.POSTGRES_URL ||
      process.env.DATABASE_URL ||
      DEFAULT_DATABASE_URL
    );
  }

  return process.env.POSTGRES_URL || process.env.DATABASE_URL || DEFAULT_DATABASE_URL;
}
