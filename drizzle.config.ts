// This config is loaded by drizzle-kit, not via Next.js, so .env.local is not automatically loaded.
// Use dotenv explicitly with NODE_ENV to determine which env file to load.
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local',
});

import { defineConfig } from 'drizzle-kit';
import { getDatabaseUrl } from './src/lib/db/connection';

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: getDatabaseUrl({ preferNonPooling: true }),
  },
  migrations: {
    prefix: 'timestamp',
  },
});
