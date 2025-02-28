import { test, expect } from "@playwright/test";

// TODO: figure out a clean way to test oauth
test.describe("slug", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog/barebones-approach-to-continuous-integration");
  });

  test("renders", async ({ page }) => {
    await expect(page.getByText("A Barebones Approach to Continuous Integration")).toBeVisible();
    await expect(page.getByText("last updated: May 05, 2023")).toBeVisible();
    await expect(page.getByText("6 minute read")).toBeVisible();
    await expect(page.getByText("login with github")).toBeVisible();
    await expect(
      page.getByText("Of the many domains of software engineering,", {
        exact: false,
      }),
    ).toBeVisible();
    await expect(page.getByText("What is CI?")).toBeVisible();
  });

  test("clicking on subtitle", async ({ page }) => {
    await page.getByText("What is CI?").click();
    await expect(
      page.getByTestId("copy-url-dialog-what-is-ci").getByText("Heads up -"),
    ).toBeVisible();
    await page.getByTestId("copy-url-dialog-what-is-ci").getByTestId("copy-button").click();
    await expect(page).toHaveURL("/blog/barebones-approach-to-continuous-integration#what-is-ci");
    await page.getByText("What is CI?").click();
    await page.getByTestId("copy-url-dialog-what-is-ci").getByTestId("disable-button").click();
    await page.getByTestId("copy-url-dialog-what-is-ci").getByTestId("copy-button").click();

    await page.goto("/blog/barebones-approach-to-continuous-integration");
    await page.getByText("What is CI?").click();
    await expect(page).toHaveURL("/blog/barebones-approach-to-continuous-integration#what-is-ci");
  });
});
