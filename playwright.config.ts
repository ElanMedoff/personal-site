import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    headless: true,
    baseURL: "http://localhost:3001",
    viewport: {
      height: 1000,
      width: 1200,
    },
    browserName: "chromium",
  },
  fullyParallel: true,
});
