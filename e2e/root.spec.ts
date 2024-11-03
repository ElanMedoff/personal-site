import { test, expect } from "@playwright/test";

test.describe("root", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has intro", async ({ page }) => {
    await expect(page.getByText("hey")).toBeVisible();
    await expect(
      page.getByText("I'm Elan Medoff, a software engineer specializing in web and fullstack development.")
    ).toBeVisible();
    await expect(page.getByTestId("profile")).toBeVisible();
  });

  test("has recent blog posts", async ({ page }) => {
    await expect(page.getByText("recent blog posts")).toBeVisible();
    await page.getByText("Revamping Data Fetching Patterns on the Web Platform at Wealthfront").click();
    await expect(page).toHaveURL("blog/revamping-data-fetching-patterns-at-wealthfront");
  });

  test("has recent github projects", async ({ page }) => {
    await expect(page.getByText("github projects")).toBeVisible();
    await expect(page.getByText("personal-site")).toBeVisible();
    const pagePromise = page
      .context()
      .waitForEvent("page", (p) => p.url() == "https://github.com/ElanMedoff/personal-site");
    await page.getByText("personal-site").click();
    const newPage = await pagePromise;
    await newPage.bringToFront();
  });

  test("has npm packages", async ({ page }) => {
    await expect(page.getByText("npm packages")).toBeVisible();
  });
});
