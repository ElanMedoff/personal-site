import type { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  use: {
    headless: true,
    baseURL: "http://localhost:3000",
    viewport: {
      height: 1000,
      width: 1200,
    },
    browserName: "chromium",
  },
};
export default config;
