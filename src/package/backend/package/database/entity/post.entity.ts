import type { ColumnType, Generated, Insertable, Selectable } from "kysely";

export type SelectPostEntity = Selectable<PostEntity>;
export type InsertPostEntity = Insertable<PostEntity>;
export type PostEntity = {
  id: Generated<number>;
  title: string;
  content: string;
  createdAt: ColumnType<Date, string, never>;

  // foreign keys
  userId: number;
};
