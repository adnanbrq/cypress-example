import type { CookiesContract } from "./infrastructure/http/http-cookie";
import type { HttpRedirect } from "./infrastructure/http/http-redirect";
import { newEncryption } from "./package/crypto/encryption.impl";
import { newHashing } from "./package/crypto/hashing.impl";
import { newDB } from "./package/database/database";
import {
  PostRepository,
  newPostRepository,
} from "./package/database/repository/post.repository";
import {
  UserRepository,
  newUserRepository,
} from "./package/database/repository/user.repository";
import type { PostController } from "./package/http/controller/post.controller";
import { newPostController } from "./package/http/controller/post.controller.impl";
import type { SessionController } from "./package/http/controller/session.controller";
import { newSessionController } from "./package/http/controller/session.controller.impl";
import type { UserSession } from "./package/http/session/user.session";
import { newUserSession } from "./package/http/session/user.session.impl";

interface AppContainer {
  getUserSession(cookies: CookiesContract): UserSession;
  getSessionController(
    cookies: CookiesContract,
    redirect: HttpRedirect
  ): SessionController;
  getUserRepository(): UserRepository;
  getPostController(redirect: HttpRedirect): PostController;
  getPostRepository(): PostRepository;
}

export const appContainer = newAppContainer();

function newAppContainer(): AppContainer {
  const DB = newDB();
  const userRepository = newUserRepository({ DB });
  const postRepository = newPostRepository({ DB });
  const encryption = newEncryption();
  const hashing = newHashing();

  return {
    getSessionController(cookies, redirect) {
      return newSessionController({
        userRepository,
        hashing,
        redirect,
        session: this.getUserSession(cookies),
      });
    },

    getPostController(redirect) {
      return newPostController({ postRepository, redirect });
    },

    getUserSession(cookies) {
      return newUserSession({ userRepository, encryption, cookies });
    },

    getUserRepository() {
      return userRepository;
    },

    getPostRepository() {
      return postRepository;
    },
  };
}
