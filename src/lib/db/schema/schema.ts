import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  index,
  foreignKey,
  primaryKey,
  int,
  varchar,
  text,
  timestamp,
  unique,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const rooms = mysqlTable(
  "rooms",
  {
    id: int("id").autoincrement().notNull(),
    publicId: varchar("public_id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
  },
  (table) => {
    return {
      roomsId: primaryKey({ columns: [table.id], name: "rooms_id" }),
      publicId: unique("public_id").on(table.publicId),
    };
  },
);

export const messages = mysqlTable(
  "messages",
  {
    id: int("id").autoincrement().notNull(),
    role: varchar("role", { length: 255 }).notNull(),
    parts: text("parts").notNull(),
    roomPublicId: varchar("room_public_id", { length: 255 }).references(
      () => rooms.publicId,
    ),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
  },
  (table) => {
    return {
      roomPublicId: index("room_public_id").on(table.roomPublicId),
      messagesId: primaryKey({ columns: [table.id], name: "messages_id" }),
    };
  },
);
