import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});

export const createUser = createInsertSchema(user, {
  username: t.String({ minLength: 1 }),
  password: t.String({ minLength: 1 }),
});
export const selectUser = createSelectSchema(user, {
  username: t.String({ default: "admin" }),
  password: t.String({ default: "999" }),
});
