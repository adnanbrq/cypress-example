import { appContainer } from "@backend/backend";
import { CreatePostSchema } from "@backend/package/http/dto/post.dto";
import type { APIRoute } from "astro";

export const post: APIRoute = async ({ cookies, redirect, request }) => {
  const currentUser = await appContainer
    .getUserSession(cookies)
    .GetUserFromSession();

  if (currentUser.isEmpty()) {
    return redirect("/auth");
  }

  try {
    const formData = await request.formData();
    const payload = CreatePostSchema.parse(formData);

    return appContainer
      .getPostController(redirect)
      .handleCreatePost(payload, currentUser.get().id);
  } catch (e) {
    console.error(e);
    return redirect("/");
  }
};
