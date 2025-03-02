import { expect, test } from "@playwright/test";

test("bonus", async ({ page }) => {
  await page.goto("/bonus", { waitUntil: "load" });
  await expect(page).toHaveScreenshot("bonus.png", { fullPage: true });
});
