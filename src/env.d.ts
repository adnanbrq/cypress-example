/// <reference types="astro/client" />

interface ImportMeatEnv {
  readonly COOKIE_SECRET: string;
  readonly COOKIE_KEY: string;
  readonly SESSION_SALT: string;
}
