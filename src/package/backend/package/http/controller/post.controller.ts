import type { SelectUserEntity } from "@backend/package/database/entity/user.entity";
import type { CreatePostPayload } from "../dto/post.dto";

export interface PostController {
  handleCreatePost(
    props: CreatePostPayload,
    userId: SelectUserEntity["id"]
  ): Promise<Response>;
}
