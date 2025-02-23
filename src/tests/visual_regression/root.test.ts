import { test, expect } from "@playwright/test";

test("root", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });
  await expect(page).toHaveScreenshot("root.png", { fullPage: true });
});
