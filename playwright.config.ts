import type { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    baseURL: "http://localhost:3000",
  },
};
export default config;
