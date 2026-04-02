import { integer, pgTable, bigint, timestamp } from "drizzle-orm/pg-core";

export const pageViewsTable = pgTable("page_views_counter", {
  id: integer("id").primaryKey().default(1),
  count: bigint("count", { mode: "number" }).notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
