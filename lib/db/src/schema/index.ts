import { pgTable, uuid, varchar, text, timestamp, unique } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  displayName: varchar('display_name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const userProgressTable = pgTable(
  'user_progress',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    surahId: varchar('surah_id', { length: 50 }),
    verseId: varchar('verse_id', { length: 50 }),
    status: varchar('status', { length: 50 }).notNull().default('practiced'),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (t) => [
    unique('user_progress_unique').on(t.userId, t.surahId, t.verseId),
  ]
);

export const submittedReelsTable = pgTable('submitted_reels', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  videoUrl: text('video_url').notNull(),
  caption: text('caption').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
export type UserProgress = typeof userProgressTable.$inferSelect;
export type SubmittedReel = typeof submittedReelsTable.$inferSelect;
