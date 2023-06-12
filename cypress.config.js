import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: false,
  e2e: {
    video: false,
    screenshotOnRunFailure: false,
  },
});
