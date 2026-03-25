// Drizzle ORM schema definitions
import { index, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

// Profiles
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(), // references auth.users(id) — FK defined in custom SQL
  username: varchar('username', { length: 255 }).unique().notNull(),
  displayName: varchar('display_name', { length: 255 }),
  avatarUrl: varchar('avatar_url', { length: 1024 }),
  bio: text('bio'),
  xUsername: varchar('x_username', { length: 255 }),
  youtubeChannelUrl: varchar('youtube_channel_url', { length: 1024 }),
  instagramUsername: varchar('instagram_username', { length: 255 }),
  bannedAt: timestamp('banned_at', { withTimezone: true }),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

// Rate Limit Events
export const rateLimitEvents = pgTable(
  'rate_limit_events',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    action: varchar('action', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => [index('rate_limit_events_user_action_created_idx').on(table.userId, table.action, table.createdAt)],
);

export type RateLimitEvent = typeof rateLimitEvents.$inferSelect;
export type NewRateLimitEvent = typeof rateLimitEvents.$inferInsert;
