import { appContainer } from "@backend/backend";
import { HttpResponse } from "@backend/infrastructure/http/http-response";
import { CreateSessionSchema } from "@backend/package/http/dto/session.dto";
import type { APIRoute } from "astro";

export const del: APIRoute = async (ctx) => {
  const userSession = appContainer.getUserSession(ctx.cookies);

  userSession.RevokeSession();
  return HttpResponse.json(null, { status: 200 });
};

export const post: APIRoute = async (ctx) => {
  try {
    const controller = appContainer.getSessionController(
      ctx.cookies,
      ctx.redirect
    );

    const formData = await ctx.request.formData();
    const email = formData.get("email");

    if (!email) {
      return new Response(null, { status: 403 });
    }

    const existsByEmail = await appContainer
      .getUserRepository()
      .existsByEmail(email.toString());

    if (existsByEmail) {
      // Sign In
      const data = CreateSessionSchema.parse(formData);
      return controller.handleSignIn(data);
    } else {
      // Sign Up
      const data = CreateSessionSchema.parse(formData);
      return controller.handleSignUp(data);
    }
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 500 });
  }
};
