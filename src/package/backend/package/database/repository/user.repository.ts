import { Optional } from "typescript-optional";
import type { KyselyInstance } from "../database";
import type {
  InsertUserEntity,
  SelectUserEntity,
  UserEntity,
} from "../entity/user.entity";

export interface UserRepository {
  existsByEmail(email: UserEntity["email"]): Promise<boolean>;
  findByEmail(email: UserEntity["email"]): Promise<Optional<SelectUserEntity>>;
  persistUser(user: InsertUserEntity): Promise<Optional<SelectUserEntity>>;
}

type Props = {
  DB: KyselyInstance;
};

export function newUserRepository({ DB }: Props): UserRepository {
  return {
    async existsByEmail(email) {
      try {
        const res = await DB.selectFrom("User")
          .where("User.email", "=", email)
          .select("id")
          .executeTakeFirst();

        return typeof res !== "undefined";
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    async findByEmail(email) {
      try {
        const result = await DB.selectFrom("User")
          .selectAll()
          .where("User.email", "=", email)
          .executeTakeFirst();

        if (!result) {
          return Optional.empty();
        }

        return Optional.ofNonNull({
          id: result.id,
          email: result.email,
          password: result.password,
        });
      } catch (e) {
        console.error(e);
        return Optional.empty();
      }
    },

    async persistUser(user) {
      try {
        const res = await DB.insertInto("User").values(user).executeTakeFirst();

        if (!res || (res && isNaN(Number(res.insertId)))) {
          return Optional.empty();
        }

        return this.findByEmail(user.email);
      } catch (e) {
        console.error(e);
        return Optional.empty();
      }
    },
  };
}
