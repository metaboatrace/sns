import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';
import { getDatabaseUrl } from './connection';

const connectionString = getDatabaseUrl();

// Reuse the same postgres client across HMR reloads in development.
// Without this, each hot-reload creates a new connection pool, eventually
// exhausting PostgreSQL's max_connections limit (error 53300).
const globalForDb = globalThis as unknown as {
  postgresClient: ReturnType<typeof postgres> | undefined;
};

const client = globalForDb.postgresClient ?? postgres(connectionString, { prepare: false });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.postgresClient = client;
}

export const db = drizzle(client, { schema });

// Re-export schema for convenience
export * from './schema';
