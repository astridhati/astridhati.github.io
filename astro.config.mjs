import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://astridhati.github.io",
  base: "/",
  integrations: [sitemap()],
  redirects: {
    "/admin": "/admin/index.html",
    "/admin/": "/admin/index.html",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
