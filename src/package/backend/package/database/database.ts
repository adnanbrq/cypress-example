import Database from "better-sqlite3";
import { Kysely, SqliteDialect, sql } from "kysely";
import type { UserEntity } from "./entity/user.entity";
import type { PostEntity } from "./entity/post.entity";

export type KyselyInstance = Kysely<DatabaseStructure>;
export type DatabaseStructure = {
  User: UserEntity;
  Post: PostEntity;
};

let _INSTANCE_: KyselyInstance | undefined;

export function newDB(): KyselyInstance {
  if (typeof _INSTANCE_ === "undefined") {
    _INSTANCE_ = new Kysely({
      dialect: new SqliteDialect({
        database: new Database(
          import.meta.env.PROD ? "database.sqlite" : ":memory:",
          {}
        ),
      }),
    });
  }

  sql`
    create table "user" (
      "id" INTEGER PRIMARY KEY,
      "email" VARCHAR,
      "password" VARCHAR
    );
  `.execute(_INSTANCE_);

  sql`
    create table "post" (
      "id" INTEGER PRIMARY KEY,
      "title" VARCHAR,
      "content" VARCHAR,
      "userId" INTEGER,
      "createdAt" datetime DEFAULT CURRENT_TIMESTAMP
    );
  `.execute(_INSTANCE_);

  return _INSTANCE_;
}
