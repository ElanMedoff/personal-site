import { expect, test } from "@playwright/test";

test("resume", async ({ page }) => {
  await page.goto("/resume", { waitUntil: "load" });
  await expect(page).toHaveScreenshot("resume.png", { fullPage: true });
});
