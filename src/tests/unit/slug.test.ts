import { expect, test } from "@playwright/test";

test.describe("slug", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog/barebones-approach-to-continuous-integration");
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

    await page.reload();
    await page.getByText("What is CI?").click();
    await expect(page).toHaveURL("/blog/barebones-approach-to-continuous-integration#what-is-ci");
  });
});
