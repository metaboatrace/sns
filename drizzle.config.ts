import 'dotenv/config';
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
