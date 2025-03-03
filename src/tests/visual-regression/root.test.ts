import { expect, test } from "@playwright/test";

test("root", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });
  await expect(page).toHaveScreenshot("root.png", {
    fullPage: true,
    mask: [page.getByTestId("root-github-repo-card")],
  });
});
