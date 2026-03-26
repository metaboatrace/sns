// This script runs outside of Next.js, so .env.local is not automatically loaded.
// Use dotenv explicitly with NODE_ENV to determine which env file to load.
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local',
});

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { readdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import postgres from 'postgres';
import { fileURLToPath } from 'url';
import { getDatabaseUrl } from '../src/lib/db/connection';

const __dirname = dirname(fileURLToPath(import.meta.url));

const connectionString = getDatabaseUrl({ preferNonPooling: true });

// When no env vars are set, getDatabaseUrl returns the local default.
// In CI/production, if none of the expected env vars are present, skip migration.
if (
  !process.env.POSTGRES_URL_NON_POOLING &&
  !process.env.POSTGRES_URL &&
  !process.env.DATABASE_URL
) {
  console.log('No database connection configured. Skipping migration.');
  process.exit(0);
}

// prepare: false is required for Supabase Connection Pooler (Transaction mode / PgBouncer)
// max: 1 to avoid connection pool issues during migration
const client = postgres(connectionString, { prepare: false, max: 1 });
const db = drizzle(client);

async function isSupabaseEnvironment(): Promise<boolean> {
  const result = await client`SELECT 1 FROM pg_roles WHERE rolname = 'supabase_auth_admin'`;
  return result.length > 0;
}

async function applySupabaseSqlFiles() {
  const supabaseDir = join(__dirname, '..', 'drizzle', 'supabase');
  const files = readdirSync(supabaseDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    console.log(`Applying ${file}...`);
    const sql = readFileSync(join(supabaseDir, file), 'utf-8');
    await client.unsafe(sql);
    console.log(`${file} applied!`);
  }
}

async function main() {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations complete!');

  if (await isSupabaseEnvironment()) {
    console.log('Supabase environment detected. Applying Supabase-specific SQL files...');
    await applySupabaseSqlFiles();
  } else {
    console.log('Local environment detected. Skipping Supabase-only setup.');
  }

  await client.end();
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
