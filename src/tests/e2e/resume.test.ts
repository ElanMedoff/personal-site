import { test, expect } from "@playwright/test";

test.describe("root", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume");
  });

  test("renders", async ({ page }) => {
    await expect(page.getByText("Elan Medoff")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Personal projects" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Education" })).toBeVisible();
  });
});
