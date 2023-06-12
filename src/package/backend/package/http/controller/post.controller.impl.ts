import type { PostRepository } from "@backend/package/database/repository/post.repository";
import type { PostController } from "./post.controller";
import type { HttpRedirect } from "@backend/infrastructure/http/http-redirect";
import { format } from "date-fns";

type Props = {
  postRepository: PostRepository;
  redirect: HttpRedirect;
};

export function newPostController({
  postRepository,
  redirect,
}: Props): PostController {
  return {
    async handleCreatePost({ title, content }, userId) {
      try {
        const post = await postRepository.persistPost({
          title,
          content,
          userId,
          createdAt: new Date().toISOString(),
        });

        if (post.isEmpty()) {
          return redirect("/new-post");
        }

        return redirect(
          `/post/${post.get().id}-${post
            .get()
            .title.toLowerCase()
            .replaceAll(" ", "-")}`
        );
      } catch (e) {
        console.error(e);
        return redirect("/");
      }
    },
  };
}
