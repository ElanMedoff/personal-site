import { test, expect } from "@playwright/test";
import { fetchSlugs } from "utils/post";

test.describe("blog.[slug]", () => {
  fetchSlugs().forEach((slug) => {
    test(`blog.[${slug}]`, async ({ page }) => {
      await page.goto(`/blog/${slug}`, { waitUntil: "load" });
      await expect(page).toHaveScreenshot(`blog.${slug}.png`, {
        fullPage: true,
      });
    });
  });
});
