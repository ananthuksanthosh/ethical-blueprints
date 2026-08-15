import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },

    spa: isGitHubPages
      ? {
          enabled: true,
          prerender: {
            outputPath: "/index.html",
            crawlLinks: false,
            retryCount: 2,
          },
        }
      : undefined,
  },

  vite: {
    plugins: isGitHubPages
      ? [
          nitro({
            preset: "node-server",
          }),
        ]
      : undefined,

    base: isGitHubPages ? "/portfolio/" : "/",
  },
});
