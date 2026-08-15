import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  nitro: isGitHubActions
    ? {
        preset: "node-server",
      }
    : undefined,

  vite: {
    base: isGitHubActions ? "/ethical-blueprints/" : "/",
  },
});
