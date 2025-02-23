import { test, expect } from "@playwright/test";

test("blog", async ({ page }) => {
  await page.goto("/blog", { waitUntil: "load" });
  await expect(page).toHaveScreenshot("blog.png", { fullPage: true });
});
