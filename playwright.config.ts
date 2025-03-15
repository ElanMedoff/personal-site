import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    headless: true,
    baseURL: `http://localhost:${process.env.NODE_ENV === "production" ? 3000 : 3001}`,
    viewport: {
      height: 1000,
      width: 1600,
    },
    browserName: "chromium",
    permissions: ["clipboard-read", "clipboard-write"],
  },
  workers: 1,
});
