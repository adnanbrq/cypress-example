import { Optional } from "typescript-optional";
import type { KyselyInstance } from "../database";
import type { InsertPostEntity, SelectPostEntity } from "../entity/post.entity";
import type { SelectUserEntity } from "../entity/user.entity";

export interface PostRepository {
  findPostById(id: SelectPostEntity["id"]): Promise<Optional<SelectPostEntity>>;
  findPostsOfUser(userId: SelectUserEntity["id"]): Promise<SelectPostEntity[]>;
  persistPost(post: InsertPostEntity): Promise<Optional<SelectPostEntity>>;
}

type Props = {
  DB: KyselyInstance;
};

export function newPostRepository({ DB }: Props): PostRepository {
  return {
    async findPostsOfUser(userId) {
      try {
        const result = await DB.selectFrom("Post")
          .selectAll()
          .where("Post.userId", "=", userId)
          .execute();

        if (!result) {
          return [];
        }

        return result.map((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          userId: post.userId,
          createdAt: post.createdAt,
        }));
      } catch (e) {
        console.error(e);
        return [];
      }
    },

    async findPostById(id) {
      try {
        const result = await DB.selectFrom("Post")
          .selectAll()
          .where("Post.id", "=", id)
          .executeTakeFirst();

        if (!result) {
          return Optional.empty();
        }

        return Optional.ofNonNull({
          id: result.id,
          title: result.title,
          content: result.content,
          userId: result.userId,
          createdAt: result.createdAt,
        });
      } catch (e) {
        console.error(e);
        return Optional.empty();
      }
    },

    async persistPost(post) {
      try {
        const res = await DB.insertInto("Post")
          .values(structuredClone(post))
          .executeTakeFirst();

        if (res && !isNaN(Number(res.insertId))) {
          return this.findPostById(Number(res.insertId));
        }

        return Optional.empty();
      } catch (e) {
        console.error(e);
        return Optional.empty();
      }
    },
  };
}
