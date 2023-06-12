import type { Generated, Insertable, Selectable } from "kysely";

export type SelectUserEntity = Selectable<UserEntity>;
export type InsertUserEntity = Insertable<UserEntity>;
export type UserEntity = {
  id: Generated<number>;
  email: string;
  password: string;
};
