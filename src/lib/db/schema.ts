// Drizzle ORM schema definitions
import { index, jsonb, pgEnum, pgTable, text, timestamp, unique, uuid, varchar } from 'drizzle-orm/pg-core';

// Moderation Actions — audit log for admin moderation operations
export const moderationActions = pgTable(
  'moderation_actions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    actorId: uuid('actor_id').notNull(), // references auth.users — FK defined in custom SQL
    action: varchar('action', { length: 50 }).notNull(),
    targetType: varchar('target_type', { length: 50 }).notNull(),
    targetId: uuid('target_id').notNull(),
    reason: text('reason'),
    ipAddress: varchar('ip_address', { length: 45 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('idx_moderation_actions_actor').on(table.actorId),
    index('idx_moderation_actions_target').on(table.targetType, table.targetId),
    index('idx_moderation_actions_action').on(table.action),
    index('idx_moderation_actions_created').on(table.createdAt),
  ],
);

export type ModerationAction = typeof moderationActions.$inferSelect;
export type NewModerationAction = typeof moderationActions.$inferInsert;

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

// App role enum
export const appRoleEnum = pgEnum('app_role', ['admin', 'user']);

// User Roles
export const userRoles = pgTable(
  'user_roles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(), // references auth.users
    role: appRoleEnum('role').notNull().default('user'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [unique('uq_user_role').on(table.userId, table.role)],
);

export type UserRole = typeof userRoles.$inferSelect;
export type NewUserRole = typeof userRoles.$inferInsert;

// User Activity Log — append-only activity tracking
//
// @design No updated_at — activity logs are immutable
//
// Records are append-only. No UPDATE or DELETE RLS policies are defined.
//
// @design FKs managed in custom SQL
//
// `userId` → `auth.users` is defined in Supabase-side SQL (not Drizzle references),
// following the same pattern as `profiles.id`.
export const userActivityLog = pgTable(
  'user_activity_log',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(), // references auth.users — FK defined in custom SQL
    action: varchar('action', { length: 50 }).notNull(),
    targetType: varchar('target_type', { length: 50 }),
    targetId: uuid('target_id'),
    metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('idx_user_activity_log_user').on(table.userId),
    index('idx_user_activity_log_action').on(table.action),
    index('idx_user_activity_log_target').on(table.targetType, table.targetId),
    index('idx_user_activity_log_created').on(table.createdAt),
  ],
);

export type UserActivityLog = typeof userActivityLog.$inferSelect;
export type NewUserActivityLog = typeof userActivityLog.$inferInsert;
